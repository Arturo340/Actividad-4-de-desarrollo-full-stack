const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({ mensaje: "Ruta de productos funcionando" });
});

module.exports = router;