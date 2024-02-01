import { Content, Header, Layout } from '@alice/client/lib/Antd'
import styles from '../_components/style/index.module.scss'
import { DashboardMenu } from './_components/DashboardMenu'

export default function layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout className={`${styles.container} h-[100vh] w-[100vw] overflow-hidden`}>
      <Header className={styles.header}>
        <DashboardMenu></DashboardMenu>
      </Header>
      <Content className="p-[24px]">
        <div className="bg-[#ffffff] rounded-[4px] h-[100%] p-[12px]">
          {children}
        </div>
      </Content>
    </Layout>
  )
}
