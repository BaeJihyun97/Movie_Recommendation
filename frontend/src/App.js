import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Main from './pages/Main';
import {UserContext} from './component';


function App() {
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <UserContext.Provider value={{user, setUser}}>
                <Routes>
                    <Route path="/" element={ <Main /> }/>
                    <Route path="/login" element={ <Login /> }/>
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;