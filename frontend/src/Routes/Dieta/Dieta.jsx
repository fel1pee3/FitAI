import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import style from './Dieta.module.css';
import { FaArrowLeft } from "react-icons/fa6";

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
        <Link to="/HomeStart" className={style.cssButtonsIoButton}>
        <div className={style.icon}>
          <FaArrowLeft className={style.arrow} />
        </div>
        Back
      </Link>
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
