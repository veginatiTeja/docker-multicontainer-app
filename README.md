# Multi-Container Production Deployment (Local WSL)

Author: Veginati Teja  
Environment: WSL2 Ubuntu + Docker Desktop  
Application: Node.js + MongoDB  
Auto Deployment: Watchtower  

---

## Project Overview

This project demonstrates a production-style multi-container deployment using Docker Compose inside WSL2.

It includes:

- Node.js application container
- MongoDB database container
- Persistent Docker volume
- Watchtower for automatic container updates

---

## Architecture

User (Browser)
      ↓
localhost:5000
      ↓
Node.js App Container (3000)
      ↓
MongoDB Container (27017)

With Watchtower:

Docker Hub → Watchtower → Pull New Image → Restart Container

---

## Technologies Used

- Docker
- Docker Compose
- MongoDB
- Watchtower
- WSL2
- Docker Desktop

---

## Build and Push Image

```bash
docker build -t veginatiteja/multi-container-app .
docker push veginatiteja/multi-container-app
