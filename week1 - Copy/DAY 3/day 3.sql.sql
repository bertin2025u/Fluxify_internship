-- Day 3: Joins

-- INNER JOIN
SELECT c.name, o.order_id
FROM Customer c
INNER JOIN `Order` o ON c.customer_id = o.customer_id;

-- LEFT JOIN
SELECT c.name, o.order_id
FROM Customer c
LEFT JOIN `Order` o ON c.customer_id = o.customer_id;

-- RIGHT JOIN
SELECT c.name, o.order_id
FROM Customer c
RIGHT JOIN `Order` o ON c.customer_id = o.customer_id;

-- CROSS JOIN
SELECT c.name, p.name AS product
FROM Customer c
CROSS JOIN Product p;
