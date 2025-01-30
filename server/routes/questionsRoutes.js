import express from 'express'
import {connectToDatabase} from '../lib/db.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router.post('/objetivo', verifyToken, async (req, res) => {
    const { objetivo } = req.body;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'UPDATE quiz_responses SET objetivo = ? WHERE user_id = ?',
            [objetivo, req.userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado ou registro não existe.' });
        }

        res.status(200).json({ message: 'Objetivo salvo com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor.', error: err.message });
    }
});

router.post('/dados-pessoais', verifyToken, async (req, res) => {
    const { genero, idade, altura, peso_atual, peso_ideal } = req.body;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'UPDATE quiz_responses SET genero = ?, idade = ?, altura = ?, peso_atual = ?, peso_ideal = ? WHERE user_id = ?',
            [genero, idade, altura, peso_atual, peso_ideal, req.userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado ou registro não existe.' });
        }

        res.status(200).json({ message: 'Dados pessoais salvos com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor.', error: err.message });
    }
});

router.post('/atividade-fisica', verifyToken, async (req, res) => {
    const { nivel_atividade, tipo_atividade } = req.body;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'UPDATE quiz_responses SET nivel_atividade = ?, tipo_atividade = ? WHERE user_id = ?',
            [nivel_atividade, tipo_atividade, req.userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado ou registro não existe.' });
        }

        res.status(200).json({ message: 'Nível de atividade física salvo com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor.', error: err.message });
    }
});

router.post('/rotina', verifyToken, async (req, res) => {
    const { horario_acordar, horario_dormir, rotina } = req.body;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'UPDATE quiz_responses SET horario_acordar = ?, horario_dormir = ?, rotina = ? WHERE user_id = ?',
            [horario_acordar, horario_dormir, rotina, req.userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado ou registro não existe.' });
        }

        res.status(200).json({ message: 'Rotina diária salva com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor.', error: err.message });
    }
});

router.post('/preferencias-alimentares', verifyToken, async (req, res) => {
    const { dieta_especifica, alimentos_restritos, alimentos_preferidos, prefere_refeicoes } = req.body;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'UPDATE quiz_responses SET dieta_especifica = ?, alimentos_restritos = ?, alimentos_preferidos = ?, prefere_refeicoes = ? WHERE user_id = ?',
            [dieta_especifica, alimentos_restritos, alimentos_preferidos, prefere_refeicoes, req.userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado ou registro não existe.' });
        }

        res.status(200).json({ message: 'Preferências alimentares salvas com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor.', error: err.message });
    }
});

router.post('/saude', verifyToken, async (req, res) => {
    const { problema_saude, suplementos } = req.body;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'UPDATE quiz_responses SET problema_saude = ?, suplementos = ? WHERE user_id = ?',
            [problema_saude, suplementos, req.userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado ou registro não existe.' });
        }

        res.status(200).json({ message: 'Dados de saúde salvos com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor.', error: err.message });
    }
});

router.post('/habitos-e-metas', verifyToken, async (req, res) => {
    const { numero_refeicoes, desafio, tempo_meta } = req.body;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'UPDATE quiz_responses SET numero_refeicoes = ?, desafio = ?, tempo_meta = ? WHERE user_id = ?',
            [numero_refeicoes, desafio, tempo_meta, req.userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado ou registro não existe.' });
        }

        res.status(200).json({ message: 'Hábitos e metas salvos com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor.', error: err.message });
    }
});


export default router;