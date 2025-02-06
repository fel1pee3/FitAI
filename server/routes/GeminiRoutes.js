import express from 'express';
import { connectToDatabase } from '../lib/db.js';
import verifyToken from '../middlewares/verifyToken.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

router.post('/generateDiet', verifyToken, async (req, res) => {
    try {
        const { userId } = req;
        const db = await connectToDatabase();

        const [rows] = await db.query(
            `SELECT * FROM quiz_responses WHERE user_id = ? ORDER BY id DESC LIMIT 1`,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Nenhuma resposta do quiz encontrada para o usuário.' });
        }

        const userData = rows[0];

        const prompt = `Crie um plano de dieta personalizado com base nestes dados:
        Objetivo: ${userData.objetivo}
        Gênero: ${userData.genero}
        Idade: ${userData.idade}
        Altura: ${userData.altura} cm
        Peso Atual: ${userData.peso_atual} kg
        Peso Ideal: ${userData.peso_ideal} kg
        Nível de Atividade: ${userData.nivel_atividade}
        Tipo de Atividade: ${userData.tipo_atividade}
        Horário de Acordar: ${userData.horario_acordar}
        Horário de Dormir: ${userData.horario_dormir}
        Rotina: ${userData.rotina}
        Dieta Específica: ${userData.dieta_especifica}
        Alimentos Restritos: ${userData.alimentos_restritos}
        Alimentos Preferidos: ${userData.alimentos_preferidos}
        Preferência por Refeições: ${userData.prefere_refeicoes}
        Problemas de Saúde: ${userData.problema_saude}
        Suplementos: ${userData.suplementos}
        Número de Refeições por Dia: ${userData.numero_refeicoes}
        Tipo de Desafio: ${userData.tipo_desafio}
        Tempo para Alcançar a Meta: ${userData.tempo_meta}`;

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const resultGemini = await model.generateContent(prompt);
        const generatedDiet = resultGemini.response.text();

        await db.query(
            `INSERT INTO diets (user_id, diet_plan) VALUES (?, ?)`,
            [userId, generatedDiet]
        );

        res.status(201).json({ message: 'Dieta gerada com sucesso!', diet: generatedDiet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default router;
