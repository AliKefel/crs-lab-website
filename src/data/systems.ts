export interface SystemType {
  slug: string;
  letter: string;
  title: string;
  summary: string;
}

export const systemTypes: SystemType[] = [
  {
    slug: 'human-robot',
    letter: 'A',
    title: 'Human-Robot Systems',
    summary: 'Modeling humans and making robot decisions that account for a human teammate.',
  },
  {
    slug: 'robot-robot',
    letter: 'B',
    title: 'Robot-Robot Systems',
    summary: 'Coalition formation and coordination for tightly coupled multirobot tasks.',
  },
  {
    slug: 'multi-agent',
    letter: 'C',
    title: 'Multi-Agent Systems',
    summary: 'Task allocation, required cooperation, and distributed pathfinding across agent teams.',
  },
];
