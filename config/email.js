require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USERAPP,
        pass: process.env.PASSAPP
    }
})

/**
 * Função para enviar e-mail com nodemailer
 * @param {string} to - Email do destinatário
 * @param {string} subject - Assunto do e-mail
 * @param {string} text - Corpo do e-mail (texto simples)
 */
async function enviarEmail(to, subject, text) {
    try {
        const info = await transporter.sendMail({
            from: `"Sistema Node Prisma" <${process.env.USERAPP}>`,
            to,
            subject,
            text
        })

        console.log('E-mail enviado:', info.messageId)
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error)
        throw error
    }
}

module.exports = { enviarEmail }
