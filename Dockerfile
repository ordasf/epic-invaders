# Use the image with the latest version of node as a base
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

#Install angular-cli globally
#Need the unsafe-perm because of -> https://github.com/sass/node-sass/issues/2006
RUN npm install -g @angular/cli --unsafe-perm

# Install any needed dependencies specified in package.json
RUN npm install

# Make port 4200 available to the world outside this container
EXPOSE 4200

# Run ng serve --host 0.0.0.0 when the container launches
CMD ["ng", "serve", "--host", "0.0.0.0"]
