module "resizeImageStaging" {
  source       = "../../../proyects/resizeImage"
  db_url       = ""
  infra_bucket = ""
  env          = "STAGING"
}
