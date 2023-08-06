import { IconArrowUp } from '@tabler/icons-react'
import { ChangeEvent, FC, FormEvent, useEffect, useRef } from 'react'
import { ChatRequestOptions } from 'ai'

interface Props {
  input: string
  handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void
  handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
}

export const ChatInput: FC<Props> = ({ handleSubmit, handleInputChange, input }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 4000) {
      alert('Message limit is 4000 characters')
      return
    }
    handleInputChange(e)
  }

  // TODO: Fix this with custom onSubmit that will be fired there
  // const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     e.preventDefault()
  //     handleSend()
  //   }
  // }

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'inherit'
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`
    }
  }, [input])

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <textarea
          name={'prompt'}
          ref={textareaRef}
          className="min-h-[44px] w-full rounded-lg border-2 border-neutral-200 py-2 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-neutral-300"
          style={{ resize: 'none' }}
          placeholder="Type a message..."
          value={input}
          rows={1}
          onChange={handleChange}
          // onKeyDown={handleKeyDown}
        />

        <button type={'submit'}>
          <IconArrowUp className="absolute right-2 bottom-3 h-8 w-8 rounded-full bg-blue-500 p-1 text-white hover:cursor-pointer hover:opacity-80" />
        </button>
      </form>
    </div>
  )
}
