import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from 'src/components/GlobalStyles';
import { Provider } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';
import { store } from 'src/pages/SingleProduct/redux/store';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmJ1TyU0992u8v94WmhpEWHH-FnfjsK7c",
  authDomain: "mobileshop-4e176.firebaseapp.com",
  databaseURL: "https://mobileshop-4e176-default-rtdb.firebaseio.com",
  projectId: "mobileshop-4e176",
  storageBucket: "mobileshop-4e176.appspot.com",
  messagingSenderId: "601555946820",
  appId: "1:601555946820:web:78b646fceecb7ed63fdb11",
  measurementId: "G-G9PLK7TLLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <SkeletonTheme baseColor="#e9e9e9" highlightColor="#fff">
                    <App />
                </SkeletonTheme>
            </GlobalStyles>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
