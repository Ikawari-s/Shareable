import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { listSharers } from "../actions/sharerActions"; // Import your Redux action
import Header from "../components/Header";
// import { followSharer } from "../actions/followActions";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FollowedSharersList from "../components/FollowedSharersList";
import {Row, Col} from 'react-bootstrap';




function Homepage({ sharerList, listSharers,}) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    listSharers(); // Dispatch the action when the component mounts
  }, [listSharers]);

  const { loading, error, sharers } = sharerList;

  const filteredSharers = Array.isArray(sharers)
    ? sharers.filter(
        (sharer) =>
          sharer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sharer.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // NI reverse nya yung ids nila para mag newest to oldest and hindi matambakan ung new users
  const sortedSharers = filteredSharers.slice().reverse();
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  // const handleFollow = (sharerId) => {
  //   followSharer(sharerId);
  // };
  
  return (
    <div>

      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-2">
            <input
              type="text"
              placeholder="Search Sharer name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{ marginTop: "10px" }}
            />
          </div>
        </div>
        <div className="row">
          {sortedSharers.map((sharer) => (
            <div className="col-md-4 mb-3" key={sharer.id}>
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
                  {/* <Button onClick={() => handleFollow(sharer.id)}>
                Follow Sharer
              </Button> */}
                  <a href={`sharers/${sharer.id}`}>
                    {" "}
                    <Button variant="primary">See More</Button>{" "}
                    
                  </a>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Col xl={2}>
      <FollowedSharersList />
      </Col>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sharerList: state.sharerList, followState: state.follow, // Mapping Redux state to component props
});



export default connect(mapStateToProps, { listSharers, })(Homepage);
