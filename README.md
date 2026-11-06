# CodeLens AI 🚀
### AI-Powered Code Review & Analysis Platform

CodeLens AI is an AI-powered code review platform that helps developers analyze, debug, and improve their code using Google's Gemini AI. It provides real-time streaming feedback, identifies potential bugs, highlights security vulnerabilities, and suggests performance improvements through an intuitive code editor interface.

The platform is designed to make code reviews faster, easier, and more accessible for developers.

---

## ✨ Features

- **AI-Powered Code Review:** Analyze source code using Google's Gemini AI.
- **Multiple Programming Languages:** Select the programming language for context-aware code analysis.
- **Multiple Review Modes:** Choose the type of review based on your requirements.
- **Bug Detection:** Identify potential logical errors, syntax issues, and bugs.
- **Security Analysis:** Highlight potential security vulnerabilities and unsafe coding practices.
- **Performance Analysis:** Identify inefficient code and performance bottlenecks.
- **Code Optimization:** Receive suggestions to improve code readability, efficiency, and structure.
- **Improved Code Suggestions:** Get AI-generated recommendations and improved code snippets.
- **Real-Time Streaming:** View AI-generated review results as they are being generated.
- **Markdown Rendering:** Display structured analysis with headings, lists, tables, and formatted code blocks.
- **Interactive Code Editor:** Write, edit, copy, and clear code directly within the application.
- **Error Handling:** Handle invalid input, API failures, and unsuccessful review requests.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend Framework | Next.js |
| UI Library | React |
| Programming Language | TypeScript |
| Styling | Tailwind CSS |
| Code Editor | Monaco Editor |
| AI Integration | Google Gemini API |
| AI SDK | Google Gen AI SDK (`@google/genai`) |
| Markdown Rendering | React Markdown |
| Markdown Extensions | remark-gfm |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🔍 Review Modes

CodeLens AI provides five review modes:

| Review Mode | Description |
|---|---|
| Full Review | Complete analysis of the submitted code. |
| Bug Detection | Focuses on identifying potential bugs and logical errors. |
| Security Analysis | Examines code for possible security vulnerabilities. |
| Performance Analysis | Identifies performance issues and inefficient operations. |
| Code Optimization | Suggests improvements to code quality, structure, and efficiency. |

---

## 📸 Application Workflow

1. Open CodeLens AI.
2. Select your programming language.
3. Paste or write your code in the Monaco code editor.
4. Choose a suitable review mode.
5. Click the **Review Code** button.
6. Wait for the AI to analyze your code.
7. View the streamed analysis and recommendations.
8. Review the improved code suggestions.

---

## 📁 Project Structure

```text
aiweb-app/
│
├── app/
│   ├── api/
│   │   └── review/
│   │       └── route.ts
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── CodeEditor.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── ReviewOptions.tsx
│   │   └── ReviewResults.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── public/
│
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Getting Started

Follow these instructions to run CodeLens AI locally.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/codelens-ai.git
```

### 2. Navigate to the Project Directory

```bash
cd codelens-ai
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

Add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Get your API key from [Google AI Studio](https://aistudio.google.com/apikey).

**Important:** Never expose your API key in frontend code or upload your `.env.local` file to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## 🔑 API Integration

CodeLens AI uses Google's Gemini API through the `@google/genai` SDK.

The backend API endpoint is:

```text
POST /api/review
```

### Request Body

```json
{
  "code": "print('Hello World')",
  "language": "python",
  "mode": "full"
}
```

### Request Parameters

| Parameter | Description |
|---|---|
| `code` | Source code submitted for review. |
| `language` | Programming language of the submitted code. |
| `mode` | Selected review mode. |

The backend validates the request, sends the code and review instructions to Gemini, and streams the generated analysis back to the frontend.

The API key is accessed server-side using environment variables.

---

## 🚀 Deployment

CodeLens AI can be deployed using [Vercel](https://vercel.com/).

### Deployment Steps

1. Push the project repository to GitHub.
2. Sign in to Vercel using your GitHub account.
3. Import the CodeLens AI repository.
4. Configure the environment variable in Vercel:

```env
GEMINI_API_KEY=your_gemini_api_key
```

5. Deploy the application.
6. Once deployment is complete, open the generated deployment URL.

**Note:** Add environment variables separately in Vercel. Local `.env.local` values are not automatically transferred.

---

## 🔒 Security Considerations

- API keys are stored in environment variables.
- Gemini API requests are handled through the backend API route.
- API credentials should never be exposed through client-side code.
- Input validation is performed before processing review requests.
- The application limits submitted code length to 20,000 characters.

---

## 🎯 Project Objective

The objective of CodeLens AI is to simplify the code review process by integrating gener