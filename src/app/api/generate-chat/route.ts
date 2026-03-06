import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const PLATFORM_TONES: Record<string, string> = {
  whatsapp: 'casual, informal, uses emojis frequently, short messages, typical WhatsApp chat style',
  messenger: 'friendly, casual Facebook Messenger style, uses reactions and stickers references',
  telegram: 'slightly more tech-savvy tone, mix of short and medium messages, Telegram user style',
  discord: 'very informal, uses internet slang, emojis, memes references, Discord gamer/community style',
  imessage: 'casual Apple iMessage style, short texts, uses emojis, read receipts awareness',
  instagram: 'trendy, uses emojis heavily, Instagram DM style, casual and visual',
  slack: 'professional but friendly, workplace Slack style, uses thread-like responses',
  teams: 'professional, Microsoft Teams workplace style, polite and structured',
  signal: 'privacy-conscious, straightforward, Signal messenger style',
  x: 'concise, witty, Twitter/X DM style, informal',
  snapchat: 'very casual, short snappy messages, Gen-Z Snapchat style, lots of abbreviations',
  tiktok: 'trendy, Gen-Z style, casual TikTok DM vibes, uses slang and emojis',
};

export async function POST(request: NextRequest) {
  try {
    const { prompt, platform, messageCount } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured. Add it to your .env.local file.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const tone = PLATFORM_TONES[platform] || 'casual and friendly';
    const count = Math.min(Math.max(messageCount || 6, 3), 15);

    const systemPrompt = `You are a conversation generator for social media mockups. Generate a realistic chat conversation based on the user's scenario.

RULES:
- Generate exactly ${count} messages
- Use the following communication style: ${tone}
- Messages should alternate between "me" and "them" naturally (not strictly alternating — sometimes one person sends 2-3 messages in a row)
- Keep messages authentic and natural — vary message length (some very short like "K" or "lol", some longer)
- Include appropriate emojis based on the platform style
- Generate realistic timestamps that progress forward (format: "HH:MM" in 12h like "9:41" or "10:05")
- Also generate a realistic contact name and status for the other person

RESPOND WITH ONLY VALID JSON in this exact format, no markdown, no code fences:
{
  "contact": {
    "name": "Contact Name",
    "status": "Online"
  },
  "messages": [
    {
      "text": "message text here",
      "sender": "me",
      "time": "9:41",
      "status": "read"
    }
  ]
}

sender must be either "me" or "them".
status must be "read" for all messages except optionally the very last "me" message which can be "delivered" or "sent".`;

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nScenario: ${prompt}` }] }
      ],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
      },
    });

    const responseText = result.response.text();

    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      // Try extracting JSON from markdown code fences
      const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[1].trim());
      } else {
        throw new Error('Failed to parse AI response');
      }
    }

    // Validate and sanitize the response
    if (!parsed.messages || !Array.isArray(parsed.messages)) {
      throw new Error('Invalid response structure');
    }

    const messages = parsed.messages.map((msg: any, i: number) => ({
      id: Math.random().toString(36).substring(2, 9),
      text: String(msg.text || ''),
      sender: msg.sender === 'me' ? 'me' : 'them',
      time: String(msg.time || `${9 + Math.floor(i / 4)}:${String((i * 3) % 60).padStart(2, '0')}`),
      status: msg.status || 'read',
    }));

    const contact = {
      name: String(parsed.contact?.name || 'Friend'),
      status: String(parsed.contact?.status || 'Online'),
      avatar: null,
    };

    return NextResponse.json({ messages, contact });
  } catch (error: any) {
    console.error('Generate chat error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate conversation' },
      { status: 500 }
    );
  }
}
