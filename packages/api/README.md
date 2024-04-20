## Overview
The api package is a crucial component of the monorepo coding challenge, designed to manage photo resources via a RESTful API. Built with Node.js, Express, and TypeScript, it provides endpoints for creating, retrieving, updating, and deleting photos. This package works in tandem with the admin interface for uploading photos and the resizePhoto function for processing images.

### Features
- Create Photo: Endpoint to register new photos in the system and receive a pre-signed url to upload the photo to an S3 bucket.
- Get Photos: Retrieve a list of all photos.
- Get Single Photo: Fetch details of a specific photo by ID.
- Delete Photo: Remove a photo from the system.

### Environment Variables
- `DATABASE_URL` Database connection string
- `PHOTOS_BUCKET` S3 bucket that photos are uploaded to
- `AWS_REGION` AWS region that resources are deployed to

### Scripts
- Run the local development server: `pnpm run dev`
