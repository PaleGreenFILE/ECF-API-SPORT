-- clients table
CREATE TABLE api_clients(
client_id SERIAL PRIMARY KEY unique NOT NULL,
client_name VARCHAR(50) NOT NULL,
technical_contact VARCHAR(100) UNIQUE,
commercial_contact VARCHAR(100) UNIQUE,
password VARCHAR(100) NOT NULL,
active BOOLEAN NOT NULL DEFAULT FALSE,
short_desc VARCHAR(50),
full_desc VARCHAR(255),
logo_url VARCHAR(125),
url_web VARCHAR(125),
created_at TIMESTAMP DEFAULT NOW(),
update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- API_CLIENTS_GRANTS 
CREATE TABLE api_clients_grants(
client_id SERIAL PRIMARY KEY unique NOT NULL,
install_id INTEGER,
active BOOLEAN NOT NULL DEFAULT FALSE,
perms VARCHAR(50) NOT NULL,
branch_id INTEGER,
created_at TIMESTAMP DEFAULT NOW(),
update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);