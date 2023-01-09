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
      await axios.post('https://discord.com/api/webhooks/1062080343068377190/LGJn2Aoh5LtQypg9_ApKz1wlvo7vDOenRkciPaP2rP4Zqfd5JdMu-dNfj5yE3tZXc_qp', {
        username: 'Maconhas e drogas',
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