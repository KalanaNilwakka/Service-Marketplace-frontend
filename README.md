# Service Marketplace

A React-based frontend application for a service marketplace platform with role-based access control. Users can sign up or sign in to view, manage, and browse service categories based on their role (Admin, Provider, or Consumer).

## Features

- **Authentication System**: Sign up and sign in functionality with role-based access
- **Role-Based Access Control**:
  - **Admin**: Full access to view, create, update, and delete service categories
  - **Provider/Consumer**: Read-only access to view service categories
- **Service Categories Management**: Browse and manage service categories with descriptions and icons
- **Real-time API Integration**: Fetches categories from backend API after authentication
- **Responsive Design**: Mobile-friendly UI with responsive grid layouts
- **Session Management**: User sessions persist during the browser session

## Tech Stack

- **React**: UI library
- **Next.js**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **Context API**: State management for auth and categories

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── globals.css          # Global styles
│   └── page.tsx             # Main page (routes to auth or dashboard)
├── components/
│   ├── auth-form.tsx        # Sign in/Sign up form
│   ├── header.tsx           # Navigation header
│   ├── categories-list.tsx  # Display categories grid
│   ├── category-form.tsx    # Form to add/edit categories
│   ├── admin-dashboard.tsx  # Admin panel
│   └── user-dashboard.tsx   # User/Provider panel
├── contexts/
│   ├── auth-context.tsx     # Authentication state management
│   └── categories-context.tsx # Categories state management
└── README.md                # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd service-marketplace
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Set up environment variables (if needed):
Create a `.env.local` file in the root directory (currently using localhost API)

### Running the Application

Start the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## API Integration

The application fetches service categories from your backend API:

**Endpoint**: `GET http://localhost:8080/api/v1/categories`

**Headers Required**:
- `Authorization: Bearer {userId}`

**Expected Response**:
```json
[
  {
    "categoryId": 1,
    "name": "Home Services",
    "description": "Cleaning, plumbing, electrical work",
    "icon": "home",
    "createdAt": "2026-04-27T22:55:05.413316",
    "updatedAt": "2026-04-27T22:55:05.413316"
  }
]
```

**Icon Mapping**:
The following icon keys are mapped to emojis:
- `home` → 🏠
- `professional` → 💼
- `health` → 💪
- `education` → 📚
- `tech` → 💻
- `transportation` → 🚗
- `food` → 🍽️
- `arts` → 🎨
- `maintenance` → 🔧
- `communication` → 📱
- `healthcare` → 🏥
- `travel` → ✈️

## Authentication

Categories are only fetched after the user successfully logs in. The authentication flow:

1. User lands on the sign in/sign up page
2. User authenticates with email and password
3. User selects a role (Admin, Provider, or Consumer)
4. User is redirected to their dashboard
5. Categories are fetched from the API with authorization

**Note**: The current implementation uses session storage for demo purposes. For production, implement a proper backend authentication system with JWT tokens or session management.

## Usage

### For Admins

1. Sign in with an admin account
2. Navigate to the Admin Dashboard
3. View all service categories in a responsive grid
4. Add new categories using the "Add Category" form
5. Edit existing categories by clicking the edit icon

### For Providers/Consumers

1. Sign in with a provider or consumer account
2. View all available service categories
3. Browse through categories to see available services
4. No editing or adding permissions (read-only access)

## Components

### AuthForm
Handles user authentication with email, password, and role selection. Supports both sign in and sign up modes.

### Header
Navigation bar displaying the website name and user logout functionality.

### CategoriesList
Displays service categories in a responsive grid layout. Shows edit/delete buttons for admins only.

### CategoryForm
Form for creating and editing service categories. Admin-only functionality.

### AdminDashboard
Main panel for admins to manage service categories.

### UserDashboard
Display panel for providers and consumers to view categories.

## Context Providers

### AuthContext
Manages user authentication state including:
- Current user information
- Login/logout functionality
- User role management

### CategoriesContext
Manages service categories state including:
- Fetching categories from API
- Adding new categories
- Updating existing categories
- Deleting categories
- Loading state

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Implement proper backend authentication with JWT tokens
- Add service listings and search functionality
- Implement user profiles and ratings
- Add service booking system
- Implement real-time notifications
- Add payment processing integration
- Implement advanced filtering and sorting

## Support

For issues or questions, please contact the development team or create an issue in the repository.
