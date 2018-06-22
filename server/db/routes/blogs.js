const express = require('express');
const router = express.Router();
const db = require('../models/index'); //points to instantiated sequelize model
const Blog = db.Blog;

router.get('/', (req, res) => {
  Blog
    .findAll()
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(console.error);
});

router.get('/featured', (req, res) => {
  Blog
    .findAll({ where: {featured: true} })
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(console.error);
});

router.post('/', (req, res) => {
  req.body.authorId = req.query.authorId;
  //look in blogs.spec.js to get "req.query.authorId"-- it's an
  //arbitrary value not associated with actual authorId
  Blog
    .create(req.body)
    .then(newBlog => {
      res.status(201).json(newBlog);
    })
    .catch(console.error);
});

//need to put /:id after the / routes because /:id will catch everything
//that comes after the / route and stop there (and not hit other routes below it)
//any time there's middleware the flow will be top to bottom in an if/else way

router.get('/:id', (req, res) => { 
  let id = req.params.id;
  Blog
    .findById(id)
    .then(blog => {
      if (blog) {
      res.status(200).json(blog);
      } else {
      res.status(404).send('error')
      }
    })
    .catch(console.error);
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  Blog
    .update(req.body, {where: {id: id}})
    .then(blog => {
      res.status(204).json(blog);
    })
    .catch(console.error);
});

router.delete('/:id', (req, res) => {
  let id = req.params.id
  Blog
    .destroy({where: {id: id}})
    .then(item => {
      res.status(200).json(item);
    })
    .catch(console.error);
});

module.exports = router;