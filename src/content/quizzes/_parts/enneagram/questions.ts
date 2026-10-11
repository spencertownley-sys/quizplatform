import type { Question } from "@/lib/engine/types";

/**
 * 90 scored items + 1 attention check.
 * 9 per type (t1–t9: items _1–_6 forward, _7–_9 reverse-keyed) and 3 per instinct
 * (sp/so/sx: _1–_2 forward, _3 reverse-keyed). 30 of 90 are reverse-keyed.
 * Order: groups of forward, forward, reverse; no two items from the same
 * dimension are adjacent; attention check after item 45.
 */
export const questions: Question[] = [
  // 1–15
  { id: "t5_5", kind: "likert", dimension: "t5", text: "I can get lost for hours in a topic that interests me." },
  { id: "t2_1", kind: "likert", dimension: "t2", text: "I often sense what someone needs before they ask." },
  { id: "t7_7", kind: "likert", dimension: "t7", text: "I'm happy doing the same routine for months on end.", reverse: true },
  { id: "t8_1", kind: "likert", dimension: "t8", text: "I say exactly what I think, even if it starts a conflict." },
  { id: "t1_1", kind: "likert", dimension: "t1", text: "I notice mistakes that other people seem to miss." },
  { id: "t4_7", kind: "likert", dimension: "t4", text: "I'm happy to be ordinary and blend in with the crowd.", reverse: true },
  { id: "t9_1", kind: "likert", dimension: "t9", text: "I go along with other people's plans to keep the peace." },
  { id: "t3_1", kind: "likert", dimension: "t3", text: "I set goals and push hard until I reach them." },
  { id: "t6_7", kind: "likert", dimension: "t6", text: "I rarely worry about what might go wrong.", reverse: true },
  { id: "t7_1", kind: "likert", dimension: "t7", text: "I love having lots of plans and options to look forward to." },
  { id: "sx_1", kind: "likert", dimension: "sx", text: "I'm drawn to intense, one-on-one connections with people." },
  { id: "t1_7", kind: "likert", dimension: "t1", text: "I'm comfortable turning in work that is just good enough.", reverse: true },
  { id: "t4_3", kind: "likert", dimension: "t4", text: "I feel emotions more deeply than most people around me." },
  { id: "t6_1", kind: "likert", dimension: "t6", text: "Before I commit, I think through what could go wrong." },
  { id: "t9_7", kind: "likert", dimension: "t9", text: "I know exactly what I want and say so right away.", reverse: true },

  // 16–30
  { id: "t2_2", kind: "likert", dimension: "t2", text: "Being needed by others makes me feel worthwhile." },
  { id: "t8_2", kind: "likert", dimension: "t8", text: "I step in to protect people who can't stand up for themselves." },
  { id: "t5_7", kind: "likert", dimension: "t5", text: "I share personal details easily, even with people I just met.", reverse: true },
  { id: "t1_2", kind: "likert", dimension: "t1", text: "A strict inner voice points out when I fall short." },
  { id: "t3_2", kind: "likert", dimension: "t3", text: "I adjust how I come across depending on who I'm with." },
  { id: "t2_7", kind: "likert", dimension: "t2", text: "I rarely put other people's needs ahead of my own.", reverse: true },
  { id: "t6_2", kind: "likert", dimension: "t6", text: "I'm deeply loyal to the people and groups I trust." },
  { id: "sp_1", kind: "likert", dimension: "sp", text: "Keeping my home, money and health secure is a top priority." },
  { id: "t3_7", kind: "likert", dimension: "t3", text: "Status and recognition mean very little to me.", reverse: true },
  { id: "t5_2", kind: "likert", dimension: "t5", text: "I need plenty of time alone to recharge." },
  { id: "t9_6", kind: "likert", dimension: "t9", text: "People often tell me I'm easygoing and calming to be around." },
  { id: "t8_7", kind: "likert", dimension: "t8", text: "I usually back down from arguments, even when I'm right.", reverse: true },
  { id: "t4_1", kind: "likert", dimension: "t4", text: "I often feel that something important is missing from my life." },
  { id: "t7_2", kind: "likert", dimension: "t7", text: "I get bored quickly once something stops being new." },
  { id: "t1_8", kind: "likert", dimension: "t1", text: "Sloppy or messy results rarely bother me.", reverse: true },

  // 31–45
  { id: "t3_3", kind: "likert", dimension: "t3", text: "Being seen as successful matters a lot to me." },
  { id: "so_1", kind: "likert", dimension: "so", text: "I pay close attention to where I stand in a group." },
  { id: "t6_8", kind: "likert", dimension: "t6", text: "I trust new people completely, right from the start.", reverse: true },
  { id: "t2_3", kind: "likert", dimension: "t2", text: "Giving help comes much easier to me than asking for it." },
  { id: "t5_3", kind: "likert", dimension: "t5", text: "I'd rather watch and learn first than jump right in." },
  { id: "t4_8", kind: "likert", dimension: "t4", text: "I don't spend much time thinking about my feelings.", reverse: true },
  { id: "t9_2", kind: "likert", dimension: "t9", text: "I lose track of what I want when others have strong opinions." },
  { id: "t8_3", kind: "likert", dimension: "t8", text: "I don't like anyone having control over me." },
  { id: "t7_8", kind: "likert", dimension: "t7", text: "I can stay with painful feelings without rushing to cheer up.", reverse: true },
  { id: "t1_3", kind: "likert", dimension: "t1", text: "It bothers me when people cut corners or bend the rules." },
  { id: "t6_3", kind: "likert", dimension: "t6", text: "I second-guess my decisions, even after I've made them." },
  { id: "t2_8", kind: "likert", dimension: "t2", text: "Whether people see me as caring doesn't matter much to me.", reverse: true },
  { id: "t4_2", kind: "likert", dimension: "t4", text: "I'd rather be true to myself than fit in." },
  { id: "t3_4", kind: "likert", dimension: "t3", text: "I feel restless when I'm not making progress on something." },
  { id: "t9_8", kind: "likert", dimension: "t9", text: "I don't mind stirring things up when I disagree.", reverse: true },

  { id: "check", kind: "attention", text: "To show you're reading, choose \"Agree\" for this one.", expect: 4 },

  // 46–60
  { id: "t5_1", kind: "likert", dimension: "t5", text: "I like to fully understand something before I try it." },
  { id: "sx_2", kind: "likert", dimension: "sx", text: "I need a strong spark with someone to feel truly engaged." },
  { id: "t8_8", kind: "likert", dimension: "t8", text: "I'm comfortable letting others make the big decisions.", reverse: true },
  { id: "t7_3", kind: "likert", dimension: "t7", text: "When something sad happens, I quickly look for the bright side." },
  { id: "t1_4", kind: "likert", dimension: "t1", text: "I hold myself to high standards, even on small tasks." },
  { id: "t3_8", kind: "likert", dimension: "t3", text: "I'm happy to spend a whole day getting nothing done.", reverse: true },
  { id: "t2_4", kind: "likert", dimension: "t2", text: "I go out of my way to make people feel cared for." },
  { id: "t6_4", kind: "likert", dimension: "t6", text: "I like to have a backup plan, just in case." },
  { id: "t5_8", kind: "likert", dimension: "t5", text: "I happily give my time and energy to anyone who asks.", reverse: true },
  { id: "t8_4", kind: "likert", dimension: "t8", text: "I take charge when nobody else will." },
  { id: "t9_3", kind: "likert", dimension: "t9", text: "I put off important tasks by doing small, easy ones instead." },
  { id: "sx_3", kind: "likert", dimension: "sx", text: "I prefer my close relationships calm and low-key rather than intense.", reverse: true },
  { id: "t4_4", kind: "likert", dimension: "t4", text: "I'm drawn to music, art or places that match my mood." },
  { id: "t7_4", kind: "likert", dimension: "t7", text: "I hate feeling tied down or boxed in." },
  { id: "t6_9", kind: "likert", dimension: "t6", text: "I make big decisions quickly and don't look back.", reverse: true },

  // 61–75
  { id: "t3_5", kind: "likert", dimension: "t3", text: "I like to keep track of my wins and achievements." },
  { id: "t5_4", kind: "likert", dimension: "t5", text: "I guard my time, energy and privacy carefully." },
  { id: "t1_9", kind: "likert", dimension: "t1", text: "I seldom criticize myself over small mistakes.", reverse: true },
  { id: "t9_4", kind: "likert", dimension: "t9", text: "I can usually see every side of an argument." },
  { id: "so_2", kind: "likert", dimension: "so", text: "I enjoy being part of something bigger, like a team or community." },
  { id: "t2_9", kind: "likert", dimension: "t2", text: "I ask for help easily whenever I need it.", reverse: true },
  { id: "t1_5", kind: "likert", dimension: "t1", text: "I find it hard to relax when a job isn't done properly." },
  { id: "t8_5", kind: "likert", dimension: "t8", text: "Showing weakness feels risky to me." },
  { id: "t4_9", kind: "likert", dimension: "t4", text: "My moods stay pretty steady from day to day.", reverse: true },
  { id: "t6_5", kind: "likert", dimension: "t6", text: "I test people a little before I fully trust them." },
  { id: "t2_5", kind: "likert", dimension: "t2", text: "I feel hurt when my kindness goes unnoticed." },
  { id: "t7_9", kind: "likert", dimension: "t7", text: "I rarely feel like I'm missing out on something more fun.", reverse: true },
  { id: "t5_6", kind: "likert", dimension: "t5", text: "I keep my needs small so I don't have to depend on anyone." },
  { id: "sp_2", kind: "likert", dimension: "sp", text: "I feel uneasy when my savings or supplies start running low." },
  { id: "t9_9", kind: "likert", dimension: "t9", text: "I rarely put off the things that matter to me.", reverse: true },

  // 76–90
  { id: "t3_6", kind: "likert", dimension: "t3", text: "I can set my feelings aside to get a job done." },
  { id: "t4_5", kind: "likert", dimension: "t4", text: "I sometimes feel that nobody truly understands me." },
  { id: "t8_9", kind: "likert", dimension: "t8", text: "I find it easy to let people see my soft side.", reverse: true },
  { id: "t7_5", kind: "likert", dimension: "t7", text: "My mind jumps from one exciting idea to the next." },
  { id: "t1_6", kind: "likert", dimension: "t1", text: "I try to do the right thing even when no one would ever know." },
  { id: "so_3", kind: "likert", dimension: "so", text: "Group dynamics and social roles don't interest me much.", reverse: true },
  { id: "t9_5", kind: "likert", dimension: "t9", text: "When tension rises, I tend to tune out or change the subject." },
  { id: "t6_6", kind: "likert", dimension: "t6", text: "When I'm unsure, I look for advice from someone I trust." },
  { id: "t5_9", kind: "likert", dimension: "t5", text: "Long days around lots of people still leave me with energy to spare.", reverse: true },
  { id: "t2_6", kind: "likert", dimension: "t2", text: "I say yes to helping, even when I'm already worn out." },
  { id: "t8_6", kind: "likert", dimension: "t8", text: "I respect people more when they push back on me." },
  { id: "t3_9", kind: "likert", dimension: "t3", text: "I rarely think about the impression I'm making on others.", reverse: true },
  { id: "t4_6", kind: "likert", dimension: "t4", text: "I can find a strange comfort in sad or bittersweet feelings." },
  { id: "t7_6", kind: "likert", dimension: "t7", text: "I'd rather try many things than master just one." },
  { id: "sp_3", kind: "likert", dimension: "sp", text: "I often forget about practical basics like meals, sleep or bills.", reverse: true },
];
