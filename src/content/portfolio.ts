export interface PortfolioLink {
  label: string;
  href: string;
}

export interface ContactDetails {
  email: string;
  linkedin: string;
  github: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  tags: readonly string[];
  visual?: 'age-verification';
  links: PortfolioLink[];
  stages: { title: string; description: string }[];
  privacyNote?: string;
}

export interface ResearchWork {
  id: string;
  title: string;
  category: string;
  contribution: string;
  context: string;
  methods: readonly string[];
  publication: {
    title: string;
    journal: string;
    year: number;
    authorship: string;
    href: string;
  };
  schematic: {
    observed: string;
    model: string;
    forecast: string;
    caption: string;
  };
}

export interface LabParticipation {
  id: string;
  name: string;
  relationship: string;
  description: string;
  focus: readonly string[];
  links: readonly PortfolioLink[];
}

// These contact details are public. Empty fields are omitted by the UI.
export const portfolio = {
  name: 'Francesco Celino',
  role: 'AI engineer',
  pageTitle: 'Francesco Celino — AI Engineer',
  sharingLines: ['Computer vision, forecasting,', 'and model integration'],
  sharingAlt:
    'Francesco Celino — AI engineer. Computer vision, forecasting, and model integration.',
  siteUrl: 'https://francescocelino.github.io',
  description:
    'Francesco Celino, AI engineer. Explore work in computer vision, Bayesian forecasting, and model integration, published research, and participation in DAIY Lab.',
  email: 'celinofrancesco849@gmail.com',
  linkedin: 'https://www.linkedin.com/in/francesco-celino-a45821257/',
  github: 'https://github.com/francescocelino',
  availability:
    'Open to freelance, contract & suitable employment opportunities',
  hero: 'I work on computer vision, statistical forecasting, and connecting models to applications. Here’s a closer look at what I’ve been working on, independently and with others.',
  about:
    'I’m Francesco, an AI engineer with experience in computer vision and statistical modeling. Alongside Maestro, I developed MetaFlu and co-authored research on influenza forecasting. I’m also part of DAIY Lab, an independent AI workshop.',
  navigation: [
    { label: 'Work', id: 'work' },
    { label: 'Research', id: 'research' },
    { label: 'Expertise', id: 'expertise' },
    { label: 'Contact', id: 'contact' },
  ],
  workIndex: [
    { label: 'Maestro', detail: 'Computer vision', href: '#maestro' },
    { label: 'MetaFlu', detail: 'Forecasting research', href: '#research' },
    { label: 'DAIY Lab', detail: 'Collaboration', href: '#lab' },
  ],
  headings: {
    work: 'Selected work',
    research: 'Research',
    services: 'Where I can help',
    about: 'A bit about me',
    contact: 'Contact',
  },
  workIntro: 'An application, a research contribution, and a lab I’m part of.',
  servicesIntro:
    'For teams working with visual data, forecasting a time series, or integrating a model into their software.',
  contactIntro:
    'Have a project or a role in mind? Email me with a little context. I’m open to freelance, contract, and suitable employment opportunities.',
  actions: {
    work: 'Explore my work',
    contact: 'Get in touch',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    fallback: 'Find me on GitHub',
    top: 'Back to top',
  },
  projectLabels: {
    feature: 'Engineering project',
    privacy: 'Processing & the public demo',
    caption:
      'System schematic. The demo returns PASS, FAIL, or ESCALATE; it does not display an estimated age.',
    input: 'Camera input',
    inference: 'Backend inference',
    inferenceDetail: 'Public demo: separate backend',
    decision: 'Threshold decisions',
  },
  services: [
    {
      title: 'Computer vision & machine learning',
      description:
        'Work through an image-based task: define the model’s inputs and outputs, evaluate its behavior, and connect inference to the application around it. Maestro is an example of this work.',
      capabilities: ['Computer vision', 'Machine learning', 'Model evaluation'],
    },
    {
      title: 'Statistical modeling & forecasting',
      description:
        'Develop models for time-series prediction and represent uncertainty in their forecasts. My research experience here comes from Bayesian modeling of influenza-like illness.',
      capabilities: [
        'Bayesian inference',
        'Time series',
        'Statistical modeling',
      ],
    },
    {
      title: 'Inference & integration',
      description:
        'Connect a model to usable software: handle inputs, structure outputs, and make processing boundaries clear. Consider on-device and backend inference in the context of the application’s constraints.',
      capabilities: [
        'AI inference',
        'Application integration',
        'Processing design',
      ],
    },
  ],
};

export const projects: readonly Project[] = [
  {
    id: 'maestro',
    visual: 'age-verification',
    title: 'Maestro',
    category: 'Age verification with computer vision',
    summary:
      'An AI application for age-gated products. It checks whether a person meets an age threshold and can defer a decision when the result is uncertain.',
    tags: ['Computer vision', 'AI inference', 'Application integration'],
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
        title: 'Camera input',
        description:
          'The public demo uses the browser camera and offers 16+, 18+, and 21+ gates. During an active session, it sends throttled JPEG frames to a separate backend.',
      },
      {
        title: 'Inference',
        description:
          'The application connects visual input, backend inference, and a threshold decision. The production product is designed for on-device processing; the public demo uses a different processing path.',
      },
      {
        title: 'Threshold decisions',
        description:
          'The demo returns PASS, FAIL, or ESCALATE without displaying an estimated age. ESCALATE lets it defer an uncertain result instead of forcing a binary decision.',
      },
    ],
    privacyNote:
      'The production product is designed for on-device processing. The public browser demo sends throttled JPEG frames to a separate backend; it is not fully on-device.',
  },
];

export const research: ResearchWork = {
  id: 'metaflu',
  title: 'MetaFlu',
  category: 'Bayesian Modeling & Epidemic Forecasting',
  contribution:
    'I developed a statistical modeling framework using Bayesian inference and time-series forecasting to predict influenza-like illness.',
  context:
    'This work sits within computational epidemiology. I’m a co-author of the Influcast paper, which describes a collaborative forecasting initiative combining forecasts from multiple teams and models. The paper’s ensemble results belong to that collaboration, rather than to MetaFlu alone.',
  methods: [
    'Bayesian inference',
    'Time-series forecasting',
    'Statistical modeling',
    'Research',
  ],
  publication: {
    title:
      'Collaborative forecasting of influenza-like illness in Italy: The Influcast experience',
    journal: 'Epidemics',
    year: 2025,
    authorship: 'Co-author',
    href: 'https://pubmed.ncbi.nlm.nih.gov/39965358/',
  },
  schematic: {
    observed: 'Observed series',
    model: 'Bayesian model',
    forecast: 'Forecast uncertainty',
    caption:
      'Observed data informs a Bayesian model, which produces a forecast with uncertainty. Illustrative schematic, not study data or a MetaFlu result.',
  },
};

export const lab: LabParticipation = {
  id: 'lab',
  name: 'DAIY Lab',
  relationship: 'I’m part of DAIY Lab.',
  description:
    'It’s an independent, open-source AI workshop focused on small models, self-hostable tools, ordinary hardware, and open experimentation. It’s a shared space for exploration alongside my individual work. The lab’s website explains its direction and includes illustrative tools for thinking about local AI.',
  focus: [
    'Small models',
    'Self-hostable tools',
    'Ordinary hardware',
    'Open experimentation',
  ],
  links: [
    { label: 'Explore DAIY Lab', href: 'https://22johngalt.github.io/DIY/' },
    { label: 'Lab website source', href: 'https://github.com/22JohnGalt/DIY' },
  ],
};
