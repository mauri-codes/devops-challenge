import express, { ErrorRequestHandler } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import routes from './routes'

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/api/health', (req, res) => {
  res.status(200).json('ok')
})

app.use('/api', routes)

app.use((req, res) => {
  res.status(404).json('Not found')
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err)
  res.status(500).json('Internal server error')
}

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
