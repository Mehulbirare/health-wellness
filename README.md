# Ayurvedic Prakruti Assessment

A modern web application for Ayurvedic body constitution (Prakruti) assessment.

## Description

This application helps users determine their Ayurvedic body constitution (Prakruti) through a comprehensive assessment. It analyzes the balance of Vata, Pitta, and Kapha doshas to provide personalized health insights.

## Features

- User authentication and profile management
- Comprehensive Prakruti assessment questionnaire
- Visual representation of dosha balance
- Personalized health recommendations
- Admin dashboard for data management

## Tech Stack

- **Frontend**: React, Material-UI, Chart.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (or use the included MongoDB Memory Server for development)

### Setup Instructions

1. Clone the repository
   ```
   git clone https://github.com/MehulBirare/ayurvedic-prakruti-assessment.git
   cd ayurvedic-prakruti-assessment
   ```

2. Install dependencies
   ```
   npm run install-all
   ```

3. Environment Setup
   - Create a `.env` file in the root directory with the following variables:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5001
     ```
   - For development without a MongoDB installation, the application will use MongoDB Memory Server automatically

4. Start the application
   ```
   npm run dev
   ```

5. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## Deployment

For production deployment:

1. Build the client
   ```
   npm run build
   ```

2. Set up environment variables for production
   - Make sure to set `NODE_ENV=production`
   - Configure a secure MongoDB connection
   - Use a strong JWT secret

3. Deploy to your preferred hosting service

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
