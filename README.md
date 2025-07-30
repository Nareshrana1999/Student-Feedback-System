# Student Feedback System

🌐 https://student-feedback-system-form.vercel.app

A modern web application for managing and collecting feedback from students about faculty performance. Built with React, Vite, and Tailwind CSS, this system provides separate dashboards and features for students, faculty, and administrators.

## Features
- **Admin Dashboard:** Manage all users (faculty and students), analyze feedback, and oversee system settings.
- **Student Dashboard:** Submit feedback, view feedback history, update profile, and change password.
- **Faculty Dashboard:** View received feedback, performance stats, and manage profile and password.
- **Authentication:** Role-based login for admin, faculty, and students.
- **Password Management:** All users can change their password securely.
- **Responsive UI:** Built with Tailwind CSS for a modern, mobile-friendly experience.

## Technologies Used
- React 18
- Vite
- Tailwind CSS
- LocalStorage (for demo data persistence)
- Framer Motion (animations)
- Lucide React (icons)

## Project Structure
```
Student-Feedback-System/
├── .nvmrc                  # Node.js version for nvm
├── package.json            # Project dependencies and scripts
├── public/                 # Static files (.htaccess for SPA routing)
├── src/
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React context (Auth)
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components (admin, faculty, student)
│   └── main.jsx            # App entry point
├── plugins/                # Visual editor and Vite plugin (optional, for dev)
├── tools/                  # Utility scripts (e.g., generate-llms.js)
├── tailwind.config.js      # Tailwind CSS config
├── vite.config.js          # Vite config
└── README.md               # Project documentation
```

## Setup & Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nareshrana1999/Student-Feedback-System.git
   cd Student-Feedback-System
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set Node.js version (optional, if using nvm):**
   ```bash
   nvm use
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open in your browser:**
   Visit the URL shown in your terminal (usually http://localhost:5173)

## Default Login Credentials
### Admin
- **Email:** admin@college.edu
- **Password:** admin123

## How to Use
### 1. Admin Login
- Go to the [website](https://student-feedback-system-form.vercel.app) or your local server.
- Select the **Administrator** role and log in with the admin credentials above.

### 2. User Management
- **View Users:** The admin dashboard displays all faculty and students. You can search, filter, and view user details.
- **Add User:** Click "Add Faculty" or "Add Student" to create new users. Fill in the required details and save.
- **Edit User:** Click the edit icon next to a user to update their information.
- **Delete User:** Click the delete icon to remove a user from the system.

### 3. Feedback Analysis
- Go to the **Feedback Analysis** tab to view aggregated feedback data for all faculty.
- See statistics such as total feedback, average ratings, and distribution of ratings.
- Use this data to monitor faculty performance and identify trends.

### 4. Settings
- In the **Settings** tab, you can manage admin account security (change password, etc.).
- All users (admin, faculty, student) can change their password from their respective settings page.

### 5. Student & Faculty Features (as Admin)
- You can create, edit, or delete student and faculty accounts to simulate their experience.
- To test as a student or faculty, log out and log in with their credentials (see user management for details).

### 6. Data Persistence
- All data is stored in browser localStorage for demo purposes. To reset demo data, clear your browser's localStorage.

## Plugins & Tools
- **plugins/**: Contains optional visual editor and Vite plugins for inline editing (for development convenience).
- **tools/**: Utility scripts for automation or code generation (e.g., generate-llms.js).
- **.nvmrc**: Ensures all contributors use the same Node.js version.

## Notes
- For production, integrate with a backend/database for real data persistence and security.
- No Hostinger or unrelated files remain in this repo.

## License
This project is open source and available under the MIT License.
