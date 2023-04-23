import nodemailer from 'nodemailer'
import hbs, {
  NodemailerExpressHandlebarsOptions
} from 'nodemailer-express-handlebars'
import path from 'path'
import AppError from '../errors/app.error'
import { generateRecoveryToken } from './auth.service'

export const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: Boolean(process.env.MAIL_SECURE),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

const handlebarOption: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, '..', '..', 'templates'),
    defaultLayout: undefined
  },
  viewPath: path.resolve(__dirname, '..', '..', 'templates')
}

transport.use('compile', hbs(handlebarOption))

export const mailTemplateOptions = (
  to: string | undefined,
  subject: string,
  template: string,
  context: any
) => {
  return {
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    template,
    context
  }
}

export const sendRecoveryEmail = async (email: string) => {
  const token = await generateRecoveryToken(email)

  const options = mailTemplateOptions(
    email,
    'Recuperação de senha',
    'recovery',
    {
      token
    }
  )

  try {
    transport.sendMail(options, function (err, info) {
      if (err != null) {
        console.log(err)
        throw new Error()
      }
    })
  } catch (error) {
    console.log(error)
    throw new AppError('Erro ao enviar email', 400)
  }
}
