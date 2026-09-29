// Sample resume fixtures for immediate testing and demonstration

export interface SampleResume {
  id: string;
  name: string;
  fileName: string;
  fileType: 'pdf' | 'docx' | 'txt';
  targetRole: string;
  content: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'sample-cs-student',
    name: 'Alex Chen (CS Student / Junior Engineer)',
    fileName: 'Alex_Chen_Resume.pdf',
    fileType: 'pdf',
    targetRole: 'Software Engineer',
    content: `Alex Chen
San Francisco, CA | (555) 234-5678 | alex.chen@email.com | linkedin.com/in/alexchen-dev | github.com/alexchen-dev

EDUCATION
University of California, Berkeley
Bachelor of Science in Computer Science, Expected May 2026
GPA: 3.82 / 4.0
Relevant Coursework: Data Structures, Algorithms, Operating Systems, Database Systems, Computer Security, Software Engineering

SKILLS
Programming Languages: Python, TypeScript, JavaScript, Java, C++, SQL
Frameworks & Libraries: React, Node.js, Express, Next.js, Tailwind CSS, Jest, Pandas
Developer Tools: Git, GitHub, Docker, PostgreSQL, REST APIs, Linux, Vite

EXPERIENCE
Frontend Developer Intern | Meridian Labs
May 2025 - August 2025 | Remote
* Engineered responsive customer portal features using React and TypeScript, serving 14,000 monthly active users.
* Reduced initial page bundle size by 34% by refactoring monolithic imports into dynamic code-split components.
* Implemented optimistic UI updates and React Query caching, decreasing perceived API response latency by 220ms.
* Collaborated with 4 senior engineers in bi-weekly agile sprints and participated in 28 code reviews.

Undergraduate Teaching Assistant | UC Berkeley EECS Department
January 2025 - May 2025 | Berkeley, CA
* Led weekly discussion lab sections for 45 students in CS61B Data Structures and Algorithms.
* Assisted students with debugging Java implementations of graphs, red-black trees, and hash maps during 6 weekly office hours.
* Designed and automated grading test scripts with JUnit, cutting homework grading turnaround time by 40%.

PROJECTS
QueryLens: SQL Query Optimization Visualizer | TypeScript, React, Node.js, PostgreSQL
September 2024 - December 2024
* Developed full-stack tool that parses PostgreSQL EXPLAIN plans and renders visual bottleneck trees with node runtime metrics.
* Designed indexing recommendation engine that identified missing composite keys, improving test query execution speed by 58%.
* Built automated REST API backend with Express and deployed application on containerized Linux host with GitHub Actions CI.

CampusPulse: Event Discovery Web Platform | Python, FastAPI, React, SQLite
January 2024 - April 2024
* Built university event aggregator indexing 300+ campus club announcements with full-text search filtering.
* Integrated Google Calendar API sync to allow students to export schedules with single-click authentication.
* Achieved 98% test coverage across backend endpoints using pytest.`
  },
  {
    id: 'sample-early-career',
    name: 'Jordan Taylor (Self-Taught / Early Career)',
    fileName: 'Jordan_Taylor_CV.docx',
    fileType: 'docx',
    targetRole: 'Frontend Developer',
    content: `Jordan Taylor
Seattle, WA
jordan.taylor@email.com
github.com/jtaylor-code

Summary
Motivated junior web developer with passion for building clean user interfaces. Looking for junior software engineering roles to contribute my problem solving skills.

Work History
Junior Web Intern - Pioneer Studio (June 2024 to November 2024)
- Assisted senior team with website updates using HTML, CSS, and basic JavaScript.
- Worked on fixing bugs in client WordPress and Shopify templates.
- Helped improve mobile responsiveness on client landing pages.
- Handled daily client ticket requests and communicated with designers.

Customer Support Specialist - TechFlow Inc (January 2023 to May 2024)
- Answered customer inquiries via email and chat regarding software issues.
- Documented 50+ common troubleshooting steps in internal knowledge base.
- Escalated bugs to engineering team with reproducible steps.

Projects
Personal Task Board
- Created task tracker app using JavaScript and local storage.
- Allowed users to add, edit, and delete daily tasks with categories.

Weather Dashboard App
- Built a weather forecast site fetching data from OpenWeather API using vanilla JavaScript.
- Displayed 5-day weather forecasts with location lookup.

Skills
HTML, CSS, JavaScript, Git, WordPress, Responsive Design, Communication, Problem Solving

Education
Community College of Seattle
Associate of Arts, General Studies (2022)`
  }
];
