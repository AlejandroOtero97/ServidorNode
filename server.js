import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { passportInitialize, passportSession } from './middlewares/passport.js';
import { faker } from '@faker-js/faker'
import { auth } from './middlewares/middlewares.js';

import MongoStore from 'connect-mongo';
import session from 'express-session';
import express from 'express';

import socketController from './controllers/socketController.js';

import apiControllers from './controllers/apiControllers.js';
import webControllers from './controllers/webController.js';
import authenticationController from './controllers/authenticationController.js';

import { port } from './parameters/parameters.js';
import initializeServer from './server/initializeServer.js';

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.get("/api/productos-test", (req, res) => {
    faker.locale = "en";
    const productosFaker = [];

  for (let i = 0; i < 5; i++) {
    productosFaker.push({
      title: faker.commerce.productName(),
      price: faker.commerce.price(100, 3000, 0, '$'),
      thumbnail: faker.image.business()
    });
  }
  res.json(productosFaker);
}); 

const mongoStore = {
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Alejandro:otero@coderhouse.av1btb7.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}
    }),
    secret: 'foo',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}

const sessionHandler = session(mongoStore); 
app.use(sessionHandler)
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passportInitialize)
app.use(passportSession)

const { loginController, succesLogin, failureLogin, registerController, failureSignup, successSignup, logout } = authenticationController;
const { getName, getInfo, getNumbers } = apiControllers;
const { inicio, login, logoutB, signup, error, info, random } = webControllers;

app.post('/api/login', loginController)
app.get('/api/successLogin', succesLogin)
app.get('/api/failureLogin', failureLogin)
app.post('/api/signup', registerController);
app.get('/api/failureSignup', failureSignup)
app.get('/api/successSignup', successSignup)
app.post('/api/logout', logout)
app.get('/api/login', getName);
app.get('/api/getInfo', getInfo);
app.get('/api/randoms/:cant?', getNumbers);

app.get('/', auth, inicio)
app.get('/login', login)
app.get('/logout', logoutB)
app.get('/signup', signup)
app.get('/error', error)
app.get('/info', auth, info)
app.get('/random', auth, random)


io.on('connection', socket => socketController(socket, io))

initializeServer(httpServer, port);
