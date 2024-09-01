# Overview

The e-commerce application is a two-part system consisting of a [backend Rails API](https://github.com/ilcande/ecommerce-shop-backend) and a frontend React application. The backend Rails application serves as an API-only server that provides a robust and scalable interface for CRUD operations, business logic, and data management. The frontend React application, styled with Tailwind CSS, acts as the user interface through which end-users interact with the application.

## Installation

To run the application locally, you need to set up both the backend Rails API and the frontend React application.
For the frontend, follow the instructions below:

- Clone the repository:

```bash
git clone https://github.com/ilcande/ecommerce-shop-frontend.git
cd ecommerce-shop-frontend
```

- Install dependencies:

```bash
npm install
```

- Start the development server:

```bash
npm start
```

## Architecture Frontend

Technology Stack:

  1. **React**: Frontend JavaScript library for building user interfaces.
  2. **Tailwind CSS**: Utility-first CSS framework for styling the frontend.

### Components

  Pages:

  Represent various views and routes in the application.
  Examples: `AdminDashboard`, `HomePage`.

  Hooks:

  Encapsulate reusable logic and data fetching.
  Examples: `useCreateStockLevel` for managing stock level form interactions.

  Components:

  Reusable UI elements that represent parts of the interface.
  Examples: `CreateStockLevel` form component, `Products` list component.

  State Management:

  Managed locally within components or hooks.information for debugging and monitoring.
  State management libraries like Redux are not used in this implementation, relying on React's built-in state management.

  API Integration:

  `Axios` is used for making HTTP requests to the Rails API.
  Components and hooks handle data fetching, form submissions, and error handling.

  Routing:
    React Router is used for client-side routing.
    Routes are defined in the `App` component, which renders the appropriate page based on the URL.

## User Actions

### Product Page

- **Description**: The product page is a read operation performed to display the product's details for customers to make a purchase.
- **UI Presentation**: The product page shows the base price and available customization options.
- **Available Options**: Options are displayed based on the constraints defined in the database. If a particular option cannot be combined with another (e.g., "Full-Suspension" cannot be selected with "Mountain Wheels"), it will be dynamically disabled.
- **Price Calculation**: The total price is updated live based on the customer's selections. This includes the base price plus any additional costs associated with selected options.

### Add to Cart Action

- **Description**: After selecting the desired options, customers can add the product to their cart.
- **Database Persistence**: When the "Add to Cart" button is clicked, the selected product and its configuration are saved to the cart. The stock levels are updated to reflect the new inventory status upon checkout. Payment processes are not covered in this challenge but would typically involve additional backend transactions.

## Admin Workflows

### Creation of a New Product

- **Description**: Admins can create new products by specifying necessary information like product name, type, and base price.
- **Database Changes**: New records are added to the `Products` table. Configurations and options associated with this product can also be set up.

### Addition of a New Part Choice

- **Description**: Admins can add new parts, such as a `Brakes`, through a user interface.
- **UI Description**: The UI allows admins to specify the part name and product type. The part is then added to the `Parts` table.
- **Database Changes**: A new record is added to the `Parts` table. Options related to this part can be created subsequently.

### Addition of a New Option for a Part

- **Description**: Admins can add new options for a part, such as `Disc Brakes` for the `Brakes` part.
- **UI Description**: The UI provides fields to specify the option name, price. The option is then associated with the relevant part.

### Setting Up Constraints

- **Description**: Admins can define constraints that restrict certain options from being selected together.
- **UI Description**: The UI provides a way to specify constraints between options. For example, "Full-Suspension" and "Mountain Wheels" cannot be selected together.

### Managing Stock Levels

- **Description**: Admins can update the stock levels for each option.
- **UI Description**: The UI provides a form to set the stock level for each option. This information is stored in the `StockLevels` table.

### Setting Up Configurations for a Product

- **Description**: Admins can create configurations for a product by selecting options for each part.
- **UI Description**: The UI allows admins to choose options for each part and save the configuration. This information is stored in the `ProductConfigurations` table and associated with the product.

### Updating Existing Objects Attributes

- **Description**: Admins can update the attributes of existing objects like options, and stock levels.
- **UI Description**: The UI provides forms to update the attributes of options and stock levels. Changes are reflected in the database.

## Data Flow

The frontend React application interacts with the backend Rails API through HTTP requests. The API processes these requests, performs CRUD operations on the PostgreSQL database, and returns the appropriate responses. The frontend application then updates the UI based on the responses received.
  **User Interaction**:
  Users interact with the frontend React application via UI components.

  **API Requests**:
  React components make HTTP requests to the Rails API using Axios.

  **Controller Handling**:
    Rails controllers receive requests, perform necessary operations, and send responses.

  **Service Layer (if applicable)**:
    Complex business logic is handled by service objects.

  **Database Operations**:
    Models interact with PostgreSQL to perform CRUD operations.

  **Response Handling**:
    The Rails API returns data or status codes, which are then processed by React components.
  
  **Error Logging and Authentication**:
    Errors are logged and managed centrally.
    Authentication ensures secure access to administrative functions.

## System Design

The system is designed to be modular, scalable, and maintainable. The separation of concerns between the frontend and backend allows for independent development and deployment of each part. The fontend communicates with the backend through a RESTful API, which provides a clear interface for data management and business logic.
![System Design](system-design.png)

## Scalability and Performance

The system is designed to be scalable and performant by following best practices and utilizing appropriate technologies.

  **Scalability**:
    Both the backend and frontend are designed to handle growing user bases and data sizes.

  **Database Optimization**:
    Proper indexing, query optimization, and database tuning to improve performance.

  **Maintainability**:
    The separation of concerns (controllers, services, models) ensures that the codebase is maintainable and extensible.
