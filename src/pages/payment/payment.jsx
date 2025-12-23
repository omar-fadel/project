

import { useEffect, useState } from "react";
import "../payment/payment.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Payment = () => {
  const [price, setPrice] = useState(null);
  const [artist, setArtist] = useState(null);
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState(null);
  const [id,setId]=useState(null);
  
  const Navigate = useNavigate();
  useEffect(() => {
    const event = JSON.parse(localStorage.getItem("event"));
    console.log(event);
    setPrice(event.price);
    setArtist(event.artist);
    setLocation(event.location);
    setTitle(event.title);
    setId(event.eventID)
  }, []);


  const handleCheckOut=()=>{
// axios.post(`http//localhost/api/admin/${id}/tickets)`).then((res)=>{console.log(res.body)})

      Navigate("/account")
  }
  const handleBackButton = () => {
    Navigate("/dashboard");
  };
  return (
    <div className="payment-container">
      <div className="payment-box">
        <p className="payment-text">Event: {title}</p>

        <p className="payment-text">Artist: {artist}</p>
        <br />
        <p className="payment-text">Location: {location}</p>
        <br />
        <p className="price">{price} EGP</p>
        <button className="payment-button" onClick={handleCheckOut}>Checkout!</button>
        <br />
        <button className="payment-button" onClick={handleBackButton}>
          Back
        </button>
      </div>
    </div>
  );
};
export default Payment;
