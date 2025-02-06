import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import style from './Home.module.css'
import Logo from '../../Components/Logo/Logo';

const Home = () => {

    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/auth/home', {
            headers: {
            "Authorization": `Bearer ${token}`
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        const quizCompleted = localStorage.getItem('quizCompleted'); // Verifica se o quiz foi respondido
        
        if (quizCompleted === 'true') {
          navigate('/HomeStart');
        } else {
          fetchUser();
        }
    }, [navigate]);
      

  return (
    <div className={style.home}>    
        <Logo />
        <div className={style.homeContainer}>
            <h2 className={style.title}>Bem Vindo {userName}</h2>
            <h1 className={style.text}>"Cada pequena mudança nos hábitos é um grande passo rumo ao seu objetivo."</h1>
            <Link to='/PerguntasUser' className={style.btnGo}>Começar agora</Link>
        </div>
    </div>
  )
}

export default Home