import type { ReportSection } from "@/lib/engine/types";

/**
 * Public, well-documented self-descriptions only. Reviewer: verify before publishing
 * (Ross 2016 essay; Catmull 2019 interviews; Tesla, "My Inventions", 1919; Grandin, "Thinking in Pictures", 1995; Galton 1880).
 */
const FAMOUS_CORE = `Aphantasia only got its name in 2015, when neurologist Adam Zeman and colleagues described people who had never been able to form mental images. Since then, several well-known people have described their own experience publicly:

- Blake Ross, co-creator of the Firefox web browser, wrote a widely shared essay in 2016 about realizing, as an adult, that other people could actually see pictures when they imagined things. He had assumed phrases like "picture this" were just figures of speech.
- Ed Catmull, the computer scientist who co-founded Pixar, has spoken publicly about having aphantasia. His story is a striking example of someone without a mind's eye helping to build one of the most visual art forms of our time.

At the other end of the spectrum, some famous thinkers described unusually vivid inner pictures, long before the word hyperphantasia existed:

- Nikola Tesla, the inventor, wrote in his autobiography that he could picture his inventions in such detail that he could build, adjust and run them in his mind before making them.
- Temple Grandin, the animal scientist and author of Thinking in Pictures, has written at length about thinking in detailed images rather than words.

Interest in these differences is much older than the labels. In 1880, Francis Galton asked people to describe how clearly they could picture that morning's breakfast table. He was struck by how much the answers varied, and noted that some respondents, including fellow scientists, reported little or no imagery at all.`;

export function famousSection(title: string, teaser: string, intro: string, outro: string): ReportSection {
  return { title, teaser, body: `${intro}\n\n${FAMOUS_CORE}\n\n${outro}` };
}
