export interface ResearchThrust {
  slug: string;
  number: string;
  title: string;
  summary: string;
  description: string;
}

export const researchThrusts: ResearchThrust[] = [
  {
    slug: 'perception',
    number: '01',
    title: 'Perception and Modeling',
    summary:
      'Reading human mental and emotional state from limited, noisy signal to support collaboration.',
    description:
      'The lab builds perception methods aimed at inferring human mental and emotional states for collaborative robotics, going beyond conventional computer vision. This includes designing model representations of human behavior and cognitive state that remain trainable on datasets that are small, noisy, or incomplete — the kind of data collaborative settings actually produce.',
  },
  {
    slug: 'decision-making',
    number: '02',
    title: 'Decision Making',
    summary: "Action selection that accounts for a human teammate's physical and mental state.",
    description:
      "We develop decision-making and planning systems that weigh a human teammate's physical and mental condition when selecting robot actions. A central goal is interpretability: robot behavior should read as legible and unobtrusive to the people working alongside it, which shapes our work on human-aware planning and decision modules.",
  },
  {
    slug: 'learning',
    number: '03',
    title: 'Learning and Adaptation',
    summary: 'Mutual learning between robot and human teammates over sustained collaboration.',
    description:
      'This thrust studies how robots can learn human preferences and adapt to them during collaborative work, while accounting for the fact that humans adapt in turn. The aim is mutual learning techniques that support fluent, long-term interaction between robotic and human teammates rather than one-shot preference inference.',
  },
  {
    slug: 'communication',
    number: '04',
    title: 'Communication',
    summary: 'Minimal, context-sensitive communication channels between robots and people.',
    description:
      'We investigate communication modalities beyond conventional interfaces, asking what information actually needs to be conveyed between robot and human teammates. The lab explores minimal, context-sensitive communication strategies that stay human-aware without overloading the interaction.',
  },
];
