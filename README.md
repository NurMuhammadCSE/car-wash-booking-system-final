# Car Washing Booking System

## 🚀 Live Demo

- [Frontend - Car Washing Booking System](https://car-washing-booking.web.app/)
- [Backend - Car Washing Booking System Server](https://car-washing-system-blush.vercel.app/)

Welcome to the **Car Washing Booking System**! This project revolutionizes the car washing booking experience by offering an intuitive and efficient system for managing services. Developed with cutting-edge technologies, this system is designed to streamline your booking process with ease and reliability.

## 🌟 Key Features

- **Service Management:** Effortlessly manage services with full CRUD functionality. Each service includes comprehensive details like name, description, price, and duration.
- **Slot Management:** Control service slots with precise management of booking statuses (available, booked, or canceled).
- **Booking System:** Book services seamlessly by selecting available slots. The system prevents double-booking and keeps booking statuses up-to-date.
- **User Authentication:** Secure authentication using JWT ensures that only validated users can make bookings.
- **Comprehensive Data Handling:** Responses include detailed information on services, slots, and users, giving a complete view of each booking.
- **Error Handling:** Robust error handling with custom messages for missing services, users, or slots, ensuring a smooth user experience.

## 💻 Technologies Used

- **Node.js & Express.js:** Power the backend with RESTful APIs for robust functionality.
- **TypeScript:** Provides type safety and enhances development efficiency.
- **MongoDB & Mongoose:** Manage data persistence with a flexible NoSQL database and ODM.
- **Zod:** Enforces data integrity with schema validation.
- **JWT:** Handles secure user authentication.

## 🚀 How It Works

1. **Service Creation:** Admins can create and configure services, including setting prices and durations.
2. **Slot Allocation:** Admins assign and manage available time slots for each service.
3. **User Booking:** Users select from available slots to book services, with the system ensuring no double bookings.
4. **Booking Management:** Users can view and manage their bookings, including detailed information on services, slots, and statuses.

## 📥 Installation & Setup

To get started, clone the repository and follow these steps:

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
