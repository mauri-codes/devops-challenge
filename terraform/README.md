# Terraform

The infrastructure presented will work for a single AWS account, but changing to a multi account infrastructure (which is better) is simple enough.

## Structure
This folder's structure is composed of:

1. *modules*, which is a folder for reusable terraform modules that can be used in many proyects
2. *proyects*, which is a group of resources created in terraform with a logical separation. This proyects are meant to be deployed in multiple environments
3. *environments*, where each proyect is deployed in a particular environment. This folder has sandbox, staging and production folders

In order to setup the base infrastructure there is an additional folder inside env, *base*, which is for infrastructure that is required for all the other terraform code, for example terraform_infra will deploy the state terraform bucket and the state terraform dynamoDB table. This should be deployed in any account that we need to deploy to.
