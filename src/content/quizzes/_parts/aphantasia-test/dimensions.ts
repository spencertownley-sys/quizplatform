import type { Dimension } from "@/lib/engine/types";

/** The four VVIQ scenes (Marks, 1973), four items each. The outcome comes from bands on the overall total. */
export const dimensions: Dimension[] = [
  {
    key: "person",
    label: "A familiar person",
    low: "Faint or none",
    high: "Vivid",
    description: "How vividly you can picture someone you know well: their face, posture, movement and clothes.",
    report: {
      low: "Picturing the faces and bodies of people you know gives you little or no image. You likely recognize people instantly when you see them, but calling up a face, a posture or an outfit in your mind produces only a faint trace or nothing. Many people with low imagery remember people through facts, voices, personality and shared stories instead. That is a different route to the same familiarity, not a weaker one.",
      mid: "You can picture people you know, but the image is partial or fades quickly. The overall impression may be there while details like the exact shape of a face or the color of a jacket stay blurry. This middle range is common, and it often depends on familiarity, so the people you see every day may be clearer than others. Your memory of people probably mixes images with words, sounds and feelings.",
      high: "You can see people you know clearly in your mind, from the shape of their face to the way they walk and the colors they often wear. That vivid recall can make memories of loved ones feel close and alive. It may also make it easy for you to describe people to others. For some people, it also makes missing someone feel especially sharp.",
    },
  },
  {
    key: "sunrise",
    label: "A sunrise",
    low: "Faint or none",
    high: "Vivid",
    description: "How vividly you can picture light, color and weather changing across the sky.",
    report: {
      low: "Imagining light, color and weather changing in the sky gives you little or no image. You probably know exactly what a sunrise looks like and could describe one in words, but there's no inner picture to watch. Scenes like this, with movement and shifting color, ask a lot of the mind's eye. None of this limits how much you can enjoy a real sky; plenty of people with faint imagery love sunsets in person.",
      mid: "You can picture a sunrise and a changing sky, but the image may be soft, patchy or hard to hold as it changes. Colors may come through more clearly than motion, or the other way round. This is a common pattern in the middle of the spectrum. Focusing on one element at a time, such as the color of the sky, may make the image steadier.",
      high: "You can imagine a sky changing in vivid color and motion, from a hazy dawn to a storm or a rainbow. Changing scenes like this are demanding, so high vividness here suggests a strong, flexible mind's eye. This kind of imagery can make daydreams, stories and music feel cinematic. It may also mean imagined scenes, pleasant or not, feel very real to you.",
    },
  },
  {
    key: "shop",
    label: "A familiar shop",
    low: "Faint or none",
    high: "Vivid",
    description: "How vividly you can picture a familiar place, its details, and a scene unfolding inside it.",
    report: {
      low: "Picturing a familiar place and its details gives you little or no image. You may still know exactly where things are in the shop and how to get there, because knowing a layout and seeing it in your mind are partly separate abilities. Research suggests many people with low imagery keep good spatial memory and find their way around well. The missing picture is about seeing, not knowing.",
      mid: "You can picture a familiar place, but details like the window display, the door or the people inside are partly blurred or come and go. You probably remember the general layout better than the fine visual detail. That's a common, practical form of imagery: enough to find your way, without a photographic image. Paying deliberate attention to details when you're actually there can make later recall clearer.",
      high: "You can picture a familiar place in rich detail, from the window display to the door and the moment of paying at the counter. Your visual memory for places seems strong, which can help with planning, navigating and remembering where things are. Vivid place imagery can also make memories of trips and old homes feel very present. You may also notice quickly when something in a familiar place has changed.",
    },
  },
  {
    key: "countryside",
    label: "A countryside scene",
    low: "Faint or none",
    high: "Vivid",
    description: "How vividly you can picture a landscape, its colors and shapes, and movement like wind and waves.",
    report: {
      low: "Imagining a landscape, its colors and its movement gives you little or no image. You may still feel something when you think about the countryside, even without a picture. Many people with low imagery enjoy nature by being there, through words and through sound rather than through pictures in the mind. That is a valid and complete way of experiencing it.",
      mid: "You can picture a countryside scene, though the image may be soft or unstable, especially when you add movement like wind or waves. Still scenes are often easier to hold than moving ones. Your imagery is likely good enough for daydreams and planning without being photographic. Relaxed moments, like just before sleep, may bring clearer images than trying hard.",
      high: "You can imagine a landscape in vivid color and motion, with trees, water and wind all clear in your mind. This kind of imagery can make mental escapes, like picturing a favorite place to relax, feel very effective. It can be a rich resource for art, writing and calming yourself down. It may also mean you get easily absorbed in imagined scenes.",
    },
  },
];
