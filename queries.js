const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER,
  host: 'localhost',
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
})

const getSquads = (request, response) => {
  pool.query('SELECT * FROM squads ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSquadById = (request, response) => {
  pool.query('SELECT * FROM squads WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createSquad = (request, response) => {
  const { name } = request.body
  
  pool.query('INSERT INTO squads (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Squad added with ID: ${results.insertId}`)
  })
}

module.exports = {
  getSquads,
  getSquadById,
  createSquad,
}
