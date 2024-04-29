variable "infra_bucket" {
  type = string
}
variable "handler" {
  type = string
}
variable "function_name" {
  type = string
}
variable "region" {
  type = string
}
variable "account_id" {
  type = string
}
variable "extra_policy_arns" {
  type = list(string)
}
variable "environment_variables" {
  type = map(string)
}
