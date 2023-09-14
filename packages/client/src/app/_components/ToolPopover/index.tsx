'use client'
import { useEffect, useRef, useState } from 'react'
import { PopoverContent } from './PopoverContent'
import { Popover } from '@/lib/Antd'
import { useMemoizedFn } from '@/lib/ahook'

export function ToolPopover({
  children,
}: {
  children: React.ReactNode
}) {
  const [visible, setVisible] = useState(false)
  const el = useRef<HTMLDivElement | null>(null)
  const handleVisibleChange = useMemoizedFn((visible: boolean) => {
    setVisible(visible)
  })

  useEffect(() => {
    let observer: IntersectionObserver | null = new IntersectionObserver((entries) => {
      const enter = entries.find(v => v.target === el.current)
      if (enter && (!enter.isIntersecting || enter.intersectionRatio <= 0.3)) {
        handleVisibleChange(false)
      }
    }, {
      threshold: 0.3,
    })
    if (el.current) {
      observer.observe(el.current)
    }
    return () => {
      observer?.disconnect()
      observer = null
    }
  }, [])

  return (
    <Popover
      placement='top' open={visible}
      onOpenChange={handleVisibleChange}
      destroyTooltipOnHide
      trigger='click'
      content={<PopoverContent />}
    >
      <div ref={el} className='h-[100%] w-[100%] relative'>
        {children}
      </div>
    </Popover>
  )
}

export default ToolPopover
