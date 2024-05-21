import { Router } from "express";
import productManager from "../productManager.js";


const router = Router();

router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = productManager.getProducts(limit);

        res.status(200).json({ status: "success", products})

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Erro", msg: "Erorr interno del servidor."})
    }
})

export default router;