resource "google_service_account" "mumble-image-runner" {
  account_id   = "mumble-image-runner"
  display_name = "Google Cloud Run Mumble Thierry Simon"
  description  = "Account to deploy applications to google cloud run."
}

resource "google_project_iam_member" "mumble-image-runner" {
  for_each = toset([
    "roles/run.serviceAgent",
    "roles/viewer",
    "roles/storage.objectViewer",
    "roles/run.admin",
    "roles/cloudsql.client"
  ])
  role    = each.key
  member  = "serviceAccount:${google_service_account.mumble-image-runner.email}"
  project = data.google_project.project.id
}

resource "google_project_iam_member" "mumble-image-runner-svc" {
  role    = "roles/run.serviceAgent"
  member  = "serviceAccount:service-${data.google_project.project.number}@serverless-robot-prod.iam.gserviceaccount.com"
  project = data.google_project.project.id
}

variable "commit_hash" {
  type        = string
  description = "value of the commit hash of the Docker image to deploy"
}
resource "random_uuid" "random_nextauth_secret" {
}

resource "google_cloud_run_service" "thierry-simon-mumble" {
  name                       = local.name
  location                   = local.gcp_region
  autogenerate_revision_name = true

  template {
    spec {
      containers {
        image = "europe-west6-docker.pkg.dev/casfee-adv-mumble/mumble-thierry-simon/mumble-image:${var.commit_hash}"

        ports {
          name           = "http1"
          container_port = 3000
        }

        env {
          name  = "NEXT_PUBLIC_API_BASE_URL"
          value = "https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app"
        }

        env {
          name  = "ZITADEL_CLIENT_ID"
          value = "181236603920908545@cas_fee_adv_qwacker_prod"
        }

        env {
          name  = "ZITADEL_ISSUER"
          value = "https://cas-fee-advanced-ocvdad.zitadel.cloud"
        }

        env {
          name  = "NEXTAUTH_SECRET"
          value = "${random_uuid.random_nextauth_secret.result}"
        }

        env {
          name  = "NEXTAUTH_URL"
          value = "https://thierry-simon-mumble-mu6q4anwpa-oa.a.run.app/"
        }
      }

      service_account_name = "mumble-image-runner"
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

output "cloud-run-url" {
  value = google_cloud_run_service.thierry-simon-mumble.status[0].url
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.thierry-simon-mumble.location
  project  = google_cloud_run_service.thierry-simon-mumble.project
  service  = google_cloud_run_service.thierry-simon-mumble.name

  policy_data = data.google_iam_policy.noauth.policy_data
}