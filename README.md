# Shopping List App Automation

## 🔍 Overview
This project demonstrates automated UI and API testing using Playwright for a simple shopping list app with a React frontend and Node.js backend.

---

## 📦 Tech Stack
- **Frontend:** React (with inline styling)
- **Backend:** Node.js + Express
- **Testing:** Playwright (UI + API), Page Object Model structure
- **CI:** GitHub Actions (optional)

---

## 🧰 Prerequisites
You don't need advanced tools like VS Code, but you do need:

### 🔹 Windows/macOS/Linux with:
- [Node.js](https://nodejs.org/en/download) (v18 recommended)
- A terminal like:
  - macOS: Terminal
  - Windows: Command Prompt or PowerShell
  - Linux: Your default shell

You can check if Node.js is installed by running:
```bash
node -v
npm -v
```
If not installed, download it from the link above and install.

---

## 🚀 Getting Started (Step by Step)

### 1️⃣ Clone or Extract the Project
If you downloaded a `.zip`:
- Right-click → Extract All → open folder

If using Git:
```bash
git clone <your-repo-url>
cd shopping-list-automation
```

### 2️⃣ Install Backend Dependencies
```bash
cd server
npm install
node index.js
```
Your server should now be running at: [http://localhost:5000](http://localhost:5000)

### 3️⃣ Install Frontend Dependencies
Open a new terminal:
```bash
cd client
npm start
```
Your app should be running at: [http://localhost:3000](http://localhost:3000)

### 4️⃣ Set Up Playwright
Back in the root folder:
```bash
1. Install all dependencies for project:
   npm i

2. Install all browsers for playwright:
   npx playwright install
```

### 5️⃣ Run UI and API Tests
```bash
npx playwright test
```
- Run specific file:
```bash
npx playwright test tests/ui/login.spec.ts
```

### 6️⃣ View Test Report
```bash
npx playwright show-report
```

---

## 🤝 Author
Desmond

If you face issues, feel free to restart terminals or check if ports 3000 and 5000 are free.
