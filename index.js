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

const discordUsers = {
  'viniciusfrancisco4': '@SUPORTEGERENCIAL#4548'
}

app.post('/', async (req, res) => {
  try {
      const { cardName, users, type, message } = req.body
      let usersDiscord = users.map(user => discordUsers[user] || user).join(', ')
      if(type === 'ended') {
        await sendDiscordMessage(`> the card **${cardName}** has been ended! \n > great job nossos queridos zé gotinhas **${usersDiscord}**!`)
        await prisma.user.create({
          data: {
            name: users,
          }
        })
        return;
      }
      if(type === 'started') {
        await sendDiscordMessage(`> the card **${cardName}** has been started! \n > good luck meus companheiros **${usersDiscord}**!`)
        return;
      }
      if(type === 'tests') {
        await sendDiscordMessage(`> the card **${cardName}** has been put in tests! \n > lets test them meus compatriotas **${usersDiscord}**!`)
        return
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