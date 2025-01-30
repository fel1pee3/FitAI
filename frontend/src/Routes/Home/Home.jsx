import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import img from "../../../images/ilustracao-home.png"
import style from './Home.module.css'

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
        fetchUser();
    }, []);

  return (
    <div className={style.home}>    
        <div className={style.homeContainer}>
            <img src={img} className={style.imgIlustration} alt="imagem de ilustração" />
            <div className={style.homeContent}>
                <h2>Bem Vindo {userName}</h2>
                <h1>"Cada pequena mudança nos hábitos é um grande passo rumo ao seu objetivo."</h1>
                <Link to='/PerguntasUser' className={style.btnGo}>Começar agora</Link>
            </div>
        </div>
    </div>
  )
}

export default Home