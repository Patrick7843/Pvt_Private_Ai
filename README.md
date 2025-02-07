# AlvanAI Private Chat

A sophisticated AI chat application that leverages both OpenAI and Google's Gemini AI models. Built with React, TypeScript, and Vite, this application offers a modern, responsive interface for AI interactions with support for both text and image inputs.

## Features

- 🤖 Dual AI Model Support (OpenAI & Gemini)
- 🖼️ Image Analysis Capabilities
- 💬 Real-time Streaming Responses
- 🎨 Syntax Highlighting for Code
- 📱 Responsive Design
- 🔐 Authentication System
- 📝 Markdown Support

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Getting Started

### Clone the Repository

```bash
git clone git@github.com:Patrick7843/Pvt_Private_Ai.git
cd Pvt_Private_Ai
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_OPENAI_BASE_URL=your_openai_base_url
VITE_GEMINI_PUBLIC_KEY=your_gemini_api_key
```

### Installation

#### For Windows:

```cmd
npm install
npm run dev
```

#### For Linux/MacOS:

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/        # Static assets and styles
├── components/    # Reusable UI components
├── lib/          # Library configurations
├── pages/        # Application pages
├── services/     # API and service integrations
├── store/        # State management
└── types/        # TypeScript type definitions
```

## Technical Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** SASS/SCSS
- **State Management:** Zustand
- **Authentication:** Clerk
- **AI Models:** OpenAI API & Google Gemini
- **Markdown:** react-markdown
- **Code Highlighting:** react-syntax-highlighter

## Key Features Explained

### Dual AI Model Support
The application seamlessly switches between OpenAI and Gemini models based on configuration, ensuring reliable AI responses.

### Real-time Streaming
Implements real-time response streaming for a more interactive chat experience.

### Code Highlighting
Supports syntax highlighting for multiple programming languages with line numbers and copy functionality.

### Authentication
Secure user authentication system integrated with Clerk.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
