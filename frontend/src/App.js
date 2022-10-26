import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Main from './pages/Main';

import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import MyPage from './pages/MyPage';
import LikedPage from './pages/LikedPage';

import Recommend from './pages/Recommend';
import {UserContext} from './component';


function App() {
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <UserContext.Provider value={{user, setUser}}>
                <Routes>
                    <Route path="/" element={ <MainPage /> }/>
                    <Route path="/login" element={ <Login /> }/>
                    <Route path="/recommend" element={ <Recommend /> }/>

                    <Route path="/mainpage" element={ <MainPage /> }/>
                    <Route path="/search" element={ <SearchPage /> }/>
                    <Route path="/detail" element={ <DetailPage /> }/>
                    <Route path="/user" element={ <MyPage /> }/>
                    <Route path="/like" element={ <LikedPage /> }/>
                    
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;