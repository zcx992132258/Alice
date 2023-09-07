import { style } from '..'

export function DragWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.dragWrap}>
      {children}
    </div>
  )
}

export default DragWrap
