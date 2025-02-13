import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import path from "path";
import multer from "multer";
import "dotenv/config"
const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());

//Database connection with mongoDB
mongoose.connect("mongodb+srv://subhashreeb514:Sonu%402003@cluster0.rdq0fxx.mongodb.net/Library")

//API creation
app.get("/", (req, res) => {
    res.send("running");
});

//Image Storage Ingine
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })
//Creating upload endpoint for images
app.use("/images", express.static('upload/images'))
app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for creating products
const Product = mongoose.model("products", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})
//Creating API for deleting product
app.post("/deleteproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log('removed');
    res.send({
        success: true,
        name: req.body.name,
    })
});
//Creating API for getting all products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("all products fetched");
    res.send(products);
})

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});