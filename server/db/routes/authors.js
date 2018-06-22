const express = require('express');
const router = express.Router();
const db = require('../models/index'); //points to instantiated sequelize model
const Author = db.Author; //uses specific model

router.get('/', (req, res) => {
  Author
    .findAll()
    .then(authors => {
      res.status(200).json(authors);
    })
    .catch(err => res.status(404).send(err));
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Author
    .findById(id)
    .then(author => {
      if (author) {
        res.status(200).json(author);
      } else {
        res.status(404).send('error'); //how is this different than .catch(err => res.status(404).send('error')?)
      }
    })
    .catch(console.error);
});

router.get('/:id/blogs', (req, res) => {
  let id = req.params.id;
  db.Blog
    .findAll({ where: {authorId: id} })
    .then(blogs => {
      res.status(200).json(blogs);
    })
})

router.post('/', (req, res) => {
  Author
    .create(req.body)
    .then(newAuthor => {
      res.status(201).json(newAuthor);
    })
    .catch(console.error);
})

router.put('/:id', (req, res) => {
  let id = req.params.id;
  Author
    .update(req.body, { where: { id: id } })
    .then(author => {
      res.status(204).json(author);
    })
    .catch(console.error);
})

router.delete('/:id', (req, res) => {
  let id = req.params.id
  Author
    .destroy({where: {id: id}})
    .then(item => {
      res.status(200).json(item);
    })
    .catch(console.error);
})

module.exports = router;