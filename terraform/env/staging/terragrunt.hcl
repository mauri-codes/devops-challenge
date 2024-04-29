remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    bucket         = "devops-challenge-infrastructure"
    key            = "terraform/staging/${path_relative_to_include()}.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state"
  }
}
