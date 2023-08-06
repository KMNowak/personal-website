import { useEffect, useRef } from 'react'
import { useChat } from 'ai/react'
import { ChatInput } from './ChatInput'
import { ChatLoader } from './ChatLoader'
import { ChatMessage } from './ChatMessage'

export const Chat = () => {
  const { isLoading, messages, handleSubmit, input, handleInputChange } = useChat()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      <div className="flex flex-col rounded-lg border-neutral-300 px-2 sm:border sm:p-4">
        {messages.map((message, index) => (
          <div key={index} className="my-1 sm:my-1.5">
            <ChatMessage message={message} />
          </div>
        ))}

        {isLoading && (
          <div className="my-1 sm:my-1.5">
            <ChatLoader />
          </div>
        )}

        <div className="bottom-[56px] left-0 mt-4 w-full sm:mt-8">
          <ChatInput
            handleSubmit={handleSubmit}
            input={input}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </>
  )
}
