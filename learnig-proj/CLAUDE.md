# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Last updated: 2025-07-18

## Project Overview

This is a simple full-stack web application that allows users to input text and stores it persistently in a PostgreSQL database. The application uses Node.js/Express for the backend and vanilla JavaScript for the frontend. The application will be deployed and run on an AWS EC2 instance.

## Common Commands

### Development
- `npm install` - Install all dependencies
- `npm run dev` - Start development server with auto-reload (uses Nodemon on port 3000)
- `npm start` - Start production server

### Docker
- `docker build -t hello-world-app .` - Build Docker image
- `docker run -d -p 3000:3000 hello-world-app` - Run container
- `docker-compose up --build` - Build and run with Docker Compose

## Architecture

### Backend Structure
The application uses a single `server.js` file that:
- Serves static files (HTML, CSS, JS) from the root directory
- Provides REST API endpoints:
  - `POST /api/store-text` - Accepts JSON body with `text` field
  - `GET /api/texts` - Returns all stored texts as JSON array
- Connects to PostgreSQL database for persistent storage

### Frontend Structure
- `index.html` - Main page with input form and text display area
- `app.js` - Handles form submission, API calls, and dynamic content updates
- `styles.css` - All styling for the application

### Data Flow
1. User enters text in the form
2. Frontend sends POST request to `/api/store-text`
3. Backend stores text with timestamp in PostgreSQL database
4. Frontend fetches all texts via GET `/api/texts`
5. Texts are displayed in the UI with timestamps

## Database Setup

The application now uses PostgreSQL for persistent data storage:

### PostgreSQL Configuration
- **Database Name**: hello_world_app
- **Default User**: your_app_user
- **Default Password**: your_password (change in production!)
- **Connection**: Configured via environment variables in `.env` file

### Environment Variables
Create a `.env` file based on `.env.example`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hello_world_app
DB_USER=your_app_user
DB_PASSWORD=your_password
PORT=3000
```

### Database Schema
The application uses a single `texts` table:
```sql
CREATE TABLE texts (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Important Notes

- **Data Persistence**: Data is now stored in PostgreSQL database and persists across server restarts
- **Port Configuration**: Default port is 3000, configurable via `PORT` environment variable
- **No Authentication**: The application has no user authentication or authorization
- **Error Handling**: Basic error handling for empty text submissions and database connection errors
- **EC2 Deployment**: This application is designed to run on AWS EC2 instances