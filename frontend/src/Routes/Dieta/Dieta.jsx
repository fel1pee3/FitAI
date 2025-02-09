import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import style from './Dieta.module.css';
import { FaArrowLeft } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";
import { jsPDF } from 'jspdf'; // Importa a biblioteca jsPDF

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

    const downloadPDF = () => {
        const doc = new jsPDF(); // Cria uma instância do jsPDF

        const dietContent = DOMPurify.sanitize(diet.diet_plan); // Sanitiza o conteúdo

        // Definir o tamanho da fonte para controlar o layout
        doc.setFontSize(12); // Tamanho da fonte ajustado

        // Adiciona o conteúdo HTML ao PDF
        doc.html(dietContent, {
            callback: function (doc) {
                // Salva o PDF
                doc.save('dieta.pdf');
            },
            margin: [10, 10], // Define margens para ajustar o conteúdo na página
            x: 10,
            y: 10,
            width: 180, // Largura ajustada para caber melhor na página
            windowWidth: 800, // Ajusta a largura da janela para o conteúdo ser renderizado corretamente
        });
    };

  return (
    <div className={style.dieta}>
        <div className={style.caixaBtns}>
            <Link to="/HomeStart" className={style.cssButtonsIoButton}>
                <div className={style.icon}>
                <FaArrowLeft className={style.arrow} />
                </div>
                Back
            </Link>
            <button className={style.downloadPDF} onClick={downloadPDF}>
                <FaFilePdf className={style.iconPDF}/>
                <p className={style.text}>Baixar em PDF</p>
            </button>
        </div>
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
