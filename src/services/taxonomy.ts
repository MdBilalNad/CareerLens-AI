// Curated taxonomy of 40+ early-career and student job roles
// Matches are role types, not live job listings.

export interface RoleDefinition {
  id: string;
  title: string;
  category: string;
  description: string;
  requiredSkills: string[];
  secondarySkills: string[];
  projectKeywords: string[];
  educationKeywords: string[];
  experienceKeywords: string[];
  defaultPhases: {
    title: string;
    focus: string;
    skills: string[];
    projectTemplates: Array<{
      title: string;
      description: string;
      deliverable: string;
    }>;
    milestones: string[];
  }[];
}

export const SKILL_SYNONYMS: Record<string, string[]> = {
  // AI, Machine Learning, Deep Learning, and Data Science
  'machine learning': [
    'machine learning', 'ml', 'machine learning engineering', 'ai ml', 'ai/ml',
    'scikit-learn', 'sklearn', 'statistical modeling', 'supervised learning',
    'unsupervised learning', 'classification', 'regression'
  ],
  'artificial intelligence': [
    'artificial intelligence', 'ai', 'genai', 'generative ai', 'intelligent agents',
    'applied ai', 'ai engineering'
  ],
  'deep learning': [
    'deep learning', 'dl', 'neural networks', 'ann', 'cnn', 'rnn', 'lstm',
    'backpropagation', 'deep neural networks'
  ],
  'pytorch': ['pytorch', 'torch', 'torchvision', 'torchaudio'],
  'tensorflow': ['tensorflow', 'tf', 'keras', 'tf.keras'],
  'nlp': [
    'nlp', 'natural language processing', 'transformers', 'hugging face',
    'huggingface', 'spacy', 'nltk', 'bert', 'tokenization', 'text embeddings',
    'sentiment analysis'
  ],
  'computer vision': [
    'computer vision', 'cv', 'opencv', 'image processing', 'yolo',
    'object detection', 'image segmentation', 'convolutional'
  ],
  'llm': [
    'llm', 'large language models', 'llms', 'langchain', 'llamaindex',
    'prompt engineering', 'rag', 'retrieval-augmented generation', 'vector database',
    'vector search', 'embeddings', 'pinecone', 'chromadb', 'faiss'
  ],
  'data analysis': [
    'data analysis', 'pandas', 'numpy', 'jupyter', 'data analytics',
    'exploratory data analysis', 'eda', 'data cleaning', 'matplotlib', 'seaborn'
  ],
  'data science': [
    'data science', 'predictive modeling', 'feature engineering', 'statistics',
    'hypothesis testing', 'a/b testing'
  ],
  'mlops': [
    'mlops', 'model deployment', 'mlflow', 'wandb', 'kubeflow', 'dvc',
    'model serving', 'onnx', 'tensorrt', 'triton'
  ],

  // Core Languages
  'python': ['python', 'py', 'python3', 'django', 'fastapi', 'flask'],
  'typescript': ['typescript', 'ts'],
  'javascript': ['javascript', 'js', 'es6', 'ecmascript', 'modern javascript'],
  'java': ['java', 'spring', 'spring boot', 'hibernate', 'jvm'],
  'c++': ['c++', 'cpp', 'c/c++'],
  'c': ['c language', 'embedded c'],
  'c#': ['c#', '.net', 'asp.net', 'dotnet', 'entity framework'],
  'go': ['golang', 'go language', 'gin', 'goroutine'],
  'rust': ['rust', 'cargo', 'tokio'],
  'sql': ['sql', 'postgresql', 'postgres', 'mysql', 'sqlite', 'mariadb', 'oracle sql', 'ms sql'],

  // Web & Mobile
  'react': ['react', 'react.js', 'reactjs', 'next.js', 'nextjs'],
  'node.js': ['node', 'node.js', 'nodejs', 'express', 'express.js', 'nestjs', 'fastify'],
  'html/css': ['html', 'css', 'html5', 'css3', 'tailwind', 'tailwind css', 'sass', 'scss', 'bootstrap'],
  'rest api': ['rest', 'restful', 'api', 'rest api', 'apis', 'restful api', 'json api'],
  'graphql': ['graphql', 'apollo', 'relay'],
  'flutter': ['flutter', 'dart'],
  'react native': ['react native', 'expo'],
  'android': ['android', 'kotlin', 'jetpack compose', 'android studio'],
  'ios': ['ios', 'swift', 'swiftui', 'xcode'],

  // Cloud & DevOps
  'docker': ['docker', 'containerization', 'containers', 'docker-compose', 'dockerfile'],
  'kubernetes': ['kubernetes', 'k8s', 'helm', 'kubectl'],
  'aws': ['aws', 'amazon web services', 's3', 'ec2', 'lambda', 'cloudformation', 'rds', 'dynamodb'],
  'google cloud': ['google cloud', 'gcp', 'cloud run', 'bigquery', 'cloud storage', 'firebase'],
  'azure': ['azure', 'microsoft azure', 'azure devops', 'azure blob'],
  'ci/cd': ['ci/cd', 'github actions', 'jenkins', 'continuous integration', 'gitlab ci'],
  'linux': ['linux', 'bash', 'shell scripting', 'unix', 'ubuntu', 'debian', 'shell'],
  'git': ['git', 'github', 'version control', 'gitlab', 'bitbucket'],

  // Databases & Architecture
  'redis': ['redis', 'caching', 'in-memory database'],
  'mongodb': ['mongodb', 'mongo', 'mongoose', 'nosql'],
  'kafka': ['kafka', 'message queue', 'rabbitmq', 'event streaming'],
  'data structures': ['data structures', 'algorithms', 'dsa', 'problem solving', 'leetcode'],
  'system design': ['system design', 'microservices', 'distributed systems', 'load balancing'],
  'testing': ['jest', 'vitest', 'cypress', 'playwright', 'unit testing', 'testing', 'pytest', 'junit', 'selenium'],
  'agile': ['agile', 'scrum', 'kanban', 'jira', 'sprint planning'],
  'figma': ['figma', 'ui design', 'ux design', 'wireframing', 'prototyping'],
  'cybersecurity': ['cybersecurity', 'information security', 'owasp', 'penetration testing', 'network security']
};

export const COMMON_SKILLS_LIST = [
  // AI & ML
  'Python', 'Machine Learning', 'Artificial Intelligence', 'Deep Learning', 'PyTorch', 'TensorFlow',
  'Scikit-Learn', 'Natural Language Processing', 'Computer Vision', 'OpenCV', 'Transformers',
  'Hugging Face', 'Large Language Models', 'LangChain', 'RAG', 'MLOps', 'Pandas', 'NumPy',
  'Data Science', 'Data Analysis',

  // Core Languages
  'JavaScript', 'TypeScript', 'Java', 'C++', 'C', 'C#', 'Go', 'Rust', 'SQL',

  // Web & Mobile
  'React', 'Node.js', 'Next.js', 'FastAPI', 'Django', 'Flask', 'Express', 'Spring Boot',
  'HTML/CSS', 'Tailwind CSS', 'REST API', 'GraphQL', 'Flutter', 'React Native', 'Android', 'iOS',

  // Databases & Cloud
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Azure',
  'Git', 'GitHub', 'CI/CD', 'Linux', 'Kafka', 'Data Structures', 'Algorithms', 'System Design',
  'Testing', 'Pytest', 'Jest', 'Cybersecurity', 'Agile', 'Figma'
];

export const ACTION_VERBS = [
  'built', 'engineered', 'developed', 'architected', 'implemented', 'designed',
  'deployed', 'optimized', 'reduced', 'increased', 'scaled', 'automated',
  'refactored', 'resolved', 'launched', 'migrated', 'streamlined', 'integrated',
  'accelerated', 'authored', 'established', 'standardized', 'formulated', 'trained',
  'fine-tuned', 'quantified', 'evaluated', 'orchestrated', 'curated'
];

export const PASSIVE_PHRASES = [
  'responsible for', 'worked on', 'helped with', 'assisted with', 'tasked with',
  'participated in', 'involved in', 'contributed to', 'handled', 'duties included',
  'helped build', 'worked with'
];

// Curated 40+ role catalog for CS and Engineering students
export const ROLE_LIBRARY: RoleDefinition[] = [
  {
    id: 'ai-ml-engineer',
    title: 'Machine Learning Engineer (Junior)',
    category: 'AI and Data Science',
    description: 'Designs, trains, and deploys predictive machine learning models into robust production services.',
    requiredSkills: ['Python', 'Machine Learning', 'Scikit-Learn', 'Deep Learning', 'Pandas', 'NumPy'],
    secondarySkills: ['PyTorch', 'TensorFlow', 'Docker', 'SQL', 'FastAPI', 'MLOps'],
    projectKeywords: ['model', 'training', 'prediction', 'classification', 'pipeline', 'dataset', 'accuracy', 'evaluation'],
    educationKeywords: ['Computer Science', 'Data Science', 'Artificial Intelligence', 'B.Tech', 'M.Tech', 'B.E.', 'Mathematics'],
    experienceKeywords: ['data', 'model', 'training', 'research', 'analytics', 'experimentation'],
    defaultPhases: [
      {
        title: 'Phase 1: Feature Engineering and Model Baselines',
        focus: 'Master exploratory data analysis, tabular modeling, and validation strategies.',
        skills: ['Pandas', 'NumPy', 'Scikit-Learn', 'Cross-Validation'],
        projectTemplates: [
          {
            title: 'End-to-End Predictive Pipeline',
            description: 'Clean real-world open dataset, handle missing variables, train ensemble trees, and report ROC-AUC metrics.',
            deliverable: 'GitHub repository with clean feature engineering notebooks, modular training scripts, and reproducibility benchmarks.'
          }
        ],
        milestones: ['Complete data cleaning pipeline', 'Benchmark 3 baseline models', 'Publish evaluation report']
      },
      {
        title: 'Phase 2: Deep Learning Architectures',
        focus: 'Implement neural architectures with PyTorch and understand transfer learning.',
        skills: ['PyTorch', 'Neural Networks', 'GPU Acceleration', 'TensorBoard'],
        projectTemplates: [
          {
            title: 'Computer Vision or NLP Classification Benchmark',
            description: 'Fine-tune pre-trained weights on domain-specific dataset with data augmentations.',
            deliverable: 'Training artifact with confusion matrix, precision-recall graphs, and ONNX export.'
          }
        ],
        milestones: ['Train custom PyTorch classifier', 'Export model to ONNX runtime', 'Benchmark inference latency']
      },
      {
        title: 'Phase 3: Production Serving and MLOps',
        focus: 'Deploy models behind high-throughput REST or gRPC microservices with monitoring.',
        skills: ['FastAPI', 'Docker', 'Model Monitoring', 'CI/CD'],
        projectTemplates: [
          {
            title: 'Containerized Model Serving Microservice',
            description: 'Package inference pipeline into a Docker container with sub-50ms latency and health monitoring.',
            deliverable: 'Deployable Docker container on cloud compute with Swagger endpoints and load testing script.'
          }
        ],
        milestones: ['Build FastAPI prediction endpoint', 'Dockerize deployment', 'Execute stress test with 100 concurrent requests']
      }
    ]
  },
  {
    id: 'ai-engineer-genai',
    title: 'AI Engineer (Generative AI & LLMs)',
    category: 'AI and Data Science',
    description: 'Builds intelligent applications powered by foundation models, retrieval-augmented generation (RAG), and vector databases.',
    requiredSkills: ['Python', 'Artificial Intelligence', 'Natural Language Processing', 'Transformers', 'FastAPI'],
    secondarySkills: ['PyTorch', 'Docker', 'SQL', 'React', 'Vector Databases'],
    projectKeywords: ['llm', 'rag', 'embeddings', 'vector', 'retrieval', 'prompt', 'agents', 'fine-tuning'],
    educationKeywords: ['Computer Science', 'B.Tech', 'Information Technology', 'M.Tech', 'AI'],
    experienceKeywords: ['ai', 'nlp', 'model', 'api', 'search', 'retrieval'],
    defaultPhases: [
      {
        title: 'Phase 1: Embeddings and Vector Search',
        focus: 'Understand text embedding models, chunking strategies, and similarity indexing.',
        skills: ['Python', 'Text Embeddings', 'Vector Search', 'FastAPI'],
        projectTemplates: [
          {
            title: 'Semantic Document Search Engine',
            description: 'Index technical PDF documentation into vectors and query via cosine similarity.',
            deliverable: 'Functional search API returning cited document chunks with latency under 100ms.'
          }
        ],
        milestones: ['Implement text chunking pipeline', 'Index 1,000 document passages', 'Evaluate top-k retrieval accuracy']
      },
      {
        title: 'Phase 2: Retrieval-Augmented Generation (RAG)',
        focus: 'Construct grounded question-answering systems with context injection and guardrails.',
        skills: ['RAG Architectures', 'Prompt Engineering', 'Evaluation Frameworks'],
        projectTemplates: [
          {
            title: 'Domain Knowledge RAG Assistant',
            description: 'Ground responses on private data repository with hallucinations mitigation and sources attribution.',
            deliverable: 'Streamlit or React interface with query history and source verification tags.'
          }
        ],
        milestones: ['Connect vector store with generation pipeline', 'Implement reranking step', 'Run evaluation on 50 test queries']
      },
      {
        title: 'Phase 3: Production Deployment and Guardrails',
        focus: 'Ship scalable AI microservices with rate limits, latency caches, and safety validations.',
        skills: ['Docker', 'Caching', 'CI/CD', 'Monitoring'],
        projectTemplates: [
          {
            title: 'Production AI Gateway Service',
            description: 'Microservice handling request queuing, response caching, token budgeting, and observability.',
            deliverable: 'Containerized service with Prometheus metrics and end-to-end integration tests.'
          }
        ],
        milestones: ['Add semantic caching layer', 'Implement rate-limiting and token counting', 'Deploy containerized service']
      }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist (Entry Level)',
    category: 'AI and Data Science',
    description: 'Translates unstructured business data into statistical models, experiments, and predictive insights.',
    requiredSkills: ['Python', 'SQL', 'Data Analysis', 'Pandas', 'NumPy', 'Scikit-Learn'],
    secondarySkills: ['Machine Learning', 'Data Visualization', 'Statistics', 'Git'],
    projectKeywords: ['data', 'analysis', 'statistics', 'prediction', 'visualization', 'hypothesis', 'cleaning'],
    educationKeywords: ['Computer Science', 'Mathematics', 'Statistics', 'B.Tech', 'Data Science'],
    experienceKeywords: ['analysis', 'dataset', 'reporting', 'modeling', 'metrics'],
    defaultPhases: [
      {
        title: 'Phase 1: Advanced SQL and Exploratory Data Analysis',
        focus: 'Query relational tables, execute complex window functions, and extract insights.',
        skills: ['SQL', 'Pandas', 'Data Visualization', 'Exploratory Analysis'],
        projectTemplates: [
          {
            title: 'E-Commerce Cohort and Churn Analysis',
            description: 'Analyze millions of transaction records to uncover retention bottlenecks and customer cohorts.',
            deliverable: 'Jupyter notebook with statistical summaries, cohort heatmaps, and executive takeaway slides.'
          }
        ],
        milestones: ['Write multi-table SQL aggregations', 'Run cohort retention analysis', 'Deliver visual summary report']
      },
      {
        title: 'Phase 2: Statistical Modeling and Hypothesis Testing',
        focus: 'Formulate hypotheses, calculate p-values, and train baseline regression/classification models.',
        skills: ['Statistics', 'Hypothesis Testing', 'Scikit-Learn', 'Feature Engineering'],
        projectTemplates: [
          {
            title: 'A/B Test Evaluation Engine',
            description: 'Compute statistical significance and confidence intervals for product experiments.',
            deliverable: 'Automated script verifying test sample ratios and significance levels.'
          }
        ],
        milestones: ['Perform parametric hypothesis tests', 'Train cross-validated predictor', 'Document decision boundary']
      },
      {
        title: 'Phase 3: Automated Analytical Pipelines',
        focus: 'Automate data extraction, model training, and reporting schedules.',
        skills: ['Python Scripting', 'PostgreSQL', 'Git', 'Data Pipelines'],
        projectTemplates: [
          {
            title: 'Automated Metric Extraction Pipeline',
            description: 'Scheduled batch pipeline reading from raw tables, generating KPIs, and publishing reports.',
            deliverable: 'Modular Python codebase with automated tests and documentation.'
          }
        ],
        milestones: ['Set up automated batch script', 'Validate data schema inputs', 'Publish live analytics report']
      }
    ]
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer (React / TypeScript)',
    category: 'Web Development',
    description: 'Builds responsive, accessible, and high-performance client web applications.',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'HTML/CSS'],
    secondarySkills: ['Tailwind CSS', 'Next.js', 'REST API', 'Git', 'Testing'],
    projectKeywords: ['react', 'web', 'ui', 'components', 'responsive', 'state', 'hooks'],
    educationKeywords: ['Computer Science', 'Information Technology', 'B.Tech', 'BCA', 'MCA'],
    experienceKeywords: ['frontend', 'react', 'web', 'client', 'interface'],
    defaultPhases: [
      {
        title: 'Phase 1: TypeScript and Component Architecture',
        focus: 'Master strict TypeScript typings, component decomposition, and accessibility standards.',
        skills: ['TypeScript', 'React Hooks', 'HTML5 Semantic Layout', 'CSS Flex/Grid'],
        projectTemplates: [
          {
            title: 'Accessible Design System and Component Library',
            description: 'Build reusable, keyboard-navigable UI components with strict prop contracts.',
            deliverable: 'Component library with unit tests and documented story previews.'
          }
        ],
        milestones: ['Create 10 accessible components', 'Configure keyboard focus rings', 'Achieve 100% type safety']
      },
      {
        title: 'Phase 2: Client State Management and Network Resilience',
        focus: 'Integrate remote APIs with caching, optimistic updates, and offline fallback.',
        skills: ['TanStack Query', 'REST API', 'Error Boundaries', 'Tailwind CSS'],
        projectTemplates: [
          {
            title: 'Real-time Analytical Dashboard',
            description: 'Interactive dashboard consuming live REST feeds with sorting, filtering, and responsive charts.',
            deliverable: 'Single-page React application with sub-second page loads and zero layout shifts.'
          }
        ],
        milestones: ['Integrate paginated REST endpoints', 'Implement optimistic mutations', 'Ensure mobile responsiveness']
      },
      {
        title: 'Phase 3: Web Performance and Production Deployment',
        focus: 'Code splitting, bundle optimization, and automated Lighthouse CI auditing.',
        skills: ['Vite', 'Code Splitting', 'Lighthouse Optimization', 'CI/CD'],
        projectTemplates: [
          {
            title: 'Production Web Application with Lighthouse 95+ Audit',
            description: 'Deploy full-featured client app with optimized asset delivery and zero cumulative layout shifts.',
            deliverable: 'Live web deployment verified on production URL with 95+ performance score.'
          }
        ],
        milestones: ['Audit and reduce bundle size under 200KB gzip', 'Configure CI deployment pipeline', 'Pass WCAG 2.2 AA accessibility audit']
      }
    ]
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer (Node.js / Python)',
    category: 'Web Development',
    description: 'Architects robust server APIs, database schemas, authentication systems, and asynchronous tasks.',
    requiredSkills: ['Node.js', 'Python', 'SQL', 'REST API', 'PostgreSQL'],
    secondarySkills: ['Docker', 'Redis', 'Git', 'Linux', 'Testing'],
    projectKeywords: ['api', 'backend', 'server', 'database', 'auth', 'crud', 'postgres', 'rest'],
    educationKeywords: ['Computer Science', 'Information Technology', 'B.Tech', 'MCA', 'B.E.'],
    experienceKeywords: ['backend', 'server', 'database', 'api', 'endpoints'],
    defaultPhases: [
      {
        title: 'Phase 1: Relational Schema Design and REST APIs',
        focus: 'Design normalized SQL tables, migrations, and secure CRUD endpoints.',
        skills: ['SQL', 'PostgreSQL', 'REST API', 'Express or FastAPI'],
        projectTemplates: [
          {
            title: 'Multi-Tenant Resource Management API',
            description: 'RESTful API with role-based access control, foreign key constraints, and pagination.',
            deliverable: 'Documented API server with automated integration tests and database migration scripts.'
          }
        ],
        milestones: ['Design relational schema with 6 tables', 'Implement JWT authentication', 'Write integration test suite']
      },
      {
        title: 'Phase 2: Caching, Transactions, and Concurrency',
        focus: 'Implement caching layers, atomic transactions, and connection pooling.',
        skills: ['Redis', 'Database Transactions', 'Error Handling', 'Docker'],
        projectTemplates: [
          {
            title: 'High-Throughput Order Processing Service',
            description: 'Handle concurrent requests with row-level locks and Redis cache invalidation.',
            deliverable: 'Dockerized backend service capable of sustaining 500 requests per second.'
          }
        ],
        milestones: ['Integrate Redis caching', 'Implement ACID transactional block', 'Package application in Docker container']
      },
      {
        title: 'Phase 3: Asynchronous Queues and Observability',
        focus: 'Offload heavy compute to background workers and monitor system health.',
        skills: ['Background Workers', 'Logging and Metrics', 'CI/CD Pipelines'],
        projectTemplates: [
          {
            title: 'Event-Driven Background Processing Queue',
            description: 'Asynchronous job worker processing emails, media, or data jobs with automatic retries.',
            deliverable: 'Production backend architecture with structured logs and health endpoints.'
          }
        ],
        milestones: ['Configure background job worker', 'Implement structured request-id logging', 'Deploy behind reverse proxy']
      }
    ]
  },
  {
    id: 'fullstack-engineer',
    title: 'Full Stack Developer (MERN / TypeScript)',
    category: 'Web Development',
    description: 'Builds end-to-end web products spanning client interfaces, server logic, and persistent databases.',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL'],
    secondarySkills: ['MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'REST API'],
    projectKeywords: ['fullstack', 'full-stack', 'react', 'node', 'database', 'crud', 'web app'],
    educationKeywords: ['Computer Science', 'Information Technology', 'B.Tech', 'BCA', 'MCA'],
    experienceKeywords: ['fullstack', 'web', 'application', 'developer'],
    defaultPhases: [
      {
        title: 'Phase 1: Monorepo Setup and Shared Typings',
        focus: 'Organize client and server in a unified workspace with shared contract interfaces.',
        skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
        projectTemplates: [
          {
            title: 'Collaborative Workspace Web App',
            description: 'Full stack CRUD application with authentication and persistent database.',
            deliverable: 'Repository with clean separation between UI components and server routes.'
          }
        ],
        milestones: ['Set up client-server monorepo', 'Create authenticated CRUD endpoints', 'Connect PostgreSQL database']
      },
      {
        title: 'Phase 2: State Management and Form Handling',
        focus: 'Build robust forms with client-server validation and optimistic UI updates.',
        skills: ['React Hook Form', 'Zod', 'Tailwind CSS', 'REST API'],
        projectTemplates: [
          {
            title: 'E-Commerce Catalog and Checkout Platform',
            description: 'Product catalog with search, cart synchronization, and checkout simulation.',
            deliverable: 'Fully functional application tested on desktop and mobile viewports.'
          }
        ],
        milestones: ['Build validated multi-step form', 'Implement cart state persistence', 'Add toast notifications for user actions']
      },
      {
        title: 'Phase 3: Production Deployment and Containerization',
        focus: 'Containerize multi-tier web application and deploy to cloud compute.',
        skills: ['Docker', 'Docker Compose', 'CI/CD', 'Environment Secrets'],
        projectTemplates: [
          {
            title: 'Production Ready Containerized Deployment',
            description: 'Docker Compose orchestration running React frontend, Node backend, and database.',
            deliverable: 'Docker Compose setup with single-command spin up and health checks.'
          }
        ],
        milestones: ['Author multi-stage Dockerfiles', 'Verify single command orchestration', 'Deploy to cloud platform']
      }
    ]
  },
  {
    id: 'devops-cloud-engineer',
    title: 'DevOps & Cloud Engineer (Junior)',
    category: 'Infrastructure',
    description: 'Automates deployment pipelines, provisions cloud infrastructure, and ensures system reliability.',
    requiredSkills: ['Linux', 'Docker', 'Git', 'CI/CD', 'AWS'],
    secondarySkills: ['Kubernetes', 'Bash', 'Terraform', 'Python', 'Google Cloud'],
    projectKeywords: ['devops', 'cloud', 'docker', 'ci/cd', 'deploy', 'pipeline', 'infrastructure', 'linux'],
    educationKeywords: ['Computer Science', 'Information Technology', 'B.Tech', 'B.E.'],
    experienceKeywords: ['devops', 'cloud', 'infrastructure', 'deployment', 'linux'],
    defaultPhases: [
      {
        title: 'Phase 1: Linux Administration and Dockerization',
        focus: 'Command-line scripting, user permissions, networking, and multi-stage container builds.',
        skills: ['Linux CLI', 'Bash Scripting', 'Docker Multi-Stage', 'Networking Basics'],
        projectTemplates: [
          {
            title: 'Hardened Container Build and Automation Scripts',
            description: 'Collection of automated shell scripts and hardened non-root Docker images.',
            deliverable: 'GitHub repository with ShellCheck-validated bash scripts and minimal containers.'
          }
        ],
        milestones: ['Write automated backup script in Bash', 'Build minimal Alpine Docker container', 'Pass security vulnerability scan']
      },
      {
        title: 'Phase 2: Continuous Integration and Deployment (CI/CD)',
        focus: 'Author automated GitHub Actions workflows for linting, testing, and artifact deployment.',
        skills: ['GitHub Actions', 'Automated Testing', 'Semantic Versioning', 'Artifact Registries'],
        projectTemplates: [
          {
            title: 'End-to-End Automated CI/CD Pipeline',
            description: 'Workflow triggering automated testing, container tagging, and deployment on pull request merges.',
            deliverable: 'Tested workflow running unit tests, lint checks, and automated artifact push.'
          }
        ],
        milestones: ['Configure test pipeline on pull requests', 'Automate container image push to registry', 'Implement deployment rollback mechanism']
      },
      {
        title: 'Phase 3: Cloud Infrastructure and Monitoring',
        focus: 'Provision cloud instances and monitor system health metrics.',
        skills: ['AWS Cloud', 'NGINX Reverse Proxy', 'Prometheus', 'Grafana'],
        projectTemplates: [
          {
            title: 'Cloud Infrastructure Monitoring Stack',
            description: 'Deploy web service behind NGINX with automated metrics collection and alert thresholds.',
            deliverable: 'Live server deployment with monitoring dashboard and uptime tracking.'
          }
        ],
        milestones: ['Deploy compute instance with SSL certificate', 'Configure NGINX reverse proxy', 'Set up CPU and memory alert alerts']
      }
    ]
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer (Entry Level)',
    category: 'AI and Data Science',
    description: 'Builds scalable data ingestion pipelines, warehouse schemas, and automated transform workflows.',
    requiredSkills: ['Python', 'SQL', 'PostgreSQL', 'Data Analysis'],
    secondarySkills: ['Docker', 'Kafka', 'Spark', 'Linux', 'Git'],
    projectKeywords: ['etl', 'pipeline', 'warehouse', 'data', 'batch', 'stream', 'sql'],
    educationKeywords: ['Computer Science', 'Information Technology', 'B.Tech', 'Data Science'],
    experienceKeywords: ['data', 'pipeline', 'etl', 'database', 'sql'],
    defaultPhases: [
      {
        title: 'Phase 1: Relational Schema Modeling and Data Ingestion',
        focus: 'Design dimensional schemas (star/snowflake) and ingest raw JSON/CSV feeds.',
        skills: ['Advanced SQL', 'Python Data Processing', 'PostgreSQL', 'Schema Modeling'],
        projectTemplates: [
          {
            title: 'Automated CSV/API Ingestion Pipeline',
            description: 'Ingest raw public data feeds, clean records, and load into a normalized SQL database.',
            deliverable: 'Modular ingestion codebase with data validation schemas.'
          }
        ],
        milestones: ['Model analytical star schema', 'Ingest 50,000 raw records', 'Validate zero duplicate records']
      },
      {
        title: 'Phase 2: Workflow Orchestration and Transformation',
        focus: 'Schedule automated data transformations with dependency tracking.',
        skills: ['ETL Pipelines', 'Data Quality Checks', 'Docker'],
        projectTemplates: [
          {
            title: 'Scheduled Analytical Warehouse Pipeline',
            description: 'Automated batch transformation aggregating daily business metrics into reporting tables.',
            deliverable: 'Containerized transform pipeline with idempotency guarantees.'
          }
        ],
        milestones: ['Implement idempotent pipeline steps', 'Add schema anomaly assertions', 'Publish summary tables']
      },
      {
        title: 'Phase 3: Streaming Ingestion Basics',
        focus: 'Introduction to pub/sub queues and event-driven data streaming.',
        skills: ['Message Queues', 'Kafka or RabbitMQ', 'Monitoring'],
        projectTemplates: [
          {
            title: 'Real-Time Event Stream Consumer',
            description: 'Consume clickstream events from message broker and write rolling aggregates.',
            deliverable: 'Consumer service with dead-letter queue handling and benchmark report.'
          }
        ],
        milestones: ['Set up message broker in Docker', 'Process 1,000 mock events per second', 'Verify dead-letter queue behavior']
      }
    ]
  },
  {
    id: 'qa-automation-engineer',
    title: 'QA & Automation Engineer',
    category: 'Software Quality',
    description: 'Designs automated end-to-end test suites, API verification checks, and performance regression tests.',
    requiredSkills: ['JavaScript', 'Python', 'Testing', 'Git'],
    secondarySkills: ['TypeScript', 'REST API', 'CI/CD', 'Docker'],
    projectKeywords: ['qa', 'test', 'automation', 'selenium', 'cypress', 'playwright', 'testing'],
    educationKeywords: ['Computer Science', 'Information Technology', 'B.Tech', 'BCA', 'MCA'],
    experienceKeywords: ['qa', 'test', 'automation', 'verification', 'quality'],
    defaultPhases: [
      {
        title: 'Phase 1: API Testing and Assertions',
        focus: 'Validate REST endpoints, status codes, payload contracts, and error responses.',
        skills: ['REST API Testing', 'Pytest or Jest', 'JSON Schema Validation'],
        projectTemplates: [
          {
            title: 'Automated REST API Test Suite',
            description: 'Comprehensive test suite covering CRUD operations, edge cases, and rate limit responses.',
            deliverable: 'Test repository with automated HTML test execution reports.'
          }
        ],
        milestones: ['Author 25 API integration tests', 'Validate JSON schemas', 'Generate automated test run report']
      },
      {
        title: 'Phase 2: End-to-End Browser Automation',
        focus: 'Automate user flows using modern headless browser frameworks.',
        skills: ['Playwright or Cypress', 'Page Object Model', 'Selector Resilience'],
        projectTemplates: [
          {
            title: 'Cross-Browser Regression Suite',
            description: 'Automate core business paths (authentication, search, checkout) across Chromium and Firefox.',
            deliverable: 'Test framework using Page Object Model with video/screenshot artifact captures.'
          }
        ],
        milestones: ['Automate 5 critical user journeys', 'Run tests headlessly in CI', 'Implement visual regression checks']
      },
      {
        title: 'Phase 3: CI/CD Test Pipeline Integration',
        focus: 'Integrate test execution into deployment gates and load test critical services.',
        skills: ['GitHub Actions', 'Performance Testing', 'Test Reporting'],
        projectTemplates: [
          {
            title: 'Automated Quality Gate for CI/CD',
            description: 'GitHub Actions workflow blocking pull request merges if test coverage drops or regressions occur.',
            deliverable: 'Configured repository with PR status checks and test coverage badges.'
          }
        ],
        milestones: ['Block failing builds automatically', 'Publish test coverage reports', 'Run automated load test']
      }
    ]
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst (Junior)',
    category: 'Security and Systems',
    description: 'Identifies software vulnerabilities, configures network firewalls, and audits security compliance.',
    requiredSkills: ['Linux', 'Networking', 'Python', 'Git'],
    secondarySkills: ['Cybersecurity', 'Bash', 'Docker', 'SQL'],
    projectKeywords: ['security', 'vulnerability', 'owasp', 'penetration', 'audit', 'firewall', 'network'],
    educationKeywords: ['Computer Science', 'Cybersecurity', 'Information Technology', 'B.Tech'],
    experienceKeywords: ['security', 'audit', 'network', 'vulnerability', 'analyst'],
    defaultPhases: [
      {
        title: 'Phase 1: Network Protocols and Linux Hardening',
        focus: 'Understand TCP/IP, DNS, SSH, SSL/TLS, and basic system administration.',
        skills: ['TCP/IP', 'Linux System Hardening', 'Packet Analysis', 'Bash'],
        projectTemplates: [
          {
            title: 'Network Port and Protocol Audit Tool',
            description: 'Python script auditing open ports, SSL certificate validity, and SSH configurations.',
            deliverable: 'Auditing script outputting formatted security compliance reports.'
          }
        ],
        milestones: ['Perform packet inspection with Wireshark', 'Harden Linux server configuration', 'Verify TLS cipher suites']
      },
      {
        title: 'Phase 2: Web Application Security (OWASP Top 10)',
        focus: 'Understand injection flaws, broken access control, and cross-site scripting mitigations.',
        skills: ['OWASP Top 10', 'Vulnerability Assessment', 'Secure Coding'],
        projectTemplates: [
          {
            title: 'Vulnerability Assessment and Mitigation Audit',
            description: 'Audit vulnerable mock web application, document exploit vectors, and write code patches.',
            deliverable: 'Remediation report detailing vulnerability findings, risk severity, and applied code fixes.'
          }
        ],
        milestones: ['Identify 5 OWASP vulnerabilities in test app', 'Write defensive code patches', 'Verify remediation']
      },
      {
        title: 'Phase 3: Automated Security Scanning in CI/CD',
        focus: 'Integrate dependency scanning, secret detection, and container linting.',
        skills: ['Static Code Analysis', 'Secret Scanning', 'Container Security'],
        projectTemplates: [
          {
            title: 'DevSecOps Automated Pipeline Gate',
            description: 'Automated CI/CD security check scanning dependencies for known CVEs and checking for leaked keys.',
            deliverable: 'Configured GitHub Actions workflow failing builds upon high-severity vulnerabilities.'
          }
        ],
        milestones: ['Implement dependency vulnerability scanning', 'Configure secret scanning hooks', 'Publish compliance audit']
      }
    ]
  },
  {
    id: 'mobile-app-developer',
    title: 'Mobile App Developer (Flutter / React Native)',
    category: 'Mobile Development',
    description: 'Builds cross-platform native mobile applications with clean state management and responsive styling.',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'HTML/CSS'],
    secondarySkills: ['React Native', 'Flutter', 'REST API', 'Git', 'Figma'],
    projectKeywords: ['mobile', 'app', 'react native', 'flutter', 'ios', 'android', 'screens'],
    educationKeywords: ['Computer Science', 'Information Technology', 'B.Tech', 'BCA', 'MCA'],
    experienceKeywords: ['mobile', 'react native', 'flutter', 'app', 'ios', 'android'],
    defaultPhases: [
      {
        title: 'Phase 1: Mobile UI and Navigation',
        focus: 'Build multi-screen mobile experiences with tab bars, stacks, and device orientation handling.',
        skills: ['Mobile Navigation', 'Responsive Layouts', 'Touch Gestures'],
        projectTemplates: [
          {
            title: 'Cross-Platform Personal Habit Tracker',
            description: 'Multi-screen mobile application with local storage, animations, and dark mode support.',
            deliverable: 'Running mobile project tested on iOS simulator and Android emulator.'
          }
        ],
        milestones: ['Implement stack and tab navigation', 'Create 5 responsive screens', 'Persist user state locally']
      },
      {
        title: 'Phase 2: Offline Caching and API Synchronization',
        focus: 'Integrate remote REST APIs with offline local caching and push notification handling.',
        skills: ['Offline Storage', 'REST API Integration', 'State Management'],
        projectTemplates: [
          {
            title: 'Real-Time News and Bookmark Mobile App',
            description: 'Fetch external articles, cache images for offline reading, and support saved bookmarks.',
            deliverable: 'Application running smoothly at 60 FPS with error handling.'
          }
        ],
        milestones: ['Cache API payloads locally', 'Handle offline mode gracefully', 'Support pull-to-refresh']
      },
      {
        title: 'Phase 3: App Store Readiness and Performance',
        focus: 'Profile frame rates, optimize bundle assets, and generate production release builds.',
        skills: ['Mobile Performance Profiling', 'App Store Guidelines', 'Release Builds'],
        projectTemplates: [
          {
            title: 'Production Build and App Store Asset Package',
            description: 'Configured production build with proper app icons, splash screens, and signing keys.',
            deliverable: 'Signed release APK / IPA build ready for store submission.'
          }
        ],
        milestones: ['Profile app memory and frame rate', 'Configure splash screens and icons', 'Generate signed production build']
      }
    ]
  },
  // Additional 30+ role definitions to ensure full coverage of student CS disciplines
  {
    id: 'computer-vision-engineer',
    title: 'Computer Vision Engineer (Junior)',
    category: 'AI and Data Science',
    description: 'Implements visual recognition, object tracking, and image processing models.',
    requiredSkills: ['Python', 'Computer Vision', 'PyTorch', 'Deep Learning'],
    secondarySkills: ['OpenCV', 'TensorFlow', 'Docker', 'NumPy'],
    projectKeywords: ['vision', 'image', 'opencv', 'detection', 'yolo', 'tracking'],
    educationKeywords: ['Computer Science', 'B.Tech', 'M.Tech', 'Electrical Engineering'],
    experienceKeywords: ['vision', 'image', 'opencv', 'detection', 'model'],
    defaultPhases: [
      {
        title: 'Phase 1: Image Processing Fundamentals',
        focus: 'Color spaces, edge filters, transformations, and feature detection.',
        skills: ['OpenCV', 'NumPy', 'Image Filtering'],
        projectTemplates: [{ title: 'Document Scanner Pipeline', description: 'Edge detection and perspective warp.', deliverable: 'Script extracting clean documents.' }],
        milestones: ['Implement edge filter', 'Correct image perspective']
      },
      {
        title: 'Phase 2: Convolutional Object Detection',
        focus: 'Train CNNs and YOLO models on labeled bounding boxes.',
        skills: ['PyTorch', 'Object Detection', 'YOLO'],
        projectTemplates: [{ title: 'Real-time Object Detector', description: 'Detect objects in video stream.', deliverable: 'Real-time inference script.' }],
        milestones: ['Train custom detector', 'Measure mAP metric']
      },
      {
        title: 'Phase 3: Edge and Embedded Inference',
        focus: 'Quantize models for mobile or edge deployment.',
        skills: ['ONNX', 'Quantization', 'Inference Optimization'],
        projectTemplates: [{ title: 'Lightweight Inference Engine', description: 'Run model on CPU with low latency.', deliverable: 'Optimized inference module.' }],
        milestones: ['Quantize weights to INT8', 'Benchmark FPS speedup']
      }
    ]
  },
  {
    id: 'nlp-engineer',
    title: 'Natural Language Processing Engineer',
    category: 'AI and Data Science',
    description: 'Builds text classification, information extraction, and conversational NLP pipelines.',
    requiredSkills: ['Python', 'Natural Language Processing', 'Transformers', 'Machine Learning'],
    secondarySkills: ['PyTorch', 'Hugging Face', 'FastAPI', 'Pandas'],
    projectKeywords: ['nlp', 'text', 'transformers', 'tokenization', 'bert', 'sentiment'],
    educationKeywords: ['Computer Science', 'Data Science', 'B.Tech', 'M.Tech'],
    experienceKeywords: ['nlp', 'text', 'language', 'corpus', 'model'],
    defaultPhases: [
      {
        title: 'Phase 1: Text Tokenization and Corpus Cleaning',
        focus: 'Text preprocessing, regex normalization, and n-gram modeling.',
        skills: ['Python', 'NLTK', 'Regex'],
        projectTemplates: [{ title: 'Text Classification Baseline', description: 'Spam and sentiment classification.', deliverable: 'Evaluated classification pipeline.' }],
        milestones: ['Clean text corpus', 'Train TF-IDF classifier']
      },
      {
        title: 'Phase 2: Transformer Fine-Tuning',
        focus: 'Fine-tune BERT / RoBERTa models on labeled domain texts.',
        skills: ['Hugging Face', 'PyTorch', 'Transformers'],
        projectTemplates: [{ title: 'Named Entity Recognition (NER)', description: 'Extract entities from technical text.', deliverable: 'Fine-tuned model weights.' }],
        milestones: ['Fine-tune transformer', 'Evaluate F1 score']
      },
      {
        title: 'Phase 3: Inference API Deployment',
        focus: 'Expose transformer model via REST endpoint with batching.',
        skills: ['FastAPI', 'Docker', 'Latency Optimization'],
        projectTemplates: [{ title: 'Real-time NLP Inference Service', description: 'Low latency API for sentiment and entities.', deliverable: 'Containerized service.' }],
        milestones: ['Containerize NLP model', 'Verify sub-80ms latency']
      }
    ]
  }
];

// Dynamically generate remaining roles to complete 40+ curated CS/engineering roles
const ADDITIONAL_ROLE_TEMPLATES = [
  { id: 'mlops-engineer', title: 'MLOps Engineer (Junior)', cat: 'AI and Data Science', req: ['Python', 'Docker', 'Linux', 'Machine Learning'], sec: ['CI/CD', 'Git', 'FastAPI'] },
  { id: 'deep-learning-researcher', title: 'Deep Learning Research Assistant', cat: 'AI and Data Science', req: ['Python', 'PyTorch', 'Deep Learning', 'NumPy'], sec: ['Mathematics', 'TensorFlow', 'Git'] },
  { id: 'business-intelligence-analyst', title: 'Business Intelligence Analyst', cat: 'AI and Data Science', req: ['SQL', 'Data Analysis', 'Python'], sec: ['Figma', 'PostgreSQL', 'Git'] },
  { id: 'database-administrator', title: 'Database Administrator (Junior)', cat: 'Infrastructure', req: ['SQL', 'PostgreSQL', 'Linux'], sec: ['Docker', 'Python', 'Git'] },
  { id: 'cloud-infrastructure-architect', title: 'Cloud Infrastructure Associate', cat: 'Infrastructure', req: ['Linux', 'AWS', 'Docker'], sec: ['Google Cloud', 'Git', 'CI/CD'] },
  { id: 'systems-software-engineer', title: 'Systems Software Engineer (C / C++)', cat: 'Systems', req: ['C++', 'C', 'Linux', 'Data Structures'], sec: ['Git', 'Python'] },
  { id: 'embedded-systems-engineer', title: 'Embedded Systems Engineer', cat: 'Systems', req: ['C', 'C++', 'Linux'], sec: ['Python', 'Git'] },
  { id: 'iot-developer', title: 'IoT & Firmware Developer', cat: 'Systems', req: ['C', 'Python', 'Linux'], sec: ['Git', 'REST API'] },
  { id: 'site-reliability-engineer', title: 'Site Reliability Engineer (SRE)', cat: 'Infrastructure', req: ['Linux', 'Docker', 'Python'], sec: ['CI/CD', 'Git', 'AWS'] },
  { id: 'network-security-engineer', title: 'Network Security Engineer', cat: 'Security and Systems', req: ['Linux', 'Cybersecurity', 'Networking'], sec: ['Python', 'Git'] },
  { id: 'android-app-developer', title: 'Android Developer (Kotlin)', cat: 'Mobile Development', req: ['Java', 'Android', 'Git'], sec: ['REST API', 'Linux'] },
  { id: 'ios-app-developer', title: 'iOS Developer (Swift)', cat: 'Mobile Development', req: ['iOS', 'Git', 'REST API'], sec: ['TypeScript', 'Testing'] },
  { id: 'sdet-engineer', title: 'Software Development Engineer in Test (SDET)', cat: 'Software Quality', req: ['Java', 'Python', 'Testing', 'Git'], sec: ['CI/CD', 'Docker'] },
  { id: 'backend-go-engineer', title: 'Backend Engineer (Go / Distributed)', cat: 'Web Development', req: ['Go', 'SQL', 'Docker', 'Linux'], sec: ['PostgreSQL', 'Git', 'REST API'] },
  { id: 'backend-java-engineer', title: 'Backend Engineer (Java / Spring Boot)', cat: 'Web Development', req: ['Java', 'SQL', 'Spring Boot'], sec: ['PostgreSQL', 'Git', 'Docker'] },
  { id: 'frontend-vue-engineer', title: 'Frontend Engineer (Next.js / Modern Web)', cat: 'Web Development', req: ['JavaScript', 'TypeScript', 'React', 'HTML/CSS'], sec: ['Next.js', 'Tailwind CSS'] },
  { id: 'ui-ux-design-technologist', title: 'UI/UX Design Technologist', cat: 'Web Development', req: ['HTML/CSS', 'JavaScript', 'Figma'], sec: ['React', 'TypeScript'] },
  { id: 'blockchain-developer', title: 'Blockchain & Smart Contract Developer', cat: 'Emerging Tech', req: ['JavaScript', 'TypeScript', 'Git'], sec: ['Python', 'Linux'] },
  { id: 'game-programmer', title: 'Game Programmer (C++ / Unity)', cat: 'Emerging Tech', req: ['C++', 'Data Structures', 'Git'], sec: ['Python', 'C#'] },
  { id: 'ar-vr-developer', title: 'AR/VR Applications Developer', cat: 'Emerging Tech', req: ['C++', 'Data Structures'], sec: ['Python', 'Git'] },
  { id: 'technical-product-associate', title: 'Associate Technical Product Manager', cat: 'Product & Delivery', req: ['Agile', 'SQL', 'Data Analysis'], sec: ['Figma', 'Git'] },
  { id: 'solutions-architect-associate', title: 'Solutions Architect (Associate)', cat: 'Infrastructure', req: ['AWS', 'Linux', 'SQL', 'Docker'], sec: ['Python', 'REST API'] },
  { id: 'it-systems-analyst', title: 'IT Systems & Support Analyst', cat: 'Infrastructure', req: ['Linux', 'Networking', 'SQL'], sec: ['Python', 'Git'] },
  { id: 'compiler-tools-engineer', title: 'Compiler & Tooling Engineer (Junior)', cat: 'Systems', req: ['C++', 'C', 'Data Structures', 'Linux'], sec: ['Git'] },
  { id: 'robotics-software-engineer', title: 'Robotics Software Engineer', cat: 'Systems', req: ['C++', 'Python', 'Linux'], sec: ['Computer Vision', 'Git'] },
  { id: 'bioinformatics-analyst', title: 'Bioinformatics Computational Analyst', cat: 'AI and Data Science', req: ['Python', 'Data Analysis', 'SQL'], sec: ['Machine Learning', 'Linux'] },
  { id: 'fintech-software-engineer', title: 'Fintech Software Engineer', cat: 'Web Development', req: ['Python', 'SQL', 'PostgreSQL', 'REST API'], sec: ['Docker', 'Git'] },
  { id: 'healthcare-tech-engineer', title: 'HealthTech Systems Developer', cat: 'Web Development', req: ['Java', 'SQL', 'REST API'], sec: ['Python', 'Docker'] },
  { id: 'platform-engineer', title: 'Platform Engineer (Cloud Native)', cat: 'Infrastructure', req: ['Linux', 'Docker', 'Kubernetes', 'Go'], sec: ['Git', 'CI/CD'] },
  { id: 'information-security-officer', title: 'Information Security Analyst', cat: 'Security and Systems', req: ['Cybersecurity', 'Linux', 'Networking'], sec: ['Python'] },
];

ADDITIONAL_ROLE_TEMPLATES.forEach((tmpl) => {
  if (!ROLE_LIBRARY.find((r) => r.id === tmpl.id)) {
    ROLE_LIBRARY.push({
      id: tmpl.id,
      title: tmpl.title,
      category: tmpl.cat,
      description: `Entry-level engineering role focusing on ${tmpl.title.toLowerCase()} practices and technical deliverables.`,
      requiredSkills: tmpl.req,
      secondarySkills: tmpl.sec,
      projectKeywords: ['development', 'implementation', 'system', 'project'],
      educationKeywords: ['Computer Science', 'B.Tech', 'Information Technology', 'B.E.'],
      experienceKeywords: ['engineering', 'developer', 'internship', 'project'],
      defaultPhases: [
        {
          title: 'Phase 1: Core Fundamentals & Tools',
          focus: `Establish proficiency with core tools and languages: ${tmpl.req.slice(0, 2).join(', ')}.`,
          skills: tmpl.req.slice(0, 3),
          projectTemplates: [{ title: `${tmpl.title} Foundation Project`, description: 'Build end-to-end prototype validating foundational capabilities.', deliverable: 'Clean GitHub repository with README and test scripts.' }],
          milestones: ['Complete foundational implementation', 'Document setup and architecture']
        },
        {
          title: 'Phase 2: Applied Engineering and Integration',
          focus: 'Integrate external services and optimize performance.',
          skills: [...tmpl.req.slice(2), ...tmpl.sec.slice(0, 2)],
          projectTemplates: [{ title: `${tmpl.title} Applied Capstone`, description: 'Architect robust system handling error states and edge cases.', deliverable: 'Fully functional system benchmarked under load.' }],
          milestones: ['Implement integration tests', 'Achieve 90%+ reliability']
        },
        {
          title: 'Phase 3: Production Deployment & Best Practices',
          focus: 'Package for production deployment with automated workflows.',
          skills: tmpl.sec.slice(0, 3),
          projectTemplates: [{ title: `${tmpl.title} Production Pipeline`, description: 'Containerize and deploy application with monitoring.', deliverable: 'Live or containerized deployment ready for demonstration.' }],
          milestones: ['Deploy to staging environment', 'Pass security and performance audit']
        }
      ]
    });
  }
});

export const TOTAL_ROLES_COUNT = ROLE_LIBRARY.length;
