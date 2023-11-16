import { usePageContext } from '..'
import { CopyOutlined, DeleteOutlined, SettingOutlined, Tooltip } from '@/lib/Antd'

export function PopoverContent() {
  const {
    handleCopyComponent,
    curComponent,
    handleDeleteComponent,
    setSettingCollapsed,
  } = usePageContext()

  const handleCopyCurComponent = () => {
    if (curComponent)
      handleCopyComponent(curComponent)
  }

  const handleDeleteCurComponent = () => {
    if (curComponent)
      handleDeleteComponent(curComponent.id)
  }

  const handleOpenSettingCollapsed = () => {
    setSettingCollapsed(false)
  }

  return (
    <div>
      <Tooltip title="复制">
        <CopyOutlined
          className="text-[16px] mr-[8px] cursor-pointer "
          style={{ color: '#1677ff' }}
          onClick={handleCopyCurComponent}
        />
      </Tooltip>
      <Tooltip title="设置">
        <SettingOutlined
          onClick={handleOpenSettingCollapsed}
          className="text-[16px] mr-[8px] cursor-pointer "
          style={{ color: '#1677ff' }}
        />
      </Tooltip>
      <Tooltip title="删除">
        <DeleteOutlined
          onClick={handleDeleteCurComponent}
          className="text-[16px] cursor-pointer "
          style={{ color: '#ff7875' }}
        />
      </Tooltip>

    </div>
  )
}
