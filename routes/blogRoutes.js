const express = require('express');

const BlogController = require('../controllers/BlogController')

const router = express.Router();

router.get('', BlogController.index);

router.get('/create', BlogController.create);

router.post('', BlogController.store);

router.post('/:id/delete', BlogController.destroy)

router.get('/:id', BlogController.show)

module.exports = router;