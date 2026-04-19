import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

function getClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.deepseek.com/v1',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const inputs: Record<string, string> = body.inputs || {};
    const userContent = Object.entries(inputs)
      .map(([k, v]) => k + ': ' + v)
      .join('\n');
    const completion = await getClient().chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: "system", content: "You are an expert personal finance advisor specializing in spending analysis, budgeting, and expense categorization." },
        { role: 'user', content: userContent },
      ],
    });
    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
