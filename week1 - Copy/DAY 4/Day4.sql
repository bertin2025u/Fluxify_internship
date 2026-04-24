-- Day 4: Advanced SQL

-- Aggregation
SELECT COUNT(*) FROM Customer;

-- Subquery
SELECT name FROM Customer WHERE customer_id IN (SELECT customer_id FROM `Order`);

-- Index
CREATE INDEX idx_email ON Customer(email);

-- View
CREATE VIEW OrderSummary AS
SELECT Customer.name, `Order`.total_amount
FROM Customer
JOIN `Order` ON Customer.customer_id = `Order`.customer_id;
