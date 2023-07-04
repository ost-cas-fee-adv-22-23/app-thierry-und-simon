locals {
  name       = "mumble-image"
  gcp_region = "europe-west6"
}

provider "google" {
  project = "casfee-adv-mumble"
  region  = local.gcp_region
}

data "google_project" "project" {
}

provider "random" {
}

terraform {
  backend "gcs" {
    bucket = "thierry-simon-mumble-run-tf-state"
  }
}