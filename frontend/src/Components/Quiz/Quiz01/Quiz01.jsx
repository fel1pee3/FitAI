import React, { useState } from 'react'
import axios from 'axios'
import style from './Quiz01.module.css'

const Pg01 = () => {

  

  return (
    <div className={style.quiz01}>
      <form onSubmit={handleSubmit}>
      <label>Qual é o seu objetivo?</label>
      <select name="objetivo" value={values.objetivo} onChange={handleChanges}>
        <option value="">Selecione</option>
        <option value="Perder peso">Perder peso</option>
        <option value="Ganhar músculo">Ganhar músculo</option>
        <option value="Manter peso">Manter peso</option>
      </select>
      <button type="submit">Salvar</button>
    </form>
    </div>
  )
}

export default Pg01