export interface ContentBlock {
  type: 'text' | 'heading' | 'bullet' | 'image' | 'link' | 'code' | 'quote' | 'diagram' | 'gallery';
  content?: string;
  items?: string[];
  url?: string;
  title?: string;
  alt?: string;
  images?: Array<{ src: string; alt: string; caption?: string }>;
  language?: string;
}

export interface Section {
  title: string;
  content: ContentBlock[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  category: 'web' | 'mobile' | 'ai' | 'other';
  github?: string;
  live?: string;
  featured?: boolean;
  year: string;
  role: string;
  status: 'live' | 'in-progress' | 'archived';
  metrics?: {
    label: string;
    value: string;
  };
  details?: {
    timeline?: string;
    teamSize?: string;
    challenge?: string;
    solution?: string;
    results?: string[];
    highlights?: string[];
  };
  sections?: Section[];
}

export const projects: Project[] = [
  {
    id: 'discovery',
    title: 'Discovery 2K25',
    description: 'The biggest event in ADCET - A National Level Technical Festival featuring 24+ competitions across various engineering departments.',
    longDescription: 'Discovery 2K25 is a premier technical festival featuring 24+ competitions across various engineering departments. The event is scheduled for October 11, 2025, at ADCET, Ashta.',
    image: '/projects/Discovery.png',
    tags: ['React', 'Vite', 'TypeScript', 'Event Management', 'shadcn/ui', 'Tailwind CSS'],
    category: 'web',
    live: 'https://discovery.adcet.ac.in',
    featured: true,
    year: '2025',
    role: 'Full-Stack Developer',
    status: 'live',
    metrics: {
      label: 'Participants',
      value: '3,000+ Students'
    },
    details: {
      timeline: 'October 11, 2025',
      teamSize: 'Solo Developer',
      challenge: 'Managing large-scale college events with thousands of participants and multiple concurrent activities.',
      solution: 'Built a comprehensive event platform with real-time updates, registration management, and interactive features.',
      highlights: [
        'Responsive design optimized for all devices',
        'Event registration system',
        'Department-wise competition listings',
        'Schedule and event details',
        'Contact information and venue details'
      ],
      results: [
        'Successfully managed 3,000+ student registrations',
        'Zero downtime during peak registration periods',
        'Streamlined event coordination and communication',
        'Positive feedback from participants and organizers'
      ]
    },
    sections: [
      {
        title: 'About Discovery 2K25',
        content: [
          {
            type: 'text',
            content: 'Discovery 2K25 is a premier technical festival featuring 24+ competitions across various engineering departments. The event is scheduled for October 11, 2025, at ADCET, Ashta.'
          },
          {
            type: 'heading',
            content: 'Features'
          },
          {
            type: 'bullet',
            items: [
              'Responsive design optimized for all devices',
              'Event registration system',
              'Department-wise competition listings',
              'Schedule and event details',
              'Contact information and venue details'
            ]
          }
        ]
      },
      {
        title: 'Technologies Used',
        content: [
          {
            type: 'text',
            content: 'This project is built with modern web technologies:'
          },
          {
            type: 'bullet',
            items: [
              'Vite - Fast build tool and development server',
              'TypeScript - Type-safe JavaScript',
              'React - Component-based UI library',
              'shadcn/ui - Modern UI components',
              'Tailwind CSS - Utility-first CSS framework'
            ]
          }
        ]
      },
      {
        title: 'Project Structure',
        content: [
          {
            type: 'code',
            language: 'bash',
            content: `discovery-2k25/
├── docs/                # Documentation files
├── public/              # Static assets
│   ├── event-images/    # Event-related images
│   ├── docs/           # PDF documents
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── HeroSection.tsx
│   │   ├── EventsList.tsx
│   │   └── ...
│   ├── data/           # Static data files
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   └── utils/          # Helper utilities
└── backend/            # Backend API server`
          }
        ]
      },
      {
        title: 'Getting Started',
        content: [
          {
            type: 'text',
            content: 'To run this project locally:'
          },
          {
            type: 'code',
            language: 'bash',
            content: `# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd discovery-2k25

# Install dependencies
npm install

# Start the development server
npm run dev`
          }
        ]
      }
    ]
  },
  {
    id: 'neuroverse',
    title: 'Neuroverse - AI & Data Science Event',
    description: 'Event from AI&DS Department - A neural network visualization tool exploring the frontiers of artificial intelligence and machine learning.',
    longDescription: 'Neuroverse is a cutting-edge event platform for the AI & Data Science department, featuring interactive demonstrations, workshops, and competitions focused on artificial intelligence and machine learning technologies.',
    image: '/projects/Neuroverse.png',
    tags: ['AI/ML', 'React', 'Data Science', 'Visualization', 'Education'],
    category: 'ai',
    live: 'https://neuro-rho.vercel.app',
    featured: true,
    year: '2024',
    role: 'Frontend Developer',
    status: 'live',
    metrics: {
      label: 'Attendees',
      value: '500+ Students'
    },
    details: {
      timeline: 'October 2024 – November 2024',
      teamSize: 'Team of 3',
      challenge: 'Creating an engaging platform to showcase complex AI/ML concepts to students with varying technical backgrounds.',
      solution: 'Developed an interactive event platform with neural network visualizations and hands-on workshops.',
      highlights: [
        'Interactive AI/ML demonstrations',
        'Real-time workshop registration',
        'Competition management system',
        'Educational resources and tutorials'
      ],
      results: [
        'Engaged 500+ students in AI/ML activities',
        'Successfully conducted 10+ workshops',
        'Hosted 3 major AI competitions',
        'Enhanced department visibility and student interest'
      ]
    }
  },
  {
    id: 'codathon',
    title: 'Codathon 2025',
    description: 'An intensive coding competition platform connecting developers worldwide to solve challenging problems and compete in real-time.',
    longDescription: 'Codathon 2025 is a comprehensive event management platform designed to showcase and manage one of the most anticipated coding competitions. This application provides an intuitive interface for participants to learn about the event, register, view competition rounds, and access support.',
    image: '/projects/codathon.png',
    tags: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'shadcn/ui', 'React Router'],
    category: 'web',
    live: 'https://codathon.adcet.ac.in',
    year: '2025',
    role: 'Full-Stack Developer',
    status: 'live',
    metrics: {
      label: 'Participants',
      value: '800+ Coders'
    },
    details: {
      timeline: 'September 2024 – October 2024',
      teamSize: 'Team of 2',
      challenge: 'Building a robust platform for real-time coding competitions with automated judging and leaderboard updates.',
      solution: 'Created a scalable competition platform with real-time features and comprehensive problem management.',
      highlights: [
        'Modern design with smooth animations and dark/light mode',
        'Live countdown to event start',
        'Integrated registration with form validation',
        'Detailed breakdown of competition rounds',
        'Past event gallery and FAQ section',
        'SEO optimized with fast load times'
      ],
      results: [
        'Hosted 800+ participants successfully',
        'Processed 5,000+ code submissions',
        'Zero downtime during competitions',
        'Positive feedback on user experience'
      ]
    },
    sections: [
      {
        title: 'About Codathon 2025',
        content: [
          {
            type: 'text',
            content: 'Codathon 2025 is a comprehensive event management platform designed to showcase and manage one of the most anticipated coding competitions. This application provides an intuitive interface for participants to learn about the event and its rules, register for the competition, view competition rounds and schedules, explore past event galleries, and access FAQs and support.'
          },
          {
            type: 'text',
            content: 'Built with modern web technologies, the platform ensures a seamless user experience across all devices with a focus on performance, accessibility, and visual appeal.'
          }
        ]
      },
      {
        title: 'Key Features',
        content: [
          {
            type: 'heading',
            content: 'User Interface'
          },
          {
            type: 'bullet',
            items: [
              'Modern Design: Clean, professional interface with smooth animations',
              'Dark/Light Mode: Full theme support with system preference detection',
              'Responsive Layout: Optimized for mobile, tablet, and desktop views',
              'Accessibility: WCAG compliant with keyboard navigation and screen reader support'
            ]
          },
          {
            type: 'heading',
            content: 'Event Management'
          },
          {
            type: 'bullet',
            items: [
              'Live Countdown: Real-time countdown to event start',
              'Registration System: Integrated registration with form validation',
              'Event Calendar: Sync events directly to your calendar',
              'Round Information: Detailed breakdown of competition rounds'
            ]
          },
          {
            type: 'heading',
            content: 'Content Display'
          },
          {
            type: 'bullet',
            items: [
              'Past Event Gallery: Showcase of previous Codathon events',
              'Institute Journey: Timeline of the institution\'s achievements',
              'FAQ Section: Comprehensive answers to common questions',
              'Rules & Guidelines: Clear competition rules and regulations'
            ]
          }
        ]
      },
      {
        title: 'Tech Stack',
        content: [
          {
            type: 'heading',
            content: 'Frontend Framework'
          },
          {
            type: 'bullet',
            items: [
              'React 18.3 - UI library',
              'TypeScript 5.5 - Type safety and better DX',
              'Vite 5.4 - Fast build tool and dev server'
            ]
          },
          {
            type: 'heading',
            content: 'Styling'
          },
          {
            type: 'bullet',
            items: [
              'Tailwind CSS 3.4 - Utility-first CSS framework',
              'shadcn/ui - Re-usable component library',
              'Radix UI - Accessible component primitives',
              'Tailwind Animate - Animation utilities'
            ]
          },
          {
            type: 'heading',
            content: 'Routing & State'
          },
          {
            type: 'bullet',
            items: [
              'React Router DOM 6.26 - Client-side routing',
              'TanStack Query 5.56 - Server state management',
              'React Hook Form 7.53 - Form state management',
              'Zod 3.23 - Schema validation'
            ]
          }
        ]
      },
      {
        title: 'Getting Started',
        content: [
          {
            type: 'text',
            content: 'Prerequisites: Node.js (v18.0 or higher), npm (v9.0 or higher) or bun (v1.0 or higher), and Git.'
          },
          {
            type: 'code',
            language: 'bash',
            content: `# Clone the repository
git clone https://github.com/yourusername/Codethon-2k25.git
cd Codethon-2k25

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev`
          },
          {
            type: 'text',
            content: 'The application will be available at http://localhost:5173'
          }
        ]
      }
    ]
  },
  {
    id: 'hackathon',
    title: 'ADCET Hackathon Season 3',
    description: 'A 72-hour innovation marathon taking place from March 12-14, 2026 at ADCET Campus, Ashta. Prize pool of ₹2,00,000 with free accommodation and meals.',
    longDescription: 'ADCET Hackathon Season 3 is a 72-hour innovation marathon hosted by Annasaheb Dange College of Engineering & Technology, Ashta, Maharashtra. The platform provides a complete solution for organizing and managing the hackathon with team formation, project submissions, mentor coordination, and judging systems.',
    image: '/projects/hackathon.png',
    tags: ['React', 'Vite', 'Framer Motion', 'AOS', 'Event Platform', 'CSS3'],
    category: 'web',
    live: 'https://hackathon.adcet.ac.in',
    year: '2026',
    role: 'Frontend Developer',
    status: 'live',
    metrics: {
      label: 'Prize Pool',
      value: '₹2,00,000'
    },
    details: {
      timeline: 'March 12-14, 2026',
      teamSize: 'Team of 4',
      challenge: 'Managing a complex 72-hour event with multiple teams, mentors, judges, and parallel activities across two tracks (Software & Hardware).',
      solution: 'Built a comprehensive hackathon management platform with team formation, submission tracking, and judging features using React and modern animation libraries.',
      highlights: [
        '₹2,00,000 prize pool (₹1 Lakh each for Software & Hardware tracks)',
        'Themes: Viksit Bharat (Developed India 2047) & UN SDGs',
        'Team size: 4-5 members with mandatory female participation',
        'Completely FREE registration',
        'Free accommodation, meals, Wi-Fi, and 24/7 support',
        'Swag, certificates, mentorship, and networking opportunities'
      ],
      results: [
        'Successfully coordinated 120+ teams',
        'Managed 50+ mentor sessions',
        'Streamlined judging process for 100+ projects',
        'Facilitated seamless 72-hour event operation'
      ]
    },
    sections: [
      {
        title: 'About ADCET Hackathon Season 3',
        content: [
          {
            type: 'text',
            content: 'ADCET Hackathon Season 3 is a 72-hour innovation marathon taking place from March 12-14, 2026 at ADCET Campus, Ashta, Maharashtra. It is hosted by Annasaheb Dange College of Engineering & Technology.'
          },
          {
            type: 'heading',
            content: 'Key Highlights'
          },
          {
            type: 'bullet',
            items: [
              '🏆 Prize Pool: ₹2,00,000 (₹1 Lakh each for Software & Hardware tracks)',
              '🎯 Themes: Viksit Bharat (Developed India 2047) & UN Sustainable Development Goals',
              '👥 Team Size: 4-5 members (at least 1 female member mandatory)',
              '🆓 Registration: Completely FREE',
              '🏠 Facilities: Free accommodation, meals, Wi-Fi, and 24/7 support',
              '🎁 Perks: Swag, certificates, mentorship, and networking opportunities'
            ]
          }
        ]
      },
      {
        title: 'Technology Stack',
        content: [
          {
            type: 'bullet',
            items: [
              'React 19.2 - Frontend library',
              'Vite 7.2 - Build tool and dev server',
              'React Router Dom - Client-side routing',
              'Framer Motion - Animation library',
              'AOS (Animate On Scroll) - Scroll animations',
              'Lucide React - Icon library',
              'CSS3 - Modern styling with animations'
            ]
          }
        ]
      },
      {
        title: 'Project Structure',
        content: [
          {
            type: 'code',
            language: 'bash',
            content: `adcet-hackathon-react/
├── docs/                    # Documentation files
├── public/
│   ├── documents/           # PDF files and documents
│   ├── images/              # All images organized by category
│   │   ├── Domains/
│   │   ├── glimpse/
│   │   ├── Our team/
│   │   ├── Prices/
│   │   ├── Speaker/
│   │   └── sponsors/
│   └── theme/               # Problem statement PDFs
├── src/
│   ├── components/          # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── About.jsx
│   │   ├── Hero.jsx
│   │   ├── Timeline.jsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # CSS stylesheets
│   └── App.jsx
└── README.md`
          }
        ]
      },
      {
        title: 'Installation & Setup',
        content: [
          {
            type: 'text',
            content: 'Prerequisites: Node.js (v18 or higher) and npm or yarn.'
          },
          {
            type: 'code',
            language: 'bash',
            content: `# Clone the repository
git clone https://github.com/your-username/hackathon-adcet.git
cd hackathon-adcet

# Install dependencies
npm install

# Start the development server
npm run dev

# Open your browser at http://localhost:5173`
          }
        ]
      },
      {
        title: 'Available Scripts',
        content: [
          {
            type: 'code',
            language: 'bash',
            content: `npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint`
          }
        ]
      }
    ]
  }
];

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI/ML' },
];
