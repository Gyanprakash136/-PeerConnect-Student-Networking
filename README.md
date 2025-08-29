# 🚀 PeerConnect – Student Networking & Collaboration Platform

PeerConnect is a web platform that helps students **discover peers, form teams, and collaborate on hackathons or projects**.  
It’s built with **React, TailwindCSS, Framer Motion, and Firebase** to provide **real-time chat, team formation, and networking features**.

![PeerConnect Demo](demo.gif) <!-- Replace with your GIF or screenshot -->

---

## 📖 Table of Contents
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Firebase Setup](#firebase-setup)
- [📂 Project Structure](#-project-structure)
- [🧑‍💻 Contribution](#-contribution)
- [✅ Future Improvements](#-future-improvements)

---

## ✨ Features
- 🔑 Secure **authentication** with Firebase  
- 🧑‍🤝‍🧑 **User discovery** – find peers with similar interests  
- 💬 **Real-time chat** with Firestore  
- 👥 **Team formation** for hackathons & projects  
- 🎨 Smooth, responsive **UI with animations** (Tailwind + Framer Motion)  
- ☁️ **Firebase backend** – Firestore, Auth, Storage, Cloud Functions  

---

## 🛠 Tech Stack
- **Frontend**: React 19, TailwindCSS, Framer Motion  
- **Backend**: Firebase (Auth, Firestore, Cloud Functions, Storage)  
- **Deployment**: GitHub Pages

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>=18)  
- A Firebase project with Firestore + Auth enabled  

### Installation
```bash
# Clone the repo
git clone https://github.com/Gyanprakash136/-PeerConnect-Student-Networking.git
cd PeerConnect-Student-Networking

# Install dependencies
npm install

# Start the dev server
npm run dev
Firebase Setup
Create a Firebase project in the Firebase Console.

Enable Authentication (Email/Google), Firestore, and Storage.

Add your Firebase config to /src/firebase.js.

📂 Project Structure
bash
Copy code
/src
  /components   -> Reusable UI components
  /pages        -> React pages (Home, Chat, Teams, etc.)
  /utils        -> Helpers & Firebase config
  App.js
  index.js



🧑‍💻 Contribution
This project was primarily built by Gyan Prakash.
Key contributions include:

⚛️ React frontend with Tailwind + Framer Motion animations

🔑 Firebase authentication & Firestore integration

💬 Real-time chat & team formation logic


✅ Future Improvements
🎥 Add video calls / screen sharing

🤖 Smarter peer matching (recommendation system)

📱 Mobile-first PWA version
