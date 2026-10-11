import type { Dimension } from "@/lib/engine/types";

export const dimensions: Dimension[] = [
  {
    key: "warmth",
    label: "Undertone",
    low: "Cool",
    high: "Warm",
    description: "Whether your coloring leans cool (pink, rosy, blue-red) or warm (golden, peachy, yellow).",
    report: {
      low: "Your coloring reads clearly cool. Your answers about undertone, jewelry and how colors look on you point to a pink, rosy or blue-red base rather than a golden one. Colors with a blue base, such as raspberry, true navy, icy pink and blue-red, tend to harmonize with your skin, while orange, rust and golden yellow can make it look sallow or tired. Silver, platinum and white gold usually look more natural on you than yellow gold.",
      mid: "Your coloring sits close to neutral, neither strongly cool nor strongly warm. That gives you some flexibility: you can often wear both silver and gold, and colors that are neither very blue nor very yellow tend to look easy on you. Your season comes down to your other traits, depth and clarity, more than your undertone. When you're unsure about a color, try the version that's slightly softened or balanced, like teal instead of pure blue, or rose instead of fuchsia.",
      high: "Your coloring reads clearly warm. Your answers point to a golden, peachy or yellow base, along with a preference for gold metals and creamy whites over stark ones. Colors with a yellow base, such as coral, camel, olive, golden yellow and warm red, tend to make your skin glow, while icy pastels and blue-based pinks can look harsh or chalky. Gold, brass and copper jewelry will usually look like they belong to you.",
    },
  },
  {
    key: "depth",
    label: "Depth",
    low: "Light",
    high: "Deep",
    description: "How light or deep your overall coloring is, across skin, hair and eyes together.",
    report: {
      low: "Your overall coloring is light. Your skin, hair and eyes together sit at the lighter end, so heavy, dark colors near your face can overpower you and become the first thing people notice. Light and light-medium shades let your features stay in focus. If you love darker colors, choose softer versions such as gray-navy, cocoa or light charcoal instead of black, and keep the darkest pieces away from your face.",
      mid: "Your overall coloring is medium in depth. You can usually wear light and dark colors alike, as long as the undertone and clarity suit you, which gives you a wide range of options. Very pale pastels may look a bit washed out on you, and the very darkest shades may need a lighter accent near your face. Medium-value colors, neither pastel nor near-black, are often your easiest everyday choices.",
      high: "Your overall coloring is deep. Your hair, eyes and often skin carry a lot of depth, so rich, dark colors look natural on you while very pale pastels can wash you out. You can carry strong shades like espresso, burgundy, forest green or black without being overwhelmed. Light colors still work, but they look best when paired with something deeper near your face or when they're clean rather than chalky.",
    },
  },
  {
    key: "clarity",
    label: "Clarity",
    low: "Soft",
    high: "Clear",
    description: "Whether you're flattered by soft, blended colors or clear, saturated ones.",
    report: {
      low: "Your coloring is soft and blended. Your features flow into each other without sharp contrast, so gently muted, slightly grayed colors look harmonious on you while very bright, saturated ones can overpower your face. Think dusty rose instead of hot pink, sage instead of kelly green, and slate instead of cobalt. Matte or brushed finishes in jewelry and fabric often look better on you than high shine.",
      mid: "Your coloring sits between soft and clear. You can usually wear colors with moderate brightness, neither neon nor dusty, and that middle zone is where you'll find your most reliable choices. Very bright colors may need to be balanced with a neutral, and very muted colors may need a bit of contrast to keep them from looking flat. Your undertone and depth will decide most of your palette.",
      high: "Your coloring is clear and bright. Your eyes likely sparkle against their whites, and your features have noticeable contrast, so saturated, clean colors match your energy while muted, dusty shades can make you look tired. Think cobalt, emerald, true red and crisp white rather than mauve or khaki. High-shine finishes and strong contrasts in an outfit often suit you well.",
    },
  },
];
