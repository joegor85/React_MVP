DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS items;

CREATE TABLE lists (
    list_id serial PRIMARY KEY,
    listName varchar(25)
);

CREATE TABLE items (
    id serial PRIMARY KEY,
    list integer REFERENCES lists(list_id),
    itemName varchar(40)
)