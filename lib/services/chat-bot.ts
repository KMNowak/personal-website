import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { Message, OpenAIModel } from '@/types/chat-bot.types'

export class OpenAIService {
  private constructor(private openAPIKey: string) {}
  private static instance: OpenAIService
  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService(process.env.OPENAI_API_KEY)
    }

    return OpenAIService.instance
  }

  public async getOpenAIStream(messages: Message[]) {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.openAPIKey}`,
      },
      method: 'POST',
      body: JSON.stringify({
        model: OpenAIModel.DAVINCI_TURBO,
        messages: [
          {
            role: 'system',
            content: `You are a helpful, friendly, assistant.`,
          },
          ...messages,
        ],
        max_tokens: 800,
        temperature: 1,
        stream: true,
      }),
    })

    if (res.status !== 200) {
      throw new Error(`OpenAI API returned ${res.status} ${await res.json()}`)
    }

    return new ReadableStream({
      async start(controller) {
        const onParse = (event: ParsedEvent | ReconnectInterval) => {
          if (event.type === 'event') {
            const data = event.data

            if (data === '[DONE]') {
              controller.close()
              return
            }

            try {
              const json = JSON.parse(data)
              const text = json.choices[0].delta.content
              const queue = encoder.encode(text)
              controller.enqueue(queue)
            } catch (e) {
              controller.error(e)
            }
          }
        }

        const parser = createParser(onParse)

        for await (const chunk of res.body as any) {
          parser.feed(decoder.decode(chunk))
        }
      },
    })
  }
}
