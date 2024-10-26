import { useState, useEffect } from 'react';
import './styles/Store.css';

function Store(){
    const [tooted, setTooted] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5139/toode/getActiveTooded")
          .then(res => res.json())
          .then(json => setTooted(json));
      }, []);

      return (
        <div className="store-container">
        <h1 className='store-title'>Welcome to our store!</h1>
            {tooted.map((toode, index) => (
                <div key={index} className="product-item">
                    <p className="product-name">{toode.name}</p>
                    <p className="product-price">Price: {toode.price} €</p>
                    <button className="buy-button">Buy Now</button>
                </div>
            ))}
        </div>
    );
}
  
export default Store;