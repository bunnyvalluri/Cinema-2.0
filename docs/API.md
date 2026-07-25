# REST API Specifications - CINEMA ELK 2.0

Base URL: `http://localhost:5000/api/v1`

## Endpoints Summary

### Auth (`/auth`)
- `POST /auth/register`: Create user account
- `POST /auth/login`: Authenticate and issue JWT token
- `GET /auth/me`: Get current authenticated user details

### Movies (`/movies`)
- `GET /movies/trending`: Fetch trending films
- `GET /movies/search?query=...`: Global search
- `GET /movies/:id`: Fetch detailed movie metadata & trailer

### Reviews (`/reviews`)
- `GET /reviews/movie/:movieId`: Get reviews for a movie
- `POST /reviews`: Create a new movie review

### Admin (`/admin`)
- `GET /admin/metrics`: Fetch admin dashboard counters (Admin Role Required)
- `PUT /admin/user/role`: Update user RBAC role (Admin Role Required)
