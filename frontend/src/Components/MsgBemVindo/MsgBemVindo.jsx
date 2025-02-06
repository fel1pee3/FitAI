import React, { useState, useEffect } from 'react'
import axios from 'axios';
import style from './MsgBemVindo.module.css'

const MsgBemVindo = () => {

    const [userName, setUserName] = useState('');

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
    <div className={style.msg}>Olá, <span className={style.nome}>{userName}!</span> Seu plano de dieta foi gerado com sucesso!</div>
  )
}

export default MsgBemVindo