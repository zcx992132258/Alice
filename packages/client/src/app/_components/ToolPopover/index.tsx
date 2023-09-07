import { PopoverContent } from './PopoverContent'
import { Popover } from '@/lib/Antd'

export function ToolPopover({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Popover placement='top' destroyTooltipOnHide trigger='click' content={<PopoverContent />}>
      {children}
    </Popover>
  )
}

export default ToolPopover
