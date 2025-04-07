#!/bin/bash

# Build and deploy the frontend
echo "🚀 Building the React frontend..."
cd frontend
npm install
npm run build

# Create the static directory if it doesn't exist
echo "📁 Creating static directory..."
mkdir -p ../src/main/resources/static

# Copy the build files to the static directory
echo "📋 Copying build files to Spring Boot static directory..."
cp -r build/* ../src/main/resources/static/

echo "✅ Frontend build complete and deployed to static directory."
echo "▶️ Run './mvnw spring-boot:run' to start the application." 