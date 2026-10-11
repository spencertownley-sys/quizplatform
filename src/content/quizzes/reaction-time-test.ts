import type { QuizDefinition } from "@/lib/engine/types";

/** Normalized speed for a median in ms: (450 − ms) / 300, matching the engine's formula. */
const atMs = (ms: number) => (450 - ms) / 300;

const quiz: QuizDefinition = {
  slug: "reaction-time-test",
  n: 46,
  title: "Reaction Time Test",
  tagline: "How fast do you react? Five quick tries and an honest result.",
  category: "Brain",
  structure: "performance",
  description:
    "Test your reaction time in under a minute: five tries, your median in milliseconds, and honest context on device lag. Free, no sign-up.",
  disclaimer:
    "A quick, free measure of simple visual reaction time on your device. Results include your device's own input and display lag, and this isn't a medical or driving-fitness test.",
  method: `You get five trials. In each one, wait for the signal, then click or tap as fast as you can. A response faster than 100 ms is treated as a guess (people can't truly react to a visual signal that quickly), and one slower than 1.5 seconds as a distraction; both are dropped. At least three valid trials are needed. Your result is the median, the middle value, so one lucky or sluggish tap doesn't decide it.

The time we record isn't only your nervous system. It also includes your screen's refresh delay, the browser's processing, and input lag from your mouse, keyboard or touchscreen. Together these often add several tens of milliseconds, and more on many phones and wireless devices. That's why our bands are set for web tests, where roughly 250 to 300 ms is typical, rather than for laboratory equipment.

Your result is a snapshot. Sleep, alertness, practice, age and caffeine all move reaction time, so try a few sessions on the same device before drawing conclusions.`,
  minutes: 1,
  paywall: "free_headline",
  sellsReports: false,
  minAge: 13,
  status: "draft",
  dimensions: [
    {
      key: "speed",
      label: "Speed",
      low: "Slower",
      high: "Faster",
      description: "How quickly you respond to a simple visual signal, based on your median trial.",
      report: {
        low: "Your median reaction time was on the slower side, above about 345 milliseconds with device lag included. On a web test, a result like this often reflects the device as much as the person: phones, wireless mice and busy browsers can add noticeable delay. Tiredness, distraction, waiting to be sure before responding, and age also slow simple reactions. Try again when rested, on a computer with a wired mouse, with notifications off, and compare.",
        mid: "Your median reaction time was in the everyday range for web tests, roughly 255 to 345 milliseconds with device lag included. Most of that time is the unavoidable chain of seeing, deciding and moving, plus a slice added by your screen and input device. Small changes in alertness, posture and setup can move you a few tens of milliseconds either way. Try a computer with a wired mouse instead of a phone to see how much your hardware is adding.",
        high: "Your median reaction time was quick, faster than about 255 milliseconds with device lag included. Your eyes, brain, hand and hardware together turned a signal into a click very efficiently. Fast, consistent responses like this usually go with being alert, rested and ready for the signal. If you want to keep that edge, protect your sleep, since sleep loss is one of the most reliable ways to slow reactions down.",
      },
    },
  ],
  questions: [],
  outcomes: [
    {
      key: "lightning",
      name: "Lightning Fast",
      tagline: "A median of 200 ms or less, device lag included. Seriously quick.",
      emoji: "⚡",
      summary:
        "Your median reaction time was 200 milliseconds or faster, even with your device's lag included. That's very fast for a web test. It suggests you were alert, focused and on responsive hardware.",
      about: `Lightning Fast is the top band of our reaction time test: a median of 200 milliseconds or less across five trials, measured in a web browser with the device's own lag included.

Simple reaction time is the delay between a signal appearing and your response. In that fraction of a second, light reaches the eye, the visual system detects the change, the brain triggers a movement, and a finger presses. On a web test, the screen's refresh, the browser and the input device add their own delay on top.

Reaching 200 ms or faster under those conditions usually takes several things at once: high alertness, steady focus, a finger already resting on the button, and a responsive setup such as a computer with a wired mouse. Practice with fast-paced games or sports can help, because it trains exactly this kind of see-and-respond loop.

A very fast median can also include some anticipation. Responses under 100 ms are discarded as guesses, but getting into a rhythm can still shave off a few milliseconds. That's one reason the test uses the median of several trials rather than the single best one.

Reaction time varies from day to day with sleep, caffeine, stress and practice. A Lightning Fast result is a snapshot of one session, not a fixed trait, and it says nothing about intelligence, health or driving ability.`,
      snapshot: [
        "Retest on the same device to see whether your speed is consistent.",
        "Don't jump the gun: responses under 100 ms are thrown out as guesses.",
        "Protect your sleep; tiredness is the quickest way to lose speed.",
      ],
      deep: [],
    },
    {
      key: "quick",
      name: "Quick Reflexes",
      tagline: "A median of 201 to 250 ms: on the quick side for a web test.",
      emoji: "🏃",
      summary:
        "Your median reaction time was between 201 and 250 milliseconds, device lag included. That's on the quick side for a web test, where results around 250 to 300 ms are common. You were likely alert and focused, on a fairly responsive device.",
      about: `Quick Reflexes is the second of five bands on our reaction time test: a median between 201 and 250 milliseconds across five trials, measured in a web browser with the device's own lag included.

That's on the fast side for a web test, where medians around 250 to 300 ms are common. Getting there usually means you were alert and focused, kept a finger ready, and used a reasonably responsive device. A computer with a wired mouse or keyboard typically adds less delay than a phone or a wireless setup.

Simple reaction time is a chain: your eyes detect the change, your brain recognizes it as the signal, and a command travels to your hand. Most of that chain is quick and automatic, but alertness and readiness make a real difference. Being rested, warmed up and free from distractions all help, and practice with fast-response activities such as games or sports can trim the time further.

Because the test uses the median rather than your best trial, one lucky tap doesn't decide the band, and one slow trial doesn't ruin it. Results still shift from day to day, so a few sessions on the same device give the clearest picture.

A Quick Reflexes result is a snapshot of one session on one device. It isn't a measure of intelligence, health or driving ability.`,
      snapshot: [
        "Rest a finger on the button so no time is lost moving it.",
        "Test at the time of day when you feel most alert.",
        "Compare medians across sessions on the same device.",
      ],
      deep: [],
    },
    {
      key: "everyday",
      name: "Everyday Speed",
      tagline: "A median of 251 to 300 ms, right in the usual web-test range.",
      emoji: "⏱️",
      summary:
        "Your median reaction time was between 251 and 300 milliseconds, device lag included. That's right in the range many people get on web reaction tests. Your eyes, brain, hand and hardware are working at an everyday pace.",
      about: `Everyday Speed is the middle band of our reaction time test: a median between 251 and 300 milliseconds across five trials, measured in a web browser with the device's own lag included.

This is the range many people land in on web reaction tests. It reflects the normal speed of the see-decide-move chain plus a slice of delay from the screen, the browser and the input device. In a lab, with equipment that adds almost no lag, the same person would usually record a faster time, which is why web results shouldn't be compared with lab figures.

Within this band, small things move the number. Testing on a computer with a wired mouse rather than a phone often trims the result. So do sitting comfortably with a finger resting on the button, closing other tabs, and taking the test when you're alert rather than tired. Practice helps a little too, mainly by making you more ready for the signal.

The test uses the median of your valid trials, so it reflects your typical response rather than one lucky or slow tap. Tracking the median across several sessions on the same device is the best way to see real change.

An Everyday Speed result is a snapshot of one session. It doesn't measure intelligence, health or driving ability.`,
      snapshot: [
        "Try a computer with a wired mouse to cut device lag.",
        "Close other tabs and silence notifications before you start.",
        "Take the test a few times and track your median.",
      ],
      deep: [],
    },
    {
      key: "steady",
      name: "Steady Pace",
      tagline: "A median of 301 to 375 ms. Your setup may be adding delay.",
      emoji: "🚶",
      summary:
        "Your median reaction time was between 301 and 375 milliseconds, device lag included. That's a little slower than the most common web-test range, and on phones or wireless devices the hardware is often part of the reason. Try again on a computer with a wired mouse to see the difference.",
      about: `Steady Pace is the fourth of five bands on our reaction time test: a median between 301 and 375 milliseconds across five trials, measured in a web browser with the device's own lag included.

A result in this range is very often about the setup rather than the person. Phones and tablets add delay while the touchscreen registers a tap, and wireless mice and keyboards, power-saving modes, older screens and busy browsers can all add more. Taken together, the hardware can account for a meaningful part of the gap between this band and faster ones.

The person side matters too. Tiredness, distraction, waiting to be sure before responding, a finger hovering instead of resting on the button, and simple unfamiliarity with the task all slow reactions. Simple reaction time also tends to slow gradually with age, which is a normal part of getting older.

The most useful next step is a fair retest. Use a computer with a wired mouse if you can, close other apps and tabs, rest a finger on the button, and test when you're alert. If your median drops noticeably, the difference was largely your setup.

A Steady Pace result is a snapshot of one session. It doesn't measure intelligence, health or driving ability, and it can't diagnose anything.`,
      snapshot: [
        "Retest on a computer with a wired mouse if you can.",
        "Rest your finger on the button, ready to press.",
        "Test when rested; sleep loss slows reactions.",
      ],
      deep: [],
    },
    {
      key: "unhurried",
      name: "Unhurried",
      tagline: "A median over 375 ms. Worth a retest on a faster setup.",
      emoji: "🐢",
      summary:
        "Your median reaction time was slower than 375 milliseconds, device lag included. A result like this most often comes from the setup (a phone, a slow browser, a wireless mouse) or from tiredness and distraction. Retest when rested, on a computer, with notifications off.",
      about: `Unhurried is the fifth of our reaction time bands: a median slower than 375 milliseconds across five trials, measured in a web browser with the device's own lag included.

Results this slow on a web test most often come from the conditions. A phone in power-saving mode, a slow or busy browser, a wireless mouse with a weak connection, or glancing at another screen can each add a lot. Some people also wait to be certain before they respond, which is a sensible instinct in everyday life but costs time on a pure speed test.

Personal factors play a part as well. Sleep loss, fatigue, alcohol, some medicines, cold hands and simply not being warmed up can all slow simple reactions, and reaction time tends to slow gradually with age.

Before reading much into this band, retest under fair conditions: a computer with a wired mouse if possible, other apps closed, a finger resting on the button, and a time of day when you feel alert. If your median drops a lot, the setup was a big part of the story.

One slow session isn't a sign of a health problem. But if you notice your reactions, coordination or alertness changing in daily life, that's worth mentioning to a doctor. This test can't diagnose anything.`,
      snapshot: [
        "Retest on a computer with a wired mouse, other apps closed.",
        "Respond as soon as you see the signal, without double-checking.",
        "If reactions feel slower in daily life, mention it to a doctor.",
      ],
      deep: [],
    },
  ],
  // Cut points on the normalized speed score; each min is the boundary median in ms.
  // ≤200 lightning · 201–250 quick · 251–300 everyday · 301–375 steady · >375 unhurried.
  bands: {
    on: { dimension: "speed" },
    bands: [
      { min: 0, outcome: "unhurried" },
      { min: atMs(375), outcome: "steady" },
      { min: atMs(300), outcome: "everyday" },
      { min: atMs(250), outcome: "quick" },
      { min: atMs(200), outcome: "lightning" },
    ],
  },
  performance: { task: "reaction_time", trials: 5, validMs: [100, 1500], reference: { fast: 150, slow: 450 }, minValid: 3 },
  seo: {
    intro: `How fast do you react? This free reaction time test takes under a minute: wait for the signal, then click or tap as fast as you can, five times. You get your median time in milliseconds, your fastest valid trial and a plain-language band, with no sign-up and nothing to buy. We also tell you the part most reaction tests leave out: your device adds its own delay. Screens, browsers, mice and touchscreens all add milliseconds, so we set our bands for real web conditions and show you how to get a fairer reading.`,
    measures: `The test measures simple visual reaction time: how long it takes you to respond to one expected signal with one movement. There's no choice to make, so the result mostly reflects how quickly you notice the change and start moving, plus your setup's lag. The signal appears after an unpredictable wait so you can't time it, and any response under 100 ms is treated as a guess and dropped.

We use the median of your valid trials, not the best one or the average. The median ignores a single lucky or sleepy trial, which makes it a steadier measure of your speed today. Your result shows the median in milliseconds, your best valid trial, and one of five bands, from Lightning Fast (200 ms or faster) to Unhurried (slower than 375 ms). On web tests, results around 250 to 300 ms are common.

What it doesn't measure: choice reaction time (picking between several responses), how well you track moving objects, or real-world skills such as driving, which depend on attention, judgment and experience far more than raw speed. It also can't separate your own speed from your device's lag. For the fairest comparison over time, use the same device, browser and setup each time. All-Access subscribers can save results and see their history across sessions.`,
    origin: `Reaction time is one of the oldest measurements in psychology. Around 1850, Hermann von Helmholtz timed nerve signals and showed they travel at a measurable speed. In 1868, the Dutch physiologist Franciscus Donders compared simple reactions with reactions that required a choice, and used the difference to estimate how long a mental decision takes, an approach later called mental chronometry. In the 1880s, Francis Galton timed thousands of visitors at his laboratory in London.

Laboratory equipment measures to the millisecond with almost no lag. A web browser can't. Screens refresh at fixed intervals, browsers handle input and drawing in steps, and touchscreens need time to register a tap. That's why web results run slower than lab results, and why your result is best compared with your own past results on the same device rather than with numbers measured elsewhere.`,
    faqs: [
      {
        q: "What is a good reaction time?",
        a: "On web tests like this one, with device lag included, results around 250 to 300 ms are common, and anything at or under 200 ms is very fast. Lab equipment adds almost no lag and records faster times, so don't compare your result with lab figures. The most useful comparison is with yourself: take the test a few times on the same device and see where your median usually lands. A shift of a few milliseconds is noise; a steady change across several sessions means more.",
      },
      {
        q: "What affects reaction time?",
        a: "Alertness is a big one: sleep loss, fatigue and alcohol slow reactions, while being rested and focused helps. Caffeine can help a little. Practice with fast games or sports helps, and so does knowing when a signal is likely to appear. Age plays a part too, as simple reaction time tends to slow gradually through adulthood. Distractions, cold hands, stress and some medicines can add delay, and so can your device.",
      },
      {
        q: "Why is my reaction time slower on a phone?",
        a: "Phones add delay at several points. A touchscreen has to sense your finger, filter out accidental touches and pass the tap to the browser, and some browsers wait briefly to tell a tap from a scroll. The screen also refreshes at fixed intervals, and power-saving modes can slow things further. Together this can add tens of milliseconds compared with a computer and a wired mouse, so your phone result may understate how fast you really are.",
      },
      {
        q: "How can I improve my reaction time?",
        a: "Start with the basics: sleep well, test when you're alert and remove distractions. Practice helps too, since short sessions of reaction drills or fast-paced games train the see-and-respond loop, though gains are usually modest. Keep your hands warm and rest a finger lightly on the button so there's no wasted movement. To measure progress fairly, always use the same device and setup, and look at your median over several sessions rather than one best try.",
      },
      {
        q: "Why do you use the median instead of my best time?",
        a: "Your best single trial is partly luck: a well-timed guess can look like an impossibly fast reaction. The average gets dragged around by one slow, distracted trial. The median, the middle value of your valid trials, ignores both extremes, so it gives a steadier picture of how fast you are right now. We still show your best valid trial because it's fun to know, but your band is based on the median.",
      },
      {
        q: "Is this a test of brain health or driving ability?",
        a: "No. It's a quick measure of simple reaction time on your device, and many harmless things, like a slow phone or a bad night's sleep, can change it. It can't diagnose anything, and safe driving depends on attention, judgment and experience far more than on raw speed. If you notice your reactions, coordination or alertness changing in daily life, that's worth mentioning to a doctor.",
      },
    ],
    keywords: ["reaction time test"],
  },
  related: ["iq-test", "aphantasia-test"],
  reviewNotes: `Free tool (sellsReports: false); outcomes have no Deep sections. Copy says All-Access subscribers can save results and see history; confirm that feature ships with this quiz.

Band cut points (median ms, device lag included): ≤200 Lightning Fast, 201–250 Quick Reflexes, 251–300 Everyday Speed, 301–375 Steady Pace, >375 Unhurried. These are descriptive, set around the commonly seen 250–300 ms range for web tests; they are not norms. No percentiles until ~1,000 takers.

The dimension report bands use the engine's fixed thresholds (low < 0.35 ≈ slower than 345 ms; high > 0.65 ≈ faster than 255 ms), so they don't line up exactly with the five outcome bands; the copy states the ms ranges.

Copy assumes an unpredictable wait before the signal (src/components/ReactionTest.tsx uses 1.5–4.5 s: matches) and that the result page shows the median in ms and the best valid trial. The engine returns both (total, extras.best), but the result page didn't display them when this was written; please confirm before publishing. Copy says "wait for the signal" rather than naming a color, so it stays correct if the runner's colors change. Device-lag and phone-latency claims are kept general ("tens of milliseconds") on purpose.`,
};

export default quiz;
