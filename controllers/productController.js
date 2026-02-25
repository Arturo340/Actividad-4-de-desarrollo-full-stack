const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const product = await Product.create({
        ...req.body,
        user: req.user.id
    });

    res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
};