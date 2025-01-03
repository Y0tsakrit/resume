const express = require('express');
const app = express();
const port = 3001;
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors());
dotenv.config();

app.get('/connect', async (req, res) => {
    try {
        await prisma.$connect();
        res.send('Connected to database');
    } catch (error) {     
        res.send('Error connecting to database');
    }
}); // Connect to database

app.post('/register', async (req, res) => {
    try{
        const {email,username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });
        res.send('User registered successfully');
    }catch(error){
        res.send('Error registering user');
    }
}); // Register a user

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).send('Invalid password');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.send({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error logging in');
    }
});
app.get('/user', async (req, res) => {
    const user= await prisma.user.findMany();
    res.json(user);
}); // Get all users

app.post('/add-item', async (req, res) => {
    try{
        const {name, price} = req.body;
        const image = "https://via";
        const item = await prisma.product.create({
            data: {
                name,
                price,
                image
            }
        });
        res.send('Item added successfully');
    }catch(error){
        console.log(error);
        res.send('Error adding item');
    }
}); // Add an item

app.delete('/items-sold', async (req, res) => {
    try{
        const {id} = req.body;
        const item = await prisma.product.delete({
            where: {
                id
            }
        });
        res.send('Item sold successfully');
    }catch(error){
        console.log(error);
        res.send('Error selling item');
    }
}); // Sell an item

app.get('/items', async (req, res) => {
    const keyword = req.body.keyword;
    const items = await prisma.product.findMany(
        {
            where :{
                name: {
                    contains: keyword
                }
            }
        }
    );
    res.json(items);
}); // Get all items by keyword

app.get('/products', async (req, res) => {
    try{
        const products = await prisma.product.findMany();
        res.json(products);
    }catch(error){
        res.send('Error getting products');
    }
});
app.get('/tokencheck',async (req,res)=>{
    const token = req.headers['authorization'];
    if(!token){
        res.send('No token provided');
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.send('Token is valid');
    }catch(error){
        res.send('Invalid token');
    }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});