resource "aws_s3_bucket" "terraform_state_bucket" {
  bucket = "terraform-state-mau-infra"
}
