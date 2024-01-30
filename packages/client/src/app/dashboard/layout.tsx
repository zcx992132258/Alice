import type { MenuProps } from '@alice/client/lib/Antd'
import { Header, Layout } from '@alice/client/lib/Antd'
import styles from '../_components/style/index.module.scss'
import { DashboardMenu } from './_components/DashboardMenu'

export default function layout() {
  return (
    <Layout className={`${styles.container} h-[100vh] w-[100vw] overflow-hidden`}>
      <Header className={styles.header}>
        <DashboardMenu></DashboardMenu>
      </Header>

    </Layout>
  )
}
