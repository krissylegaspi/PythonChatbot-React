import React from 'react';
import './ItemList.css';

const ItemList = () => (
    <div>
        <div id="menu-items" style={{ border: '1px solid gray' }} class="row">

            <div id="text" class="col s6">
            
            <h4>Drinks</h4>
            <p>
                Americano / Coffee / Cappuccino / Cocoa / Espresso / Hot Chocolate / Macchiato / Tea / Chai Tea / Matcha
            </p>

            <h4>Milk Type</h4>
            <p>
                Almond / Coconut / Cream / Non-fat Milk / Regular Milk / Soy / Oat
            </p>

            <h4>Size</h4>
            <p>
                Small / Medium / Large
            </p>
            
            </div>

            <div id="text" class="col s6">
            <h4>Snacks</h4>
            <p>
                Bagel / Ceasar Salad / Carrot Cake / Croissant / Danish / Deep Dish Cake / Doughnut / Greek Salad / Mediterranean Salad / Muffin / Plum Cake / Strudel
            </p>

            <h4>Flavors</h4>
            <p>
                Almond / Blueberry / Caramel / Cheese / Cream Cheese / Hazelnut / Peppermint / Raspberry / Strawberry / Sugar-free Vanilla / Vanilla
            </p>

            <h4>Topping</h4>
            <p>
                Caramel / Chocolate / Cinnamon / Whipped Cream
            </p>
            
            </div>
        </div>
    </div>
)

export default ItemList;