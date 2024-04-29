resource "aws_iam_policy" "s3_access" {
  name        = "ResizeImageLambdaPolicy${var.env}"
  description = "GetObject, PutObject for lambda"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:GetObject",
          "s3:PutObject"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:s3:::${aws_s3_bucket.photos_bucket.bucket}/*"
      },
    ]
  })
}
