import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_IP,
  database: 'sightsee',
  password: process.env.DB_PASSWORD,
  port: 5432,
})
db.connect((error?: Error) => {
  console.log('Connecting to database...')
  if (error) {
    console.error('\x1b[31mDatabase connection failed\x1b[0m: ', error)
  } else {
    return console.log('\x1b[32mDatabase connected\x1b[0m')
  }
  console.error('\x1b[31mDatabase connection failed\x1b[0m: ', error)
})

export default db
