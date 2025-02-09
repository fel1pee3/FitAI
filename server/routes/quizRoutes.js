import express from 'express'
import { connectToDatabase } from '../lib/db.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router.post('/quizResponses', verifyToken, async (req, res) => {
    const { objetivo, genero, idade, altura, peso_atual, peso_ideal, nivel_atividade, tipo_atividade, horario_acordar, horario_dormir, rotina, dieta_especifica, alimentos_restritos, alimentos_preferidos, prefere_refeicoes, problema_saude, suplementos, numero_refeicoes, tipo_desafio, tempo_meta } = req.body;

    try {
        const db = await connectToDatabase();

        await db.query(
            'INSERT INTO quiz_responses (user_id, objetivo, genero, idade, altura, peso_atual, peso_ideal, nivel_atividade, tipo_atividade, horario_acordar, horario_dormir, rotina, dieta_especifica, alimentos_restritos, alimentos_preferidos, prefere_refeicoes, problema_saude, suplementos, numero_refeicoes, tipo_desafio, tempo_meta ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )',
            [ req.userId, objetivo, genero, idade, altura, peso_atual, peso_ideal, nivel_atividade, tipo_atividade, horario_acordar, horario_dormir, rotina, dieta_especifica, alimentos_restritos, alimentos_preferidos, prefere_refeicoes, problema_saude, suplementos, numero_refeicoes, tipo_desafio, tempo_meta ]
        );

        res.status(201).json({ message: "Quiz response registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});

router.put('/markAsCompleted', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const db = await connectToDatabase();
      await db.query(
        'UPDATE quiz_responses SET respondido = TRUE WHERE user_id = ?',
        [userId]
      );
  
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar status do quiz.' });
    }
});

router.get('/checkResponse', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const db = await connectToDatabase();
        const [result] = await db.query(
        'SELECT respondido FROM quiz_responses WHERE user_id = ? LIMIT 1',
        [userId]
        );

        if (result.length > 0 && result[0].respondido === 1) {
        return res.json({ responded: true });
        } else {
        return res.json({ responded: false });
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao verificar status do quiz.' });
    }
});    

export default router;