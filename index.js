import 'dotenv/config'
import express from 'express'
import axios from 'axios'

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
      const { cardName, users, type } = req.body
      if(type === 'ended') {
        await sendDiscordMessage(`> the card **${cardName}** has been ended! \n > great job **${users}**!`)
        return;
      }
      if(type === 'started') {
        await sendDiscordMessage(`> the card **${cardName}** has been started! \n > good luck **${users}**!`)
        return;
      }
      return res.status(200)
  } catch (error) {
    console.log(error);
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})