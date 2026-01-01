FROM postgres:15-alpine

# Set environment variables
ENV POSTGRES_DB=ktozkim
ENV POSTGRES_USER=ktozkim_user
ENV POSTGRES_PASSWORD=ktozkim_password

# Copy initialization scripts
COPY init.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432
