import type { ChoiceQuestion } from "@/lib/engine/types";

type Dim = "warmth" | "depth" | "clarity";
type Levels = Partial<Record<Dim, number>>;

const round2 = (v: number) => Math.round(v * 100) / 100;

/**
 * One choice item. `weight` names the dimensions the item informs and how strongly
 * (1 = a full-strength clue). Each option gives a level from 0 to 1 on those
 * dimensions: warmth 0 = cool, 1 = warm; depth 0 = light, 1 = deep; clarity
 * 0 = soft/muted, 1 = clear/bright. A level left out means "no lean" (0.5).
 * Option weights are level × item weight, so each dimension score works out to a
 * weighted average of the levels a taker picked.
 */
function item(id: string, text: string, weight: Levels, options: [string, string, Levels][]): ChoiceQuestion {
  return {
    id,
    kind: "choice",
    text,
    options: options.map(([optionId, label, levels]) => ({
      id: optionId,
      label,
      weights: Object.fromEntries(
        (Object.keys(weight) as Dim[]).map((d) => [d, round2((levels[d] ?? 0.5) * (weight[d] ?? 0))]),
      ),
    })),
  };
}

export const questions: ChoiceQuestion[] = [
  item("undertone", "Look at your bare skin in daylight near a window. Which undertone shows through most?", { warmth: 1 }, [
    ["rosy", "Pink, rosy or blue-red", { warmth: 0 }],
    ["golden", "Golden, peachy or yellow", { warmth: 1 }],
    ["olive", "Olive: a green, khaki or gray cast", { warmth: 0.45 }],
    ["neutral", "Neutral: neither clearly pink nor golden", { warmth: 0.5 }],
  ]),
  item("metal", "Silver or gold jewelry: which makes your skin look brighter and healthier?", { warmth: 1 }, [
    ["silver", "Silver, platinum or white gold", { warmth: 0 }],
    ["gold", "Yellow gold, brass or bronze", { warmth: 1 }],
    ["both", "Both look about the same, or rose gold looks best", { warmth: 0.5 }],
  ]),
  item("veins", "In daylight, what color do the veins on your inner wrist look?", { warmth: 0.6 }, [
    ["blue", "Blue or purple", { warmth: 0 }],
    ["green", "Green or olive", { warmth: 1 }],
    ["mix", "A mix of blue and green", { warmth: 0.5 }],
    ["hidden", "Hard to see on my skin", { warmth: 0.5 }],
  ]),
  item("sun", "How does your skin usually react to strong sun without sunscreen?", { warmth: 0.5, depth: 0.6 }, [
    ["burns", "Burns quickly and stays pink or red", { warmth: 0.25, depth: 0 }],
    ["freckles", "Burns first, then freckles or tans a little", { warmth: 0.65, depth: 0.2 }],
    ["golden", "Tans easily to a golden or bronze glow", { warmth: 1, depth: 0.6 }],
    ["cool-tan", "Tans to a cool, rosy or neutral brown", { warmth: 0, depth: 0.55 }],
    ["deepens", "Rarely burns; it just gets a little deeper", { warmth: 0.5, depth: 1 }],
  ]),
  item("skin-depth", "How light or deep is your skin?", { depth: 0.9 }, [
    ["very-fair", "Very fair", { depth: 0 }],
    ["light", "Fair to light", { depth: 0.2 }],
    ["light-medium", "Light-medium", { depth: 0.4 }],
    ["medium", "Medium", { depth: 0.6 }],
    ["medium-deep", "Medium-deep", { depth: 0.8 }],
    ["deep", "Deep to very deep", { depth: 1 }],
  ]),
  item("hair", "What is your natural hair color, or what was it before going gray?", { depth: 1, warmth: 0.7 }, [
    ["ash-blonde", "Platinum or light ash blonde", { depth: 0, warmth: 0.1 }],
    ["golden-blonde", "Golden, honey or strawberry blonde", { depth: 0.1, warmth: 1 }],
    ["dark-blonde", "Dark blonde or light brown, with no red or gold", { depth: 0.35, warmth: 0.3 }],
    ["red", "Red, copper or auburn", { depth: 0.45, warmth: 1 }],
    ["warm-brown", "Medium to dark brown with warm, golden or red glints", { depth: 0.7, warmth: 0.8 }],
    ["cool-brown", "Medium to dark brown, cool or ashy", { depth: 0.7, warmth: 0.15 }],
    ["black", "Black or brown-black", { depth: 1, warmth: 0.45 }],
  ]),
  item("eyes", "What color are your eyes?", { depth: 0.5, warmth: 0.6 }, [
    ["blue-gray", "Blue or gray", { depth: 0.1, warmth: 0.15 }],
    ["green", "Green, teal or blue-green", { depth: 0.25, warmth: 0.5 }],
    ["hazel", "Hazel, or green with gold flecks", { depth: 0.45, warmth: 0.85 }],
    ["golden-brown", "Light or golden brown, or amber", { depth: 0.55, warmth: 1 }],
    ["cool-brown", "Brown with a gray or cool cast", { depth: 0.7, warmth: 0.1 }],
    ["dark-brown", "Dark brown to black-brown", { depth: 1, warmth: 0.5 }],
  ]),
  item("eye-look", "In daylight, how would you describe your eyes?", { clarity: 1 }, [
    ["sparkling", "Clear and sparkling: the color pops against the whites", { clarity: 1 }],
    ["bright", "Bright, but not especially striking", { clarity: 0.65 }],
    ["between", "Somewhere between soft and bright", { clarity: 0.35 }],
    ["soft", "Soft and blended: the colors melt together", { clarity: 0 }],
  ]),
  item("contrast", "How much contrast is there between your hair, skin and eyes?", { clarity: 0.9, depth: 0.5 }, [
    ["high", "High: they stand out sharply against each other", { clarity: 1, depth: 0.6 }],
    ["medium", "Medium: some contrast, nothing dramatic", { clarity: 0.5, depth: 0.5 }],
    ["low-light", "Low: they blend together, and all are fairly light", { clarity: 0.05, depth: 0 }],
    ["low-deep", "Low: they blend together, and all are medium or deep", { clarity: 0.05, depth: 1 }],
  ]),
  item("white", "Hold pure white, then ivory or cream, under your chin. Which looks better?", { warmth: 0.7, clarity: 0.7 }, [
    ["pure", "Pure, crisp white", { warmth: 0.25, clarity: 1 }],
    ["soft", "A soft off-white that isn't yellow", { warmth: 0, clarity: 0.1 }],
    ["ivory", "Ivory or cream", { warmth: 1, clarity: 0.35 }],
    ["same", "I can't see a difference", { warmth: 0.5, clarity: 0.5 }],
  ]),
  item("dark-neutral", "Which looks better near your face: black or dark chocolate brown?", { warmth: 0.6, depth: 0.6, clarity: 0.6 }, [
    ["black", "Black", { warmth: 0.15, depth: 0.75, clarity: 1 }],
    ["brown", "Dark chocolate brown", { warmth: 1, depth: 0.75, clarity: 0.25 }],
    ["both", "Both look great on me", { warmth: 0.5, depth: 1, clarity: 0.6 }],
    ["neither", "Both feel too heavy; lighter neutrals suit me", { warmth: 0.5, depth: 0, clarity: 0.3 }],
  ]),
  item("brights", "How do you look in very bright colors, like cobalt blue or hot pink?", { clarity: 1 }, [
    ["great", "Great: bright colors look natural on me", { clarity: 1 }],
    ["good", "Good, if they're clear but not neon", { clarity: 0.7 }],
    ["so-so", "So-so: slightly softened colors look better", { clarity: 0.35 }],
    ["muted", "They overpower me; dusty, muted colors look best", { clarity: 0 }],
  ]),
  item("value", "Which shades look best near your face?", { depth: 1 }, [
    ["pastel", "Light pastels, like powder blue or peach", { depth: 0 }],
    ["light-medium", "Light-to-medium shades", { depth: 0.35 }],
    ["medium-deep", "Medium-to-deep shades", { depth: 0.7 }],
    ["deep", "Deep, dark shades, like burgundy or forest green", { depth: 1 }],
  ]),
  item("lips", "Which lip shade looks most natural on you? If you skip makeup, picture a tinted balm.", { warmth: 0.7, depth: 0.5, clarity: 0.7 }, [
    ["rose", "Soft pink or rosy mauve", { warmth: 0.1, depth: 0.2, clarity: 0.15 }],
    ["coral", "Peach, coral or warm pink", { warmth: 0.85, depth: 0.1, clarity: 0.75 }],
    ["brick", "Terracotta, brick or warm brown", { warmth: 1, depth: 0.8, clarity: 0.1 }],
    ["berry", "Berry, plum or wine", { warmth: 0.1, depth: 1, clarity: 0.6 }],
    ["red", "Bold true red or fuchsia", { warmth: 0.35, depth: 0.6, clarity: 1 }],
    ["nude", "A nude close to my own lip color", { warmth: 0.5, depth: 0.5, clarity: 0.4 }],
  ]),
  item("compliments", "Which group of colors gets you the most compliments?", { warmth: 1, depth: 0.4, clarity: 1 }, [
    ["fresh", "Warm and fresh: coral, turquoise, golden yellow", { warmth: 1, depth: 0.2, clarity: 0.85 }],
    ["cool-soft", "Soft and cool: powder blue, lavender, dusty rose", { warmth: 0, depth: 0.2, clarity: 0.15 }],
    ["earthy", "Rich and earthy: rust, olive, mustard, chocolate", { warmth: 1, depth: 1, clarity: 0.1 }],
    ["icy-bold", "Bold and icy: royal blue, emerald, true red, black", { warmth: 0, depth: 1, clarity: 1 }],
    ["unsure", "Not sure yet", {}],
  ]),
];
