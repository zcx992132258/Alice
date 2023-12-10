import type { SliderSingleProps } from 'antd/es/slider'
import { cloneDeep, isNull } from 'lodash-es'
import { useState } from 'react'
import { base64ToFile } from '@lowCode/tools'
import { usePageContext } from '@/app/_components'
import type { CheckboxProps, ColorPickerProps, UploadFile, UploadProps } from '@/lib/Antd'
import { Checkbox, Col, ColorPicker, LoadingOutlined, Modal, PlusOutlined, Row, Slider, Upload } from '@/lib/Antd'
import { useCreation } from '@/lib/ahook'

// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
export function BaseStyleSetting() {
  const { curComponent, setCurComponent, handleSetComponent } = usePageContext()
  const [uploadLoading, setUploadLoading] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const padding = useCreation(() => {
    return curComponent?.setting.styleSetting.baseStyle.padding || 0
  }, [curComponent])

  const backgroundColor = useCreation(() => {
    return curComponent?.setting.styleSetting.baseStyle.backgroundColor
  }, [curComponent])

  const useBackgroundColor = useCreation(() => {
    return !!curComponent?.setting.styleSetting.baseStyle.useBackgroundColor
  }, [curComponent])

  const backgroundImage = useCreation(() => {
    return curComponent?.setting.styleSetting.baseStyle.backgroundImage
  }, [curComponent])

  const borderRadius = useCreation(() => {
    return curComponent?.setting.styleSetting.baseStyle.borderRadius
  }, [curComponent])

  const backgroundImageName = useCreation(() => {
    return curComponent?.setting.styleSetting.baseStyle.backgroundImageName
  }, [curComponent])

  const fileList = useCreation<UploadFile[]>(() => {
    return backgroundImage
      ? [{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: backgroundImage,
        }]
      : []
  }, [backgroundImage])

  const useBackgroundImage = useCreation(() => {
    return curComponent?.setting.styleSetting.baseStyle.useBackgroundImage
  }, [curComponent])

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
      const backgroundImage = await data.json()
      if (curComponent) {
        curComponent.setting.styleSetting.baseStyle = {
          ...curComponent.setting.styleSetting.baseStyle,
          backgroundImage: `data:image/jpeg;base64,${backgroundImage!.data}`,
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
          <Slider value={padding} max={40} onChange={handlePaddingChange}></Slider>
        </Col>
      </Row>
      <Row className="mb-[16px] flex items-center ">
        <Col span={6}>边框半径:</Col>
        <Col span={18}>
          <Slider value={borderRadius} max={40} onChange={handleBorderRadiusChange}></Slider>
        </Col>
      </Row>
      <Row className="mb-[16px] flex items-center ">
        <Col span={6} className="flex items-center ">
          <Checkbox className="mr-[6px]" checked={useBackgroundColor} onChange={handleUseBackgroundColorChange}></Checkbox>
          背景色:
        </Col>
        <Col span={18}>
          <ColorPicker
            disabled={!useBackgroundColor}
            value={backgroundColor}
            onChangeComplete={handleBackgroundColorChange}
          />
        </Col>
      </Row>
      <Row className="mb-[16px] flex items-center ">
        <Col span={6}>
          <Checkbox className="mr-[6px]" checked={useBackgroundImage} onChange={handleUseBackgroundImageChange}></Checkbox>
          背景图片:
        </Col>
        <Col span={18}>
          <Upload
            disabled={!useBackgroundImage}
            listType="picture-card"
            customRequest={handleUploadRequest}
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleUploadChange}
          >
            {
              backgroundImage
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
      <Modal open={previewOpen} title={backgroundImageName} footer={null} onCancel={handleCancel}>
        {backgroundImage ? <img alt="example" style={{ width: '100%' }} src={backgroundImage} /> : null}
      </Modal>
    </div>
  )
}

export default BaseStyleSetting
