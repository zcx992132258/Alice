import { Button, Result } from 'antd/es'

function page() {
  return (
    <div className="h-[100%] w-[100%] flex items-center justify-center bg-[#f5f5f5]">
      <Result
        status="success"
        title="欢迎使用Alice！"
        subTitle="谢谢你选择Alice。我们很高兴你能加入我们!"
        extra={[
          <Button type="primary">进入Alice</Button>,
        ]}
      />

    </div>
  )
}

export default page
