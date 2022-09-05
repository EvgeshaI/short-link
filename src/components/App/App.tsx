import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom"
import './App.css';
import {Navbar} from "../Navbar/Navbar";
import {Login} from "../LoginAndRegistration/Login";
import {Registration} from "../LoginAndRegistration/Registration";
import {Content} from "../Content/Content";
import {useAppDispatch} from "../../store";
import {initApp} from "../../store/authSlice";

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initApp())
    }, [])

    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/content" element={<Content/>}/>
            </Routes>
        </div>
    );
}

export default App;
