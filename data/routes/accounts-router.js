const express = require('express');

const db = require('../../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  db.select('*')
    .from('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log('Error', err);
      res.status(500).json({ error: 'Failed to retrieve accounts' });
    });
});

router.get('/:id', validateAccountId, (req, res) => {
  db.select('*')
    .from('accounts')
    .where('id', '=', req.params.id)
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      console.log('Error', err);
      res.status(500).json({ error: 'Failed to get account from database' });
    });
});

router.post('/', (req, res) => {
  db('accounts')
    .insert(req.body)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(err => {
      console.log('Error', err);
      res.status(500).json({ error: 'Failed to create new account' });
    });
});

router.put('/:id', validateAccountId, (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      console.log('Error', err);
      res.status(500).json({ error: 'Failed to update account' });
    });
});

router.delete('/:id', validateAccountId, (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      console.log('Error', err);
      res.status(500).json({ error: 'Failed to delete account' });
    });
});

// Middleware
function validateAccountId(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(404).json({ message: 'Invalid Account ID' });
  }
}

module.exports = router;
