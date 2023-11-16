'use client'
import { memo, useEffect, useRef, useState } from 'react'
import { usePageContext } from '../Context'
import { PopoverContent } from './PopoverContent'
import { Popover } from '@/lib/Antd'
import { useCreation, useMemoizedFn } from '@/lib/ahook'
import { SingleIntersectionObserver } from '@/util/SingleIntersectionObserver'

export const ToolPopover = memo((props: {
  id: string
  children: React.ReactNode
}) => {
  const [visible, setVisible] = useState(false)
  const el = useRef<HTMLDivElement | null>(null)
  const handleVisibleChange = useMemoizedFn((visible: boolean) => {
    setVisible(visible)
  })

  useEffect(() => {
    SingleIntersectionObserver.create({
      threshold: 0.3,
    })
    if (el.current) {
      SingleIntersectionObserver.collectDom(el.current, (enter) => {
        if (enter.isIntersecting || enter.intersectionRatio <= 0.3)
          handleVisibleChange(false)
      })
    }
    return () => {
      if (el.current)
        SingleIntersectionObserver.delObserve(el.current)
    }
  }, [])

  return (
    <Popover
      placement="top"
      open={visible}
      onOpenChange={handleVisibleChange}
      destroyTooltipOnHide
      trigger="click"
      content={<PopoverContent />}
    >
      <div
        ref={el}
        className="h-[100%] w-[100%] relative"
      >
        {props.children}
      </div>
    </Popover>
  )
})

export default ToolPopover
