# Deep Research Markdown Editor

A modern, interactive markdown editor with real-time preview functionality, built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Real-time Markdown Preview**: Instantly see how your markdown will render
- **Google Authentication**: Secure user authentication with Firebase
- **Interactive SVG Animations**: Add and display SVG animations
- **Mermaid Diagram Support**: Create and visualize diagrams with Mermaid
- **Responsive Design**: Works on desktop and mobile devices
- **User Management**: Track and manage users in Firebase

## Technologies Used

- Next.js 14 (App Router)
- React with TypeScript
- Tailwind CSS with Typography plugin
- Firebase Authentication
- Firestore Database
- Mermaid for diagrams

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/timsfiligoj/markdown.git
   cd markdown
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables in `.env.local`
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open your browser and go to http://localhost:3000

## Usage

1. **Authentication**: Sign in with Google
2. **Markdown Editing**: Write markdown in the left panel
3. **Real-time Preview**: See the rendered markdown in the right panel
4. **Add Animations**: Click "Add Animation" to insert SVG animations
5. **Create Diagrams**: Click "Add Diagram" to create Mermaid diagrams

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.