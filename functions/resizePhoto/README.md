## Overview
The resizePhoto package is an integral part of our monorepo project, designed to handle image resizing operations as photos are uploaded. This package implements an AWS Lambda function that leverages the Sharp library for high-performance image transformations. It is triggered by photo upload events, ensuring that images are stored in the desired size and format for efficient storage and delivery.

### Features
- Image Resizing: Dynamically resize images based on predefined settings.
- Format Conversion: Convert images to optimal formats for web use.
- Performance Optimization: Utilize Sharp for fast, efficient image processing.

### Environment Variables
- `DATABASE_URL` Database connection string
- `PHOTOS_BUCKET` S3 bucket that photos are uploaded to
- `AWS_REGION` AWS region that resources are deployed to
