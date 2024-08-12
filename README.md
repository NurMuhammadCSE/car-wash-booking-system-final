# Car Washing Booking System

## Live Demo

[Car Washing System](https://car-washing-system-blush.vercel.app/)

Welcome to the **Car Washing Booking System**! This project is designed to manage and streamline the process of booking services through an intuitive and efficient backend system. Built with modern technologies like **Node.js**, **Express.js**, **TypeScript**, and **Mongoose**, this application provides robust functionality for managing users, services, slots, and bookings.

## Key Features

- **Service Management:** Easily manage services with full CRUD functionality. Each service includes detailed information like name, description, price, and duration.
- **Slot Management:** Manage service slots with precise control over booking statuses (available, booked, or canceled).
- **Booking System:** Users can book services by selecting available slots. The system ensures that slots are not double-booked and automatically updates the booking status.
- **User Authentication:** Secure user authentication using JWT. The system validates users before allowing bookings.
- **Comprehensive Data Handling:** Responses include fully populated fields for services, slots, and user details, providing a complete overview of each booking.
- **Error Handling:** Detailed error handling to ensure a smooth user experience, with custom error messages for missing services, users, or slots.

## Technologies Used

- **Node.js & Express.js:** Backend framework for building the RESTful APIs.
- **TypeScript:** Ensures type safety and enhances the development experience.
- **MongoDB & Mongoose:** Database and ODM for data persistence and management.
- **Zod:** Schema validation to enforce data integrity.
- **JWT:** Secure authentication for users.

## How It Works

1. **Service Creation:** Admins can create services with detailed information like price and duration.
2. **Slot Allocation:** Admins assign available time slots for each service.
3. **User Booking:** Users can book services by selecting an available slot. The system ensures the slot is not already booked.
4. **Booking Management:** Users can view their bookings, including detailed information about the service, slot, and booking status.

## Installation & Setup

To get started with the project, clone the repository and follow the setup instructions provided. Ensure that you have Node.js and MongoDB installed.

```bash
git clone <repository-url>
cd project-directory
npm install
npm start
```

## API Documentation

### Service Management

- **Create Service**: `/api/services` (POST)
- **Retrieve All Services**: `/api/services` (GET)
- **Retrieve Specific Service**: `/api/services/:serviceId` (GET)
- **Update Service**: `/api/services/:serviceId` (PUT)
- **Delete Service**: `/api/services/:serviceId` (DELETE)

### Booking Management

- **Create Booking**: `/api/bookings` (POST)
- **Retrieve All Bookings**: `/api/bookings` (GET)
- **Retrieve User Bookings**: `/api/my-bookings` (GET)

### Slot Management

- **Create Slot**: `/api/services/slots` (POST)
- **Retrieve All Slots**: `/api/slots/availability` (GET)
- **Retrieve Specific Slot**: `/api/slots/availability?serviceId=66b9c15d0fb598abe54bc456&date=2024-08-17` (GET)

### User Management

- **Create User**: `/api/auth/signup` (POST)
- **User Login**: `/api/auth/login` (POST)

## Models

### User Model
- **name**: Full name of the user.
- **email**: Email address used for communication and login.
- **password**: Securely hashed password for authentication.
- **phone**: Contact phone number for notifications and updates.
- **role**: The role of the user, which can be one of the following: `admin`, `user`.
- **address**: Complete physical address for service delivery or correspondence.

### Service Model
- **name**: Title of the service.
- **description**: Brief description of what the service entails.
- **price**: Cost of the service in the local currency.
- **duration**: Duration of the service in minutes.
- **isDeleted**: Indicates whether the service is marked as deleted (`false` means it is not deleted).

### Slot Model
- **service**: Reference to the specific service being booked.
- **date**: Date of the booking.
- **startTime**: Start time of the slot.
- **endTime**: Approximate end time of the slot.
- **isBooked**: Status of the slot (`available`, `booked`, `canceled`).

### Booking Model
- **customer**: Reference to the user who made the booking.
- **service**: Reference to the booked service.
- **slot**: Reference to the booking slot.
- **vehicleType**: Type of the vehicle (enum: `car`, `truck`, `SUV`, `van`, `motorcycle`, `bus`, `electricVehicle`, `hybridVehicle`, `bicycle`, `tractor`).
- **vehicleBrand**: Brand or manufacturer of the vehicle.
- **vehicleModel**: Model or variant of the vehicle.
- **manufacturingYear**: Manufacturing year of the vehicle.
- **registrationPlate**: Unique registration number assigned to the vehicle.
