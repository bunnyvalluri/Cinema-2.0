# Security Hardening Policy - CINEMA ELK 2.0

## Measures Implemented
1. **Helmet Middleware**: Configures security headers (HSTS, Frameguard, XSS protection).
2. **CORS Headers**: Whitelisted domain origin checks.
3. **Rate Limiting**: Protects against brute-force authentication attacks (20 auth requests/hr) and API abuse (300 req/15 min).
4. **JWT Verification**: Cryptographically signed tokens.
5. **Password Hashing**: Bcrypt salt factor of 10.
