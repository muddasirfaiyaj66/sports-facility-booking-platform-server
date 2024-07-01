### **This project** is a comprehensive backend solution for a sports facility booking platform, built using TypeScript, Express.js, and Mongoose. It enables users to easily sign up, log in, and book sports facilities. Key functionalities include:

- **User Management**: Users can register, log in, and manage their profiles. Admins have additional capabilities to manage facilities and view all bookings.
- **Facility Management**: Admins can create, update, soft-delete, and retrieve facilities. Users can view available facilities.
- **Booking Management**: Users can check facility availability, create, view, and cancel bookings. Admins can view all bookings.
- **Error Handling**: Comprehensive error handling with global error middleware.
- **Authentication & Authorization**: Secure user authentication and role-based authorization.
- **Transaction & Rollback**: Ensures data consistency during complex operations.

This platform aims to simplify the process of booking sports facilities, providing a user-friendly interface and robust backend functionalities to handle various booking scenarios.

## **Live server Link**

[https://sports-facility-booking-platform-three.vercel.app](https://sports-facility-booking-platform-three.vercel.app/)

# **To run this server locally:**

## **Clone the repository**

```
git clone https://github.com/muddasirfaiyaj66/sports-facility-booking-platform-server.git
```

## **Create a .env file in root directory**

```
NODE_ENV=development 
PORT=5000
DATABASE_URL = your database url
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET = add jwt access token
JWT_REFRESH_SECRET = add jwt refresh token
JWT_ACCESS_EXPIRES_IN= 10d 
JWT_REFRESH_EXPIRES_IN= 365d
```

## **Install dependencies:**

```
npm i
```

## Start the development server:

`npm run start:dev`

# **API Endpoints**

## **User Routes**

1. **User Sign Up**
- **Route**: `POST /api/auth/signup`
- **Request Body**:

```jsx
{
  "name": "Guest",
  "email": "guest@gmail.com",
  "password": "guest1243@@#",
  "phone": "01700000000",
  "role": "admin", // or 'user'
  "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
}
```

• **Response:**

```jsx
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Guest",
		"email": "guest@gmail.com",
    "role": "admin",
    "phone": "01700000000",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}
```

2.  **User Login**

- **Route**: `POST /api/auth/login`
- **Request Body**:

```jsx
{
  "email": "guest@gmail.com",
  "password": "guest1243@@#"
}
```

• **Response:**

```jsx
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "JWT_TOKEN",
  "data": {
  "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Guest",
		"email": "guest@gmail.com",
    "role": "admin",
    "phone": "01700000000",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}
```

## **Facility Routes**

1. **Create a Facility (Admin Only)**

- **Route**: `POST /api/facility`
- **Headers**:

```jsx
Authorization: Bearer JWT_TOKEN
```

```jsx
{
  "name": "Tennis Court",
  "description": "Outdoor tennis court with synthetic surface.",
  "pricePerHour": 30,
  "location": "456 Sports Ave, Springfield"
}
```

• **Response**

```jsx
{
  "success": true,
  "statusCode": 200,
  "message": "Facility added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Tennis Court",
    "description": "Outdoor tennis court with synthetic surface.",
    "pricePerHour": 30,
    "location": "456 Sports Ave, Springfield",
    "isDeleted": false
  }
}
```

2. **Update a Facility (Admin Only)**

- **Route**: `PUT /api/facility/:id`
- **Headers**:

```jsx
Authorization: Bearer JWT_TOKEN
```

```jsx
{
  "name": "Updated Tennis Court",
  "description": "Updated outdoor tennis court with synthetic surface.",
  "pricePerHour": 35,
  "location": "789 Sports Ave, Springfield"
}
```

• **Response**

```jsx
{
  "success": true,
  "statusCode": 200,
  "message": "Facility updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": false
  }
}
```

1. **Delete a Facility - Soft Delete (Admin Only)**
- **Route**: `DELETE /api/facility/:id`
- **Headers**:

```jsx
      Authorization: Bearer JWT_TOKEN
```

• **Response**:

```jsx
{
  "success": true,
  "statusCode": 200,
  "message": "Facility deleted successfully",
  "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Updated Tennis Court",
      "description": "Updated outdoor tennis court with synthetic surface.",
      "pricePerHour": 35,
      "location": "789 Sports Ave, Springfield",
      "isDeleted": true
    }
}

```

**4. Get All Facilities**

- **Route**: `GET /api/facility`
- **Response**:

```jsx
{
  "success": true,
  "statusCode": 200,
  "message": "Facilities retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with synthetic surface.",
      "pricePerHour": 30,
      "location": "456 Sports Ave, Springfield",
      "isDeleted": false
    }
  ]
}
```

## **Booking Routes**

1. **Check Availability**

• **Route**: `GET /api/check-availability`

**Query Parameters**

- **date** (`string`, optional): The date for which availability is to be checked. Format: `YYYY-MM-DD`. If not provided, today's date will be used by default.

**Example Request**

```jsx
GET /api/check-availability?date=2024-06-15
```

**Example Response**

```jsx
{
  "success": true,
  "statusCode": 200,
  "message": "Availability checked successfully",
  "data": [
      {
          "startTime": "08:00",
          "endTime": "10:00"
      },
      {
          "startTime": "14:00",
          "endTime": "16:00"
      }
   ]
}
```

1. **Create a Booking (User Only)**
- **Route**: `POST /api/bookings`
- **Headers**:

```jsx
Authorization: Bearer JWT_TOKEN
```

```jsx
{
  "facility": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "10:00",
  "endTime": "13:00"
}
```

• **Response:**

```jsx
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "confirmed"
  }
}
```

1. **View All Bookings (Admin Only)**
- **Route**: `GET /api/bookings`
- **Headers**:

```jsx
Authorization: Bearer JWT_TOKEN
```

• **Response:**

```jsx
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": {
       "_id": "60d9c4e4f3b4b544b8b8d1c4",
		   "name": "Guest",
			 "email": "guest@gmail.com",
		    "role": "admin",
		    "phone": "01700000000",
		    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
      },
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```

1. **View Bookings by User (User Only)**
- **Route**: `GET /api/bookings/user`
- **Headers**:

```jsx
Authorization: Bearer JWT_TOKEN
```

```jsx
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```

1. **Cancel a Booking (User Only)**
- **Route**: `DELETE /api/bookings/:id`
- **Headers**:

```jsx
Authorization: Bearer JWT_TOKEN
```

```jsx
{
  "success": true,
  "statusCode": 200,
  "message": "Booking cancelled successfully",
  "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": "canceled"
    }
}
```

## If No data Found:

• **Response:**

```jsx
{
  "success": false,
  "statusCode": 404,
  "message": "No Data Found",
  "data":[]
}
```

**Sample Error Response:**

```jsx
{
    "success": false,
    "message": "This user is not found !",
    "errorSources": [
        {
            "path": "",
            "message": "This user is not found !"
        }
    ],
    "stack": null
}
```

 **Not Found Route:**

```jsx
{
  "success": false,
  "statusCode": 404,
  "message": "Not Found",
}
```

**Authentication Middleware:**

```jsx
{
  "success": false,
  "statusCode": 401,
  "message": "You have no access to this route",
}
```