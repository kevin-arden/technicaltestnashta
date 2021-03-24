import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Header from "../../components/header";
import Form from "../../components/form";
import { API } from "../../config/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./addevent.css";

const Addevent = () => {
  const [todoList, setTodoList] = useState([]);
  const [showTodo, setShowTodo] = useState(false);
  const showingTodo = () => setShowTodo(true);
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const closingTodo = () => setShowTodo(false);

  const [addEventFormData, setAddEventFormData] = useState({
    title: "",
    location: "",
    participant: "",
    date: null,
    note: "",
    image: null,
  });

  const [{ alt, src }, setImg] = useState({
    src: null,
    alt: " ",
  });

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { title, location, participant, date, note, image } = addEventFormData;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("title", title);
      body.append("location", location);
      body.append("participant", participant);
      body.append("date", startDate);
      body.append("note", note);
      body.append("image", image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      setLoading(true);
      await API.post("/events", body, config);
      setLoading(false);

      setAddEventFormData({
        title: "",
        location: "",
        participant: "",
        date: null,
        note: "",
        image: null,
      });

      setImg({
        src: null,
        alt: "Upload an image",
      });

      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    const updateForm = { ...addEventFormData };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setAddEventFormData(updateForm);
  };

  return (
    <div>
      <Header />
      <div className="container ">
        <form onSubmit={(e) => onSubmit(e)} style={{ width: "100%" }}>
          <div className="row event-content">
            <div className="col-md-6">
              <p className="event-header">Add Event</p>
              <div className="form-group">
                <input
                  name="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <input
                  name="location"
                  value={location}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Location"
                />
              </div>
              <div className="form-group">
                <input
                  name="participant"
                  value={participant}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Participant"
                />
              </div>
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>

              <div className="form-group">
                <input
                  name="note"
                  value={note}
                  onChange={(e) => onChange(e)}
                  style={{
                    borderStyle: "solid",
                    borderColor: "#bcbcbc",
                    borderWidth: "2px",
                    backgroundColor: "rgba(188, 188, 188, 0.25)",
                  }}
                  type="textarea"
                  class="form-control"
                  placeholder="Note"
                />
              </div>
              <div className="form-group">
                <input
                  name="image"
                  type="file"
                  onChange={(e) => onChange(e)}
                  onInput={handleImg}
                  id="actual-btn2"
                  className="form-control"
                  placeholder="image"
                  hidden
                />
                <label
                  for="actual-btn2"
                  className="form-control"
                  style={{
                    borderStyle: "solid",
                    borderColor: "#bcbcbc",
                    borderWidth: "2px",
                    backgroundColor: "rgba(188, 188, 188, 0.25)",
                    padding: "5px",
                    width: "230px",
                  }}
                >
                  Insert Image
                </label>
              </div>

              <div className="form-group">
                <button className="btn btn-primary" type="submit">
                  Send
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label for="actual-btn3">
                  <img
                    src={src}
                    alt={alt}
                    className="form-img__img-preview"
                    style={{
                      display: "block",
                      width: "350px",
                      height: "400px",
                      objectFit: "contain",
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>Input data berhasil</Modal.Body>
      </Modal>
    </div>
  );
};

export default Addevent;
