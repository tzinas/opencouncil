FROM opencouncil-base

# Accept build argument to toggle database commands
ARG USE_LOCAL_DB=true

# Set environment variables
ENV USE_LOCAL_DB=${USE_LOCAL_DB}
ENV APP_ENV=production

# Copy the rest of the application code
COPY . .

# Prepare start script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Start the application
ENTRYPOINT ["docker-entrypoint.sh"]