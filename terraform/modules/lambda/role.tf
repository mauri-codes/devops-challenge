data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda_role" {
  name                = "${var.function_name}FunctionRole"
  assume_role_policy  = data.aws_iam_policy_document.assume_role.json
  managed_policy_arns = concat([
    aws_iam_policy.lambda_logs.arn
  ], try(var.extra_policy_arns, []))
}

resource "aws_iam_policy" "lambda_logs" {
  name        = "LambdaLogs_${var.function_name}"
  description = "Access to Cloudwatch logs for lambda ${var.function_name}"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
        ]
        Effect   = "Allow"
        Resource = "arn:aws:logs:${var.region}:${var.account_id}:*"
      },
      {
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:logs:${var.region}:${var.account_id}:log-group:/aws/lambda/${var.function_name}:*"
      },
    ]
  })
}
