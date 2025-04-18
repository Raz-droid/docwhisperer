# 📄 SmartAIReader - RAG-based PDF Chatbot with Viewer

A powerful AI assistant that lets users upload PDFs, view the document, and ask questions in natural language — powered by Retrieval-Augmented Generation (RAG), Jina Embeddings, and Pinecone.

---

## ⚙️ Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS 4, ShadCN, Lucide Icons  
- **Backend**: Node.js, LangChain, Drizzle ORM, NeonDB (PostgreSQL)  
- **AI & Embeddings**:  
  - OpenAI & Groq LLMs via `@ai-sdk`  
  - Jina Embeddings v2 (for vectorization)  
- **RAG Stack**: Pinecone (Vector DB), PDF parsing with `pdf-parse`, chunking with `@pinecone-database/doc-splitter`  
- **File Handling**: AWS S3 (via `@aws-sdk/client-s3`)  
- **Authentication**: Clerk  
- **State & Utilities**: TanStack React Query, React Dropzone, Hot Toasts  

---

## ✨ Features

- 📁 Upload and view PDF documents  
- 🤖 Chat with the uploaded PDF using natural language  
- 🔍 Accurate chunking and semantic search using Pinecone + Jina Embeddings  
- 🧠 LLM response generation with OpenAI or Groq  
- 💬 Responsive UI with Tailwind & ShadCN  
- 🔐 Authenticated user access with Clerk  
- ☁️ Serverless file storage via AWS S3  

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chat_pdf.git
cd chat_pdf
```

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smartaireader.git
cd smartaireader
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
# Database
DATABASE_URL=your_database_connection_string

# AI Services
OPENAI_API_KEY=your_openai_api_key
GROQ_API_KEY=your_groq_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Pinecone
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Initialize the database schema:
```bash
npx drizzle-kit push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.




## Development

### Database Migrations
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

### Building for Production
```bash
npm run build
npm start
```

## Deployment

This application can be deployed on Vercel, Netlify, or any other platform that supports Next.js applications.

For optimal performance, consider the following:
- Use serverless databases like Neon Database
- Configure proper environment variables for all services
- Set up proper CORS configuration if needed



## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI](https://openai.com/)
- [Groq](https://groq.com/)
- [Google AI](https://ai.google/)
- [LangChain](https://js.langchain.com/)
- [Pinecone](https://www.pinecone.io/)
- [Clerk](https://clerk.com/)
- [Neon Database](https://neon.tech/)
