import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { API } from "../../config/api";
import Card from "../../components/card";
import "./home.css";

const Home = () => {
  const [eventsdataHome, setEventsDataHome] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEvents = async () => {
    try {
      setLoading(true);
      const allEvents = await API.get("/events");
      setLoading(false);

      let arrayEvents = allEvents.data.data.event;
      arrayEvents.sort((a, b) =>
        b.id - a.id
      );

      setEventsDataHome(arrayEvents);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div className="card-content">
          {eventsdataHome.map((eventdatahome, index) => (
            <Card eventdatahome={eventdatahome} key={eventdatahome.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
