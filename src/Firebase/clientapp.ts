
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const apiKey=process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const authDomain=process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
const projectId=process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const storageBucket=process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
const messagingSenderId=process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
const appId=process.env.NEXT_PUBLIC_FIREBASE_APP_ID
const measurementId=process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

// Initialize Firebase
const app =!getApps().length ? initializeApp(firebaseConfig) : getApp()
const fireStore=getFirestore(app)
const auth=getAuth(app)
const storage=getStorage(app)
//const analytics = getAnalytics(app);
export {fireStore,auth,storage}