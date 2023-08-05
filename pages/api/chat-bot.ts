import { Message } from '@/types/chat-bot.types'
import { OpenAIService } from '@/lib/services/chat-bot'
import { NextApiResponse, NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { StreamingTextResponse } from 'ai'

export const config = {
  runtime: 'edge',
}

const handler = async (req: NextApiRequest): Promise<NextApiResponse> => {
  try {
    const { messages } = req.body as {
      messages: Message[]
    }

    console.debug('[DEBUG]: messages', messages)

    const charLimit = 12000
    let charCount = 0
    const messagesToSend = []

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i]
      if (charCount + message.content.length > charLimit) {
        break
      }
      charCount += message.content.length
      messagesToSend.push(message)
    }

    const stream = await OpenAIService.getInstance().getOpenAIStream(messagesToSend)

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}

export default handler
