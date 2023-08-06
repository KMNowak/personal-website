import { FC } from 'react'
import { Message } from 'ai'

interface Props {
  message: Message
}

export const ChatMessage: FC<Props> = ({ message }) => {
  return (
    <div className={`flex flex-col ${message.role === 'assistant' ? 'items-start' : 'items-end'}`}>
      <div
        className={`flex items-center ${
          message.role === 'assistant'
            ? 'bg-neutral-200 text-neutral-900'
            : 'bg-blue-500 text-white'
        } max-w-[67%] whitespace-pre-wrap rounded-2xl px-3 py-2`}
        style={{ overflowWrap: 'anywhere' }}
      >
        {message.content}
      </div>
    </div>
  )
}
