const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER,
  host: 'localhost',
  database: process.env.DATABASE,
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
  const id = parseInt(request.params.id)

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

const updateSquad = (request, response) => {
  const id = parseInt(request.params.id)
  const { name } = request.body

  pool.query(
    'UPDATE squads SET name = $1 WHERE id = $2',
    [name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteSquad = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM squads WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getSquads,
  createSquad,
  getSquadById,
  updateSquad,
  deleteSquad
}
