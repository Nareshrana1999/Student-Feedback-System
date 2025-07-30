# Student Feedback System

A modern web application for managing and collecting feedback from students about faculty performance. Built with React, Vite, and Tailwind CSS, this system provides separate dashboards and features for students, faculty, and administrators.

## Features
- **Student Dashboard:** Submit feedback, view feedback history, update profile, and change password.
- **Faculty Dashboard:** View received feedback, performance stats, and manage profile and password.
- **Admin Dashboard:** Manage all users (faculty and students), analyze feedback, and oversee system settings.
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

### Faculty (all use password: 123456)
- Dr. John Smith — john.faculty@college.edu
- Dr. Emma Brown — emma.faculty@college.edu
- Dr. Li Wang — li.faculty@college.edu
- Dr. Maria Garcia — maria.faculty@college.edu
- Dr. David Miller — david.faculty@college.edu

### Students (all use password: 123456)
- Ava Patel — ava.patel@college.edu
- Liam Johnson — liam.johnson@college.edu
- Sophia Lee — sophia.lee@college.edu
- Noah Kim — noah.kim@college.edu
- Mia Chen — mia.chen@college.edu
- Ethan Brown — ethan.brown@college.edu
- Isabella Garcia — isabella.garcia@college.edu
- Mason Martinez — mason.martinez@college.edu
- Charlotte Davis — charlotte.davis@college.edu
- Logan Wilson — logan.wilson@college.edu
- Amelia Anderson — amelia.anderson@college.edu
- Elijah Thomas — elijah.thomas@college.edu
- Harper Moore — harper.moore@college.edu
- Benjamin Taylor — benjamin.taylor@college.edu
- Evelyn Jackson — evelyn.jackson@college.edu
- James White — james.white@college.edu
- Abigail Harris — abigail.harris@college.edu
- Lucas Clark — lucas.clark@college.edu
- Ella Lewis — ella.lewis@college.edu
- Henry Young — henry.young@college.edu
- Scarlett King — scarlett.king@college.edu
- Jack Wright — jack.wright@college.edu
- Grace Lopez — grace.lopez@college.edu
- Alexander Hill — alexander.hill@college.edu
- Chloe Scott — chloe.scott@college.edu

## Plugins & Tools
- **plugins/**: Contains optional visual editor and Vite plugins for inline editing (for development convenience).
- **tools/**: Utility scripts for automation or code generation (e.g., generate-llms.js).
- **.nvmrc**: Ensures all contributors use the same Node.js version.

## Notes
- All data is stored in browser localStorage for demo purposes. For production, integrate with a backend/database.
- To reset demo data, clear your browser's localStorage.
- No Hostinger or unrelated files remain in this repo.

## License
This project is open source and available under the MIT License.

## Live Demo
[student-feedback-system-form.vercel.app](https://student-feedback-system-form.vercel.app)

## Repository
[https://github.com/Nareshrana1999/Student-Feedback-System.git](https://github.com/Nareshrana1999/Student-Feedback-System.git)
