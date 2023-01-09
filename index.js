import 'dotenv/config'
import express from 'express'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

async function sendDiscordMessage(message) {
  await axios.post(process.env.DISCORD_URL, {
    username: 'LULA CAMARADA',
    content: message
  })
}

app.post('/', async (req, res) => {
  try {
      const { cardName, users, type, message } = req.body
      if(type === 'ended') {
        await sendDiscordMessage(`> the card **${cardName}** has been ended! \n > great job nossos queridos zé gotinhas **${users}**!`)
        await prisma.user.create({
          data: {
            name: users,
          }
        })
        return;
      }
      if(type === 'started') {
        await sendDiscordMessage(`> the card **${cardName}** has been started! \n > good luck meus companheiros **${users}**!`)
        return;
      }
      if(type === 'any') {
        await sendDiscordMessage(`> ${message}`)
      }
      return res.status(200).json({ message: 'ok' })
  } catch (error) {
    console.log(error);
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})