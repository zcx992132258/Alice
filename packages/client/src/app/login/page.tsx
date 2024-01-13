import { cookies } from 'next/headers'
import style from './_components/style/index.module.scss'
import { SignIn, SignUp, TransitionWrap } from './_components'

function page() {
  return (
    <div className={style.wrap}>
      <TransitionWrap>
        <SignUp></SignUp>
        <SignIn></SignIn>
      </TransitionWrap>
    </div>
  )
}

export default page
