import fs from "fs";

let carts = [];
const pathFile = "./data/carts.json";

const getCarts = async () => {
    const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
    const cartsPars = JSON.parse(cartsJson);
    carts = cartsPars || [];
};