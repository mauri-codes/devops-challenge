data "aws_s3_object" "deploy_object" {
  bucket = var.infra_bucket
  key    = "lambda/${var.function_name}.zip"
}
