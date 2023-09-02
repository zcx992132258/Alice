import { style } from '.'

interface Props {
  name: string
}

export function DragItem({ name }: Props) {
  return <div className={style.dragItem} draggable="true">
    <span>{name}</span>
  </div>
}

export default DragItem
