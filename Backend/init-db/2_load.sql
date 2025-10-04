COPY covid_data
FROM '/docker-entrypoint-initdb.d/owid-covid-data.csv'
DELIMITER ','
CSV HEADER;
