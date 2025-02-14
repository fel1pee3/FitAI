import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './IdeiasReceita.module.css';

const IdeiasReceita = () => {
    
    const [recipes, setRecipes] = useState([]);

  useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/search.php?s=salad"
        );
        setRecipes(response.data.meals.slice(0, 3));
        } catch (error) {
        console.error("Erro ao buscar receitas:", error);
        }
      };
  
      fetchRecipes();
    }, []);

    return (
        <div className={style.grid}>
            {recipes.map((meal) => (
            <Link to={`/receita/${meal.idMeal}`} key={meal.idMeal} className={style.card}>
                <img src={meal.strMealThumb} alt={meal.strMeal} className={style.image} />
                <div className={style.receita}>
                  <h3 className={style.mealTitle}>{meal.strMeal}</h3>
                  <p className={style.description}>
                  {meal.strInstructions.slice(0, 100)}...
                  </p>
                </div>
            </Link>
            ))}
        </div>
    );
};

export default IdeiasReceita;
