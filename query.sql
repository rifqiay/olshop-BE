-- Active: 1673150891911@@127.0.0.1@5432@blanja
CREATE TABLE seller(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    phoneNumber VARCHAR(13),
    storeName VARCHAR(50),
    password VARCHAR(255),
    photo VARCHAR,
    storeDescription TEXT,
    isVerified BOOLEAN,
    token VARCHAR(255)
);

CREATE TABLE product(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    price int,
    stock int,
    color VARCHAR(255),
    size VARCHAR(255),
    condition VARCHAR(10),
    description TEXT,
    createAt TIMESTAMP without TIME zone DEFAULT now(),
    sellerId VARCHAR(255),
    Foreign Key (sellerId) REFERENCES seller(id)
    on delete CASCADE
);

CREATE TABLE photo(
    id VARCHAR(255) PRIMARY KEY,
    photo VARCHAR,
    productId VARCHAR(255),
    Foreign Key (productId) REFERENCES product(id)
    on delete CASCADE
);



CREATE TABLE customer(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(255),
    phoneNumber VARCHAR(13),
    gender VARCHAR(30),
    birth VARCHAR(50),
    photo VARCHAR,
    isVerified BOOLEAN,
    token VARCHAR(255),
    addressId VARCHAR(255)
);

CREATE TABLE address(
    id VARCHAR(255) PRIMARY KEY,
    addressAs VARCHAR(20),
    recipientName VARCHAR(50),
    recipientPhoneNumber VARCHAR(13),
    fullAddress TEXT,
    city VARCHAR(50),
    posCode VARCHAR(10),
    customerId VARCHAR(255)
);

ALTER TABLE customer
ADD FOREIGN KEY (addressId) REFERENCES address(id) ON DELETE CASCADE;

ALTER TABLE address
ADD FOREIGN KEY (customerId) REFERENCES customer(id) ON DELETE CASCADE;

CREATE TABLE delivery(
    id VARCHAR(255) PRIMARY KEY,
    deliveryDate DATE,
    deliveryStatus VARCHAR(50),
    customerId VARCHAR(255),
    Foreign Key (customerId) REFERENCES customer(id)
    on delete CASCADE
);

CREATE TABLE payment(
    id VARCHAR(255) PRIMARY KEY,
    paymentMethod VARCHAR(20),
    paymentStatus VARCHAR(20)
);

CREATE TABLE cart(
    id VARCHAR(255) PRIMARY KEY,
    productId VARCHAR(255),
    customerId VARCHAR(255),
    quantity INT,
    paymentId VARCHAR(255),
    deliveryId VARCHAR(255),
    Foreign Key (productId) REFERENCES product(id),
    Foreign Key (customerId) REFERENCES customer(id),
    Foreign Key (paymentId) REFERENCES payment(id),
    Foreign Key (deliveryId) REFERENCES delivery(id)
);