const express = require('express');
const app = express();
const PORT = 8081;

app.get('/', (req, res) => res.send('Hello, This is from Adikesava Naidu regarding Elevate Labs final project 🚀'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
