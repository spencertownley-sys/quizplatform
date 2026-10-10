import type { AbilityQuestion, FigureShape } from "@/lib/engine/types";

/*
 * 30 original items: 9 pattern grids, 7 number series, 7 verbal analogies, 7 spatial.
 * Ordered by difficulty (1→5), skills interleaved.
 *
 * Figure conventions the copy relies on (checked against src/components/Figure.tsx):
 * - rotate is degrees CLOCKWISE (SVG rotate); an unrotated triangle points UP; an unrotated line is flat.
 * - A cell with two shape entries (p6) is drawn side by side: the shape on the left, the line on the right.
 *   The explanation doesn't depend on that layout.
 * - Every shape spells out count, fill and rotate so options and cells render identically.
 */

type Shape = FigureShape["shape"];
type Fill = NonNullable<FigureShape["fill"]>;

/** One shape entry. Defaults: 1 copy, solid, unrotated. */
const sh = (shape: Shape, fill: Fill = "solid", count = 1, rotate = 0, size?: number): FigureShape => ({
  shape,
  count,
  fill,
  rotate,
  ...(size !== undefined ? { size } : {}),
});

/** A cell holding a single shape. */
const c = (shape: Shape, fill: Fill = "solid", count = 1, rotate = 0): FigureShape[] => [sh(shape, fill, count, rotate)];

/** Lettered figure options: [id, cell]. Labels are the upper-case id. */
const figOpts = (...opts: [string, FigureShape[]][]) => opts.map(([id, figure]) => ({ id, label: id.toUpperCase(), figure }));

/** Text options in the order given; ids a, b, c… */
const textOpts = (...labels: string[]) => labels.map((label, i) => ({ id: "abcdef"[i], label }));

const GRID = "Which tile completes the grid?";

// p6: an outline shape paired with a line (flat 0°, slanted 45°, upright 90°).
const pair = (shape: Shape, lineRotate: number): FigureShape[] => [
  sh(shape, "outline", 1, 0),
  sh("line", "solid", 1, lineRotate, 1),
];

export const items: AbilityQuestion[] = [
  // ───────────── Difficulty 1 ─────────────
  {
    id: "p1",
    kind: "ability",
    dimension: "pattern",
    difficulty: 1,
    text: GRID,
    figure: {
      type: "matrix",
      cells: [
        c("circle", "solid", 1), c("circle", "solid", 2), c("circle", "solid", 3),
        c("square", "solid", 1), c("square", "solid", 2), c("square", "solid", 3),
        c("triangle", "solid", 1), c("triangle", "solid", 2), null,
      ],
    },
    options: figOpts(
      ["a", c("triangle", "solid", 2)],
      ["b", c("square", "solid", 3)],
      ["c", c("triangle", "solid", 3)],
      ["d", c("triangle", "solid", 1)],
      ["e", c("circle", "solid", 3)],
    ),
    correct: "c",
    explanation:
      "Each row keeps one shape and adds one copy at each step: 1, 2, 3. The bottom row uses triangles, so the missing tile holds three triangles.",
  },
  {
    id: "n1",
    kind: "ability",
    dimension: "number",
    difficulty: 1,
    text: "What number comes next? 3, 7, 11, 15, …",
    options: textOpts("17", "18", "19", "20", "21"),
    correct: "c",
    explanation: "Each number is 4 more than the one before, so the next is 15 + 4 = 19.",
  },
  {
    id: "v1",
    kind: "ability",
    dimension: "verbal",
    difficulty: 1,
    text: "Bird is to nest as bee is to …",
    options: textOpts("honey", "hive", "flower", "wing"),
    correct: "b",
    explanation:
      "A nest is the home a bird builds, and a hive is the home bees build. Honey and flowers belong with bees, but neither is a home.",
  },
  {
    id: "s1",
    kind: "ability",
    dimension: "spatial",
    difficulty: 1,
    text: "Which capital letter looks exactly the same when flipped left to right, as in a mirror?",
    options: textOpts("F", "R", "N", "W", "J"),
    correct: "d",
    explanation:
      "W is symmetrical down its middle, so a left-to-right flip changes nothing. F, R, N and J all face one way, so they look backwards in a mirror.",
  },
  {
    id: "v2",
    kind: "ability",
    dimension: "verbal",
    difficulty: 1,
    text: "Glove is to hand as sock is to …",
    options: textOpts("shoe", "foot", "wool", "leg"),
    correct: "b",
    explanation:
      "A glove is worn on a hand, and a sock is worn on a foot. A shoe is worn over a sock, which is a different relationship.",
  },

  // ───────────── Difficulty 2 ─────────────
  {
    id: "p2",
    kind: "ability",
    dimension: "pattern",
    difficulty: 2,
    text: GRID,
    figure: {
      type: "matrix",
      cells: [
        c("circle", "solid"), c("square", "solid"), c("diamond", "solid"),
        c("circle", "outline"), c("square", "outline"), c("diamond", "outline"),
        c("circle", "striped"), c("square", "striped"), null,
      ],
    },
    options: figOpts(
      ["a", c("diamond", "solid")],
      ["b", c("square", "striped")],
      ["c", c("diamond", "outline")],
      ["d", c("diamond", "striped")],
      ["e", c("triangle", "striped")],
    ),
    correct: "d",
    explanation:
      "Each column keeps one shape, and each row keeps one fill. The gap sits in the diamond column and the striped row, so it is a striped diamond.",
  },
  {
    id: "n2",
    kind: "ability",
    dimension: "number",
    difficulty: 2,
    text: "What number comes next? 2, 6, 18, 54, …",
    options: textOpts("72", "108", "158", "162", "216"),
    correct: "d",
    explanation: "Each number is three times the one before, so the next is 54 × 3 = 162.",
  },
  {
    id: "v3",
    kind: "ability",
    dimension: "verbal",
    difficulty: 2,
    text: "Thermometer is to temperature as clock is to …",
    options: textOpts("time", "hour", "watch", "alarm", "number"),
    correct: "a",
    explanation:
      "A thermometer measures temperature, and a clock measures time. An hour is a unit of time, not the thing being measured.",
  },
  {
    id: "s2",
    kind: "ability",
    dimension: "spatial",
    difficulty: 2,
    text: "The right column is a mirror image of the left column. Which tile completes the grid?",
    figure: {
      type: "matrix",
      cells: [
        c("triangle", "solid", 1, 90), c("circle", "outline"), c("triangle", "solid", 1, 270),
        c("star", "solid"), c("diamond", "outline"), c("star", "solid"),
        c("triangle", "outline", 1, 45), c("square", "solid"), null,
      ],
    },
    options: figOpts(
      ["a", c("triangle", "outline", 1, 135)],
      ["b", c("triangle", "outline", 1, 45)],
      ["c", c("triangle", "solid", 1, 315)],
      ["d", c("triangle", "outline", 1, 225)],
      ["e", c("triangle", "outline", 1, 315)],
    ),
    correct: "e",
    explanation:
      "A mirror flips each shape left to right, just as the top row's right-pointing triangle becomes a left-pointing one. The bottom-left triangle points up and to the right, so its mirror image points up and to the left, with the same outline fill.",
  },
  {
    id: "p3",
    kind: "ability",
    dimension: "pattern",
    difficulty: 2,
    text: GRID,
    figure: {
      type: "matrix",
      cells: [
        c("triangle", "outline", 1, 0), c("triangle", "outline", 1, 90), c("triangle", "outline", 1, 180),
        c("triangle", "outline", 1, 90), c("triangle", "outline", 1, 180), c("triangle", "outline", 1, 270),
        c("triangle", "outline", 1, 180), c("triangle", "outline", 1, 270), null,
      ],
    },
    options: figOpts(
      ["a", c("triangle", "outline", 1, 90)],
      ["b", c("triangle", "outline", 1, 180)],
      ["c", c("triangle", "outline", 1, 270)],
      ["d", c("triangle", "solid", 1, 0)],
      ["e", c("triangle", "outline", 1, 0)],
    ),
    correct: "e",
    explanation:
      "The triangle turns a quarter turn clockwise at every step, and each row starts one step further on. After pointing left comes a full turn, so the outline triangle points up again, like the top-left tile.",
  },
  {
    id: "n3",
    kind: "ability",
    dimension: "number",
    difficulty: 2,
    text: "What number comes next? 1, 4, 9, 16, 25, …",
    options: textOpts("30", "36", "37", "42", "49"),
    correct: "b",
    explanation:
      "These are square numbers (1×1, 2×2, 3×3 and so on), so the next is 6 × 6 = 36. The gaps (3, 5, 7, 9, then 11) lead to the same answer.",
  },
  {
    id: "s3",
    kind: "ability",
    dimension: "spatial",
    difficulty: 2,
    text: "Fold a square sheet in half, then in half again. Punch one hole through all layers. How many holes after unfolding?",
    options: textOpts("1", "2", "4", "6", "8"),
    correct: "c",
    explanation:
      "Two folds stack the paper four layers deep. One punch goes through all four layers, so you see four holes when you open it.",
  },

  // ───────────── Difficulty 3 ─────────────
  {
    id: "p4",
    kind: "ability",
    dimension: "pattern",
    difficulty: 3,
    text: GRID,
    figure: {
      type: "matrix",
      cells: [
        c("circle", "solid", 1), c("square", "outline", 1), c("triangle", "striped", 1),
        c("square", "solid", 2), c("triangle", "outline", 2), c("circle", "striped", 2),
        c("triangle", "solid", 3), c("circle", "outline", 3), null,
      ],
    },
    options: figOpts(
      ["a", c("square", "striped", 3)],
      ["b", c("square", "striped", 2)],
      ["c", c("triangle", "striped", 3)],
      ["d", c("square", "outline", 3)],
      ["e", c("circle", "striped", 3)],
      ["f", c("square", "solid", 3)],
    ),
    correct: "a",
    explanation:
      "Three rules work together: every row and column has one circle, one square and one triangle; the number of shapes matches the row number; and each column keeps its fill. The gap needs three striped squares.",
  },
  {
    id: "n4",
    kind: "ability",
    dimension: "number",
    difficulty: 3,
    text: "What number comes next? 2, 3, 5, 9, 17, …",
    options: textOpts("25", "29", "31", "33", "34"),
    correct: "d",
    explanation:
      "The gaps double each time: +1, +2, +4, +8, then +16, so 17 + 16 = 33. Put another way, each number is double the one before, minus 1.",
  },
  {
    id: "v4",
    kind: "ability",
    dimension: "verbal",
    difficulty: 3,
    text: "Drought is to water as famine is to …",
    options: textOpts("hunger", "rain", "food", "heat", "desert"),
    correct: "c",
    explanation:
      "A drought is a severe shortage of water, and a famine is a severe shortage of food. Hunger is what a famine causes, not what is missing.",
  },
  {
    id: "s4",
    kind: "ability",
    dimension: "spatial",
    difficulty: 3,
    text: "A cube painted on every side is cut into 27 equal small cubes. How many small cubes have exactly two painted faces?",
    options: textOpts("6", "8", "9", "12", "18"),
    correct: "d",
    explanation:
      "Small cubes with exactly two painted faces sit along the big cube's edges, between the corners. A cube has 12 edges, and each edge has one such middle cube, so there are 12.",
  },
  {
    id: "p5",
    kind: "ability",
    dimension: "pattern",
    difficulty: 3,
    text: GRID,
    figure: {
      type: "matrix",
      cells: [
        c("triangle", "solid", 1, 0), c("triangle", "solid", 1, 45), c("triangle", "solid", 1, 90),
        c("triangle", "solid", 2, 90), c("triangle", "solid", 2, 135), c("triangle", "solid", 2, 180),
        c("triangle", "solid", 3, 180), c("triangle", "solid", 3, 225), null,
      ],
    },
    options: figOpts(
      ["a", c("triangle", "solid", 3, 225)],
      ["b", c("triangle", "solid", 3, 270)],
      ["c", c("triangle", "solid", 3, 315)],
      ["d", c("triangle", "solid", 2, 270)],
      ["e", c("triangle", "solid", 3, 90)],
    ),
    correct: "b",
    explanation:
      "Across each row the triangles turn 45° clockwise per step, and each row starts where the row above ended. The row number sets how many triangles there are, so the gap holds three triangles pointing left.",
  },
  {
    id: "n5",
    kind: "ability",
    dimension: "number",
    difficulty: 3,
    text: "What number comes next? 4, 20, 7, 17, 10, 14, …",
    options: textOpts("11", "13", "14", "16", "17"),
    correct: "b",
    explanation:
      "Two series take turns. One climbs by 3 (4, 7, 10) and the other falls by 3 (20, 17, 14). The next number belongs to the climbing series: 10 + 3 = 13.",
  },
  {
    id: "v5",
    kind: "ability",
    dimension: "verbal",
    difficulty: 3,
    text: "Whisper is to shout as drizzle is to …",
    options: textOpts("rain", "cloud", "puddle", "thunder", "downpour"),
    correct: "e",
    explanation:
      "A whisper is very quiet speech and a shout is very loud speech. Drizzle is very light rain, so the matching extreme is a downpour.",
  },

  // ───────────── Difficulty 4 ─────────────
  {
    id: "p6",
    kind: "ability",
    dimension: "pattern",
    difficulty: 4,
    text: GRID,
    figure: {
      type: "matrix",
      cells: [
        pair("circle", 0), pair("square", 45), pair("diamond", 90),
        pair("square", 90), pair("diamond", 0), pair("circle", 45),
        pair("diamond", 45), pair("circle", 90), null,
      ],
    },
    options: figOpts(
      ["a", pair("square", 45)],
      ["b", pair("circle", 0)],
      ["c", pair("square", 0)],
      ["d", pair("diamond", 0)],
      ["e", pair("square", 90)],
    ),
    correct: "c",
    explanation:
      "The shapes and the lines follow separate rules. Every row and column has one circle, one square and one diamond, and also one flat, one slanted and one upright line. The bottom row is missing a square and a flat line, as in the top-left tile.",
  },
  {
    id: "n6",
    kind: "ability",
    dimension: "number",
    difficulty: 4,
    text: "What number comes next? 2, 4, 7, 14, 17, 34, …",
    options: textOpts("31", "36", "37", "40", "68"),
    correct: "c",
    explanation:
      "The steps alternate between doubling and adding 3: ×2, +3, ×2, +3, ×2. The next step is +3, so 34 + 3 = 37.",
  },
  {
    id: "v6",
    kind: "ability",
    dimension: "verbal",
    difficulty: 4,
    text: "Atom is to molecule as letter is to …",
    options: textOpts("alphabet", "word", "vowel", "ink", "paper"),
    correct: "b",
    explanation:
      "Atoms join together to form a molecule, and letters join together to form a word. The alphabet is the full set of letters, and a vowel is a kind of letter; neither is built from letters.",
  },
  {
    id: "s5",
    kind: "ability",
    dimension: "spatial",
    difficulty: 4,
    text: "Fold a square sheet into quarters, making a small square. Cut off the corner where both folds meet. Unfolded, what do you see?",
    options: textOpts(
      "One hole in the center",
      "All four corners cut off",
      "Four holes, one near each corner",
      "A notch in the middle of each edge",
      "Two holes side by side",
    ),
    correct: "a",
    explanation:
      "The corner where both folds meet is the center of the original sheet. Cutting it through all four layers leaves a single diamond-shaped hole in the middle.",
  },
  {
    id: "p7",
    kind: "ability",
    dimension: "pattern",
    difficulty: 4,
    text: GRID,
    figure: {
      type: "matrix",
      cells: [
        c("circle", "outline", 1), c("circle", "striped", 2), c("circle", "solid", 3),
        c("triangle", "outline", 3), c("triangle", "striped", 1), c("triangle", "solid", 4),
        c("star", "outline", 1), c("star", "striped", 3), null,
      ],
    },
    options: figOpts(
      ["a", c("star", "striped", 4)],
      ["b", c("star", "solid", 2)],
      ["c", c("star", "solid", 3)],
      ["d", c("triangle", "solid", 4)],
      ["e", c("star", "outline", 4)],
      ["f", c("star", "solid", 4)],
    ),
    correct: "f",
    explanation:
      "In each row, the third tile has as many shapes as the first two together (1 + 2 = 3, 3 + 1 = 4). Each column keeps its fill, and the third column is solid. So the gap holds 1 + 3 = 4 solid stars.",
  },
  {
    id: "s6",
    kind: "ability",
    dimension: "spatial",
    difficulty: 4,
    text: "This grid looks exactly the same after a half turn (180°). Which tile completes it?",
    figure: {
      type: "matrix",
      cells: [
        c("triangle", "solid", 1, 45), c("triangle", "outline", 1, 0), c("line", "solid", 1, 45),
        c("triangle", "solid", 1, 90), c("circle", "solid"), c("triangle", "solid", 1, 270),
        c("line", "solid", 1, 45), c("triangle", "outline", 1, 180), null,
      ],
    },
    options: figOpts(
      ["a", c("triangle", "solid", 1, 225)],
      ["b", c("triangle", "solid", 1, 45)],
      ["c", c("triangle", "solid", 1, 135)],
      ["d", c("triangle", "solid", 1, 315)],
      ["e", c("triangle", "outline", 1, 225)],
    ),
    correct: "a",
    explanation:
      "A half turn swaps each tile with the one diagonally opposite and turns it upside down, as with the top and bottom middle triangles. The top-left triangle points up and to the right, so the bottom-right one must point down and to the left, still solid.",
  },

  // ───────────── Difficulty 5 ─────────────
  {
    id: "p8",
    kind: "ability",
    dimension: "pattern",
    difficulty: 5,
    text: GRID,
    figure: {
      type: "matrix",
      cells: [
        c("circle", "solid", 2), c("triangle", "outline", 3), c("diamond", "striped", 1),
        c("triangle", "striped", 1), c("diamond", "solid", 2), c("circle", "outline", 3),
        c("diamond", "outline", 3), c("circle", "striped", 1), null,
      ],
    },
    options: figOpts(
      ["a", c("triangle", "solid", 3)],
      ["b", c("triangle", "solid", 2)],
      ["c", c("triangle", "striped", 2)],
      ["d", c("circle", "solid", 2)],
      ["e", c("triangle", "outline", 2)],
      ["f", c("triangle", "solid", 1)],
    ),
    correct: "b",
    explanation:
      "Shape, fill and number each follow their own rule: every row and every column contains each shape, each fill and each count (1, 2, 3) exactly once. The bottom row and right column are both missing a triangle, a solid fill and two copies.",
  },
  {
    id: "n7",
    kind: "ability",
    dimension: "number",
    difficulty: 5,
    text: "What number comes next? 5, 6, 14, 41, 105, …",
    options: textOpts("169", "205", "210", "225", "230"),
    correct: "e",
    explanation:
      "The gaps are cube numbers: 1, 8, 27, 64 (1×1×1, 2×2×2, 3×3×3, 4×4×4). The next gap is 5×5×5 = 125, and 105 + 125 = 230.",
  },
  {
    id: "v7",
    kind: "ability",
    dimension: "verbal",
    difficulty: 5,
    text: "Seldom is to often as scarce is to …",
    options: textOpts("rare", "costly", "plentiful", "few", "hidden"),
    correct: "c",
    explanation:
      "Seldom means not often, so the first pair are opposites. The opposite of scarce (in short supply) is plentiful; rare and few mean nearly the same as scarce.",
  },
  {
    id: "s7",
    kind: "ability",
    dimension: "spatial",
    difficulty: 5,
    text: "A cube painted on every side is cut into 64 equal small cubes. How many small cubes have at least one painted face?",
    options: textOpts("32", "48", "56", "60", "64"),
    correct: "c",
    explanation:
      "A 64-cube block is 4 small cubes along each edge. Only the hidden inner block of 2 × 2 × 2 = 8 cubes has no paint, so 64 − 8 = 56 cubes show paint.",
  },
  {
    id: "p9",
    kind: "ability",
    dimension: "pattern",
    difficulty: 5,
    text: GRID,
    figure: {
      type: "matrix",
      cells: [
        c("triangle", "solid", 1, 90), c("triangle", "solid", 1, 45), c("triangle", "solid", 1, 135),
        c("triangle", "solid", 1, 45), c("triangle", "solid", 1, 180), c("triangle", "solid", 1, 225),
        c("triangle", "solid", 1, 180), c("triangle", "solid", 1, 90), null,
      ],
    },
    options: figOpts(
      ["a", c("triangle", "solid", 1, 225)],
      ["b", c("triangle", "solid", 1, 90)],
      ["c", c("triangle", "solid", 1, 180)],
      ["d", c("triangle", "solid", 1, 270)],
      ["e", c("triangle", "solid", 1, 135)],
      ["f", c("triangle", "solid", 1, 0)],
    ),
    correct: "d",
    explanation:
      "Read each triangle as a clockwise turn from pointing up. In every row the third turn is the first two added together: 90° + 45° = 135° and 45° + 180° = 225°. In the bottom row, 180° + 90° = 270°, so the triangle points left.",
  },
];
