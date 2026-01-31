import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        // 1. Force reload check for GROQ_API_KEY
        let apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            try {
                // Manually parse .env files if process.env is stale or missing
                const possiblePaths = [
                    path.join(process.cwd(), '.env.local'),
                    path.join(process.cwd(), '.env')
                ];

                for (const p of possiblePaths) {
                    if (fs.existsSync(p)) {
                        const content = fs.readFileSync(p, 'utf8');
                        const match = content.match(/GROQ_API_KEY\s*=\s*([^\s"']+)/) || content.match(/GROQ_API_KEY\s*=\s*["']([^"']+)["']/);
                        if (match && match[1]) {
                            apiKey = match[1].trim();
                            break;
                        }
                    }
                }
            } catch (err) {
                console.error("Manual env parse error:", err);
            }
        }

        if (!apiKey) {
            return NextResponse.json({
                error: "Missing Groq API Key",
                details: "The Dossier Guardian cannot initialize. GROQ_API_KEY not found in environment or dossiers (.env)."
            }, { status: 500 });
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `You are the "Dossier Guardian", a sophisticated, professional, and slightly mysterious AI assistant protecting the digital archives of Astha Singh.
                        
                        SUBJECT IDENTITY:
                        Name: Astha Singh (The Subject)
                        Email: singhhhaaastha@gmail.com
                        Background: High-achiever MCA student from VIT Bhopal (2024-2026, CGPA: 8.80) with a strong foundation in Mathematics & CS (BSc CGPA: 64.67%).
                        
                        TECHNICAL ARCHIVES:
                        - Languages: Java, Python (Basics, API Integration), JavaScript, SQL.
                        - Backend & APIs: Supabase (Auth, Database), Prisma ORM, REST API Integration.
                        - Web Technologies: HTML5, CSS3, React, Next.js.
                        - AI & Data: LLM APIs (OpenRouter, Gemini), Prompt Engineering (Expert), RAG-Based AI Chatbot Development.
                        - Core Concepts: Operating Systems, DBMS, OOPs.
                        
                        DOSSIERS (PROJECTS):
                        - GitGrade: AI-Powered GitHub Repository Analyzer. Built with Next.js and OpenRouter API. Analyzes code quality and documentation using GitHub APIs to generate summaries and roadmaps.
                        - AI-Resume Analyzer: Built with React, Tailwind, and Puter.js. Provides instant ATS scores and feedback for resume optimization.
                        
                        VALIDATIONS (CERTIFICATIONS):
                        - Oracle 2025 AI Foundations Associate.
                        - SAWIT.AI Learnathon – GUVI (HCL TECH) | RAG-Based AI Chatbot Development.
                        - MS-AI Internship by AICTE (4 weeks).
                        - Prompt Engineering Certificate at MLH.
                        
                        TONE & RULES:
                        1. Refer to projects as 'Archives' or 'Dossiers'.
                        2. Refer to Astha as 'The Subject'.
                        3. Be helpful and professional, yet mysterious (guardian of secrets).
                        4. Provide concise and accurate information about Astha's journey across the digital planes.`
                    },
                    ...history,
                    { role: "user", content: message }
                ],
                temperature: 0.6,
                max_tokens: 1000,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: data.error.message }, { status: 400 });
        }

        return NextResponse.json({ text: data.choices[0].message.content });
    } catch (error: any) {
        return NextResponse.json({
            error: "Guardian Data Fault",
            details: error.message
        }, { status: 500 });
    }
}
