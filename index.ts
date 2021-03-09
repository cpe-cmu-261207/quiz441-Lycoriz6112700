import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { body, query, validationResult } from 'express-validator'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 3000
const SECRET = "SIMPLE_SECRET"
const users = require("./allUser.json");

interface JWTPayload {
  username: string;
  password: string;
}

app.post('/login',
  (req, res) => {

    const { username, password } = req.body
      return res.status(200).json({message: 'Login succesfully' })
})

app.post('/register',
  (req, res) => {
    const { username, password, firstname, lastname, balance } = req.body;
    if (
      username !== undefined &&
      password !== undefined &&
      firstname !== undefined &&
      lastname !== undefined &&
      balance !== undefined &&
      username !== users.users.username
    ) {
      const newUser = {
        Username : username,
        password : password,
        Firstname : firstname,
        Lastname : lastname,
        balance : balance
      };
      users.users.push(newUser);
      res.status(200).send({ message: 'Register successfully' });
    } else {
      res.status(400).send({ message: 'Username is already in used' });
    }
  })

app.get('/balance',
  (req, res) => {
    const token = req.query.token as string
    try {
      const { username } = jwt.verify(token, SECRET) as JWTPayload
  
    }
    catch (e) {
      //response in case of invalid token
    }
  })

app.post('/deposit',
  body('amount').isInt({ min: 1 }),
  (req, res) => {

    //Is amount <= 0 ?
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ message: "Invalid data" })
  })

app.post('/withdraw',
  (req, res) => {
  })

app.delete('/reset', (req, res) => {

  //code your database reset here
  
  return res.status(200).json({
    message: 'Reset database successfully'
  })
})

app.get('/me', (req, res) => {
  res.send({
    "firstname" : "Supawys",
    "lastname" : "Kantaprom",
    "code" : 620612167,
    "gpa" : 4.00
  })
})

app.get('/demo', (req, res) => {
  return res.status(200).json({
    message: 'This message is returned from demo route.'
  })
})

app.listen(PORT, () => console.log(`Server is running at ${PORT}`))