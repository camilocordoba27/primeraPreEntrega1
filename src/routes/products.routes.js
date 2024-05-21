import { Router } from "express";
import productManager from "../productManager.js";
import { checkProductData } from "../middlewares/CheckProductData.middlewares.js";


const router = Router();

router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);

        res.status(200).json({ status: "success", products})

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Erro", msg: "Erorr interno del servidor."})
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductsById(Number(pid));
        if(!product) return res.status(404).json({status: "Error", msg: "Producto no encontrado"});

        res.status(200).json({status: "success", product})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Erro", msg: "Error interno del servido"});
    }
});

router.post("/", checkProductData, async (req, res) => {
    try {
        const body = req.body;
        const product = await productManager.addProduct(body);

        res.status(201).json({ status: "success", product})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Erro", msg: "Erorr interno del servidor."})
    }
});

export default router;