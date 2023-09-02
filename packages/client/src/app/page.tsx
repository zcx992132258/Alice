import { PageProvider } from './_components/Context'
import { CollapseMenu, Container, SiderMenu } from './_components'
import styles from './_components/style/index.module.scss'
import { Content, Header, Layout } from '@/lib/Antd'

function Page() {
  return (
    <PageProvider>
      <Layout className={`${styles.container} h-[100vh] w-[100vw]`}>
        <Header className={styles.header}>
          <CollapseMenu />
        </Header>
        <Layout hasSider>
          <SiderMenu />
          <Content className='bg-#f5f5f5 relative'>
            <main className='h-[100%] w-[100%] bg-[#f5f5f5] overflow-auto'>
              <Container />
            </main>
          </Content>
        </Layout>
      </Layout>
    </PageProvider>
  )
}

export default Page
