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
  status?: string;
  summary: string;
  vision?: string;
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
    label: string;
    journal: string;
    year: number;
    authorship: string;
    href: string;
  };
  forecastLink: PortfolioLink;
  schematic: {
    title: string;
    context: string;
    cutoff: string;
    valueAxis: string;
    observed: string;
    median: string;
    interval: string;
    scrubber: string;
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

const daiyLabUrl = 'https://22johngalt.github.io/DIY/';

// These contact details are public. Empty fields are omitted by the UI.
export const portfolio = {
  name: 'Francesco Celino',
  role: 'AI engineer focused on LLMs',
  pageTitle: 'Francesco Celino — AI Engineer Focused on LLMs',
  sharingLines: [
    'Shroud · Local LLM prototype',
    'MetaFlu · Published forecasting research',
  ],
  sharingAlt:
    'Francesco Celino — AI engineer focused on LLMs. Shroud, a local LLM prototype, and MetaFlu, forecasting work for Influcast.',
  siteUrl: 'https://francescocelino.github.io',
  description:
    'Francesco Celino, AI engineer open to LLM research engineering roles. Explore Shroud, a local LLM prototype, and published forecasting research.',
  email: 'celinofrancesco849@gmail.com',
  linkedin: 'https://www.linkedin.com/in/francesco-celino-a45821257/',
  github: 'https://github.com/francescocelino',
  availability:
    'Open to LLM research engineering and applied ML roles, contracts, and freelance work.',
  hero: 'With DAIY Lab, I built Shroud, a macOS prototype that uses a fine-tuned open LLM to flag sensitive text for human review.',
  education: 'Master’s in Mathematical Engineering, Politecnico di Torino',
  about:
    'I’m interested in how language models behave in real applications, especially when they run on everyday hardware. I bring experience in Bayesian forecasting, model training, and model integration to that work.',
  navigation: [
    { label: 'Work', id: 'work' },
    { label: 'Research', id: 'research' },
    { label: 'Expertise', id: 'expertise' },
    { label: 'Contact', id: 'contact' },
  ],
  workIndex: [
    { label: 'Shroud', detail: 'macOS prototype', href: '#shroud' },
    { label: 'MetaFlu', detail: 'Published in Epidemics', href: '#research' },
    { label: 'Maestro', detail: 'Public browser demo', href: '#maestro' },
  ],
  headings: {
    work: 'Selected work',
    research: 'Research',
    services: 'Technical expertise',
    about: 'A bit about me',
    contact: 'Contact',
  },
  workIntro:
    'Local language models for text masking and computer vision for age verification.',
  servicesIntro:
    'I fine-tune models, build LLM applications, and integrate models into software.',
  contactIntro: 'Reach out about a role, a project, or Shroud.',
  actions: {
    shroud: 'See Shroud',
    email: 'Email me',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    fallback: 'Find me on GitHub',
    top: 'Back to top',
  },
  lossLandscape: {
    title: 'LLM loss landscape',
    loss: 'Loss',
    direction1: 'θ₁',
    direction2: 'θ₂',
    scrubber: 'Descent',
    caption: 'Illustrative 2D slice of a high-dimensional loss surface.',
  },
  projectLabels: {
    feature: 'Engineering project',
    vision: 'Planned workspace',
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
      title: 'LLM applications',
      description:
        'I fine-tune LLMs and build agent workflows with LangChain and n8n. I’ve prototyped applications that run small language models locally with Ollama and LM Studio.',
      capabilities: [
        'LLM fine-tuning',
        'LangChain',
        'n8n',
        'Ollama',
        'LM Studio',
      ],
    },
    {
      title: 'Machine learning & forecasting',
      description:
        'I fine-tune and benchmark deep learning models in Python. For MetaFlu, I built a Bayesian model that forecasts influenza-like illness and quantifies uncertainty in its predictions.',
      capabilities: ['Python', 'PyTorch', 'NumPy', 'Bayesian modeling'],
    },
    {
      title: 'Computer vision',
      description:
        'I worked on face detection and anti-spoofing for Maestro. I fine-tuned its age model, exported it to ONNX, and integrated it into the public demo.',
      capabilities: ['OpenCV', 'ONNX Runtime', 'FastAPI', 'TypeScript'],
    },
  ],
};

export const projects: readonly Project[] = [
  {
    id: 'shroud',
    title: 'Shroud',
    category: 'Reversible text masking',
    status: 'macOS prototype',
    summary:
      'I built Shroud with DAIY Lab. A fine-tuned open LLM runs on Apple Silicon and suggests sensitive text. You review what to mask, export a masked copy, and can restore the hidden text locally with an encrypted recovery file and a separate key.',
    vision:
      'We plan to build a document workspace where a local model masks sensitive text before a cloud model works with the masked copy.',
    tags: ['Apple MLX', 'Python', 'FastAPI', 'React', 'TypeScript'],
    links: [
      { label: 'Ask me about Shroud', href: '#contact' },
      { label: 'Visit DAIY Lab', href: daiyLabUrl },
    ],
    stages: [],
  },
  {
    id: 'maestro',
    visual: 'age-verification',
    title: 'Maestro',
    category: 'Age verification with computer vision',
    summary:
      'I co-developed Maestro’s age-verification pipeline, working on face detection and anti-spoofing. I fine-tuned the age model, exported it to ONNX, and integrated it into the public demo.',
    tags: ['Computer vision', 'AI inference', 'Application integration'],
    links: [
      {
        label: 'Try the demo',
        href: 'https://francescocelino.github.io/maestro-demo/',
      },
      {
        label: 'View demo frontend',
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
          'The public demo uses the browser camera and lets you choose a 16+, 18+, or 21+ age gate.',
      },
      {
        title: 'Inference',
        description:
          'During an active demo session, the backend receives camera frames and evaluates the selected age threshold.',
      },
      {
        title: 'Threshold decisions',
        description:
          'The demo returns PASS, FAIL, or ESCALATE without displaying an estimated age. ESCALATE lets it defer an uncertain result instead of forcing a binary decision.',
      },
    ],
    privacyNote:
      'Maestro is designed for on-device processing. The public browser demo sends throttled JPEG frames to a separate backend and returns PASS, FAIL, or ESCALATE.',
  },
];

export const research: ResearchWork = {
  id: 'metaflu',
  title: 'MetaFlu',
  category: 'Bayesian Modeling & Epidemic Forecasting',
  contribution:
    'I developed MetaFlu, a Bayesian time-series framework that forecasts influenza-like illness and quantifies uncertainty.',
  context:
    'MetaFlu contributed forecasts to Influcast. I co-authored the paper in Epidemics, which reports ensemble results from forecasts submitted by multiple teams.',
  methods: [
    'Bayesian inference',
    'Time-series forecasting',
    'Statistical modeling',
    'Research',
  ],
  publication: {
    title:
      'Collaborative forecasting of influenza-like illness in Italy: The Influcast experience',
    label: 'Read the Influcast paper',
    journal: 'Epidemics',
    year: 2025,
    authorship: 'Co-author',
    href: 'https://pubmed.ncbi.nlm.nih.gov/39965358/',
  },
  forecastLink: {
    label: 'View MetaFlu forecasts',
    href: 'https://github.com/Predizioni-Epidemiologiche-Italia/Influcast/blob/main/previsioni/CSL_PoliTo-metaFlu/2024_06.csv',
  },
  schematic: {
    title: 'Weekly Bayesian forecast',
    context: 'Illustrative',
    cutoff: 'Observed through',
    valueAxis: 'Synthetic index',
    observed: 'Observed',
    median: 'Forecast median',
    interval: '80% predictive interval',
    scrubber: 'Explore forecast weeks',
    caption:
      'Each new observation updates the next four weeks. Illustrative schematic, not study data or a MetaFlu result.',
  },
};

export const lab: LabParticipation = {
  id: 'lab',
  name: 'DAIY Lab',
  relationship: 'I helped start DAIY Lab, a small independent AI workshop.',
  description:
    'We explore small language models and self-hostable tools that run on ordinary hardware. We built the Shroud prototype together.',
  focus: [
    'Small models',
    'Self-hostable tools',
    'Ordinary hardware',
    'Open experimentation',
  ],
  links: [{ label: 'Explore DAIY Lab', href: daiyLabUrl }],
};
