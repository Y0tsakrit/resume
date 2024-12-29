const express = require('express');
const app = express();
const port = 3000;
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
});

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
});

app.get('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(!user){
            res.send('User not found');
        }
        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            res.send('Invalid password');
        }
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
        res.send(token);
    }catch(error){
        console.log(error);
        res.send('Error logging in');
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});