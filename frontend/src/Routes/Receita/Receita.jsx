import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import style from './Receita.module.css';
import { FaArrowLeft } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

const Receita = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                );
                setRecipe(response.data.meals ? response.data.meals[0] : null);
            } catch (error) {
                console.error("Erro ao buscar receita:", error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={style.receita}>
            <Link to="/HomeStart/ReceitasApi" className={style.cssButtonsIoButton}>
                <div className={style.icon}>
                <FaArrowLeft className={style.arrow} />
                </div>  
                Back
            </Link>
            <h1 className={style.title}>{recipe.strMeal}</h1>
            <img className={style.imgReceita} src={`${recipe.strMealThumb}`} alt="imagem da receita" />
            <div className={style.receitaPreparo}>
                <div className={style.ingrediensReceita}>
                    <h1>Ingredientes:</h1>
                    <ul>
                        {Array.from({ length: 20 }, (_, i) => {
                            const ingredient = recipe[`strIngredient${i + 1}`];
                            const measure = recipe[`strMeasure${i + 1}`];
                            return ingredient ? (
                                <li key={i}>{measure} {ingredient}</li>
                            ) : null;
                        })}
                    </ul>
                </div>
                <div className={style.instructionsReceita}>
                    <h1>Instruções:</h1>
                    <p className={style.instructions}>{recipe.strInstructions}</p>
                </div>
            </div>
            <div className={style.links}>
                <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
                    <FaYoutube className={style.linkY} />Assistir no YouTube
                </a>
                <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
                    <FaLink className={style.linkS} />Fonte original da receita
                </a>
            </div>
        </div>
    );
};

export default Receita;
