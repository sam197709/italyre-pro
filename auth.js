const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrazione utente privato
app.post('/api/register/private', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await db.query(
      'INSERT INTO users (email, password, account_type) VALUES (?, ?, ?)',
      [email, hashedPassword, 'private']
    );
    
    res.json({ success: true, message: 'Utente registrato con successo' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Registrazione agenzia
app.post('/api/register/agency', async (req, res) => {
  try {
    const { email, password, agency_name, plan } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await db.query(
      'INSERT INTO users (email, password, account_type) VALUES (?, ?, ?)',
      [email, hashedPassword, 'agency']
    );
    
    const userId = user.insertId;
    const propertiesLimit = plan === 'basic' ? 10 : 
                          plan === 'pro' ? 100 : 999999;
    
    await db.query(
      'INSERT INTO agencies (user_id, agency_name, plan, properties_limit) VALUES (?, ?, ?, ?)',
      [userId, agency_name, plan, propertiesLimit]
    );
    
    res.json({ success: true, message: 'Agenzia registrata con successo' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});