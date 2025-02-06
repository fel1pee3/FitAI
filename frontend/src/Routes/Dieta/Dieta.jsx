import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import style from './Dieta.module.css';

const Dieta = () => {

    const [diet, setDiet] = useState("");

    useEffect(() => {
        const fetchDiet = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/gemini/userDiet', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDiet(response.data.diet);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDiet();
    }, []);

  return (
    <div className={style.dieta}>
        <div className={style.container}>
            <div
                className={style.dietCriada}
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(diet.diet_plan),
                }}
            />
        </div>
    </div>
  );
}

export default Dieta;
