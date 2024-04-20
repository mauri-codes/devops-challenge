import { useRef, useState, useEffect } from 'react'
import {
  Box,
  Stack,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'
import { Photo as DBPhoto } from '@dc/database'

interface Photo extends DBPhoto {
  signedUrl: string
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleSelectPhoto() {
    fileInputRef.current?.click()
  }

  async function handleUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const response = await fetch('/api/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalName: file.name })
      })

      const data = await response.json()

      await fetch(data.signedUrl, {
        method: 'PUT',
        body: file
      })

      fetchPhotos()
    }
  }

  async function fetchPhotos() {
    const response = await fetch('/api/photos')
    const data: Photo[] = await response.json()
    setPhotos(data)
  }

  function handleDeletePhoto(photoId: string) {
    return async function () {
      await fetch(`/api/photos/${photoId}`, { method: 'DELETE' })
      fetchPhotos()
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  return (
    <Stack sx={{ m: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleUploadFile}
        />
        <Button onClick={handleSelectPhoto} variant='contained'>
          Upload Photo
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo ID</TableCell>
              <TableCell>Original Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {photos.map((photo) => (
              <TableRow key={photo.id}>
                <TableCell>{photo.id}</TableCell>
                <TableCell>{photo.originalName}</TableCell>
                <TableCell align='right'>
                  <Button
                    variant='contained'
                    onClick={handleDeletePhoto(photo.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default App
