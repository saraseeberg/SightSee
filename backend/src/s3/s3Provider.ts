import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { ApolloError } from 'apollo-server-express'
import dotenv from 'dotenv'
import { FileUpload } from 'graphql-upload-minimal'
import sharp from 'sharp'

dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY as string
const secretKey = process.env.AWS_SECRET_KEY as string

class S3 {
  s3: S3Client
  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      region: region,
    })
  }

  async get(image: string): Promise<string> {
    const IMAGE_EXPIRATION_SECONDS = 60 * 60 * 24 * 7 // 1 week before the URL expires
    const params = {
      Bucket: bucketName,
      Key: image,
    }
    const command = new GetObjectCommand(params)
    const url = await getSignedUrl(this.s3, command, { expiresIn: IMAGE_EXPIRATION_SECONDS })
    return url
  }

  async upload(file: FileUpload, userid: string): Promise<string> {
    try {
      const { createReadStream, mimetype } = file
      const stream = createReadStream()
      const uniqueFileName = userid + '-image' // Create a unique file name

      //Split the stream into chunks
      const chunks: Buffer[] = []
      for await (const chunk of stream) {
        chunks.push(chunk)
      }
      const fileBuffer = Buffer.concat(chunks)

      //resize image
      const image = await sharp(fileBuffer).resize({ height: 192, width: 192, fit: 'cover' }).toBuffer()

      const params = {
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: image,
        ContentType: mimetype,
      }

      // Upload the file to the S3 bucket
      const command = new PutObjectCommand(params)
      await this.s3.send(command)
      return uniqueFileName
    } catch (error) {
      throw new ApolloError(error as string, 'FAILED_UPLOAD_ERROR')
    }
  }

  async delete(imageName: string): Promise<void> {
    const params = {
      Bucket: bucketName,
      Key: imageName,
    }
    try {
      await this.s3.send(new DeleteObjectCommand(params))
    } catch (error) {
      throw new ApolloError(error as string, 'FAILED_DELETE_ERROR')
    }
  }
}

export const s3 = new S3()
