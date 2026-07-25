# Firestore Database Specification - CINEMA ELK 2.0

## Firestore Collections Schema

### `users`
```json
{
  "uid": "string (PK)",
  "email": "string",
  "displayName": "string",
  "role": "string ('guest' | 'user' | 'moderator' | 'administrator')",
  "photoURL": "string",
  "bio": "string",
  "createdAt": "timestamp"
}
```

### `reviews`
```json
{
  "id": "string (PK)",
  "movieId": "number",
  "movieTitle": "string",
  "userId": "string",
  "userName": "string",
  "rating": "number (1-5)",
  "content": "string",
  "likes": "number",
  "createdAt": "timestamp"
}
```

### `watchlists` & `favorites`
```json
{
  "listId": "string (PK)",
  "userId": "string",
  "movieId": "number",
  "movieData": "object",
  "addedAt": "timestamp"
}
```
