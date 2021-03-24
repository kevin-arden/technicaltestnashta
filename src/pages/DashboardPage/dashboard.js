import React, { useState, useEffect } from "react";
import { API } from "../../config/api";
import Header from "../../components/header";
import Pagination from "../../components/pagination";
import Search from "../../components/search";
import "./dashboard.css";
import { Modal } from "react-bootstrap";

const Dashboard = () => {
  const [eventsdata, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [eventPerPage, setEventPerPage] = useState(5);
  

  const getEvents = async () => {
    try {
      setLoading(true);
      const allEvents = await API.get("/events");
      setLoading(false);
      console.log(allEvents);

      let arrayEvents = allEvents.data.data.event;
      arrayEvents.sort((a, b) => b.id - a.id);

      setEventsData(arrayEvents);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const indexOfLastEvent = currentPage * eventPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventPerPage;
  const currentEvent = eventsdata.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      <div className="dashboard-body">
        <div className="dashboard-search">
          <input
            type="text"
            className="form-control"
            style={{ width: "200px" }}
            placeholder="search"
            onChange={(event) => {
              {
                setSearch(event.target.value);
                setCurrentPage(1);
              }
            }}
          />
        </div>

        <div className="dashboard-table">
          <table className="table">
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Location</th>
              <th>Date</th>
              <th>Participant</th>
              <th>Note</th>
            </tr>
            {search == ""
              ? currentEvent.map((eventdata, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <th>{eventdata.title}</th>
                    <th>{eventdata.location}</th>
                    <th>{eventdata.date.slice(0, 10)}</th>
                    <th>{eventdata.participant}</th>
                    <th>{eventdata.note}</th>
                  </tr>
                ))
              : eventsdata
                  .filter((val) => {
                    if (
                      val.title.toLowerCase().includes(search.toLowerCase()) ||
                      val.location
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      val.date.toLowerCase().includes(search.toLowerCase()) ||
                      val.participant
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      val.note.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((eventdata, index) => (
                    <tr>
                      <th>{index + 1}</th>
                      <th>{eventdata.title}</th>
                      <th>{eventdata.location}</th>
                      <th>{eventdata.date}</th>
                      <th>{eventdata.participant}</th>
                      <th>{eventdata.note}</th>
                    </tr>
                  ))}
          </table>
        </div>
        <div>
          <Pagination
            eventPerPage={eventPerPage}
            totalEvents={eventsdata.length}
            paginate={paginate}
          />
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
