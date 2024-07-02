CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    category_id INT, -- many to one
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);


INSERT INTO Categories (name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Books', 'Physical and digital books'),
('Clothing', 'Apparel and fashion items');

INSERT INTO Products (name, description, price, stock, category_id) VALUES
('Smartphone', 'Latest model smartphone', 799.99, 50, 1),
('Laptop', 'High-performance laptop', 1299.99, 30, 1),
('Headphones', 'Wireless noise-canceling headphones', 199.99, 100, 1),
('Novel', 'Bestselling fiction novel', 14.99, 200, 2),
('Textbook', 'Computer Science textbook', 79.99, 75, 2),
('T-shirt', 'Cotton graphic t-shirt', 19.99, 150, 3),
('Jeans', 'Classic blue jeans', 49.99, 100, 3);