const prisma = require('../prisma/client')
const { enviarEmail } = require('../config/email')

function renderHome(req, res) {
    res.render('criarpaciente')
}

async function cadastrarPaciente(req, res) {
    const { nome, email } = req.body
    try {
        const pacienteExistente = await prisma.paciente.findUnique({
            where: { email }
        })

        if (pacienteExistente) {
            res.render('erro', { msg: 'E-mail já cadastrado.' })
            return
        }

        const novoPaciente = await prisma.paciente.create({
            data: { nome, email }
        })

        return res.render('newpaciente', {
            nome: novoPaciente.nome,
            email: novoPaciente.email
        })

    } catch (error) {
        console.error(error)
        res.render('erro', { msg: 'Erro ao cadastrar paciente. Tente novamente.' })
    }
}

async function listarPacientes(req, res) {
    try {
        const listaPacientes = await prisma.paciente.findMany()
        res.render('listapacientes', {
            pacientes: listaPacientes,
            qtd: listaPacientes.length
        })
    } catch (error) {
        console.error(error)
        res.render('erro', { msg: 'Erro ao buscar pacientes.' })
    }
}

async function cadastrarAtendimento(req, res, paciente) {
    const descricao = req.descricao
    const pacienteId = parseInt(req.pacienteId)

    try {
        const novoAtendimento = await prisma.atendimento.create({
            data: { descricao, pacienteId }
        })

        return res.render('updatepaciente', {
            descricao: novoAtendimento.descricao,
            id: novoAtendimento.pacienteId,
            nome: paciente.nome,
            email: paciente.email
        })

    } catch (error) {
        console.error(error)
        res.render('erro', { msg: 'Erro ao cadastrar atendimento. Tente novamente.' })
    }
}

async function listarAtendimentos(req, res) {
    try {
        const listaAtendimentos = await prisma.atendimento.findMany()
        res.render('listaatendimentos', {
            atendimentos: listaAtendimentos,
            qtd: listaAtendimentos.length
        })
    } catch (error) {
        console.error(error)
        res.render('erro', { msg: 'Erro ao buscar atendimentos.' })
    }
}

async function buscarPaciente(req, res) {
    const pacienteId = parseInt(req.params.id)

    try {
        const paciente = await prisma.paciente.findUnique({
            where: { id: pacienteId },
            include: {
                atendimentos: {
                    select: { id: true, descricao: true }
                }
            }
        })

        const temAtendimento = paciente.atendimentos.length > 0

        res.render('editarpaciente', {
            nome: paciente.nome,
            id: paciente.id,
            email: paciente.email,
            temAtendimento,
            atendimentos: paciente.atendimentos
        })

    } catch (error) {
        console.error(error)
        res.render('erro', { msg: 'Erro ao buscar paciente.' })
    }
}

async function buscarAtendimento(req, res) {
    const atendimentoId = parseInt(req.params.id)

    try {
        const atendimento = await prisma.atendimento.findUnique({
            where: { id: atendimentoId }
        })

        res.render('editaratendimento', {
            id: atendimento.id,
            data: atendimento.data,
            descricao: atendimento.descricao
        })

    } catch (error) {
        console.error(error)
        res.render('erro', { msg: 'Erro ao buscar atendimento.' })
    }
}

async function atualizarPaciente(req, res) {
    const { id, novoNome, novoEmail, novoAtendimento } = req.body
    const novoAtendimentoData = { descricao: novoAtendimento, pacienteId: id }

    try {
        const pacienteAtualizado = await prisma.paciente.update({
            where: { id: parseInt(id) },
            data: { nome: novoNome, email: novoEmail }
        })

        if (novoAtendimento.length > 0) {
            await cadastrarAtendimento(novoAtendimentoData, res, pacienteAtualizado)
        }

    } catch (error) {
        console.error(error)
        res.render('erro', { msg: 'Erro ao atualizar paciente.' })
    }
}

async function atualizarAtendimento(req, res) {
    const id = parseInt(req.params.id)
    const descricao = req.body.descricao
    console.log(descricao)
    try {
        const atendimentoAtualizado = await prisma.atendimento.update({
            where: { id: id },
            data: {
                descricao: descricao
            }
        })
        res.render('updateatendimento', { id: atendimentoAtualizado.id, descricao: atendimentoAtualizado.descricao })
    } catch (error) {
        console.error(error)
        res.render('erro', { msg: 'Erro ao atualizar atendimento.' })
    }
}

async function removerAtendimento(req, res) {
    const id = parseInt(req.params.id)
    try {
        await prisma.atendimento.delete({ where: { id: id } })
        res.render('delete')
    } catch (error) {
        console.error(error)
        res.render('erro', { msg: 'Erro ao deletar atendimento.' })
    }
}

async function removerPaciente(req, res) {
    const pacienteId = parseInt(req.params.id)
    try {
        await prisma.atendimento.deleteMany({
            where: { pacienteId }
        })
        await prisma.paciente.delete({
            where: { id: pacienteId }
        })

        res.render('delete')
    } catch (error) {
        console.error(error)
        res.render('erro', { msg: 'Erro ao deletar paciente e seus atendimentos.' })
    }
}

async function enviarEmailBoasVindas(req, res) {
    const { email, nome } = req.body
    try {
        await enviarEmail(
            email,
            'Bem-vindo ao sistema!',
            `Olá ${nome}, obrigado por se cadastrar no nosso sistema!`
        )

        res.render('sucesso', { msg: 'E-mail enviado com sucesso.' })
    } catch (error) {
        res.render('erro', { msg: 'Erro ao enviar e-mail.' })
    }
}

module.exports = {
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
}
