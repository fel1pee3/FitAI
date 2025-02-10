import React from 'react'
import { Link } from 'react-router-dom'
import style from './HomeStart.module.css'
import MsgBemVindo from '../../Components/MsgBemVindo/MsgBemVindo'
import Logo from '../../Components/Logo/Logo'
import imgReceitas from '../../../images/img-receitas.jpg'

const HomeStart = () => {
  return (
    <div className={style.homeStart}>
      <MsgBemVindo />
      <div className={style.content}>
        <div className={style.caixaBtnsPerguntas}>
          <Link to='/Dieta' type="submit" className={style.btnGo}>
            Dieta Personalizada
          </Link>
          <Link to='ReceitasApi' className={style.card}>
              <div className={style.card__body}>
                  <img className={style.imgReceitas} src={imgReceitas} alt="" />
              </div>
              <span>Receitas</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeStart