import express from 'express'
import { createPhoto, getPhotos, getPhoto, deletePhoto } from './controllers'

const router = express.Router()

router.post('/photos', createPhoto)
router.get('/photos', getPhotos)
router.get('/photos/:id', getPhoto)
router.delete('/photos/:id', deletePhoto)

export default router
