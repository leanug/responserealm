# ResponseRealm 🚀

**FeedbackRealm** is a Next.js web application designed to gather and prioritize user feedback to enhance web apps with features that matter most to the audience.

## Table of Contents 📚

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features 🌟

- **Feedback Collection:** Users can submit suggestions or feedback through a user-friendly interface.
- **Prioritization:** Admins can view, prioritize, and manage feedback.
- **Authentication:** Secure user authentication and session management.
- **Modular Design:** Utilizes Next.js and React components for a flexible UI.

## Installation 🔧

1. **Clone the repository:**
   ```bash
   git clone https://github.com/leanug/responserealm.git
   cd responserealm
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create an `.env.local` file in the root directory and add your environment variables.**  
   Example:
   ```plaintext
   MONGODB_URI=your_mongodb_uri
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Navigate to `http://localhost:3000` to view the application.

## Upcoming Updates
  - **Design Improvements:** Enhancing the overall design for a better user experience.
  - **Logo Image Upload:** Adding functionality to upload logo images with your boards.

## Scripts 🛠️

- **Development:** `npm run dev` - Start the development server.
- **Build:** `npm run build` - Build the project for production.
- **Start:** `npm run start` - Start the production server.
- **Lint:** `npm run lint` - Lint the project files.

## Dependencies 📦

- **Authentication & Database:**
  - `@auth/mongodb-adapter`
  - `bcrypt`
  - `mongodb`
  - `mongoose`
  - `next-auth`

- **UI & Design:**
  - `@heroicons/react`
  - `@tailwindcss/typography`
  - `daisyui`
  - `tailwindcss`

- **Form Handling:**
  - `react-hook-form`
  - `@hookform/resolvers`
  - `zod`

- **State Management:**
  - `zustand`

## Development 🏗️

To contribute to the project or make changes, follow these guidelines:

1. **Create a new branch:**
   ```bash
   git checkout -b your-feature-branch
   ```

2. **Make your changes and commit them:**
   ```bash
   git add .
   git commit -m "Add feature or fix bug"
   ```

3. **Push your changes:**
   ```bash
   git push origin your-feature-branch
   ```

4. **Open a Pull Request** on GitHub with a description of your changes.

## Configuration ⚙️

- **Theme Management:** Toggle between light and dark themes using the provided theme store.
- **Authentication:** Configure authentication and session management using environment variables.

## Contributing 🤝

Contributions are welcome! Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details on how to contribute to the project.

## License 📝

This project is licensed under the [MIT License](LICENSE).
