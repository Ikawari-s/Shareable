import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { listSharers } from "../actions/sharerActions"; // Import your Redux action
import Header from "../components/Header";
// import { followSharer } from "../actions/followActions";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FollowedSharersList from "../components/FollowedSharersList";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Homepage({ sharerList, listSharers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [lastClickedSort, setLastClickedSort] = useState(null);

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

  let sortedSharers = filteredSharers.slice(); // Copy filtered sharers

  if (sortBy === "category") {
    sortedSharers = sortedSharers.sort((a, b) =>
      a.category.localeCompare(b.category)
    );
  } else if (sortBy === "followers") {
    sortedSharers = sortedSharers.sort(
      (a, b) => b.total_followers - a.total_followers
    );
  } else if (sortBy === "rating") {
    sortedSharers = sortedSharers.sort(
      (a, b) => b.average_rating - a.average_rating
    );
  } else if (sortBy === "sharer_id") {
    sortedSharers = sortedSharers.sort((a, b) => b.id - a.id); // Sort by sharer ID (highest to lowest)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to group sharers by category
  const groupByCategory = (sharers) => {
    const grouped = {};
    sharers.forEach((sharer) => {
      if (!grouped[sharer.category]) {
        grouped[sharer.category] = [];
      }
      grouped[sharer.category].push(sharer);
    });
    return grouped;
  };

  // Grouping sorted sharers by category if sorting by category
  const groupedSharers =
    sortBy === "category" ? groupByCategory(sortedSharers) : null;

  const buttonStyle = (sortType) => ({
    marginRight: "2px",
    backgroundColor: lastClickedSort === sortType ? "lightblue" : "inherit",
  });

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
          <div className="col-md-12 mb-2">
            <Button
              variant="outline-primary"
              style={buttonStyle("default")}
              onClick={() => {
                setSortBy("default");
                setLastClickedSort("default");
              }}
            >
              Default
            </Button>
            <Button
              variant="outline-primary"
              style={buttonStyle("category")}
              onClick={() => {
                setSortBy("category");
                setLastClickedSort("category");
              }}
            >
              Sort by Category
            </Button>
            <Button
              variant="outline-primary"
              style={buttonStyle("followers")}
              onClick={() => {
                setSortBy("followers");
                setLastClickedSort("followers");
              }}
            >
              Sort by Followers (High to Low)
            </Button>
            <Button
              variant="outline-primary"
              style={buttonStyle("rating")}
              onClick={() => {
                setSortBy("rating");
                setLastClickedSort("rating");
              }}
            >
              Sort by Average Rating (High to Low)
            </Button>
            <Button
              variant="outline-primary"
              style={buttonStyle("sharer_id")}
              onClick={() => {
                setSortBy("sharer_id");
                setLastClickedSort("sharer_id");
              }}
            >
              Sort by sharer created (Recent to Old)
            </Button>
          </div>
        </div>
        <div className="row">
          {groupedSharers &&
            Object.keys(groupedSharers).map((category) => (
              <React.Fragment key={category}>
                <h3>{category}</h3>
                {groupedSharers[category].map((sharer) => (
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
                            <small className="text-muted">
                              {sharer.category}
                            </small>
                          </Card.Text>
                          <Card.Text>
                            followers : {sharer.total_followers}
                          </Card.Text>
                          <Card.Text>
                            average rating : {sharer.average_rating}
                          </Card.Text>
                        </div>
                        <Link to={`/homepage/sharers/${sharer.id}`}>
                          <Button variant="primary">See More</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </React.Fragment>
            ))}
          {!groupedSharers &&
            sortedSharers.map((sharer) => (
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
                      <Card.Text>
                        followers : {sharer.total_followers}
                      </Card.Text>
                      <Card.Text>
                        average rating : {sharer.average_rating}
                      </Card.Text>
                    </div>
                    <Link to={`/homepage/sharers/${sharer.id}`}>
                      <Button variant="primary">See More</Button>
                    </Link>
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
  sharerList: state.sharerList,
  followState: state.follow, // Mapping Redux state to component props
});

export default connect(mapStateToProps, { listSharers })(Homepage);
