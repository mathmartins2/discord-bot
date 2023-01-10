const validateBody = (req, res, next) => {
  const { cardName, users, type, message } = req.body;
  const types = ['ended', 'started', 'tests', 'any'];
  
  if ((!cardName || !users) && type !== 'any') {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (!types.includes(type)) {
    if(type === 'any' && !message) {
      return res.status(400).json({ error: 'Invalid type or message missing' });
    }
    return res.status(400).json({ error: 'Invalid type' });
  }
  
  next();
}

export { validateBody }
