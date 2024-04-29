
resource "aws_s3_bucket" "photos_bucket" {
  bucket        = "images-bucket-devops-challenge-${var.env}"
  force_destroy = var.env == "PROD" ? false : true
}

resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.photos_bucket.bucket

  lambda_function {
    lambda_function_arn = module.lambda_resizer.lambda_arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "votingResults/"
    filter_suffix       = ".json"
  }
}

resource "aws_lambda_permission" "allow_bucket1" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_resizer.lambda_arn
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.photos_bucket.arn
}
