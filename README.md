# BlueWave – Full-Stack E-Commerce Platform

BlueWave es una plataforma de e-commerce moderna construida con **Node.js, TypeScript, MongoDB, Stripe y React**, diseñada con una **arquitectura limpia y escalable** para soportar pagos reales, carritos persistentes, promociones, variantes por producto (colores), autenticación segura y sesiones de compra confiables.

Este proyecto fue diseñado como una **base de e-commerce de producción**, no como un demo.

---

## Características principales

- Autenticación y autorización con JWT
- Carrito persistente por usuario
- Validación de productos, precios y stock en backend
- Promociones y descuentos dinámicos
- Variantes de producto (colores con imágenes)
- Checkout real con Stripe
- Protección contra manipulación del carrito
- Arquitectura preparada para múltiples métodos de pago
- Frontend desacoplado y escalable

---

# Arquitectura

## Backend

El backend sigue una arquitectura **Clean Architecture / Service–Repository Pattern**:

### Responsabilidades

- **Controllers**: Manejan HTTP (req / res)
- **Services**: Contienen la lógica de negocio
- **Repositories**: Acceso a datos (MongoDB)
- **Models**: Esquemas de base de datos

### Beneficios

- Cambiar MongoDB por otra base de datos sin tocar lógica de negocio
- Cambiar Stripe por otro proveedor sin romper el checkout
- Testear servicios sin necesidad de base de datos
- Código mantenible y desacoplado de Express

---

## Frontend

El frontend sigue una arquitectura basada en **separación estricta de responsabilidades**:

### Flujo de datos

1. **Los componentes** solo renderizan UI  
2. **La lógica compleja** vive en **custom hooks**  
3. **Los hooks** llaman a **slices de Zustand**  
4. **Los slices** ejecutan **services**  
5. **Los services** se comunican con el backend  

### Filosofía

> Los componentes **nunca** hablan directamente con el backend.  
> Toda comunicación pasa por hooks → store → services.

Esto permite:

- Componentes limpios y reutilizables
- Lógica centralizada
- Cambio de store o API sin romper la UI
- Testing por capas
- Escalabilidad real

---

# Tecnologías

## Backend

- Node.js
- TypeScript
- Express
- MongoDB + Mongoose
- Stripe API
- JWT
- Express Validator (validación de requests)
- Multer (subida de archivos)
- bcrypt

## Frontend

- React
- TypeScript
- TailwindCSS
- Zustand
- React Hook Form
- Zod

---

# Seguridad

- Hash de contraseñas con bcrypt
- JWT con expiración
- Validación de tokens
- Validación de roles
- Sanitización de inputs
- Validación de precios en backend antes del pago
- Eliminación automática de productos inválidos del carrito
- Protección contra manipulación del carrito

---

# Pagos

Actualmente el sistema utiliza **Stripe** como proveedor de pagos.

La arquitectura está preparada para agregar fácilmente otros métodos como:

- MercadoPago
- PayPal
- Transferencias bancarias
- Criptomonedas
- Otros proveedores

Cada proveedor puede integrarse como un **Payment Service** independiente sin afectar la lógica de negocio.

---

# Estado del proyecto

BlueWave es una **base sólida para un e-commerce real**, pensada para:

- Escalar
- Mantenerse
- Extenderse
- Usarse en producción

---

# Instalación y configuración

## Requisitos

- Node.js 18+
- MongoDB local o MongoDB Atlas
- Cuenta de Stripe
- Git

---

## 1. Clonar el repositorio

```bash
git clone https://github.com/chinnnoo06/BlueWave-Ecommerce.git
cd bluewave
```

---

## 2. Configurar Backend

```bash
cd server
npm install
```

### Crear un archivo .env en la carpeta server:

- FRONTEND_URL=http://localhost:XXXX
- BACKEND_URL=http://localhost:XXXX
- SECRET_KEY=""
- PORT=XXXX
- GMAIL_USER=correo@ejemplo.com
- GMAIL_APP_PASSWORD=xxxx
- STRIPE_SECRET_KEY=sk_test_xxx
- VITE_STRIPE_PUBLIC_KEY=pk_test_xxx

### Iniciar Backend:

```bash
npm run dev
```

## 2. Configurar Frontend

```bash
cd ../client
npm install
```

### Crear un archivo .env en la carpeta client:

- VITE_API_URL = http://localhost:XXXX
- VITE_PRODUCT_IMAGE_URL=http://localhost:XXXX/uploads/products/
- VITE_CATEGORY_IMAGE_URL=http://localhost:XXXX/uploads/categories/
- VITE_BLOG_IMAGE_URL=http://localhost:XXXX/uploads/blogs/

### Iniciar Frontend:

```bash
npm run dev
```

# Autor

Desarrollado por **Francisco Inda**  
Full-Stack Developer