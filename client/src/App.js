import React, { useState, useEffect } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('1234');
  const [loginError, setLoginError] = useState('');

  const [item, setItem] = useState('');
  const [itemError, setItemError] = useState('');
  const [items, setItems] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editError, setEditError] = useState('');

  const isValidItemName = (text) => /^[a-zA-Z0-9 ]+$/.test(text.trim());

  const login = async () => {
    setLoginError('');
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setLoggedIn(true);
      loadItems();
    } else {
      setLoginError(data.message);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername('demo');
    setPassword('1234');
    setItems([]);
    setLoginError('');
  };

  const loadItems = async () => {
    const res = await fetch('http://localhost:5000/items');
    const data = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    if (!item.trim() || itemError) return;

    const res = await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: item }),
    });

    const data = await res.json();
    if (res.ok) {
      setItems([...items, data]);
      setItem('');
      setItemError('');
    } else {
      setItemError(data.message);
    }
  };

  const startEdit = (id, currentName) => {
    setEditId(id);
    setEditText(currentName);
    setEditError('');
  };

  const updateItem = async () => {
    if (!editText.trim() || editError) return;

    const nameExists = items.some(i =>
      i.id !== editId && i.name.toLowerCase() === editText.trim().toLowerCase()
    );
    if (nameExists) {
      setEditError('Another item with this name already exists');
      return;
    }

    const res = await fetch(`http://localhost:5000/items/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editText }),
    });

    const data = await res.json();
    if (res.ok) {
      setEditId(null);
      setEditText('');
      setEditError('');
      loadItems();
    } else {
      setEditError(data.message);
    }
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, { method: 'DELETE' });
    loadItems();
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '30px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9'
    },
    input: {
      padding: '10px',
      margin: '5px 0',
      width: '100%',
      boxSizing: 'border-box'
    },
    error: {
      color: 'red',
      fontSize: '14px',
      marginTop: '-5px',
      marginBottom: '10px'
    },
    button: {
      padding: '10px 15px',
      margin: '5px 5px 5px 0',
      cursor: 'pointer'
    },
    listItem: {
      marginBottom: '10px',
      padding: '8px',
      background: '#eee',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    itemText: {
      flex: 1,
      marginRight: '10px'
    }
  };

  if (!loggedIn) {
    return (
      <div style={styles.container}>
        <h2>Shopping List Login</h2>
        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {loginError && <div style={styles.error}>{loginError}</div>}
        <button style={styles.button} onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>My Shopping List</h2>
      <input
        style={styles.input}
        value={item}
        onChange={e => {
          const value = e.target.value;
          setItem(value);
          if (!value.trim()) {
            setItemError('Item cannot be empty');
          } else if (!isValidItemName(value)) {
            setItemError('Only letters, numbers, and spaces allowed');
          } else if (items.some(i => i.name.toLowerCase() === value.trim().toLowerCase())) {
            setItemError('Item already exists');
          } else {
            setItemError('');
          }
        }}
        placeholder="New item"
      />
      {itemError && <div style={styles.error}>{itemError}</div>}
      <button style={styles.button} onClick={addItem} disabled={!!itemError}>Add</button>
      <button
        style={{ ...styles.button, backgroundColor: '#f44336', color: '#fff' }}
        onClick={logout}
      >
        Logout
      </button>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {items.map(i => (
          <li key={i.id} style={styles.listItem}>
            {editId === i.id ? (
              <>
                <input
                  style={styles.input}
                  value={editText}
                  onChange={e => {
                    const value = e.target.value;
                    setEditText(value);
                    if (!value.trim()) {
                      setEditError('Item cannot be empty');
                    } else if (!isValidItemName(value)) {
                      setEditError('Only letters, numbers, and spaces allowed');
                    } else if (
                      items.some(item => item.id !== editId && item.name.toLowerCase() === value.trim().toLowerCase())
                    ) {
                      setEditError('Another item with this name already exists');
                    } else {
                      setEditError('');
                    }
                  }}
                />
                {editError && <div style={styles.error}>{editError}</div>}
                <button style={styles.button} onClick={updateItem} disabled={!!editError}>Update</button>
              </>
            ) : (
              <>
                <span style={styles.itemText}>{i.name}</span>
                <button style={styles.button} onClick={() => startEdit(i.id, i.name)}>Edit</button>
                <button style={styles.button} onClick={() => deleteItem(i.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

