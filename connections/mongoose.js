import mongoose from "mongoose";
import { mongooseConfig } from '../configs/config.js';
import { mongoUrl, mongoOptions } from '../configs/config.js';

const { collections } = mongooseConfig;
const { products, messages, users } = collections;


let productsCollection;
let messagesCollection;
let usersCollection;

await mongoose.connect(mongoUrl, mongoOptions)
    .then(() => {
        productsCollection = mongoose.model(products.name, products.schema);
        messagesCollection = mongoose.model(messages.name, messages.schema);
        usersCollection = mongoose.model(users.name, users.schema);
    })
    .catch(err => {
        console.log(err);
    }
);

export { productsCollection, messagesCollection, usersCollection };