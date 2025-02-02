import React from 'react'
import logo from '../../../images/logo-FitAi-semfundo.png'
import style from './Logo.module.css'

const Logo = () => {
  return (
    <img className={style.logo} src={logo} alt="Logo" />
  )
}

export default Logo