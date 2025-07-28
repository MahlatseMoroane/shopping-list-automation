const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [{ username: 'demo', password: '1234' }];
let items = [{ id: 1, name: 'Milk' }];
let nextId = 2;

const isValidItemName = (name) => /^[a-zA-Z0-9 ]+$/.test(name.trim());

// Login route with specific error messages
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Incorrect username' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  res.json({ message: 'Login successful' });
});

// Get items
app.get('/items', (req, res) => {
  res.json(items);
});

// Add item with validation and duplicate check
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Item name cannot be empty' });
  }
  if (!isValidItemName(name)) {
    return res.status(400).json({ message: 'Item name contains invalid characters' });
  }
  const alreadyExists = items.find(i => i.name.toLowerCase() === name.trim().toLowerCase());
  if (alreadyExists) {
    return res.status(409).json({ message: 'Item already exists' });
  }
  const item = { id: nextId++, name: name.trim() };
  items.push(item);
  res.status(201).json(item);
});

// Update item with validation and duplicate prevention
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Item name cannot be empty' });
  }
  if (!isValidItemName(name)) {
    return res.status(400).json({ message: 'Item name contains invalid characters' });
  }
  const exists = items.find(i => i.id != id && i.name.toLowerCase() === name.trim().toLowerCase());
  if (exists) {
    return res.status(409).json({ message: 'Another item with this name already exists' });
  }

  const item = items.find(i => i.id == id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  item.name = name.trim();
  res.json(item);
});

// Delete item
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(i => i.id == id);
  if (index !== -1) {
    items.splice(index, 1);
    return res.status(204).send();
  }
  res.status(404).json({ message: 'Item not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
