# Secure Campus Helpdesk

A complete, full-stack campus helpdesk web application where students can register, log in, submit help requests/complaints across various categories (Academic, Hostel, Facilities, IT, Transport), and track ticket statuses in real-time. Campus administrators can log in to a dedicated portal, monitor stats, filter requests, and update request statuses with resolution notes.

---

## Technology Stack

- **Frontend**: React 18, Vite, Modern CSS (Glassmorphism, Vibrant Dark Mode, Badges & Micro-animations), Axios, Lucide React Icons
- **Backend**: Java 17, Spring Boot 3.2, Spring Security (BCrypt Hashing, JWT Authentication), Spring Data JPA, Hibernate, Validation
- **Database**: MySQL 8 (`secure_campus_helpdesk`)

---

## Folder Structure

```
Secure Campus Helpdesk/
├── backend/
│   ├── src/main/java/com/campus/helpdesk/
│   │   ├── config/             # Security & CORS setup
│   │   ├── controller/         # Auth, Student, and Admin REST Endpoints
│   │   ├── dto/                # Data Transfer Objects
│   │   ├── entity/             # JPA Entities (User, HelpRequest, Enums)
│   │   ├── repository/         # Spring Data Repositories
│   │   ├── security/           # JWT & Password Security Filter
│   │   ├── service/            # Business Logic Services
│   │   └── bootstrap/          # Admin Initializer
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml                 # Maven Configuration
├── frontend/
│   ├── src/
│   │   ├── api/                # Axios Client with Centralized Base URL
│   │   ├── components/         # Navbar, StatusBadge, PriorityBadge, StatCard, LoadingSpinner
│   │   ├── context/            # AuthContext State Provider
│   │   ├── pages/              # Landing, Login, Register, AdminLogin, Dashboards, Details
│   │   ├── styles/             # Master CSS Design System
│   │   ├── App.jsx             # Main Application Routing
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── .env.example
└── README.md
```

---

## Prerequisites

1. **Java 17 JDK** installed (`java -version`)
2. **Node.js 18+ and NPM** installed (`node -v`, `npm -v`)
3. **MySQL 8 Server** running locally (`mysql --version`)
4. **Maven** executable (or using installed Maven at `C:\Users\siris\.vscode\extensions\oracle.oracle-java-26.0.2\nbcode\java\maven\bin\mvn.cmd`)

---

## Database Setup

1. Open your MySQL Terminal or MySQL Workbench:
   ```sql
   CREATE DATABASE IF NOT EXISTS secure_campus_helpdesk;
   ```
2. Set your local MySQL password in environment variable `DB_PASSWORD` or in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

---

## How to Run the Application

### 1. Start Backend (Spring Boot)

Open a terminal in the `backend/` directory:

```bash
cd backend
# Run Spring Boot app
mvn spring-boot:run
```
*(Or use full Maven path if `mvn` is not in environment PATH)*:
```powershell
& "C:\Users\siris\.vscode\extensions\oracle.oracle-java-26.0.2\nbcode\java\maven\bin\mvn.cmd" spring-boot:run
```

The backend server will start on **`http://localhost:8080`**.

### 2. Start Frontend (React + Vite)

Open a second terminal in the `frontend/` directory:

```bash
cd frontend
npm install
npm run dev
```

Open your web browser and navigate to:
**`http://localhost:5173`**

---

## Admin Credentials & Bootstrap

The system automatically creates a default administrator account on first startup if none exists:

- **Admin Email**: `admin@campus.edu`
- **Admin Password**: `AdminPassword123!`

---

## API Overview

### Authentication Endpoints
- `POST /api/auth/register` — Student Registration
- `POST /api/auth/login` — Student / Admin Login
- `POST /api/auth/logout` — Logout
- `GET /api/auth/me` — Current Authenticated Profile

### Student Endpoints (Requires Student Token)
- `POST /api/requests` — Submit new help request
- `GET /api/requests/my` — Get student's submitted requests
- `GET /api/requests/{id}` — View single request detail

### Admin Endpoints (Requires Admin Token)
- `GET /api/admin/stats` — Dashboard statistics overview
- `GET /api/admin/requests` — List all requests (supports `status`, `category`, `priority` query filters)
- `GET /api/admin/requests/{id}` — Get request details for management
- `PUT /api/admin/requests/{id}/status` — Update status & resolution comments

---

## Running Tests

### Backend Unit Tests
Run backend test suite:
```powershell
& "C:\Users\siris\.vscode\extensions\oracle.oracle-java-26.0.2\nbcode\java\maven\bin\mvn.cmd" test
```

### Frontend Build Verification
Verify production React bundle build:
```bash
cd frontend
npm run build
```

---

## Demo Flow for Faculty Presentation

1. **Home Page**: Show landing page (`http://localhost:5173`) with category overview and security highlights.
2. **Student Registration**: Click **Register**, fill in name, email, and password. Submit form.
3. **Submit Request**: Click **Submit New Request**, enter issue title (e.g. *"Projector bulb failure in Room 204"*), select category (*Facilities*), priority (*High*), and description. Submit request.
4. **Student View**: Confirm the request appears in "My Requests" with status **PENDING**.
5. **Admin Login**: Click **Logout**, then click **Admin Portal**, enter `admin@campus.edu` / `AdminPassword123!`.
6. **Admin Dashboard**: Highlight the stats cards (Total, Pending, In Progress, Resolved) and filter controls.
7. **Manage Ticket**: Click **Manage & Update** on the student's ticket, change status to **IN_PROGRESS** and then **RESOLVED**, adding note *"Technician dispatched, projector bulb replaced."* Click **Save Update**.
8. **Student Verification**: Log back in as student to show the ticket updated to **RESOLVED** with the admin note displayed.
## Security Pipeline
This project uses GitHub Actions for automated build and security testing.
