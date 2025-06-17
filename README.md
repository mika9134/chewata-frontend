# Chewata Frontend

This project serves as the frontend for Chewata Chat, a real-time chatting application built with React and Vite. It offers a responsive interface for authentication, messaging, theme customization, and profile management.

## Features
- **Responsive Design:** Built with React, Tailwind CSS, and DaisyUI.
- **Real-Time Interaction:** Integrated with Socket.IO via the backend for live chat.
- **Fast Development:** Leverages Vite for hot module replacement and speedy builds.
- **State Management:** Uses Zustand for efficient state management.

## Prerequisites
- Node.js (v16+)
- npm or yarn package manager

## Installation
1. Clone the repository.
2. Navigate to the `chewata-frontend` directory:
    ```sh
    cd chewata-frontend
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Development
Start the development server with:
```sh
npm run dev
```
Open http://localhost:5173 to view the application.

## Production Build & Deployment
To build the application for production:
```sh
npm run build
```

Preview the production build with
```sh
npm run review
```

# Deployment Tips:

- Deploy the output from the dist folder to your preferred hosting provider.
- For Vercel, the provided vercel.json ensures correct routing.

## Contact
For issues or questions, please open an issue in the repository or contact the developer.
