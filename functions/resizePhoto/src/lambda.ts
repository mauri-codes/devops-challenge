import sharp from 'sharp'
import db, { orm, schema } from '@dc/database'
import { S3Event } from 'aws-lambda'
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: process.env.AWS_REGION
})

export const handler = async (e: S3Event) => {
  try {
    const [record] = e.Records // Batch size is 1
    const bucketName = record.s3.bucket.name
    const key = record.s3.object.key
    const photoId = key.split('/').pop()

    if (!photoId) throw new Error('Photo not found')

    console.info(`Processing ${bucketName}/${key}`)

    const originalImage = await s3.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: key
      })
    )

    const imageBuffer = await originalImage.Body?.transformToByteArray()

    console.info('Resizing image')

    const resizedImage = await sharp(imageBuffer)
      .resize(800)
      .webp({ quality: 80 })
      .toBuffer()

    console.info(`Uploading resized image to S3`)

    const resizedKey = `resized/${photoId}.webp`

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.PHOTOS_BUCKET,
        Key: resizedKey,
        Body: resizedImage,
        ContentType: 'image/webp'
      })
    )

    console.info('Updating database with S3 key')

    const updatedPhoto = await db
      .update(schema.photos)
      .set({ bucketName: process.env.PHOTOS_BUCKET, key: resizedKey })
      .where(orm.eq(schema.photos.id, photoId))
      .returning()

    console.info(JSON.stringify(updatedPhoto))

    return JSON.stringify(updatedPhoto)
  } catch (error) {
    console.error(error)
    return error
  }
}
