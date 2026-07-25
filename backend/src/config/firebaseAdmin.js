import admin from 'firebase-admin';

let firebaseAdminApp;

try {
  if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID || 'cinema-elk-2';
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;

    if (clientEmail && privateKey) {
      firebaseAdminApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } else {
      firebaseAdminApp = admin.initializeApp({ projectId });
    }
  } else {
    firebaseAdminApp = admin.app();
  }
} catch (error) {
  console.warn('Firebase Admin SDK setup notice:', error.message);
}

export const adminAuth = admin.apps.length ? admin.auth() : null;
export const adminDb = admin.apps.length ? admin.firestore() : null;
