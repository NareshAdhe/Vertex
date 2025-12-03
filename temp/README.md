# Advanced Auth Frontend

A modern, responsive authentication system built with React, Vite, and Tailwind CSS.

## Features

- ✨ **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- 🔐 **Complete Auth Flow** - Register, Login, OTP Verification, Password Reset
- 🎨 **Smooth Animations** - Elegant transitions and loading states
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🚀 **Fast Performance** - Built with Vite for lightning-fast development
- 🔔 **Toast Notifications** - User-friendly feedback with react-hot-toast
- 🛡️ **Protected Routes** - Secure dashboard with authentication guards

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Elegant toast notifications

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/           # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── VerifyOTP.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   └── Dashboard.jsx
│   ├── context/         # React Context
│   │   └── AuthContext.jsx
│   ├── utils/           # Utilities
│   │   ├── api.js
│   │   └── authService.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api`. Configure the proxy in `vite.config.js`:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    }
  }
}
```

## Available Pages

- `/login` - User login with email and password
- `/register` - New user registration
- `/verify-otp` - Email verification with 6-digit OTP
- `/forgot-password` - Request password reset
- `/reset-password/:token` - Reset password with token
- `/dashboard` - Protected user dashboard

## Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000
```

## Components

### Button
Versatile button component with variants (primary, secondary, outline, danger) and loading states.

### Input
Form input with label, icon support, and error handling.

### Card
Container component with consistent styling.

### ProtectedRoute
Route wrapper for authentication-required pages.

## Context

### AuthContext
Manages authentication state, user data, and auth operations (login/logout).

## License

MIT
