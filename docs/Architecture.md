# System Architecture Document - CINEMA ELK 2.0

## High-Level Topology

```
+-------------------------------------------------------------+
|                      React (Vite) Single Page App           |
|  - Components: HeroCarousel, MovieGrid, AdminStats          |
|  - Contexts: AuthContext, ThemeContext, MovieContext        |
+------------------------------+------------------------------+
                               |
            +------------------+------------------+
            |                                     |
            v                                     v
+-----------------------+             +-----------------------+
|  TMDB REST API        |             |  Express.js REST API  |
|  - Movies, Trailers   |             |  - Auth, Reviews      |
|  - Cast, Search       |             |  - Admin, Analytics   |
+-----------------------+             +-----------+-----------+
                                                  |
                                                  v
                                      +-----------------------+
                                      |  Firebase Firestore   |
                                      |  - Users, Reviews     |
                                      |  - Watchlists, Logs   |
                                      +-----------------------+
```

## Security Layer
1. **Frontend**: Route guards for `/admin`, token persistence in localStorage.
2. **Backend**: `verifyToken` middleware, `requireRole` RBAC enforcement.
3. **Database**: Firestore Security Rules enforcing user document ownership.
