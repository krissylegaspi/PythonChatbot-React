import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './pages/Landing';
import About from './pages/About';
import Menu from './pages/shop/Menu';
import Chatbot from './chatbot/Chatbot';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/menu" component={Menu} />
                    <Chatbot />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;