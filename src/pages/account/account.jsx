import { useEffect } from "react";

import { useState } from "react";
import "../account/account.css";
import axios from "axios";
import { APP_BACKEND_URL } from "../../constants/app-url";
import { getToken } from "../../utils/get-token";

const Account = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [events, setEvents] = useState([]);

  const getMyTickets = async () => {
    const tickets = await axios.get(`${APP_BACKEND_URL}/Bookings/my`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return tickets.data;
  };

  useEffect(() => {
    getMyTickets().then((tickets) => setEvents(tickets));

    const user = JSON.parse(localStorage.getItem("user"));
    setUserName(user.username);
    setEmail(user.email);
    setId(user.id);
  }, []);

  return (
    <div className="account-container">
      <header className="account-header">
        <div className="header-container">
          <div className="logo"> Booker !</div>
          <nav>
            <ul>
              <li>
                <a href="/login">Signout</a>
              </li>
              <li>
                <a href="/dashboard">Events</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="information">
        <h1 className="personal-information-title">Personal information</h1>
        <span className="personal-information">username: {username}</span>
        <span className="personal-information">email: {email}</span>
        <span className="personal-information">id= {id}</span>
      </div>

      <div className="tickets-section ">
        <h2>My Tickets</h2>

        <div className="tickets">
          {events.length == 0 ? (
            <p className="Not-found">
              you dont have any tickets yet{" "}
              <a href="/dashboard">get yours now</a>
            </p>
          ) : (
            events.map((event) => (
              <div className="event-ticket">
                <p>Event Title:{event.eventTitle}</p>
                <p>Quantity: {event.quantity}</p>
                <p>Ticket Type: {event.ticketType}</p>
                <p>Status: {event.status}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
