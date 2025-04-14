# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# PROD 
ENV MONGODB_URI ""
ENV CVE_API_KEY ""
ENV KINDE_CLIENT_ID ""
ENV KINDE_CLIENT_SECRET ""
ENV KINDE_ISSUER_URL ""
ENV KINDE_SITE_URL ""
ENV KINDE_POST_LOGOUT_REDIRECT_URL ""
ENV KINDE_POST_LOGIN_REDIRECT_URL ""
ENV GEMINI_API ""
ENV FLASK_API_ENDPOINT ""
ENV NEXT_PUBLIC_API_BASE_URL ""

ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ""
ENV STRIPE_SECRET_KEY ""


# Build the Next.js application
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
