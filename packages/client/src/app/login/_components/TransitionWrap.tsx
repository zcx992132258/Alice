'use client'
import { useState } from 'react'
import style from './style/index.module.scss'

export function TransitionWrap(props: { children: React.ReactNode }) {
  const [isSignUp, setIsSignUp] = useState(false)
  return (
    <div className={`${style.container} ${isSignUp ? style['right-panel-active'] : ''}`}>
      {props.children}
      <div className={`${style.container__overlay}`}>
        <div className={`${style.overlay}`}>
          <div className={`${style.overlay__panel}  ${style['overlay--left']} `}>
            <button
              className={style.btn}
              id="signIn"
              onClick={() => {
                setIsSignUp(false)
              }}
            >
              登录
            </button>
          </div>
          <div className={`${style.overlay__panel}  ${style['overlay--right']} `}>
            <button
              className={style.btn}
              id="signUp"
              onClick={() => {
                setIsSignUp(true)
              }}
            >
              注册
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
