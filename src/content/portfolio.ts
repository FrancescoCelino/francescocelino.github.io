export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  tags: readonly string[];
  visual?: 'age-verification';
  links: { label: string; href: string }[];
  stages: { title: string; description: string }[];
  privacyNote?: string;
}

// Empty contact fields are intentional. Add verified details; never publish placeholders.
export const portfolio = {
  name: 'Francesco Celino',
  role: 'Independent AI engineer & consultant',
  siteUrl: 'https://francescocelino.github.io',
  description:
    'Francesco Celino is an independent AI engineer and consultant building practical machine learning, computer vision, and privacy-aware AI systems. Open to freelance and contract work.',
  email: 'celinofrancesco849@gmail.com',
  linkedin: 'https://www.linkedin.com/in/francesco-celino-a45821257/',
  github: 'https://github.com/francescocelino',
  availability: 'Open to freelance & contract work',
  hero: 'I turn complex AI challenges into practical systems. From the first experiment to inference, integration, and a product people can use.',
  about:
    'I’m Francesco, an independent AI engineer interested in the space between a promising idea and a useful piece of technology. I care about how models behave outside a notebook: the data they receive, the decisions they make, and the systems around them.',
  approach:
    'My approach is hands-on and deliberate. Understand the problem, test the assumptions, and build the simplest system that does the job well.',
  services: [
    {
      title: 'Explore the possibility.',
      category: 'Applied AI & prototypes',
      description:
        'Turn a business or product question into a focused proof of concept. Test what the model can do before committing to a larger build.',
      capabilities: 'Machine learning · Feasibility · Proofs of concept',
    },
    {
      title: 'Make sense of the signal.',
      category: 'Computer vision & privacy-aware AI',
      description:
        'Build systems that interpret visual information, with careful attention to uncertainty, processing constraints, and where sensitive data travels.',
      capabilities: 'Computer vision · Edge AI · Privacy-aware design',
    },
    {
      title: 'Put the model to work.',
      category: 'Inference & integration',
      description:
        'Connect AI capabilities to a usable application. Design the inference path, integrate with existing software, and prepare for deployment.',
      capabilities: 'Inference · Deployment · System integration',
    },
  ],
};

export const projects: readonly Project[] = [
  {
    id: 'maestro',
    visual: 'age-verification',
    title: 'Maestro',
    category: 'Privacy-preserving age verification',
    summary:
      'An AI-powered age-verification system for age-gated products. A focused question: does someone meet the threshold, and when should the system defer?',
    tags: ['Computer vision', 'AI inference', 'Privacy-aware systems'],
    links: [
      {
        label: 'Try the demo',
        href: 'https://francescocelino.github.io/maestro-demo/',
      },
      {
        label: 'View source',
        href: 'https://github.com/francescocelino/maestro-demo',
      },
      {
        label: 'Technical report',
        href: 'https://doi.org/10.5281/zenodo.21509794',
      },
    ],
    stages: [
      {
        title: 'Start with the right question.',
        description:
          'Age-gated products need a threshold decision, not an age displayed on screen. The demo offers 16+, 18+, and 21+ gates, keeping the interaction focused on the access requirement.',
      },
      {
        title: 'Design around real constraints.',
        description:
          'Computer vision is only part of the system. Camera input, inference, privacy boundaries, and the surrounding application all have to work together. The public frontend connects to a separate backend for session processing.',
      },
      {
        title: 'Leave room for uncertainty.',
        description:
          'The result is PASS, FAIL, or ESCALATE. Escalation gives the system a way to defer rather than force a binary decision. No estimated age is shown to the visitor.',
      },
    ],
    privacyNote:
      'The production product is designed for private, on-device processing. The public browser demo sends throttled JPEG frames to a separate production backend for active-session processing; it is not fully on-device.',
  },
];
