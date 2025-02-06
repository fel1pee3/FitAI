import React, {useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from './PerguntasUser.module.css'
import { FaArrowLeft } from "react-icons/fa6";

const PerguntasUser = () => {

  const [values, setValues] = useState({
    objetivo: '',
    genero: '',
    idade: '',
    altura: '',
    peso_atual: '',
    peso_ideal: '',
    nivel_atividade: '',
    tipo_atividade: '',
    horario_acordar: '',
    horario_dormir: '',
    rotina: '',
    dieta_especifica: '',
    alimentos_restritos: '',
    alimentos_preferidos: '', 
    prefere_refeicoes: '', 
    problema_saude: '', 
    suplementos: '', 
    numero_refeicoes: '',
    tipo_desafio: '',
    tempo_meta: ''
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(
            'http://localhost:3000/quiz/quizResponses',
            values,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.status === 201) {
            console.log('Quiz responses saved successfully!');

            const dietResponse = await axios.post(
                'http://localhost:3000/gemini/generateDiet',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (dietResponse.status === 201) {
                console.log('Diet generated successfully:', dietResponse.data.diet);
                navigate('/HomeStart'); // Redirecionar após sucesso
            }
        }
    } catch (err) {
        console.log(err);
    }
  };

  

  return (
    <div className={style.perguntas}>
      <div className={style.caixaBtnBack}>
      <Link to="/" className={style.cssButtonsIoButton}>
        <div className={style.icon}>
          <FaArrowLeft className={style.arrow} />
        </div>
        Back
      </Link>
      </div>
      <p className={style.texto}>
        Preencha as informações abaixo para que possamos criar uma dieta personalizada para você, considerando seus objetivos, rotina e necessidades individuais.
      </p>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="objetivo">Objetivo</label>
          <select className={style.select} name="objetivo" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="Emagrecer">Emagrecer</option>
            <option value="Ganhar massa muscular">Ganhar massa muscular</option>
            <option value="Melhorar a saúde">Melhorar a saúde</option>
            <option value="Manter o peso">Manter o peso</option>
          </select>
        </div>

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="genero">Gênero</label>
          <select className={style.select} name="genero" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>

        
        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="idade">Idade</label>
          <input
            type="number"
            placeholder="idade"
            name="idade"
            onChange={handleChanges}
            className={style.inputNumber}
          />
        </div>
        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="altura">Altura</label>
          <input
            type="number"
            placeholder="Em cm"
            name="altura"
            onChange={handleChanges}
            className={style.inputNumber}
          />
        </div>
        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="peso_atual">Peso Atual</label>
          <input
            type="number"
            placeholder="Em kg"
            name="peso_atual"
            onChange={handleChanges}
            className={style.inputNumber}
          />
        </div>
        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="peso_ideal">Peso Ideal</label>
          <input
            type="number"
            placeholder="Em kg"
            name="peso_ideal"
            onChange={handleChanges}
            className={style.inputNumber}
          />
        </div>
        

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="nivel_atividade">Nível de Atividade</label>
          <select className={style.select} name="nivel_atividade" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="Sedentário">Sedentário</option>
            <option value="Leve">Leve</option>
            <option value="Moderado">Moderado</option>
            <option value="Intenso">Intenso</option>
            <option value="Atleta">Atleta</option>
          </select>
        </div>

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="tipo_atividade">Tipo de Atividade</label>
          <textarea
            placeholder="Aeróbica, Musculação, Atividades mistas, ..."
            name="tipo_atividade"
            onChange={handleChanges}
            className={style.textArea}
          />
        </div>

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="horario_acordar">Horário de Acordar</label>
          <input
            type="time"
            name="horario_acordar"
            onChange={handleChanges}
            className={style.inputHora}
          />
        </div>
        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="horario_dormir">Horário de Dormir</label>
          <input
            type="time"
            name="horario_dormir"
            onChange={handleChanges}
            className={style.inputHora}
          />
        </div>
      

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="rotina">Rotina</label>
          <select className={style.select} name="rotina" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="Pouco movimentada">Pouco movimentada</option>
            <option value="Moderadamente ativa">Moderadamente ativa</option>
            <option value="Muito ativa">Muito ativa</option>
          </select>
        </div>

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="dieta_especifica">Dieta Específica</label>
          <textarea
            placeholder="Dietas para emagrecer, Dietas para diabéticos, ..."
            name="dieta_especifica"
            onChange={handleChanges}
            className={style.textArea}
          />
        </div>

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="alimentos_restritos">Alimentos Restritos</label>
          <textarea
            placeholder="glúten, lactose, açúcar, ..."
            name="alimentos_restritos"
            onChange={handleChanges}
            className={style.textArea}
          />
        </div>

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="alimentos_preferidos">Alimentos Preferidos</label>
          <textarea
            placeholder="Doce, Salgado, Frutas, Carnes, ..."
            name="alimentos_preferidos"
            onChange={handleChanges}
            className={style.textArea}
          />
        </div>

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="prefere_refeicoes">Prefere Refeições</label>
          <select className={style.select} name="prefere_refeicoes" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="Simples e rápidas">Simples e rápidas</option>
            <option value="Elaboradas">Elaboradas</option>
            <option value="Prontas">Prontas</option>
          </select>
        </div>

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="problema_saude">Problema de Saúde</label>
          <textarea
            placeholder="Diabétes, Hipertensão, falta de vitaminas, ..."
            name="problema_saude"
            onChange={handleChanges}
            className={style.textArea}
          />
        </div>

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="suplementos">Suplementos</label>
          <textarea
            placeholder="Whey Protein, BCAA, Creatina, ..."
            name="suplementos"
            onChange={handleChanges}
            className={style.textArea}
          />
        </div>

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="numero_refeicoes">Número de Refeições</label>
          <input
            type="number"
            placeholder="Refeições diárias"
            name="numero_refeicoes"
            onChange={handleChanges}
            className={style.inputNumber}
          />
        </div>

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="tipo_desafio">Tipo de Desafio</label>
          <select className={style.select} name="tipo_desafio" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="Falta de tempo">Falta de tempo</option>
            <option value="Não saber o que comer">Não saber o que comer</option>
            <option value="Preferência por alimentos menos saudáveis">Preferência por alimentos menos saudáveis</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className={style.caixaInput}>
          <label className={style.label} htmlFor="tempo_meta">Tempo para Meta</label>
          <select className={style.select} name="tempo_meta" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="1 mês">1 mês</option>
            <option value="3 meses">3 meses</option>
            <option value="6 meses">6 meses</option>
            <option value="12 meses">12 meses</option>
          </select>
        </div>


        <div className={style.caixaBtnPerguntas}>
          <button type="submit" className={style.btnGo}>Salvar</button>
        </div>

      </form>

    </div>
  )
}

export default PerguntasUser