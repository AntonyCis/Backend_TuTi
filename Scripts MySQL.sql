CREATE DATABASE IF NOT EXISTS tuti_db;
USE tuti_db;

-- 1. Tabla de Usuarios (Para el Módulo Login)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Aquí guardaremos el hash de Bcrypt
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(15),
    direccion TEXT
);

-- 3. Tabla de Productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    categoria VARCHAR(50)
);

-- 4. Tabla de Pedidos (Relación Muchos a Muchos)
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

ALTER TABLE usuarios 
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

SELECT id, username, password FROM usuarios;
SELECT * FROM usuarios;


-- INSERCIONES --
-- 2. Insertar Clientes (Ajustado a tu tabla)
INSERT INTO clientes (cedula, nombre, apellido, email, telefono, direccion) VALUES
('1712345678', 'Juan', 'Pérez', 'juan.perez@mail.com', '0991234567', 'Av. Shyris y Naciones Unidas, Quito'),
('0912345678', 'María', 'García', 'm.garcia@mail.com', '0987654321', 'Malecón 2000, Guayaquil'),
('0102345678', 'Luis', 'Fernández', 'luis.f@mail.com', '0971112223', 'Calle Larga, Cuenca'),
('1312345678', 'Ana', 'Martínez', 'ana.mtz@mail.com', '0963334445', 'Manta Beach, Manta'),
('1812345678', 'Diego', 'Torres', 'd.torres@mail.com', '0950009998', 'Barrio Ficoa, Ambato');

-- 3. Insertar Productos
INSERT INTO productos (nombre_producto, precio, stock, categoria) VALUES
('Arroz Super Extra 2kg', 2.50, 50, 'Granos'),
('Aceite de Girasol 1L', 3.25, 30, 'Aceites'),
('Leche Entera 1L', 0.95, 100, 'Lácteos'),
('Atún en Conserva 140g', 1.45, 80, 'Enlatados'),
('Pasta Dental 100ml', 2.10, 45, 'Higiene'),
('Detergente en Polvo 1kg', 4.50, 20, 'Limpieza'),
('Café Molido 250g', 5.80, 15, 'Bebidas'),
('Azúcar Blanca 1kg', 1.10, 60, 'Básicos'),
('Galletas de Sal', 0.60, 200, 'Snacks'),
('Yogurt de Fresa 1L', 1.80, 25, 'Lácteos');

-- 4. Insertar Pedidos iniciales (Para que los reportes no salgan vacíos)
-- Nota: Asegúrate de que los IDs 1 existan antes de ejecutar esto
INSERT INTO pedidos (cliente_id, producto_id, cantidad, total) VALUES
(1, 1, 2, 5.00),
(1, 3, 4, 3.80),
(2, 7, 1, 5.80),
(3, 10, 2, 3.60);