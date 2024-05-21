import { Router } from "express";
import cartManager from "../cartManager.js";
import productManager from "../productManager.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const cart = await cartManager.createCart();

        res.status(201).json({ status: "success", cart});
    } catch {
        console.log(error);
        res.status(500).json({status: "Erro", msg: "Error interno del servidor"});
    }
});

router.post("/", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(Numeber(cid));
        if (!cart) return res.status(404).json({status: "Error", msg: "Carrito no encontrado"});

        res.status(200).json({ status: "success", cart});
    } catch {
        console.log(error);
        res.status(500).json({status: "Erro", msg: "Error interno del servidor"});
    }
});

router.post ("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const product = await productManager.getProductsById(Number(pid));
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado"});

        const cart = await cartManager.addProdcutToCart(Number(cid), Number(pid));

        res.status(200).json({status: "success", cart});
    }catch (error) {
        console.log(error);
        res.status(500).json({status: "Erro", msg: "Error interno del servidor"});
    }
});


export default router;