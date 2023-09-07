import { Suspense } from 'react'
import { PageProvider } from './_components/Context'
import { CollapseMenu, Container, SettingAside, SiderMenu } from './_components'
import styles from './_components/style/index.module.scss'
import { Content, Header, Layout } from '@/lib/Antd'
import { Loading } from '@/components'

function Page() {
  return (
    <PageProvider>
      <Layout className={`${styles.container} h-[100vh] w-[100vw] overflow-hidden`} hasSider>
        <Layout>
          <Header className={styles.header}>
            <CollapseMenu />
          </Header>
          <Layout hasSider>
            <Suspense fallback={<Loading />}>
              <SiderMenu />
            </Suspense>
            <Content className='bg-#f5f5f5 relative'>
              <main className='h-[100%] w-[100%] bg-[#f5f5f5] overflow-hidden'>
                <Suspense fallback={<Loading />}>
                  <Container />
                </Suspense>
              </main>
            </Content>
          </Layout>
        </Layout>
        <Suspense fallback={<Loading />}>
          <SettingAside />
        </Suspense>
      </Layout>
    </PageProvider>
  )
}

export default Page
