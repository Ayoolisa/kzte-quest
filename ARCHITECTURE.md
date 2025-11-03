# KZTE Quest: Architecture & UX Overview

---

This document provides a technical overview of the KZTE Quest application's frontend architecture and its core user experience (UX) flow.

### 1. Frontend Architecture

The application is built as a modern single-page application (SPA) using React, emphasizing a clean, scalable, and component-based structure.

#### **Core Technologies**
*   **React 18:** The foundation for building the user interface declaratively.
*   **TypeScript:** Ensures type safety, leading to more robust code, better autocompletion, and easier maintenance.
*   **Tailwind CSS:** A utility-first CSS framework that allows for rapid and consistent styling directly within the JSX, avoiding the need for separate CSS files.
*   **@google/genai:** The official SDK for interacting with the Google Gemini API, powering the AI helper.

#### **Component-Based Structure (`src/components`)**
The UI is broken down into logical, reusable components, each with a single responsibility:
*   `Header.tsx`: Displays the main navigation, user balances (KZTE & QP).
*   `QuestList.tsx`: Renders a section for a specific quest category, containing multiple `QuestCard` components.
*   `QuestCard.tsx`: A self-contained card representing a single quest, showing its title, description, rewards, and completion status.
*   `QuestModal.tsx`: A modal dialog that presents the detailed content of a quest, handles user interaction (e.g., quiz answers), and manages the completion flow.
*   `Chatbot.tsx`: The floating action button and chat window for the AI helper.

#### **State Management (`App.tsx`)**
For this application's scope, state is managed centrally within the main `App.tsx` component using standard React Hooks. This avoids the complexity of external libraries like Redux or Zustand.
*   `useState`: Manages all primary state variables, including `userBalance`, `questPoints`, `completedQuests` (a `Set` for efficient lookups), `activeQuest` (for the modal), and `toasts`.
*   `useCallback`: Memoizes handler functions like `handleStartQuest`, `handleCloseModal`, and `handleCompleteQuest` to prevent unnecessary re-renders of child components.
*   `useMemo`: Memoizes the computationally inexpensive-but-demonstrative grouping of quests by category, ensuring this logic only re-runs if the source `QUESTS` constant were to change.

**Data Flow:**
State flows unidirectionally. `App.tsx` holds the "source of truth" and passes data down to child components as props. Child components communicate back up to `App.tsx` by invoking callback functions passed down as props (e.g., `onStartQuest`, `onComplete`).

#### **Services (`src/services`)**
External API interactions are abstracted into a dedicated services layer.
*   `geminiService.ts`: Contains the `askKzteHelper` function, which encapsulates all logic for communicating with the Google Gemini API. This includes initializing the client, formatting the history, sending the prompt, and handling potential errors. This separation of concerns keeps the UI components clean and focused on rendering.

---

### 2. User Experience (UX) Flow

The UX is designed to be intuitive, rewarding, and encouraging, guiding the user through their learning journey with clear feedback at every step.

1.  **Landing & Onboarding:**
    *   The user arrives on the main screen and is immediately presented with a clear overview: the header shows their starting balances, a prominent progress bar visualizes their overall journey, and quests are neatly organized by category.
    *   This initial view answers the questions: "Where am I?" and "What can I do?".

2.  **Quest Interaction Cycle:**
    *   **Discovery:** The user browses the `QuestCard` components. Each card clearly communicates the task, its description, and the potential rewards.
    *   **Initiation:** The user clicks the "Start Quest" button. This action calls the `handleStartQuest` function in `App.tsx`, setting the `activeQuest` state.
    *   **Engagement:** The `QuestModal` appears, providing a focused environment for the quest. The user either reads the informational content or interacts with the quiz options.
    *   **Action & Feedback (Quiz):** For quizzes, clicking an answer provides immediate visual feedback: green for correct, red for incorrect. The "Complete Quest" button is disabled until the correct answer is selected, preventing incorrect submissions.

3.  **Completion & Reward Loop:**
    *   **Confirmation:** The user clicks "Complete Quest".
    *   **Visual Celebration:** The modal transitions to a success state with an animated checkmark, providing a moment of positive reinforcement.
    *   **State Update:** The `onComplete` callback is triggered. In `App.tsx`, this updates the `completedQuests` set, `userBalance`, and `questPoints`.
    *   **UI Reflection:** The state changes cause the UI to re-render instantly and seamlessly:
        *   The modal closes.
        *   The corresponding `QuestCard` updates its appearance to a "Completed" state.
        *   The main `ProgressBar` animates to reflect the new completion percentage.
        *   The `Header` displays the updated balances.
        *   Two `Toast` notifications slide in from the top right, explicitly confirming the KZTE and QP earned. This multi-layered feedback ensures the user feels a tangible sense of accomplishment.

4.  **On-Demand Support:**
    *   At any point in their journey, the user can click the floating `Chatbot` icon to get help from the AI assistant, ensuring they never feel lost or unsupported.
