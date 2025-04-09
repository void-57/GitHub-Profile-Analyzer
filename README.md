
# 🚀 GitHub Profile Analyzer

A React + TypeScript web app to analyze public GitHub profiles. Users can input a GitHub username to view public repositories, activity metrics, and visualizations like daily and weekly commit charts. Built with Vite and styled using ShadCN UI and Lucide React icons.

Live Demo: _[https://github-profile-analyzer-by-void57.vercel.app]_

---

## 🔧 Tech Stack

- ⚛️ React + TypeScript
- ⚡ Vite
- 💅 ShadCN UI
- 📊 Recharts (for data visualizations)
- 🧠 GitHub REST API

---

## 📁 Folder Structure
```plaintext
GitHub-Profile-Analyzer/  
├── node_modules/ # Project dependencies 
├── public/ # Static assets 
├── src/ 
│ ├── components/ 
│ │ └── ui/ # UI components for GitHub profile display 
│ │ ├── GitHubCommitActivity.tsx 
│ │ ├── GitHubEmptyState.tsx 
│ │ ├── GitHubLoading.tsx 
│ │ ├── GitHubProfileHeader.tsx 
│ │ ├── GitHubReposList.tsx 
│ │ └── GitHubUserCard.tsx 
│ ├── lib/ # Shared logic and styles 
│ │ └── App.css 
│ ├── App.tsx # Main App component 
│ ├── index.css # Global styles 
│ ├── main.tsx # Entry point 
│ └── vite-env.d.ts # Vite + TypeScript environment types 
├── index.html # HTML entry point 
├── .gitignore # Git ignore rules 
├── components.json # ShadCN UI component config 
├── eslint.config.js # ESLint configuration 
├── package.json # Project metadata and dependencies 
├── package-lock.json # Dependency lockfile 
├── tsconfig.json # TypeScript configuration 
├── tsconfig.app.json # TypeScript config for app files 
├── tsconfig.node.json # TypeScript config for node scripts 
├── vite.config.ts # Vite build configuration 
└── README.md # Project documentation
```
---

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/void-57/GitHub-Profile-Analyzer.git
   cd GitHub-Profile-Analyzer
   ```
2. **Install dependencies**
   ```bash
   npm install
   # or 
   yarn install
   ```

### (Optional) Add GitHub Token

To avoid API rate limits, create a `.env` file in the root directory with the following content:

```ini
VITE_GITHUB_TOKEN=your_personal_access_token
```
You can generate a token here: https://github.com/settings/tokens

### ▶️ Run the Development Server
```bash
npm run dev
# or
yarn dev
```
Then open: http://localhost:5173
## 🌍 Deployment

### 🚀 Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and log in with your GitHub account.
2. Click **"New Project"** and import your GitHub repository.
3. Vercel will auto-detect the **Vite** setup.

Set the following in the project settings:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`

> ✅ **Optional**: Add `VITE_GITHUB_TOKEN` in Vercel’s Environment Variables for improved GitHub API limits.

4. Click **Deploy** — your app is live!
## 📸 Screenshots

_Add UI screenshots once available._

---

## 🧪 Features

- 🔍 Enter a GitHub username to fetch data  
- 📂 Display public repositories  
- 📊 View commit activity by day (on repo selection)  
- 📅 Weekly commit chart  
- 🎨 Polished UI with ShadCN and Lucide Icons  

---

## ❓ FAQs

**Q: Why is some data missing?**  
A: GitHub API limits unauthenticated requests. Add a token in `.env` to improve limits.

**Q: Can I use this commercially?**  
A: Yes, it's licensed under the MIT License.

---

## 📄 License

Licensed under the **MIT License**.

---

## 👥 Contributors

**void-57** — Developer & Maintainer

---

## 🙌 Acknowledgements

- GitHub REST API  
- ShadCN UI  
- Recharts  
- Lucide Icons  

---

## 📬 Feedback

Found a bug or have a feature request?  
Open an issue or create a PR.

---

**Happy Coding! 💻✨**

