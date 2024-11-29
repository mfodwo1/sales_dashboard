# 🚀 Next.js Application: Login and Dashboard

A **Next.js** project featuring a secure login page and dashboard to display reports.  
This application is styled with **Tailwind CSS** and includes unit tests using **Jest**.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Deployment](#deployment)
- [API References](#api-references)
- [Testing](#testing)
- [GitHub Repository](#github-repository)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [CI/CD Pipeline](#cicd-pipeline)
- [License](#license)

---

## 🛠️ Getting Started

### Prerequisites

Ensure the following tools are installed on your system:

- **Node.js**: v18+ (Recommended)
- A package manager: `npm`, `yarn`, `pnpm`, or `bun`

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   Install dependencies:
   bash
   Copy code
   npm install
   ```

# or

yarn install

# or

pnpm install

# or

bun install
Running Locally
Start the development server:
bash
Copy code
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev
Open your browser and navigate to http://localhost:3000.
🌟 Features
🔑 Login Page
Secure authentication using react-hook-form and JWT.
API integration:
Authentication API.
📊 Dashboard
Protected route: Accessible after login.
Fetches and displays reports from:
Report API.
Responsive design with Tailwind CSS.
🚀 Deployment
The application is deployed on Vercel:
Live Application

📖 API References
Authentication API:
Docs
Report Fetching API:
Docs
🧪 Testing
Frameworks: Jest, React Testing Library.
Key test cases:
Login functionality
Report fetching and display
Component rendering with mock data
To run tests:

bash
Copy code
npm test
🗂️ GitHub Repository
Access the full codebase:
GitHub Repository

Invite kofi-teddy as a collaborator.

🔧 Environment Variables
Create a .env file and include the following:

env
Copy code
NEXTAUTH_SECRET=VFuNaRHzBVJZD+I2ZqsT20mSNV+Kc+o+Fv0g4O4HHtk=
NEXTAUTH_URL=http://localhost:3000
🛠️ Technologies Used
Next.js: Framework for building server-rendered React apps.
TypeScript: Type-safe development.
Tailwind CSS: Utility-first styling.
Axios: Simplified API requests.
react-hook-form: Efficient form handling.
Jest: Testing framework.
GitHub Actions: CI/CD pipeline.
🛡️ CI/CD Pipeline
Automated with GitHub Actions:

Linting and formatting checks
Running tests before merging
📜 License
This project is licensed under the MIT License.

Enjoy exploring the project! 🎉
