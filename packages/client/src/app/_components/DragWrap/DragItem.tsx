import { v4 as uuid } from 'uuid'
import type { DragEventHandler } from 'react'
import type { EChartsOption } from 'echarts'
import { style, usePageContext } from '..'

interface Props {
  name: string
  chartOptions: EChartsOption
  height: number
  width: number
}

export function DragItem(props: Props) {
  const { setDroppingItem } = usePageContext()

  const handleDragStart: DragEventHandler = (event): void => {
    event.dataTransfer.setData('text/plain', JSON.stringify(props))
    const { height, width } = props
    setDroppingItem({
      i: uuid(),
      h: height,
      w: width,
    })
  }

  return (
    <div className={style.dragItem} draggable onDragStart={handleDragStart}>
      <span>{props.name}</span>
    </div>
  )
}

export default DragItem
