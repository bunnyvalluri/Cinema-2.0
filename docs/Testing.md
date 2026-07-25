# Testing & Quality Assurance - CINEMA ELK 2.0

## Automated Build Check
- `npm run build` inside `frontend/` verifies JSX syntax, imports, bundling, and Tailwind CSS compilation.

## Verification Scenarios
- **Hero Carousel**: Test slide auto-advance, backdrop image rendering, and trailer modal.
- **Search & Filters**: Test multi-genre filtering and title queries.
- **RBAC Controls**: Verify that guest users cannot access `/admin` and are redirected to `/login`.
