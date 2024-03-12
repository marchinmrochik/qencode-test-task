import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {store} from './store/index';
import {Provider} from 'react-redux';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {RouterProvider} from "react-router-dom";
import routes from "./routes";
import {GOOGLE_CLIENT_ID} from "./utils/constants";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
            <RouterProvider router={routes}/>
        </Provider>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
