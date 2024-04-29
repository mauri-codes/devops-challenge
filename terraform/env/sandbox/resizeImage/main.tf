module "resizeImageSandbox" {
  source       = "../../../proyects/resizeImage"
  db_url       = ""
  infra_bucket = ""
  env          = "SANDBOX"
}
