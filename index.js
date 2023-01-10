
import 'dotenv/config'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { validateBody } from './middleware/validateBody.js'
import { handleError } from './middleware/handleError.js'
import { discordUsers, mapUsers, sendDiscordMessage } from './utils/util.js'

const app = express()

app.use(express.json())
app.use(validateBody)
app.use(handleError)

const prisma = new PrismaClient()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', async (req, res, next) => {
  try {
      const { cardName, users, type, message } = req.body
      const usersArr = users.split(', ')
      let usersDiscord = mapUsers(usersArr, discordUsers)
      switch(type) {
        case 'ended': 
          await sendDiscordMessage(`> the card **${cardName}** has been ended! \n > great job nossos queridos zé gotinhas **${usersDiscord}**!`)
          await prisma.user.create({ data: { name: users } })
          break;
        case 'started': 
          await sendDiscordMessage(`> the card **${cardName}** has been started! \n > good luck meus companheiros **${usersDiscord}**!`)
          break;
        case 'tests':
          await sendDiscordMessage(`> the card **${cardName}** has been put in tests! \n > lets test them meus compatriotas **${usersDiscord}**!`)
          break;
        case 'any':
          await sendDiscordMessage(`> ${message}`)
          break;
        default:
          throw new Error('Invalid type')
      }
      return res.status(200).json({ message: 'ok' })
  } catch (err) {
    next(err)
  }
})

app.listen(3000, () => {
  console.log('app listening on port 3000!')
})
