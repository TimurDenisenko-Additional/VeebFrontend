import { useState, useEffect } from 'react';
import './styles/Cart.css';

function Cart() {
    const [localTooted, setLocalTooted] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

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
            .then(link =>  { 
                window.open(link);
                setIsProcessing(true);
                const intervalId = setInterval(() => {
                    fetch(link)
                        .then(res => res.json())
                        .then(status => {
                            if (status["state"] === "completed") {
                                alert("Payment complete!");
                                clearInterval(intervalId);
                                fetch(`http://localhost:5139/order/clearCart`, {"method": "DELETE"})
                                .then(res => res.json())
                                .then(json => {
                                    setLocalTooted(json);
                                    setTotalSum(0);
                                 });
                                 setIsProcessing(false);
                            }
                            else if (status["state"] === "failed") {
                                alert("Payment failed!");
                                clearInterval(intervalId);
                                setIsProcessing(false);
                            }
                        })
                        .catch(err => {
                            return;
                        });
                }, 3000)   
            })
            .catch(err => alert(err.message));
    };

    function deleteFromCart(id){
        fetch(`http://localhost:5139/order/deleteFromCart/${id}`, {"method": "DELETE"})
        .then(res => res.json())
        .then(json => {
            setLocalTooted(json)
            fetch("http://localhost:5139/order/userCartSum")
                .then(res => res.json())
                .then(sum => setTotalSum(sum))
        });
    }

    return (
        <div className='cart-page'>
            <div className='cart-container'>
                <h1 className='cart-title'>Ostukorv</h1>
                {localTooted.map((localToode, index) => (
                    <div key={index} className="localproduct-item" onClick={() => deleteFromCart(localToode.id)}>
                        <p className="localproduct-name">{localToode.name}</p>
                        <p className="localproduct-price">Price: {localToode.price} €</p>
                    </div>
                ))}
            </div>
            <div className='payment-container'>
                <h2>Total: {totalSum} €</h2>
                {isProcessing ? (
                <div className="loader"></div> 
            ) : (
                <button onClick={handlePayment} className="payment-button">
                    Proceed to Payment
                </button>
            )}
            </div>
        </div>
    );
}

export default Cart;
