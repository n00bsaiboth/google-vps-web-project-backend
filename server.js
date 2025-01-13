//
// devops-perusteet-2-backend
//
// https://tieto.nurminen.dev/devops-perusteet-2
//
// REST API backend esimerkki
//


import './dotenv.js'

import express        from 'express'
import mongoose       from 'mongoose'
import cors           from 'cors'

import apiRoutes      from './api/index.js'

import logger         from './logger.js'


//
// Tarkista vaaditut ympäristömuuttujat
//

const todoAvain = process.env.TODO_AVAIN ||'salainenAvain123' 

if(!todoAvain) {
  logger.fatal('Aseta TODO_AVAIN ympäristömuuttuja')
  process.exit(1)
}

const mongoUri = process.env.MONGO_URI

if(!mongoUri) {
  logger.fatal('Aseta MONGO_URI ympäristömuuttuja')
  process.exit(1)
}


//
// Yhdistä MongoDB
//

const mongoClient = await mongoose.connect(mongoUri)

const dbHost = mongoClient.connection.host
const dbPort = mongoClient.connection.port
const dbName = mongoClient.connection.name

logger.info(`Mongoose: Connected to ${dbHost}:${dbPort}/${dbName}`)


//
// Konfiguroi Express
//
const port = process.env.PORT || 4000

const app = express()

// Jos sovellus on kahden välityspalvelimen takana (nginx + cloudflare)
// Jos seurasit kurssin esimerkkiä, käytä tätä
app.set('trust proxy', 2)

// Jos sovellus on vain yhden välityspalvelimen takana, esim. oma nginx mutta ei Cloudflare proxyä
//app.set('trust proxy', 1)

app.use(cors())
app.use(express.json())

app.use('/api', apiRoutes)

// Käynnistä HTTP-palvelin
app.listen(port, () => {
    console.log(`The backend server is started and listening to port ${port} (Node versio. ${process.versions.node}).`);
    logger.info(`Backend käynnistetty ja kuuntelee portissa ${port} (Node versio ${process.versions.node})`)
})
