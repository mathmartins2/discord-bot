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
      await axios.post('https://discord.com/api/webhooks/1062081387106140251/gzzlfgiOHnIA9JnA_9P_dhbtOxtJkKtKzwDojf8d8KFo1sij2VUFEx5xYTZ5skwFAM9U', {
        username: 'Spidey Bot',
        content: `the card ${cardName} has been ended!
         great job ${users}`
      })
      res.status(200)
  } catch (error) {
    console.log(error);
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})