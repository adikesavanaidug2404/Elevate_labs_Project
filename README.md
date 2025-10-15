# 🚀 Elevate Labs CI/CD Project By Gandham Adikesava Naidu  
**CI/CD Pipeline with GitHub Actions & Docker (No Cloud Needed)**  

This project demonstrates a **complete CI/CD pipeline** that builds, tests, and deploys a simple containerized web application using **GitHub Actions**, **Docker**, and **Docker Hub** — all running locally, without using any cloud services.

---

## 📋 Objective
To set up a **CI/CD workflow** that:  
1. Builds a Docker image for a Node.js web app  
2. Runs automated tests  
3. Pushes the image to Docker Hub  
4. Deploys locally using Docker Compose or Minikube  

---

## 🧩 Key Features
- 🐳 Containerized Node.js web app  
- ⚙️ Automated CI/CD pipeline using GitHub Actions  
- 📦 Image push to Docker Hub  
- 🚀 Local deployment using Docker or Minikube  
- 🔁 Triggered automatically on each Git push  

---

## 🛠️ Tools & Technologies
| Tool | Purpose |
|------|----------|
| **Node.js** | Application runtime |
| **Docker** | Containerization |
| **GitHub Actions** | CI/CD automation |
| **Docker Hub** | Image registry |
| **Minikube / Local VM** | Local deployment |

---

## ⚙️ Pipeline Flow
1. Developer pushes code to GitHub  
2. GitHub Actions runs build and tests  
3. Docker image is created and pushed to Docker Hub  
4. Image is available at docker hub  

---

## 🧰 Local Deployment
### Using Docker Compose
```bash
docker-compose up -d
```
### Using Direct Docker Command
```bash
docker pull adikesavanaidug2404/elevate-labs-demo:latest
```
```bash
docker run -d -p 8081:8081 your-dockerhub-username/elevate-labs-demo:latest
```
### Using Minikube
```bash
minikube start
kubectl apply -f k8s-deployment.yaml
```

---


## 👨‍💻 Author
**Gandham Adikesava Naidu**  
📧 adikesavanaidug2404@gmail.com.com  
🌐 [GitHub Profile](https://github.com/adikesavanaidug2404)
