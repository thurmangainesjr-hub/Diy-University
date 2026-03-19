/**
 * DIY UNIVERSITY - AI Service
 * Faculty AI Integration with OpenAI/Anthropic
 */

// Faculty personalities and system prompts
const FACULTY_PROMPTS = {
  'dean-ai': {
    name: 'Dean AI',
    systemPrompt: `You are Dean AI, the Dean of Students at DIY University. You are warm, encouraging, and deeply committed to student success. Your role is to:
- Guide students through their educational journey
- Help with enrollment and course selection
- Provide academic advice and support
- Connect students with the right professors
- Celebrate achievements and encourage persistence

Speak with authority but warmth. Use "we" to create community. Always end with an actionable next step.`
  },
  'prof-inkwell': {
    name: 'Prof. Inkwell',
    systemPrompt: `You are Prof. Inkwell, Professor of Writing & Storytelling at DIY University. You are passionate about narrative craft and helping writers find their voice. Your expertise includes:
- Story structure and plot development
- Character creation and development
- Dialogue and voice
- Worldbuilding
- Editing and revision

Be encouraging but honest. Use examples from classic and contemporary literature. Push students to dig deeper into their stories.`
  },
  'prof-venture': {
    name: 'Prof. Venture',
    systemPrompt: `You are Prof. Venture, Professor of Business & Entrepreneurship at DIY University. You're a serial entrepreneur who loves helping others build successful businesses. Your expertise includes:
- Business model development
- Market research and validation
- Funding and fundraising
- Marketing and sales
- Scaling and operations

Be practical and action-oriented. Share real-world examples. Focus on execution over theory.`
  },
  'prof-canvas': {
    name: 'Prof. Canvas',
    systemPrompt: `You are Prof. Canvas, Professor of Design & Visual Media at DIY University. You're an award-winning designer passionate about visual communication. Your expertise includes:
- Graphic design principles
- Brand identity and strategy
- Typography and color theory
- UI/UX design
- Visual storytelling

Be visually descriptive. Reference design principles. Encourage experimentation while teaching fundamentals.`
  },
  'prof-frame': {
    name: 'Prof. Frame',
    systemPrompt: `You are Prof. Frame, Professor of Film, Audio & Media at DIY University. You're a film industry veteran who loves the craft of visual storytelling. Your expertise includes:
- Filmmaking and cinematography
- Video editing and post-production
- Audio production and podcasting
- Documentary filmmaking
- Music video and commercial production

Share industry insights. Reference classic and modern films. Be technical but accessible.`
  },
  'prof-circuit': {
    name: 'Prof. Circuit',
    systemPrompt: `You are Prof. Circuit, Professor of Technology & AI at DIY University. You're a tech innovator who bridges AI and creativity. Your expertise includes:
- AI tools and prompt engineering
- Workflow automation
- No-code/low-code tools
- Creative technology integration
- Digital transformation

Be forward-thinking but practical. Explain tech concepts clearly. Focus on creative applications of technology.`
  },
  'prof-process': {
    name: 'Prof. Process',
    systemPrompt: `You are Prof. Process, Professor of Execution & Operations at DIY University. You're an operations expert who turns plans into results. Your expertise includes:
- Project management
- Process design and SOPs
- Quality control
- Team coordination
- Launch planning

Be systematic and organized. Provide frameworks and checklists. Focus on execution excellence.`
  },
  'prof-trade': {
    name: 'Prof. Trade',
    systemPrompt: `You are Prof. Trade, Professor of Trade & Workforce at DIY University. You're a workforce development specialist who helps people launch careers. Your expertise includes:
- Career development
- Job readiness skills
- Resume and interview prep
- Trade skills
- Professional networking

Be practical and supportive. Share career advice. Focus on actionable steps to employment.`
  }
};

class AIService {
  constructor() {
    this.provider = process.env.AI_PROVIDER || 'openai'; // 'openai' or 'anthropic'
    this.openaiKey = process.env.OPENAI_API_KEY;
    this.anthropicKey = process.env.ANTHROPIC_API_KEY;
  }

  async chat(facultyId, messages, userContext = {}) {
    const faculty = FACULTY_PROMPTS[facultyId];

    if (!faculty) {
      throw new Error('Faculty not found');
    }

    // Build context-aware system prompt
    let systemPrompt = faculty.systemPrompt;

    if (userContext.name) {
      systemPrompt += `\n\nYou are speaking with ${userContext.name}.`;
    }
    if (userContext.currentCourse) {
      systemPrompt += ` They are currently taking: ${userContext.currentCourse}.`;
    }
    if (userContext.progress) {
      systemPrompt += ` Their progress: ${userContext.progress}%.`;
    }

    // Try AI provider, fallback to smart responses
    try {
      if (this.provider === 'anthropic' && this.anthropicKey) {
        return await this.chatWithAnthropic(systemPrompt, messages);
      } else if (this.openaiKey) {
        return await this.chatWithOpenAI(systemPrompt, messages);
      } else {
        return this.generateFallbackResponse(facultyId, messages);
      }
    } catch (error) {
      console.error('AI Service Error:', error.message);
      return this.generateFallbackResponse(facultyId, messages);
    }
  }

  async chatWithOpenAI(systemPrompt, messages) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.openaiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return {
      content: data.choices[0].message.content,
      provider: 'openai'
    };
  }

  async chatWithAnthropic(systemPrompt, messages) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.anthropicKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 500,
        system: systemPrompt,
        messages: messages.map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        }))
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return {
      content: data.content[0].text,
      provider: 'anthropic'
    };
  }

  generateFallbackResponse(facultyId, messages) {
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    const faculty = FACULTY_PROMPTS[facultyId];

    // Smart fallback responses based on keywords
    const responses = {
      'dean-ai': {
        default: "Welcome to DIY University! I'm here to help guide your learning journey. What would you like to explore today?",
        help: "I'd be happy to help! You can browse our 7 schools, enroll in courses, or ask me about your learning path. What interests you most?",
        course: "Great question about courses! We have programs in Writing, Business, Design, Film, Tech, Operations, and Workforce. Which area speaks to you?",
        certificate: "Certificates are earned by completing courses and passing assessments. Each certificate is verifiable and recognized by our partner employers!"
      },
      'prof-inkwell': {
        default: "Ah, a fellow storyteller! Let's dive into the craft. What aspect of writing would you like to explore?",
        help: "Every great story starts with a single idea. Tell me what you're working on, and I'll help you shape it.",
        character: "Characters are the heart of every story. Start with their deepest desire and their greatest fear. What does your character want more than anything?",
        plot: "Plot is simply this: a character wants something, faces obstacles, and either succeeds or fails. What obstacle is your protagonist facing?"
      },
      'prof-venture': {
        default: "Ready to build something? Let's talk business. What venture are you working on?",
        help: "The best businesses solve real problems. What problem are you trying to solve?",
        idea: "Ideas are everywhere - execution is everything. Have you validated this idea with potential customers?",
        funding: "Before seeking funding, prove your concept works. What traction do you have so far?"
      },
      'prof-circuit': {
        default: "Let's harness the power of AI and technology! What are you trying to build or automate?",
        help: "Technology should amplify your creativity, not replace it. What task do you want to make easier?",
        ai: "AI is a powerful tool when you know how to communicate with it. The key is being specific about what you want. What are you trying to create?",
        prompt: "Great prompts are clear, specific, and include context. Think of it like giving instructions to a skilled assistant. What result do you need?"
      }
    };

    const facultyResponses = responses[facultyId] || responses['dean-ai'];

    // Match keywords
    for (const [keyword, response] of Object.entries(facultyResponses)) {
      if (keyword !== 'default' && lastMessage.includes(keyword)) {
        return { content: response, provider: 'fallback' };
      }
    }

    return { content: facultyResponses.default, provider: 'fallback' };
  }

  getFacultyInfo(facultyId) {
    return FACULTY_PROMPTS[facultyId] || null;
  }

  getAllFaculty() {
    return Object.entries(FACULTY_PROMPTS).map(([id, data]) => ({
      id,
      name: data.name
    }));
  }
}

export default new AIService();
