const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

// ✅ Serve HTML first
app.use(express.static('public'));

// ✅ Parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 👤 Create a new user
app.post('/users', async (req, res) => {
  console.log("🛬 Received POST:", req.body); // 🧠 Right here homie!
  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Email already exists or invalid data!' });
  }
});


// 📃 Get all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// 🚀 Start server
app.listen(3000, () => {
  console.log('✅ Server is running at http://localhost:3000');
});
