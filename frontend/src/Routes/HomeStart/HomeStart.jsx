import React from 'react'
import { Link } from 'react-router-dom'
import style from './HomeStart.module.css'
import MsgBemVindo from '../../Components/MsgBemVindo/MsgBemVindo'
import Logo from '../../Components/Logo/Logo'

const HomeStart = () => {
  return (
    <div className={style.homeStart}>
      <MsgBemVindo />
      <div className={style.content}>
        <div className={style.caixaBtnPerguntas}>
          <Link to='/Dieta' type="submit" className={style.btnGo}>Dieta Personalizada</Link>
        </div>
      </div>
    </div>
  )
}

export default HomeStart