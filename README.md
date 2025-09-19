# 📚 Bookstore

## Overview

**Bookstore** is a fullstack online bookstore built with **React** (frontend) and **Ruby on Rails** (backend).  
It simulates a modern e-commerce experience where users can browse, purchase, and manage books with ease.

## ✨ Features

- 🔍 **Browse catalog** of books by category
- 📖 **View detailed book information** (title, author, description, price, rating)
- 🛒 **Shopping cart** — add, remove, and update items
- 📦 **Order management** — place and track orders
- 👤 **Authentication & profiles** — sign up, log in and manage user account
- 🔒 **Secure backend** with JWT authentication
- 📱 **Responsive UI** for desktop and mobile

## Tech Stack

**Frontend:**

- React
- React Router

**Backend:**

- Ruby on Rails (API mode)

**Other:**

- GitHub Actions (CI/CD)
- Docker

## Screenshots

## Getting Started

### Prerequisites

- Node.js & npm/yarn
- Ruby & Rails

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/bookstore.git
   cd bookstore
   ```

2. **Backend setup**
   ```bash
   cd backend
   bundle install
   rails db:create db:migrate
   rails server
   ```

3. **Frontend setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```