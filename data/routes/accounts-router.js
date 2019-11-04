const express = require('express');

const db = require('../../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db
        .select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            console.log('Error', err);
            res.status(500).json({ error: 'Failed to retrieve accounts'});
        });
});

router.get('/:id', (req, res) => {
    db
        .select('*')
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

