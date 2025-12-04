# AI Snippet — Frontend

This repository contains the **frontend of the AI Snippet Generator**, a **full-stack AI-powered application** that generates useful **code snippets or text content** from user prompts.

The frontend provides the user interface where users submit prompts and instantly receive AI-generated snippets from the backend API.

---

## 🌐 Project Links

- **Frontend Repo:** https://github.com/ManikaKutiyal/ai-snippet-frontend  
- **Backend Repo:** https://github.com/ManikaKutiyal/ai-snippet-backend  
- **Live Backend API:** https://ai-snippet-backend.vercel.app/

---

## 📌 What is this project?

AI Snippet is a full-stack AI tool that allows users to:

- Enter a natural-language prompt
- Send that prompt to an AI-powered backend
- Receive a generated **code snippet or content response**
- View the result instantly in the UI

This frontend app is built with **React + Vite** and connects directly to a deployed **Node + Express backend** that handles prompt processing and AI generation.

---

## ✨ Features

- Prompt input box for custom queries  
- Real-time AI snippet generation  
- API integration with backend server  
- Clean & responsive user interface  
- Fast performance using Vite bundler  
- Mobile-friendly layout  

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- AI / LLM API integration

---

## 🚀 Run Locally

```bash
# Clone the frontend repository
git clone https://github.com/ManikaKutiyal/ai-snippet-frontend.git

# Navigate to project folder
cd ai-snippet-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The local server will start at:
```
http://localhost:5173
```
🔌 Backend Connection

By default, the frontend connects to the deployed backend:
```
https://ai-snippet-backend.vercel.app/
```

To use a local backend, update the API base URL in the frontend source to:
```
http://localhost:5000
```
🔄 How it Works

User enters a prompt in the UI

Frontend sends the prompt → backend API

Backend processes the prompt using AI logic

Generated snippet is returned as JSON

Frontend displays the result instantly

📁 Project Structure
src/
 ├── components/
 ├── App.jsx
 └── main.jsx

Author

Manika Kutiyal
