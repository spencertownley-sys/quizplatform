/** Small helpers for writing RichText without indentation leaking into the copy. */

/** Joins blocks into RichText: paragraphs separated by a blank line. */
export const md = (...blocks: string[]): string => blocks.join("\n\n");

/** One bullet-list block: each item becomes a line starting with "- ". */
export const list = (...items: string[]): string => items.map((i) => `- ${i}`).join("\n");
