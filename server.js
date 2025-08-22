const express = require('express');
const fs = require('fs');
const UAParser = require('ua-parser-js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const app = express();
const port = 5500;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  const payload = {
    content: `\nNamn: ${name}\nMejladress: ${email}\nMeddelande:\n**${message}**`
  };

  try {
    const response = await fetch('https://discord.com/api/webhooks/1337395526424854602/Z5s1Ko99muNmZF9cWx83fBW5bL0qXdu-NCMNqR1XqhBp3NXTXXG5efzG9NCcdDYvlZux', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      res.status(200).send('Tack för ditt meddelande! Vi återkommer så snart vi kan.');
    } else {
      res.status(500).send('Något gick fel. Försök igen senare.');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Något gick fel. Försök igen senare.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});