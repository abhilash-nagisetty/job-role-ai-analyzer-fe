import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiBpjEZOh5mmUR0rmEwqQoL1psvodw3Wk",
  authDomain: "job-role-analyzer.firebaseapp.com",
  projectId: "job-role-analyzer",
  storageBucket: "job-role-analyzer.appspot.com",
  messagingSenderId: "59408987928",
  appId: "1:59408987928:web:c7c5b9321933d27998d06d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
