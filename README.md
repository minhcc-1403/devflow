# DevFlow Frontend

Welcome to the **DevFlow** project! 🚀  
DevFlow is a developer-focused Q&A platform built with **Nuxt3**, **Vue3**, **ShadCN**, and **TailwindCSS**.

## Intro Video

You can watch the intro video here:

[![DevFlow Introduction Video](https://www.youtube.com/watch?v=kyQDnO-ckz0)

## Website

Check out our live website: [https://devflow.example.com](https://devflow.example.com)

## Images

# Profile Image Demo

This repository demonstrates the design of multiple pages in the profile, with **Light** and **Dark** themes, across various devices (**Mobile**, **Tablet**, and **PC**).

## Pages and Themes

### 1. **Home Page**

#### Light Theme

| Mobile                               | PC                             |
| ------------------------------------ | ------------------------------ |
| ![Light - Mobile](public/images/home-m.png) | ![Light - PC](public/images/home.png) |

#### Dark Theme

| Mobile                              | PC                            |
| ----------------------------------- | ----------------------------- |
| ![Dark - Mobile](public/images/home-m.png) | ![Dark - PC](public/images/home.png) |

### Core Features

- **Authentication**:
  - User login and registration with form validation.
  - Role-based route protection (Admin/User).
- **Questions**:
  - Ask new questions with tags and search functionality.
  - Update or delete questions.
- **Answers**:
  - Post, edit, or delete answers to questions.
- **Votes**:
  - Upvote/downvote questions and answers.

### Additional Features

- **Responsive Design**:
  - Mobile-friendly and optimized using **TailwindCSS**.
- **Interactive UI**:
  - Consistent and accessible components built with **ShadCN**.
- **Real-Time Updates**:
  - Live feedback for user actions like voting and posting answers.

## Tech Stack

- **Nuxt3**: Server-side rendering and static site generation.
- **Vue3**: Reactive and modular frontend framework.
- **ShadCN**: Pre-built UI components for styling and design.
- **TailwindCSS**: Utility-first CSS framework for responsive layouts.

## Project Structure

    src/
    ├── components/    # Reusable Vue components
    ├── layouts/       # App layouts
    ├── pages/         # Route views
    ├── composables/   # Reusable logic and state
    ├── assets/        # Static assets (CSS, images, etc.)
    ├── public/        # Public files
    ├── store/         # Pinia for state management
    ├── styles/        # Global styles (e.g., TailwindCSS configs)
    ├── nuxt.config.ts # Nuxt configuration file
    └── ...

## Key Pages

- **Home Page**:  
  Displays a list of recent questions with the ability to search and filter questions based on tags or keywords.
- **Login/Registration**:  
  Provides secure pages for user authentication. Users can sign up for a new account or log in with existing credentials.
- **Question Details**:  
  A page that displays the details of a specific question, allowing users to post answers, edit answers, and vote on questions and answers.
- **User Dashboard**:  
  A personalized dashboard where users can manage their own questions, answers, and view their activity.

## Screenshots

### Home Page

![Home Page](assets/images/home-page.png)  
_Displays the most recent questions with a search bar and filter options to refine the results._

### Question Details

![Question Details](assets/images/question-details.png)  
_Shows the detailed view of a specific question, allowing users to post answers, edit their responses, and vote on questions and answers._

## Installation

<details>
  <summary>Click to expand</summary>

### Prerequisites

- **Node.js**: v18+

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/username/devflow-frontend.git
   cd devflow-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**  
   Create a `.env` file in the root directory with the following content:

   ```plaintext
   API_BASE_URL=http://localhost:3000
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

   The application will run at `http://localhost:3000`.

</details>

## Contributions

<details>
  <summary>Click to expand</summary>
  
  We welcome contributions to the project! If you'd like to contribute, follow the steps below:

1. **Fork the repository**

   - Click the "Fork" button in the top-right corner of the repository page to create a personal copy.

2. **Create a new branch**

   - Create a new branch for your feature or bug fix:
     ```bash
     git checkout -b feature/your-feature-name
     ```

3. **Commit your changes**

   - Make your changes and commit them:
     ```bash
     git commit -m "Description of your changes"
     ```

4. **Push to your fork**

   - Push your changes to your forked repository:
     ```bash
     git push origin feature/your-feature-name
     ```

5. **Submit a pull request**
   - Go to the repository on GitHub and submit a pull request for review.

We appreciate your contributions and feedback!

</details>
