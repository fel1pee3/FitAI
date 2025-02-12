import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from './ReceitasApi.module.css'
import { FaArrowLeft } from "react-icons/fa6";

const ReceitasApi = () => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/search.php?s="
          );
          setRecipes(response.data.meals.slice(0, 20));
          } catch (error) {
            console.error("Erro ao buscar receitas:", error);
          }
      };
  
      fetchRecipes();
    }, []);
    
  return (
    <div className={style.receitasApi}>
        <Link to="/HomeStart" className={style.cssButtonsIoButton}>
          <div className={style.icon}>
          <FaArrowLeft className={style.arrow} />
          </div>
          Back
        </Link>
        <h1 className={style.title}>Receitas</h1>
        <div className={style.grid}>
            {recipes.map((meal) => (
            <Link to={`/receita/${meal.idMeal}`} key={meal.idMeal} className={style.card}>
                <img src={meal.strMealThumb} alt={meal.strMeal} className={style.image} />
                <h3 className={style.mealTitle}>{meal.strMeal}</h3>
                <p className={style.description}>
                {meal.strInstructions.slice(0, 100)}...
                </p>
            </Link>
            ))}
        </div>
    </div>
  )
}

export default ReceitasApi