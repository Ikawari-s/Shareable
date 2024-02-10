import Header from "../components/Header";
import "../style.css";

import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';


function Homepage() {
  const [sharers, setSharers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/sharers/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setSharers(resp))
      .catch((error) => console.log(error));
  }, []);

  const filteredSharers = sharers.filter(
    (sharer) =>
      sharer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sharer.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              placeholder="Search Sharer name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          {filteredSharers.map((sharer) => (
            <div className="col-md-4 mb-3 d-flex" key={sharer.id}>
              <Card style={{ width: "18rem" }}>
                {sharer.image && (
                  <Card.Img
                    variant="top"
                    src={sharer.image}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                <Card.Body className="p-3 d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{sharer.name}</Card.Title>
                    <Card.Text>{sharer.description}</Card.Text>
                    <Card.Text>
                      <small className="text-muted">{sharer.category}</small>
                    </Card.Text>
                  </div>

                  <Link to={`/sharers/${sharer.id}`}>
                    <Button variant="primary">See More</Button>
                  </Link>

                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
