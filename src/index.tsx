import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {store} from "./store";
import App from './components/App/App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
);

axios.interceptors.request.use((req) => {
    let token = localStorage.getItem("token")
    if(token) {
        if (req.headers) {
            req.headers['Authorization'] = `Bearer ${token}`
        } else {
            req.headers = {'Authorization': `Bearer ${token}`}
        }
    }
    return req
})
// let token = JSON.parse(localStorage.getItem("token") || "null")
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
