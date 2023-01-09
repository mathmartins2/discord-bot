import 'dotenv/config'
import express from 'express'
import axios from 'axios'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', async (req, res) => {
  try {
      const { cardName, users } = req.body
      console.log(cardName, users);
      await axios.post(process.env.DISCORD_URL, {
        username: 'Spidey Bot',
        content: `> the card **${cardName}** has been ended! \n > great job **${users}**!`
      })
      res.status(200)
  } catch (error) {
    console.log(error);
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})