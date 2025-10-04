COPY covid_data
FROM '/tmp/owid-covid-data.csv'
DELIMITER ','
CSV HEADER;
