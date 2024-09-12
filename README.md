# NoteWise

**NoteWise** is an AI-powered, real-time note-taking SaaS platform designed to help users create, edit, and organize their notes seamlessly. With a Notion-style WYSIWYG editor, users can enjoy a rich-text editing experience and leverage AI to improve productivity through intelligent suggestions and auto-completion.

Interact with Your Notes Like Never Before.
Organize, Discuss, and Enhance Your Ideas Seamlessly.

## Features

- **AI-Powered Assistance**: Generate content, receive suggestions, and improve your notes with AI-powered features.
- **Auto-Save**: Your notes are automatically saved in real time as you type, so you never lose your work.
- **Rich Text Editor**: A Notion-like WYSIWYG editor to format your notes with ease. Add headings, bullet points, links, and more.
- **Breadcrumb Navigation**: Navigate through your notes with a breadcrumb trail that shows your current position.
- **Secure Authentication**: Integrated with NextAuth for secure user authentication using OAuth providers like Google, GitHub, or email/password.
- **Cloud Storage**: All your notes are stored securely in the cloud using Prisma with MongoDB/NeonDB.
- **Responsive Design**: Optimized for desktop, tablet, and mobile viewing for a consistent experience across all devices.

## Tech Stack

- **Frontend**: 
  - Next.js (React-based framework)
  - TypeScript
  - Tailwind CSS for responsive and modern UI
- **Backend**: 
  - Prisma ORM for database management
  - NeonDB for data storage "postgresql"
- **AI Integration**: 
  - OpenAI API via Vercel AI SDK 
- **Authentication**: 
  - NextAuth for secure user login with multiple provider support
- **Deployment**: 
  - Vercel for fast and scalable deployment

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 18+)
- **npm** or **yarn**
- **NeonDB** "postgresql" database connection

## Installation

To set up NoteWise locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/imohammedhamed/NoteWise.git
   ```
   ```bash
   cd NoteWise
   ```
   ```bash
   npm install
   ```
   Create a .env.local file in the root of the project and add the required environment variables:
   ```bash
     NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
    DATABASE_URL=your-database-url
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-nextauth-secret
   ```
   Use Prisma to initialize your database with the required schema:
   ```bash
   npx prisma migrate dev
   ```
   Start the development server:
   ```bash
    npm run dev
   ```

## Usage

After starting the application, you can access it in your web browser at `http://localhost:3000`. From there, you can browse the menu, select items, and place an order.
##Once NoteWise is set up, users can:

**Create and Edit Notes:** Use the WYSIWYG editor to format text, create headings, lists, links, and more.
**AI-Assisted Writing:** Get content suggestions and auto-completions based on the context of your notes.
**Auto-Save:** Notes will automatically save as you type, so you don't need to worry about losing your work.
**Breadcrumb Navigation:** Move between sections of your notes quickly with breadcrumb trails.
##User Authentication
NoteWise supports secure login via OAuth providers such as Google and GitHub, as well as email-based authentication. Once logged in, users can access their personalized notes and settings.

##Real-Time AI Suggestions
While writing, the AI will provide context-aware suggestions, improving your note-taking speed and quality. Simply click on the suggestions or allow auto-completion to assist you while writing.

##Responsive Design
NoteWise is designed to work across devices—whether you're using a desktop, tablet, or mobile phone, your experience will remain smooth and consistent.

## Contributing

We welcome contributions to the project! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch.
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes.
4. Commit your changes.
    ```bash
    git commit -m "Add some feature"
    ```
5. Push to the branch.
    ```bash
    git push origin feature-branch
    ```
6. Open a pull request.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Inter, a custom Google Font.

## Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.

## Contact
For any questions or suggestions, feel free to reach out:

Email: mohammedhamed6726@gmail.com

GitHub: imohammedhamed
