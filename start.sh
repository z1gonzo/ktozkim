#!/bin/bash

# Railway deployment script for ktozkim.pl backend

echo "🚀 Starting ktozkim.pl backend server..."

# Set production environment
export NODE_ENV=production

# Start the application
npm start
