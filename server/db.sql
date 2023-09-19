--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 14.2

-- Create database (You'll need to have Postgres running on your computer)
CREATE DATABASE animal_tracker;

-- Connect to database using psql command line tool
psql animal_tracker
  
-- View info about a single table
\d animal_tracker;
  
--create table
CREATE TABLE species (
    id SERIAL PRIMARY KEY,
    common_name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255) NOT NULL,
    estimated_number INT NOT NULL,
    conservation_code VARCHAR(3) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE individuals (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    scientist_tracking VARCHAR(255) NOT NULL,
    species_id INT REFERENCES species(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE sightings (
    id SERIAL PRIMARY KEY,
    sighting_timestamp TIMESTAMP NOT NULL,
    individual_id INT REFERENCES individuals(id),
    location_text VARCHAR(255) NOT NULL,
    is_healthy BOOLEAN NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--insert rows into table
INSERT INTO species (id, common_name, scientific_name, estimated_number, conservation_code, created_at)
VALUES
(1, 'Tiger', 'Panthera tigris', 3200, 'CR', '2023-09-15 10:30:00'),
(2, 'Polar Bear', 'Ursus maritimus', 23000, 'EN', '2023-09-15 11:00:00'),
(3, 'Red Panda', 'Ailurus fulgens', 10000, 'EN', '2023-09-16 09:15:00');


INSERT INTO individuals (id, nickname, scientist_tracking, species_id, created_at)
VALUES
(1, 'Stripy', 'Dr. Smith', 1, '2023-09-16 10:00:00'),
(2, 'Frosty', 'Dr. Williams', 2, '2023-09-16 11:00:00'),
(3, 'Bamboo', 'Dr. Clark', 3, '2023-09-16 11:30:00'),
(4, 'Blaze', 'Dr. Smith', 1, '2023-09-16 12:00:00');


INSERT INTO sightings (id, sighting_timestamp, individual_id, location_text, is_healthy, email_address, created_at)
VALUES
(1, '2023-09-17 09:00:00', 1, 'Yellowstone North Gate', TRUE, 'dr.smith@email.com', '2023-09-17 10:00:00'),
(2, '2023-09-17 10:30:00', 2, 'Arctic Circle', TRUE, 'dr.williams@email.com', '2023-09-17 11:00:00'),
(3, '2023-09-18 08:00:00', 3, 'Nepal Forest', TRUE, 'dr.clark@email.com', '2023-09-18 09:00:00'),
(4, '2023-09-18 09:30:00', 4, 'Indian Jungle', FALSE, 'dr.smith@email.com', '2023-09-18 10:00:00');


-- Check the connection
SELECT 
    s.id, 
    s.sighting_timestamp,
    s.location_text, 
    i.nickname AS individual_nickname, 
    sp.common_name AS species_common_name, 
    sp.scientific_name AS species_scientific_name
FROM 
    sightings s
JOIN 
    individuals i ON s.id = i.id
JOIN 
    species sp ON i.id = sp.id
ORDER BY 
    s.sighting_timestamp DESC;



--
-- PostgreSQL database dump complete
--

