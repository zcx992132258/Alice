import { Spin } from 'antd'

export function Loading(props: { className?: string }) {
  return (
    <div className={`h-[100%] w-[100%] bg-white ${props.className}`}>
      <Spin />
    </div>
  )
}
