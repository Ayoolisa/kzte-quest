# KZTE Quest: Learn & Earn

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A gamified loyalty and educational platform to drive adoption of the KZTE stablecoin. Users complete quests to learn about KZTE and blockchain technology, earning rewards and strengthening community engagement.

  
*Note: Replace the image URL above with a real screenshot of your application.*

---

## 🚀 About The Project

KZTE Quest is an interactive web application designed to educate users about the **KZTE stablecoin**, a digital asset backed 1:1 by the Kazakhstani Tenge. The platform takes a "Learn & Earn" approach, gamifying the educational process to make it engaging and rewarding.

The core mission is to lower the barrier to entry for understanding blockchain technology and stablecoins, fostering a knowledgeable and active community around the KZTE ecosystem. This project was built to demonstrate a modern, user-friendly interface powered by React and the Google Gemini API for its intelligent chatbot feature.

### ✨ Key Features

*   **Interactive Quests:** Engaging quizzes and tasks categorized into 'Learn & Earn', 'Social Engagement', and 'Ecosystem Integration'.
*   **Reward System:** Earn KZTE tokens and Quest Points (QP) for completing quests.
*   **Real-time Progress Tracking:** A dynamic progress bar shows users their overall completion percentage.
*   **Instant Notifications:** Non-intrusive toast notifications provide immediate feedback on rewards earned.
*   **AI-Powered Helper:** A friendly chatbot, powered by the **Google Gemini API**, is available to answer user questions about KZTE, blockchain, and the quests.
*   **Modern & Responsive UI:** Built with Tailwind CSS for a clean, intuitive, and mobile-friendly experience.

---

## 🛠️ Built With

This project is built with a modern frontend stack:

*   **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
*   **[TypeScript](https://www.typescriptlang.org/)**: Static typing for robust and maintainable code.
*   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
*   **[@google/genai](https://www.npmjs.com/package/@google/genai)**: The official Google Gemini API client for the AI chatbot.

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm (or yarn) installed on your machine.
*   [Node.js](https://nodejs.org/) (which includes npm)

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/Ayoolisa/kzte-quest.git
    cd kzte-quest
    ```
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Set up Environment Variables**
    You'll need a Google Gemini API key to run the chatbot feature. Create a `.env` file in the root of your project and add your key:
    ```
    API_KEY=YOUR_GEMINI_API_KEY
    ```
    *Note: In the development environment this project is hosted on, this key might be injected automatically.*

4.  **Run the application**
    ```sh
    npm start
    ```
    This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 📂 Project Structure

The project is organized with a clear and scalable component-based structure:

```
/
├── public/              # Static assets and index.html
├── src/
│   ├── components/      # Reusable React components (Header, QuestCard, etc.)
│   ├── services/        # API service clients (e.g., geminiService.ts)
│   ├── App.tsx          # Main application component and state management
│   ├── constants.ts     # Static data like quest definitions
│   ├── index.tsx        # Entry point of the React application
│   └── types.ts         # TypeScript type definitions and enums
├── .env                 # Environment variables (API keys) - not committed
├── package.json         # Project dependencies and scripts
└── README.md            # This file
```

---

## 🧭 How You Can Contribute

Choose the format that best fits your skills:

1.  **Idea / Concept**
    *   Up to 1 page of description
    *   You can include diagrams or references

2.  **Prototype / Project**
    *   Figma design, demo, or MVP
    *   Brief description of architecture or UX

3.  **Research / Analytics**
    *   Case study on KZTE adoption in a specific niche
    *   Analysis of benefits, risks, and implementation scenarios

---

## 📄 License

Distributed under the MIT License.

---

## 🙏 Acknowledgements

*   **Superteam KZ & Intebix** for the inspiration behind the KZTE stablecoin.
*   The creators of the frameworks and libraries used in this project.