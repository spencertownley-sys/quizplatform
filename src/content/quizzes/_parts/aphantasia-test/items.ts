import type { Question } from "@/lib/engine/types";

/**
 * 16 items following the public VVIQ structure (Marks, 1973): four scenes, four items each,
 * in the VVIQ's order. Wording is our own, and each item names its scene so it stands alone.
 * Rated on VIVIDNESS_5 (1 = no image, 5 = as vivid as real seeing). No reverse keying.
 */
export const questions: Question[] = [
  // A familiar person
  { id: "v1", kind: "likert", dimension: "person", text: "Picture someone you know well. How clear is the exact shape of their face?" },
  { id: "v2", kind: "likert", dimension: "person", text: "Picture someone you know well standing still. How clear is the way they usually hold their head and body?" },
  { id: "v3", kind: "likert", dimension: "person", text: "Imagine someone you know well walking toward you. How clear is the way they move?" },
  { id: "v4", kind: "likert", dimension: "person", text: "Picture someone you know well in clothes they often wear. How clear are the colors?" },
  // A sunrise
  { id: "v5", kind: "likert", dimension: "sunrise", text: "Imagine the sun rising above the horizon into a hazy sky. How clear is the image?" },
  { id: "v6", kind: "likert", dimension: "sunrise", text: "Imagine the haze clearing and blue sky opening up around the rising sun. How vivid is it?" },
  { id: "v7", kind: "likert", dimension: "sunrise", text: "Imagine clouds rolling in and lightning flashing across a darkening sky. How clear is the scene?" },
  { id: "v8", kind: "likert", dimension: "sunrise", text: "Picture a rainbow appearing in the sky after a storm. How vivid are its colors?" },
  // A familiar shop
  { id: "v9", kind: "likert", dimension: "shop", text: "Picture a shop you often visit, seen from across the street. How clear is it?" },
  { id: "v10", kind: "likert", dimension: "shop", text: "Picture the window display of a shop you know well. How clear are the individual items?" },
  { id: "v11", kind: "likert", dimension: "shop", text: "Imagine standing at the entrance of a familiar shop. How clear are the door's color and details?" },
  { id: "v12", kind: "likert", dimension: "shop", text: "Picture yourself paying at the counter of a familiar shop. How clear is the scene?" },
  // A countryside scene
  { id: "v13", kind: "likert", dimension: "countryside", text: "Picture a countryside scene with hills and fields. How clear is the shape of the land?" },
  { id: "v14", kind: "likert", dimension: "countryside", text: "Picture the trees in a countryside scene. How clear are their colors and shapes?" },
  { id: "v15", kind: "likert", dimension: "countryside", text: "Picture a lake in the countryside. How clear are its color and shape?" },
  { id: "v16", kind: "likert", dimension: "countryside", text: "Imagine a strong wind bending the trees and making waves on a lake. How vivid is it?" },
];
