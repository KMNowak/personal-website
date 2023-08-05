import { IconDots } from '@tabler/icons-react'
import { FC } from 'react'

export const ChatLoader: FC = () => {
  return (
    <div className="flex-start flex flex-col">
      <div
        className={`flex w-fit items-center rounded-2xl bg-neutral-200 px-4 py-2 text-neutral-900`}
        style={{ overflowWrap: 'anywhere' }}
      >
        <IconDots className="animate-bounce" />
      </div>
    </div>
  )
}
