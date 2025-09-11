# React UI Component Library Assignment

This project is a submission for the React Component Development Assignment. It includes two main components: a flexible `InputField` and a `DataTable` with sorting and selection, built with React, TypeScript, and Tailwind CSS. The components are documented and visualized using Storybook.

## Live Demo

You can view and interact with the components in the deployed Storybook:

**[View Storybook Demo](https://my-ui-library-e948-nktripathis-projects.vercel.app)**

## Tech Stack

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Storybook** for component documentation
- **Vite** for the build tool
- **Vitest** & **React Testing Library** for testing

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Nktripathi124/my-ui-library.git](https://github.com/Nktripathi124/my-ui-library.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd my-ui-library
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run Storybook:**
    ```bash
    npm run storybook
    ```
    This will open Storybook in your browser, usually at `http://localhost:6006`.

## Approach

My approach was to build each component incrementally, starting with a basic structure and adding features one by one.

- **`InputField`**: I focused on creating a highly flexible component by managing variants, sizes, and states through props. I used the `clsx` library to dynamically apply Tailwind CSS classes, keeping the component logic clean. State for interactive elements like the password toggle and clear button is managed internally.

- **`DataTable`**: This component was designed to be generic using TypeScript's `<T>` generics, allowing it to work with any data structure. Sorting and selection are managed with React hooks (`useState`, `useMemo`), making the component self-contained and efficient.

- **Testing**: A basic "smoke test" was included for the `InputField` to ensure it renders without crashing, fulfilling the assignment's testing requirement.