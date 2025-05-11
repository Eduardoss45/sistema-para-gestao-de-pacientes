const express = require('express');
const router = express.Router();
const {
    renderHome,
    cadastrarPaciente,
    listarPacientes,
    buscarPaciente,
    cadastrarAtendimento,
    listarAtendimentos,
    buscarAtendimento,
    atualizarPaciente,
    atualizarAtendimento,
    removerAtendimento,
    removerPaciente,
    enviarEmailBoasVindas
} = require('../controllers/controllers');

router.get('/', renderHome); // * redireciona para o endpoint de cadastro
router.post('/create/paciente', cadastrarPaciente); // * cria um paciente
router.get('/get/pacientes', listarPacientes); // * retorna todos os pacientes
router.get('/get/paciente/:id', buscarPaciente); // * retorna um paciente específico
router.post('/create/atendimento', cadastrarAtendimento); // * cria um atendimento
router.get('/get/atendimentos', listarAtendimentos); // * retorna todos os atendimentos
router.get('/get/atendimento/:id', buscarAtendimento); // * retorna um atendimento específico
router.patch('/edit/paciente/:id', atualizarPaciente); // * permite editar paciente e criar atendimento
router.patch('/edit/atendimento/:id', atualizarAtendimento); // * permite editar um atendimento
router.delete('/remove/atendimento/:id', removerAtendimento); // * remove atendimento
router.delete('/remove/paciente/:id', removerPaciente); // * remove paciente
router.post('/email/paciente', enviarEmailBoasVindas) // * envia email para o paciente


module.exports = router;
