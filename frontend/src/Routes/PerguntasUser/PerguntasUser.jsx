import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from './PerguntasUser.module.css'

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
        navigate('/HomeStart');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.perguntas}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="objetivo">Objetivo</label>
          <select name="objetivo" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="Emagrecer">Emagrecer</option>
            <option value="Ganhar massa muscular">Ganhar massa muscular</option>
            <option value="Melhorar a saúde">Melhorar a saúde</option>
            <option value="Manter o peso">Manter o peso</option>
          </select>
        </div>

        <div>
          <label htmlFor="genero">Gênero</label>
          <select name="genero" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>

        <div>
          <label htmlFor="idade">Idade</label>
          <input
            type="number"
            placeholder="18"
            name="idade"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="altura">Altura</label>
          <input
            type="number"
            placeholder="190"
            name="altura"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="peso_atual">Peso Atual</label>
          <input
            type="number"
            placeholder="80"
            name="peso_atual"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="peso_ideal">Peso Ideal</label>
          <input
            type="number"
            placeholder="75"
            name="peso_ideal"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="nivel_atividade">Nível de Atividade</label>
          <select name="nivel_atividade" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="Sedentário">Sedentário</option>
            <option value="Leve">Leve</option>
            <option value="Moderado">Moderado</option>
            <option value="Intenso">Intenso</option>
            <option value="Atleta">Atleta</option>
          </select>
        </div>

        <div>
          <label htmlFor="tipo_atividade">Tipo de Atividade</label>
          <textarea
            placeholder="Aeróbica, Musculação, Atividades mistas, ..."
            name="tipo_atividade"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="horario_acordar">Horário de Acordar</label>
          <input
            type="time"
            name="horario_acordar"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="horario_dormir">Horário de Dormir</label>
          <input
            type="time"
            name="horario_dormir"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="rotina">Rotina</label>
          <select name="rotina" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="Pouco movimentada">Pouco movimentada</option>
            <option value="Moderadamente ativa">Moderadamente ativa</option>
            <option value="Muito ativa">Muito ativa</option>
          </select>
        </div>

        <div>
          <label htmlFor="dieta_especifica">Dieta Específica</label>
          <textarea
            placeholder="Dietas para emagrecer, Dietas para diabéticos, ..."
            name="dieta_especifica"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="alimentos_restritos">Alimentos Restritos</label>
          <textarea
            placeholder="glúten, lactose, açúcar, ..."
            name="alimentos_restritos"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="alimentos_preferidos">Alimentos Preferidos</label>
          <textarea
            placeholder="Doce, Salgado, Frutas, Carnes, ..."
            name="alimentos_preferidos"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="prefere_refeicoes">Prefere Refeições</label>
          <select name="prefere_refeicoes" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="Simples e rápidas">Simples e rápidas</option>
            <option value="Elaboradas">Elaboradas</option>
            <option value="Prontas">Prontas</option>
          </select>
        </div>

        <div>
          <label htmlFor="problema_saude">Problema de Saúde</label>
          <textarea
            placeholder="Diabétes, Hipertensão, falta de vitaminas, ..."
            name="problema_saude"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="suplementos">Suplementos</label>
          <textarea
            placeholder="Whey Protein, BCAA, Creatina, ..."
            name="suplementos"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="numero_refeicoes">Número de Refeições</label>
          <input
            type="number"
            placeholder="Número de refeições diárias"
            name="numero_refeicoes"
            onChange={handleChanges}
          />
        </div>

        <div>
          <label htmlFor="tipo_desafio">Tipo de Desafio</label>
          <select name="tipo_desafio" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="Falta de tempo">Falta de tempo</option>
            <option value="Não saber o que comer">Não saber o que comer</option>
            <option value="Preferência por alimentos menos saudáveis">Preferência por alimentos menos saudáveis</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label htmlFor="tempo_meta">Tempo para Meta</label>
          <select name="tempo_meta" onChange={handleChanges}>
            <option value="" disabled>Selecione...</option>
            <option value="1 mês">1 mês</option>
            <option value="3 meses">3 meses</option>
            <option value="6 meses">6 meses</option>
            <option value="12 meses">12 meses</option>
          </select>
        </div>

        <button type="submit">Registrar Resposta</button>

      </form>

    </div>
  )
}

export default PerguntasUser