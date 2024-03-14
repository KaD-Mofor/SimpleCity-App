CREATE USER IF NOT EXISTS 'simpleCity-app' @'localhost' IDENTIFIED BY 'SimpleCityApp';
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE,
    EXECUTE on `simple-city-app`.* TO 'simpleCity-app' @'localhost';