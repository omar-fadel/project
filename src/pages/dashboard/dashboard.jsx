import { useEffect, useState } from "react";
// import axios from "axios";
import "../dashboard/dashboard.css";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const mockEvents = [
    {
      title: "Wonder Girls World Tour",
      artist: "Wonder Girls",
      location: "San Francisco",
      date: "2025-04-14",
      month: "APR",
      day: "14",
      image: "https://picsum.photos/400/250?1",
      description: "Directly seated and inside for you to enjoy the show.",
      price: "1800",
    },
    {
      title: "JYJ Worldwide Concert",
      artist: "JYJ",
      location: "Barcelona",
      date: "2025-08-20",
      month: "AUG",
      day: "20",
      image: "https://picsum.photos/400/250?2",
      description: "Directly seated and inside for you to enjoy the show.",
      price: "1400",
      id:"23"
    },
    {
      title: "Super Junior Live",
      artist: "Super Junior",
      location: "New York",
      date: "2025-09-18",
      month: "SEP",
      day: "18",
      image: "https://picsum.photos/400/250?3",
      description: "Directly seated and inside for you to enjoy the show.",
      price: "1800",
      id:"23"
    },
    {
      title: "Wonder Girls World Tour",
      artist: "Wonder Girls",
      location: "San Francisco",
      date: "2025-04-14",
      month: "APR",
      day: "14",
      image: "https://picsum.photos/400/250?1",
      description: "Directly seated and inside for you to enjoy the show.",
      price: "1800",
      id:"23"
    },
  ];
  const Navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [artist, setArtist] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");


  useEffect(() => {
    localStorage.removeItem("event");
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  const handleBookNow = (event) => {
    localStorage.setItem(
      "event",
      JSON.stringify({
        title: event.title,
        artist: event.artist,
        location: event.location,
        price: event.price,
        eventID:event.id
      })
    );
    Navigate("/payment");
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
    <span className="user-name"><a href="/account">Account</a></span>
  
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
            <div className="event-card" >
              <div className="event-image" >
                <img
                  src={event.image || "https://via.placeholder.com/400x250"}
                  alt={event.title}
                />
                <button
                  className="book-button"
                  onClick={() => {
                    handleBookNow(event);
                  }}
                >
                  Book Now !!!{" "}
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

export default Dashboard;
