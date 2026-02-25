const router = require('express').Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, productController.createProduct);
router.get('/', authMiddleware, productController.getProducts);

module.exports = router;