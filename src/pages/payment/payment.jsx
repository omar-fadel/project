import { useEffect, useState } from "react";
import "../payment/payment.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { APP_BACKEND_URL } from "../../constants/app-url";
import { getToken } from "../../utils/get-token";

const Payment = () => {
  const [artist, setArtist] = useState(null);
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState(null);
  const [id, setId] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);

  const Navigate = useNavigate();

  const getTicketTypes = async (eventId) => {
    if (!eventId) return;
    const ticketTypes = await axios.get(
      `${APP_BACKEND_URL}/Event/${eventId}/tickets`
    );
    return ticketTypes.data;
  };

  useEffect(() => {
    const event = JSON.parse(localStorage.getItem("event"));
    console.log(event);
    setArtist(event.artist);
    setLocation(event.location);
    setTitle(event.title);
    setId(event.eventID);
    getTicketTypes(event.eventID).then((t) => setTicketTypes(t));
  }, []);

  const handleCheckOut = async (ticketTypeId) => {
    await axios
      .post(
        `${APP_BACKEND_URL}/Bookings`,
        {
          eventId: id,
          ticketTypeId: ticketTypeId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((res) => {
        console.log(res.body);
      });

    Navigate("/account");
  };
  const handleBackButton = () => {
    Navigate("/dashboard");
  };
  return (
    <div className="payment-container">
      {ticketTypes?.map((t) => (
        <>
          <div className="payment-box">
            <p className="payment-text">Event: {title}</p>

            <p className="payment-text">Artist: {artist}</p>
            <br />
            <p className="payment-text">Location: {location}</p>
            <br />
            <p className="payment-text">Ticket Type: {t.name}</p>
            <p className="price">{t.price} EGP</p>
            <p className="price">{t.quantityAvailable} Tickets</p>
            <button
              className="payment-button"
              onClick={() => handleCheckOut(t.ticketTypeId)}
            >
              Checkout!
            </button>
            <br />
            <button className="payment-button" onClick={handleBackButton}>
              Back
            </button>
          </div>
        </>
      ))}
    </div>
  );
};
export default Payment;
