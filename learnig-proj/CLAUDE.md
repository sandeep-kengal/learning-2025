# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple full-stack web application that allows users to input text and stores it in memory on the backend. The application uses Node.js/Express for the backend and vanilla JavaScript for the frontend.

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
- Stores data in-memory (non-persistent)

### Frontend Structure
- `index.html` - Main page with input form and text display area
- `app.js` - Handles form submission, API calls, and dynamic content updates
- `styles.css` - All styling for the application

### Data Flow
1. User enters text in the form
2. Frontend sends POST request to `/api/store-text`
3. Backend stores text with timestamp in memory array
4. Frontend fetches all texts via GET `/api/texts`
5. Texts are displayed in the UI with timestamps

## Important Notes

- **Data Persistence**: The application stores data in memory only. All data is lost when the server restarts.
- **Port Configuration**: Default port is 3000, configurable via `PORT` environment variable
- **No Authentication**: The application has no user authentication or authorization
- **Error Handling**: Basic error handling for empty text submissions and server connection errors