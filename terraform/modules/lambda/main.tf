resource "aws_lambda_function" "lambda" {
  s3_bucket         = var.infra_bucket
  s3_key            = "lambda/${var.function_name}.zip"
  function_name     = var.function_name
  role              = aws_iam_role.lambda_role.arn
  handler           = var.handler
  s3_object_version = data.aws_s3_object.deploy_object.version_id
  runtime           = "nodejs20.x"

  environment {
    variables = var.environment_variables
  }
}
