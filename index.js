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
      await axios.post('https://discord.com/api/webhooks/1062078107814744085/yKfUBPwT-8jxHIzwuu0Fg4YIAXKDoY7-JHpaZA8ZsWAz2p2i3U7yYZ__rm-o02xruBzH', {
        username: 'Spidey Bot',
        content: `the card ${cardName} has been ended! great job ${users}`
      })
      res.status(200)
  } catch (error) {
    console.log(error);
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})