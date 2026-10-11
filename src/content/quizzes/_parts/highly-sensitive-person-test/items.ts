import type { Question } from "@/lib/engine/types";

/**
 * 27 ORIGINAL items, in the order shown. Written for this site; none reuses the wording of the
 * copyrighted HSP Scale (Aron & Aron, 1997). 11 ease of overwhelm, 8 aesthetic, 8 sensory.
 * 8 of 27 (30%) are reverse-keyed.
 */
const EOE = "ease_of_excitation";
const AES = "aesthetic_sensitivity";
const LST = "low_sensory_threshold";

export const questions: Question[] = [
  { id: "hs1", kind: "likert", dimension: EOE, text: "Loud, busy places wear me out sooner than they do most people." },
  { id: "hs2", kind: "likert", dimension: AES, text: "I notice small details, like a picture hanging slightly crooked." },
  { id: "hs3", kind: "likert", dimension: LST, text: "I notice a ticking clock or humming fridge that others tune out." },
  { id: "hs4", kind: "likert", dimension: EOE, text: "A day full of plans leaves me drained, even if I enjoyed it." },
  { id: "hs5", kind: "likert", dimension: AES, text: "A beautiful view can stop me in my tracks." },
  { id: "hs6", kind: "likert", dimension: EOE, text: "A hectic day rarely leaves me needing time to recover.", reverse: true },
  { id: "hs7", kind: "likert", dimension: LST, text: "Strong perfume in a small space quickly gives me a headache." },
  { id: "hs8", kind: "likert", dimension: EOE, text: "Juggling lots of small tasks at once scrambles my thinking." },
  { id: "hs9", kind: "likert", dimension: AES, text: "Music, art and nature rarely give me goosebumps.", reverse: true },
  { id: "hs10", kind: "likert", dimension: LST, text: "I can sleep easily with light or noise around me.", reverse: true },
  { id: "hs11", kind: "likert", dimension: EOE, text: "Rushing to meet a deadline makes me clumsy and scattered." },
  { id: "hs12", kind: "likert", dimension: AES, text: "I care a lot about how the spaces I live in look and feel." },
  { id: "hs13", kind: "likert", dimension: EOE, text: "Even good changes, like moving or starting a new school, take me a while to settle into." },
  { id: "hs14", kind: "likert", dimension: LST, text: "I barely notice the lighting or temperature of a room.", reverse: true },
  { id: "hs15", kind: "likert", dimension: EOE, text: "Sudden changes of plan don't bother me much.", reverse: true },
  { id: "hs16", kind: "likert", dimension: AES, text: "I often notice when someone has a new haircut or glasses." },
  { id: "hs17", kind: "likert", dimension: LST, text: "Background chatter makes it hard for me to concentrate." },
  { id: "hs18", kind: "likert", dimension: EOE, text: "A tense mood in a room stays with me for hours afterward." },
  { id: "hs19", kind: "likert", dimension: AES, text: "I tend to think deeply about things others brush off." },
  { id: "hs20", kind: "likert", dimension: LST, text: "Crowded, noisy shops don't really bother me.", reverse: true },
  { id: "hs21", kind: "likert", dimension: EOE, text: "I need more downtime than my friends to feel like myself." },
  { id: "hs22", kind: "likert", dimension: AES, text: "I don't spend much time reflecting on my experiences.", reverse: true },
  { id: "hs23", kind: "likert", dimension: LST, text: "I'm uncomfortable when a room is even a little too hot or cold." },
  { id: "hs24", kind: "likert", dimension: EOE, text: "I leave empty space in my week on purpose so I don't burn out." },
  { id: "hs25", kind: "likert", dimension: AES, text: "I can tell how someone really feels from small changes in their voice." },
  { id: "hs26", kind: "likert", dimension: LST, text: "I switch off bright overhead lights whenever I can." },
  { id: "hs27", kind: "likert", dimension: EOE, text: "Pressure helps me focus rather than throwing me off.", reverse: true },
];
