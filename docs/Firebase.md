# Firebase Architecture & Security - CINEMA ELK 2.0

## Integration Scope
- **Firebase Authentication**: Email/Password and Google OAuth login providers.
- **Cloud Firestore**: Database storing `users`, `reviews`, `ratings`, `watchlists`, `favorites`, `activityLogs`, `reports`.
- **Firebase Storage**: Avatar & backdrop image uploads.

## Security Rules Deployment
Deploy rules using Firebase CLI:
```bash
firebase deploy --only firestore:rules,storage
```
