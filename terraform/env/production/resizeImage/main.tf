module "resizeImageProd" {
  source       = "../../../proyects/resizeImage"
  db_url       = ""
  infra_bucket = ""
  env          = "PROD"
}
