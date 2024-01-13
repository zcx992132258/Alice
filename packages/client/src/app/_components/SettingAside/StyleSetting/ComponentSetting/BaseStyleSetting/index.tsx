import type { SliderSingleProps } from 'antd/es/slider'
import { cloneDeep } from 'lodash-es'
import { useState } from 'react'
import { usePageContext } from '@alice/client/app/_components'
import type { CheckboxProps, ColorPickerProps, UploadFile, UploadProps } from '@alice/client/lib/Antd'
import { Checkbox, Col, ColorPicker, LoadingOutlined, Modal, PlusOutlined, Row, Slider, Upload } from '@alice/client/lib/Antd'
import { useCreation } from '@alice/client/lib/ahook'

// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
export function BaseStyleSetting() {
  const { curComponent, setCurComponent, handleSetComponent } = usePageContext()
  const [uploadLoading, setUploadLoading] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const baseStyle = useCreation(() => {
    return curComponent?.setting.styleSetting.baseStyle
  }, [curComponent])

  const fileList = useCreation<UploadFile[]>(() => {
    return baseStyle?.backgroundImage
      ? [{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: baseStyle.backgroundImage,
        }]
      : []
  }, [baseStyle])

  const handlePaddingChange: SliderSingleProps['onChange'] = (value) => {
    if (curComponent) {
      curComponent.setting.styleSetting.baseStyle = {
        ...curComponent.setting.styleSetting.baseStyle,
        padding: value,
      }
      setCurComponent(cloneDeep(curComponent))
      handleSetComponent([cloneDeep(curComponent)])
    }
  }

  const handleBorderRadiusChange: SliderSingleProps['onChange'] = (value) => {
    if (curComponent) {
      curComponent.setting.styleSetting.baseStyle = {
        ...curComponent.setting.styleSetting.baseStyle,
        borderRadius: value,
      }
      setCurComponent(cloneDeep(curComponent))
      handleSetComponent([cloneDeep(curComponent)])
    }
  }

  const handleBackgroundColorChange: ColorPickerProps['onChangeComplete'] = (value) => {
    const backgroundColor = value.toHexString()
    if (curComponent) {
      curComponent.setting.styleSetting.baseStyle = {
        ...curComponent.setting.styleSetting.baseStyle,
        backgroundColor,
      }
      setCurComponent(cloneDeep(curComponent))
      handleSetComponent([cloneDeep(curComponent)])
    }
  }

  const handleUseBackgroundColorChange: CheckboxProps['onChange'] = (value) => {
    const useBackgroundColor = value.target.checked
    if (curComponent) {
      curComponent.setting.styleSetting.baseStyle = {
        ...curComponent.setting.styleSetting.baseStyle,
        useBackgroundColor,
      }
      setCurComponent(cloneDeep(curComponent))
      handleSetComponent([cloneDeep(curComponent)])
    }
  }

  const handleUseBackgroundImageChange: CheckboxProps['onChange'] = (value) => {
    const useBackgroundImage = value.target.checked
    if (curComponent) {
      curComponent.setting.styleSetting.baseStyle = {
        ...curComponent.setting.styleSetting.baseStyle,
        useBackgroundImage,
      }
      setCurComponent(cloneDeep(curComponent))
      handleSetComponent([cloneDeep(curComponent)])
    }
  }

  function getBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const handleUploadRequest: UploadProps['customRequest'] = async (uploadRequestOption) => {
    setUploadLoading(true)
    try {
      const { file } = uploadRequestOption
      let backgroundImageName = ''
      if (file instanceof File)
        backgroundImageName = file.name
      const formData = new FormData()
      formData.append('file', file)
      const data = await fetch('/api/imageCompression', {
        method: 'POST',
        body: formData,
      })

      const backgroundImageBlob = await data.blob()

      if (curComponent) {
        curComponent.setting.styleSetting.baseStyle = {
          ...curComponent.setting.styleSetting.baseStyle,
          backgroundImage: await getBase64(backgroundImageBlob),
          backgroundImageName,
        }
        setCurComponent(cloneDeep(curComponent))
        handleSetComponent([cloneDeep(curComponent)])
      }
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setUploadLoading(false)
    }
  }

  const handleUploadChange: UploadProps['onChange'] = ({ fileList }) => {
    if (!fileList.length) {
      if (curComponent) {
        curComponent.setting.styleSetting.baseStyle = {
          ...curComponent.setting.styleSetting.baseStyle,
          backgroundImage: null,
          backgroundImageName: null,
        }
        setCurComponent(cloneDeep(curComponent))
        handleSetComponent([cloneDeep(curComponent)])
      }
    }
  }

  const handleCancel = () => {
    setPreviewOpen(false)
  }

  const handlePreview: UploadProps['onPreview'] = () => {
    setPreviewOpen(true)
  }

  return (
    <div className="w-[100%]">
      <Row className="mb-[16px] flex items-center ">
        <Col span={6}>内边距:</Col>
        <Col span={18}>
          <Slider value={baseStyle?.padding} max={40} onChange={handlePaddingChange}></Slider>
        </Col>
      </Row>
      <Row className="mb-[16px] flex items-center ">
        <Col span={6}>边框半径:</Col>
        <Col span={18}>
          <Slider value={baseStyle?.borderRadius} max={40} onChange={handleBorderRadiusChange}></Slider>
        </Col>
      </Row>
      <Row className="mb-[16px] flex items-center ">
        <Col span={6} className="flex items-center ">
          <Checkbox className="mr-[6px]" checked={baseStyle?.useBackgroundColor} onChange={handleUseBackgroundColorChange}></Checkbox>
          <span className="ml-[6px]">背景色:</span>
        </Col>
        <Col span={18}>
          <ColorPicker
            disabled={!(baseStyle?.useBackgroundColor)}
            value={baseStyle?.backgroundColor}
            onChangeComplete={handleBackgroundColorChange}
          />
        </Col>
      </Row>
      <Row className="mb-[16px] flex items-center ">
        <Col span={6}>
          <Checkbox checked={baseStyle?.useBackgroundImage} onChange={handleUseBackgroundImageChange}></Checkbox>
          <span className="ml-[6px]">背景图片:</span>
        </Col>
        <Col span={18}>
          <Upload
            disabled={!(baseStyle?.useBackgroundImage)}
            listType="picture-card"
            customRequest={handleUploadRequest}
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleUploadChange}
          >
            {
             baseStyle?.backgroundImage
               ? null
               : (
                 <div>
                   {uploadLoading ? <LoadingOutlined></LoadingOutlined> : <PlusOutlined></PlusOutlined>}
                   <div style={{ marginTop: 8 }}>Upload</div>
                 </div>
                 )
            }
          </Upload>
        </Col>
      </Row>
      <Modal open={previewOpen} title={baseStyle?.backgroundImageName} footer={null} onCancel={handleCancel}>
        {baseStyle?.backgroundImage ? <img alt="example" style={{ width: '100%' }} src={baseStyle?.backgroundImage} /> : null}
      </Modal>
    </div>
  )
}

export default BaseStyleSetting
