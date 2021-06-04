import React from 'react';
import './Landing.css';
import ItemList from './shop/ItemList';

const Landing = () => (
    <div class="landing-page" style={{ textAlign: 'center' }}>
        <h3>Menu</h3>
        <ItemList />
    </div>
)

export default Landing;