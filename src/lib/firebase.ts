// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "asrf-tracker",
  "appId": "1:211372175638:web:6821246df01131446da037",
  "storageBucket": "asrf-tracker.appspot.com",
  "apiKey": "AIzaSyATzlN8Aie8w8MPD-ldg8tLCmtYH-fRs4A",
  "authDomain": "asrf-tracker.firebaseapp.com",
  "messagingSenderId": "211372175638"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
