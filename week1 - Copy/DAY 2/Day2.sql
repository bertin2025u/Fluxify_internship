-- Day 2: CRUD Operations

-- INSERT
INSERT INTO Customer (name, email, password, phone, address)
VALUES ('Bertin', 'bertin@gmail.com', '1234', '0780000000', 'Kigali');

-- READ
SELECT * FROM Customer;

-- UPDATE
UPDATE Customer SET name='Updated Name' WHERE customer_id=1;

-- DELETE
DELETE FROM Customer WHERE customer_id=2;
