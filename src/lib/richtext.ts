/** Splits rich text into paragraphs and bullet lists. A lead-in line directly above bullets stays its own paragraph. */
export function richBlocks(text: string): ({ type: "p"; text: string } | { type: "ul"; items: string[] })[] {
  const blocks: ({ type: "p"; text: string } | { type: "ul"; items: string[] })[] = [];
  for (const para of text.split(/\n\s*\n/)) {
    let prose: string[] = [];
    let list: string[] = [];
    const flushProse = () => {
      if (prose.length) blocks.push({ type: "p", text: prose.join(" ") });
      prose = [];
    };
    const flushList = () => {
      if (list.length) blocks.push({ type: "ul", items: list });
      list = [];
    };
    for (const raw of para.split("\n")) {
      const line = raw.trim();
      if (!line) continue;
      if (line.startsWith("- ")) {
        flushProse();
        list.push(line.slice(2));
      } else {
        flushList();
        prose.push(line);
      }
    }
    flushProse();
    flushList();
  }
  return blocks;
}
