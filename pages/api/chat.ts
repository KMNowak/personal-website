import { Message } from '@/types/chat-bot.types'
import { OpenAIService } from '@/lib/services/chat-bot'
import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// export const config = {
//   runtime: 'edge',
// }

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { messages } = req.body as {
      messages: Message[]
    }

    console.debug('[DEBUG] messages:', messages)

    // TODO: handle 429 error
    const response = await OpenAIService.getInstance().createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages,
    })

    console.debug('[DEBUG] response:', response)

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}

export default handler
