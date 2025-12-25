import { useState } from "react";
import { useNavigate } from "react-router";
import "../dashboard/dashboard.css";
import { useEffect } from "react";
import { APP_BACKEND_URL } from "../../constants/app-url";
import axios from "axios";
const GuestDashboard = () => {
  const mapEventToCard = (event) => {
    const dateObj = new Date(event.startDate);

    return {
      id: String(event.eventId),
      title: event.title,
      artist: event.title.split(" World Tour")[0] || event.title,
      location: event.location,
      date: dateObj.toISOString().split("T")[0],
      month: dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      day: String(dateObj.getDate()),
      image: event.imageUrl ?? `https://picsum.photos/400/250?${event.eventId}`,
      description: event.description,
      price: String(event.price),
    };
  };
  const Navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [artist, setArtist] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const getEvents = async () => {
    const events = await axios.get(`${APP_BACKEND_URL}/Event`);
    return events.data.map(mapEventToCard);
  };

  useEffect(() => {
    localStorage.removeItem("event");
    getEvents().then((events) => {
      setEvents(events);
      setFilteredEvents(events);
    });
  }, []);

  const handleBookNow = () => {
    Navigate("/signup");
  };

  const handleSearch = () => {
    const results = events.filter((event) => {
      let matchArtist = true;

      if (artist !== "") {
        if (event.artist) {
          matchArtist = event.artist
            .toLowerCase()
            .includes(artist.toLowerCase());
        } else {
          matchArtist = false;
        }
      }

      let matchLocation = true;

      if (location !== "") {
        if (event.location) {
          matchLocation = event.location
            .toLowerCase()
            .includes(location.toLowerCase());
        } else {
          matchLocation = false;
        }
      }

      let matchDate = true;

      if (date !== "") {
        if (event.date) {
          matchDate = event.date === date;
        } else {
          matchDate = false;
        }
      }

      return matchArtist && matchLocation && matchDate;
    });

    setFilteredEvents(results);
  };

  return (
    <div className="dashboard-container">
      <header>
        <div className="user-box">
          <div className="user-info">
            <span className="user-name">
              <a href="/signup">Signup</a>
            </span>
          </div>
        </div>
      </header>

      <div className="search-container compact">
        <h2 className="dashboard-title">Search Event</h2>

        <div className="search-box">
          <div className="search-header">
            <p className="header-item">Artist</p>
            <p className="header-item">Place</p>
            <p className="header-item">Time</p>
          </div>

          <div className="search-fields">
            <input
              type="text"
              placeholder="e.g. Amr Diab"
              className="search-input"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />

            <input
              type="text"
              placeholder="e.g. New Cairo"
              className="search-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              type="date"
              className="search-input date-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button className="search-button" onClick={handleSearch}>
              🔍 Search
            </button>
          </div>
        </div>
      </div>

      <h2 className="events-title">Upcoming Events</h2>

      <div className="events-grid">
        {filteredEvents.length === 0 ? (
          <p className="no-results">No events found</p>
        ) : (
          filteredEvents.map((event) => (
            <div className="event-card">
              <div className="event-image">
                <img
                  src={event.image || "https://via.placeholder.com/400x250"}
                  alt={event.title}
                />
                <button
                  className="book-button"
                  onClick={() => {
                    handleBookNow();
                  }}
                >
                  Sign Up now !!!{" "}
                </button>
              </div>

              <div className="event-content">
                <div className="event-date">
                  <span className="event-month">{event.month}</span>
                  <span className="event-day">{event.day}</span>
                </div>

                <div className="event-details">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">
                    {event.description ||
                      "Directly seated and inside for you to enjoy the show."}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GuestDashboard;
