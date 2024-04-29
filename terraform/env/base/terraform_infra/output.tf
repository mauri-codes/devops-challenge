output "bucket_name" {
  value = aws_s3_bucket.terraform_state_bucket.bucket
}
output "bucket_arn" {
  value = aws_s3_bucket.terraform_state_bucket.arn
}
output "dynamo_table_arn" {
  value = aws_dynamodb_table.basic-dynamodb-table.arn
}
