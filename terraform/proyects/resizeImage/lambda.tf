module "lambda_resizer" {
  source = "../../modules/lambda"
  account_id = local.account_id
  region = local.region
  environment_variables = {
    DATABASE_URL = var.db_url
    PHOTOS_BUCKET = aws_s3_bucket.photos_bucket.bucket
    AWS_REGION = local.region
  }
  extra_policy_arns = [
    aws_iam_policy.s3_access.arn
  ]
  function_name = "image_resizer_${var.env}"
  handler = "lambda.handler"
  infra_bucket = var.infra_bucket
}
