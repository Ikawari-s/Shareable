import React from "react";
import Footer from "../components/Footer";
import { Row, Col } from "react-bootstrap";
import emailjs from "emailjs-com";
import Header from '../components/Header'

export default function ContactScreen() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_xkupax9",
        "template_hjw799c",
        e.target,
        "1PF5cx2fUFEjivNRX"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <div>
      <Header />
      <Row className="justify-content-center mt-3">
        <Col xl={6} className="card p-5">
          <form onSubmit={sendEmail}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" required>
                Email Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="@gmail.com"
                name="email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                name="subject"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type your message"
                name="message"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </Col>
      </Row>
      <h1>testiting testing</h1>
      <Footer />
    </div>
  );
}
