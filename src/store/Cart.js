import { useState, useEffect } from 'react';
import './styles/Cart.css';

function Cart() {
    const [localTooted, setLocalTooted] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [paymentLink, setPaymentLink] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5139/order/userCart")
            .then(res => res.json())
            .then(json => setLocalTooted(json));

        fetch("http://localhost:5139/order/userCartSum")
            .then(res => res.json())
            .then(sum => setTotalSum(sum));
    }, []);

    const handlePayment = () => {
        fetch(`http://localhost:5139/order/MakePayment`)
            .then(res => {
                if (!res.ok) throw new Error("Payment initiation failed");
                return res.json();
            })
            .then(link => setPaymentLink(link))
            .catch(err => alert(err.message));
    };

    return (
        <div className='cart-page'>
            <div className='cart-container'>
                <h1 className='cart-title'>Ostukorv</h1>
                {localTooted.map((localToode, index) => (
                    <div key={index} className="localproduct-item">
                        <p className="localproduct-name">{localToode.name}</p>
                        <p className="localproduct-price">Price: {localToode.price} €</p>
                    </div>
                ))}
            </div>
            <div className='payment-container'>
                <h2>Total: {totalSum} €</h2>
                <button onClick={handlePayment} className="payment-button">Proceed to Payment</button>
                {paymentLink && (
                    <div className="payment-link">
                        <a href={paymentLink} target="_blank" rel="noopener noreferrer">Pay Now</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
