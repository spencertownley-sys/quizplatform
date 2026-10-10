import type { Dimension } from "@/lib/engine/types";

/** Three subscales of sensory processing sensitivity. The overall level pools all items (bands on "overall"). */
export const dimensions: Dimension[] = [
  {
    key: "ease_of_excitation",
    label: "Ease of overwhelm",
    low: "Hard to overwhelm",
    high: "Quickly overwhelmed",
    description:
      "How quickly busy days, pressure, change and other people's moods fill you up (called ease of excitation in research).",
    report: {
      low: "Busy days, pressure and change rarely overwhelm you. You can juggle demands, switch plans and spend long stretches in stimulating places without needing much time to recover. That makes you steady in hectic settings and a useful anchor when others feel swamped. Your watch-out is assuming everyone has your capacity, so it helps to check in with people who go quiet when things get busy.",
      mid: "You can handle a fair amount of pressure and stimulation, but you do have a limit. A demanding week or a big change may leave you needing extra rest, while ordinary busy days feel manageable. Your overwhelm likely depends on the mix: one demanding thing is fine, several at once is not. Planning recovery after your busiest days, rather than waiting until you're depleted, keeps you at your best.",
      high: "You fill up quickly when a lot is going on, whether it's noise, deadlines, change or other people's emotions. Busy days that others shrug off can leave you drained, and time pressure may scatter your focus. Research suggests this part of sensitivity is the one most linked to everyday stress, so it is the one most worth managing with deliberate rest, buffers in your schedule and fewer demands at once. It isn't a weakness; it reflects how thoroughly you process what's happening around you.",
    },
  },
  {
    key: "aesthetic_sensitivity",
    label: "Aesthetic sensitivity",
    low: "Matter-of-fact",
    high: "Finely tuned",
    description: "How strongly you notice and are moved by beauty, fine detail and subtle cues in people and places.",
    report: {
      low: "You take in your surroundings in a practical, matter-of-fact way. Small details, subtle moods and artistic touches don't tend to grab your attention, which helps you focus on what's essential. You may find it easier than others to work in plain or messy spaces. If you'd like to grow this side, try slowing down to notice one sensory detail a day.",
      mid: "You notice beauty and subtle details some of the time, especially when you're relaxed or the setting invites it. Music, nature or a well-designed space can move you without being central to your life. You likely pick up on other people's moods when they're clear, and less so when they're subtle. This balance lets you enjoy richness without being distracted by every detail.",
      high: "You notice fine details and are deeply moved by beauty, whether in nature, music, art or the small touches of a well-made space. You often catch subtle shifts in tone, mood or atmosphere that others miss, and you tend to reflect deeply on your experiences. Research suggests this is the part of sensitivity most linked to its rewarding side: richer appreciation, creativity and insight. It can also mean you're bothered by what feels \"off,\" from a crooked picture to an awkward silence.",
    },
  },
  {
    key: "low_sensory_threshold",
    label: "Low sensory threshold",
    low: "Sensory-tolerant",
    high: "Sensory-sensitive",
    description: "How easily noise, light, smells, textures and temperature become uncomfortable for you.",
    report: {
      low: "Your senses are fairly hard to overload. Noise, bright light, strong smells or a slightly uncomfortable room rarely bother you, so you can work and sleep in all kinds of settings. That flexibility is a practical advantage in busy homes, open offices and travel. Just remember that the people around you may not share it, and a small change like turning down music can mean a lot to them.",
      mid: "Some sensory input bothers you, especially when it's intense or goes on for a long time. You might cope with a noisy café for an hour but feel worn down by a whole day of it. Your sensitivity may also rise when you're tired or stressed. Knowing which of your senses is most easily bothered lets you prepare with simple tools, like headphones or a layer you can take off.",
      high: "Your senses pick up a lot, and intense input quickly becomes uncomfortable. Background noise, harsh lighting, strong smells or a room that's a little too warm can grab your attention and make it hard to focus or relax. This isn't fussiness; your nervous system is registering more of the signal. Small changes to your surroundings, like softer light, quiet spaces, earplugs or layers, often make a surprisingly big difference to how you feel.",
    },
  },
];
