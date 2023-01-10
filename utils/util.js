import axios from 'axios';

const discordUsers = {
  'viniciusfrancisco4': '@SUPORTEGERENCIAL#4548',
  'diegoalvesdecarvalhomartins': '@Diiiego#0629',
  'math_martins2': '@Math#1650',
  'wictorrafael': '@wictorrf#8623'  
}

const mapUsers = (users, discordUsers) => {
  return users.map(user => discordUsers[user] || user).join(', ')
}

const sendDiscordMessage = async (message) => {
  await axios.post(process.env.DISCORD_URL, {
    username: 'LULA CAMARADA',
    content: message
  })
}

export { discordUsers, mapUsers, sendDiscordMessage }
