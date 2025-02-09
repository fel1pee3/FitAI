import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './Home.module.css';
import Logo from '../../Components/Logo/Logo';

const Home = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Função para buscar o nome do usuário
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/auth/home', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setUserName(response.data.users.username);
      } else {
        navigate('/login');
      }
    } catch (err) {
      navigate('/login');
      console.log(err);
    }
  };
  
  const checkQuizStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/quiz/checkResponse', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.responded) {
        navigate('/HomeStart'); // Se já respondeu, vai para HomeStart
      } else {
        navigate('/PerguntasUser'); // Se não respondeu, vai para o formulário
      }
    } catch (error) {
      console.error('Erro ao verificar o status do quiz:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={style.home}>
      <Logo />
      <div className={style.homeContainer}>
        <h2 className={style.title}>Bem Vindo {userName}</h2>
        <h1 className={style.text}>
          "Cada pequena mudança nos hábitos é um grande passo rumo ao seu objetivo."
        </h1>
        <button onClick={checkQuizStatus} className={style.btnGo}>
          Começar agora
        </button>
      </div>
    </div>
  );
};

export default Home;
