const EventoModel = require("../models/EventoModel");

// GET /eventos — listar todos
function index(req, res) {
    const eventos = EventoModel.listarTodos();
    res.json(eventos);
}

// GET /eventos/:id — buscar por ID
function show(req, res) {
    const id = parseInt(req.params.id);
    const evento = EventoModel.buscarPorId(id);

    if (!evento) {
        return res.status(404).json({ erro: "Evento não encontrado" });
    }

    res.json(evento);
}

//DESAFIO (COM AJUDA DA IA):
// No método store do EventoController.js, ANTES de chamar EventoModel.criar():

// 1. Nome não pode ser vazio (só espaços)
// if (!nome || nome.trim() === "") {
//     return res.status(400).json({ mensagem: "O nome é obrigatório e não pode conter apenas espaços." });
// }

// // 2. Capacidade deve ser um número positivo (se informada)
// if (capacidade !== undefined && capacidade <= 0) {
//     return res.status(400).json({ mensagem: "A capacidade deve ser um número maior que zero." });
// }

// POST /eventos — criar novo
function store(req, res) {
    const { nome, descricao, data, local, capacidade } = req.body;

    // Validação simples
    if (!nome || !data) {
        return res.status(400).json({ erro: "Nome e data são obrigatórios" });
    }

    const novoEvento = EventoModel.criar({
        nome,
        descricao,
        data,
        local,
        capacidade,
    });
    res.status(201).json(novoEvento);
}

// PUT /eventos/:id — atualizar
function update(req, res) {
    const id = parseInt(req.params.id);
    const eventoAtualizado = EventoModel.atualizar(id, req.body);

    if (!eventoAtualizado) {
        return res.status(404).json({ erro: "Evento não encontrado" });
    }
    res.json(eventoAtualizado);
}

// DELETE /eventos/:id — deletar
function destroy(req, res) {
    const id = parseInt(req.params.id);
    const deletado = EventoModel.deletar(id);

    if (!deletado) {
        return res.status(404).json({ erro: "Evento não encontrado" });
    }
    res.status(204).send();
}
module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};

