-- Ktoż Kim? Database Schema

-- Create database (handled by environment variables)
-- Database name: ktozkim

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100), -- e.g., 'municipal', 'private', 'political'
    city VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create officials table
CREATE TABLE IF NOT EXISTS officials (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    position VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    company_id INTEGER REFERENCES companies(id),
    bio TEXT,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create connections table
CREATE TABLE IF NOT EXISTS connections (
    id SERIAL PRIMARY KEY,
    official_id INTEGER NOT NULL REFERENCES officials(id) ON DELETE CASCADE,
    related_official_id INTEGER REFERENCES officials(id) ON DELETE CASCADE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    connection_type VARCHAR(100) NOT NULL, -- e.g., 'family', 'business', 'political'
    description TEXT,
    evidence TEXT, -- URLs or descriptions of evidence
    verified BOOLEAN DEFAULT FALSE,
    verified_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Ensure at least one relationship is defined
    CONSTRAINT connection_relationship_check CHECK (
        related_official_id IS NOT NULL OR company_id IS NOT NULL
    )
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    official_id INTEGER REFERENCES officials(id) ON DELETE CASCADE,
    connection_id INTEGER REFERENCES connections(id) ON DELETE CASCADE,
    allegation_type VARCHAR(100) NOT NULL, -- e.g., 'nepotism', 'conflict_of_interest', 'hypocrisy'
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    evidence TEXT, -- URLs, documents, etc.
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'under_review', 'verified', 'rejected'
    reviewed_by INTEGER REFERENCES users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_officials_city ON officials(city);
CREATE INDEX IF NOT EXISTS idx_officials_company_id ON officials(company_id);
CREATE INDEX IF NOT EXISTS idx_connections_official_id ON connections(official_id);
CREATE INDEX IF NOT EXISTS idx_connections_related_official_id ON connections(related_official_id);
CREATE INDEX IF NOT EXISTS idx_connections_company_id ON connections(company_id);
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_official_id ON reports(official_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_officials_updated_at BEFORE UPDATE ON officials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_connections_updated_at BEFORE UPDATE ON connections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for development
INSERT INTO users (email, password_hash, first_name, last_name) VALUES
('admin@ktozkim.pl', '$2b$10$dummy.hash.for.dev', 'Admin', 'User');

INSERT INTO companies (name, type, city, description) VALUES
('City Hall', 'municipal', 'Warsaw', 'Main municipal administration'),
('Public Transport Co', 'municipal', 'Warsaw', 'City public transportation services');

INSERT INTO officials (first_name, last_name, position, city, company_id, bio) VALUES
('Jan', 'Kowalski', 'City Councilor', 'Warsaw', NULL, 'Elected representative'),
('Anna', 'Nowak', 'CEO', 'Warsaw', 2, 'Executive director of public transport company');
