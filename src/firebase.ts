import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6NffR2Iic_V2z-nYMtpKmRnRYoBMbfKk",
  authDomain: "chillar-f4918.firebaseapp.com",
  projectId: "chillar-f4918",
  storageBucket: "chillar-f4918.firebasestorage.app",
  messagingSenderId: "824795262538",
  appId: "1:824795262538:web:b8603125dfcb99f626c0b3",
  measurementId: "G-0PGERL7KLP",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
