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
import '../designs/HomePage.css';

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
  } else if (sortBy === "followers_low") {
    sortedSharers = sortedSharers.sort(
      (a, b) => a.total_followers - b.total_followers
    );
  } else if (sortBy === "rating") {
    sortedSharers = sortedSharers.sort(
      (a, b) => b.average_rating - a.average_rating
    );
  } else if (sortBy === "rating_low") {
    sortedSharers = sortedSharers.sort(
      (a, b) => a.average_rating - b.average_rating
    );
  } else if (sortBy === "sharer_id") {
    sortedSharers = sortedSharers.sort((a, b) => b.id - a.id); // Sort by sharer ID (highest to lowest)
  } else if (sortBy === "default") {
    // Shuffle the array to implement random sorting
    sortedSharers = sortedSharers.sort(() => Math.random() - 0.5);
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
    <div className="waw">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-2">
            <input
              type="text"
              placeholder="Search Sharer name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              id="searc"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-2 d-flex justify-content-between">
            <Button
              variant="outline-primary"
              id="buttones"
              style={buttonStyle("default")}
              onClick={() => {
                if (lastClickedSort === "default") {
                  setSortBy("default");
                  setLastClickedSort(null);
                } else {
                  setSortBy("default");
                  setLastClickedSort("default");
                }
              }}
            >
              Default
            </Button>
            <Button
              variant="outline-primary"
              id="buttones"
              style={buttonStyle("category")}
              onClick={() => {
                if (lastClickedSort === "category") {
                  setSortBy("default");
                  setLastClickedSort(null);
                } else {
                  setSortBy("category");
                  setLastClickedSort("category");
                }
              }}
            >
              Sort by Category
            </Button>
            <Button
              variant="outline-primary"
              id="buttones"
              style={buttonStyle("followers")}
              onClick={() => {
                if (lastClickedSort === "followers") {
                  setSortBy("default");
                  setLastClickedSort(null);
                } else {
                  setSortBy("followers");
                  setLastClickedSort("followers");
                }
              }}
            >
              Sort by Followers (High to Low)
            </Button>
            <Button
              variant="outline-primary"
              id="buttones"
              style={buttonStyle("followers_low")}
              onClick={() => {
                if (lastClickedSort === "followers_low") {
                  setSortBy("default");
                  setLastClickedSort(null);
                } else {
                  setSortBy("followers_low");
                  setLastClickedSort("followers_low");
                }
              }}
            >
              Sort by Followers (Low to High)
            </Button>
            <Button
              variant="outline-primary"
              id="buttones"
              style={buttonStyle("rating")}
              onClick={() => {
                if (lastClickedSort === "rating") {
                  setSortBy("default");
                  setLastClickedSort(null);
                } else {
                  setSortBy("rating");
                  setLastClickedSort("rating");
                }
              }}
            >
              Sort by Total Rating (High to Low)
            </Button>
            <Button
              variant="outline-primary"
              id="buttones"
              style={buttonStyle("rating_low")}
              onClick={() => {
                if (lastClickedSort === "rating_low") {
                  setSortBy("default");
                  setLastClickedSort(null);
                } else {
                  setSortBy("rating_low");
                  setLastClickedSort("rating_low");
                }
              }}
            >
              Sort by Total Rating (Low to High)
            </Button>
            <Button
                variant="outline-primary"
                id="buttones" 
                style={buttonStyle("sharer_id")}
                onClick={() => {
                  if (lastClickedSort === "sharer_id") {
                    setSortBy("default");
                    setLastClickedSort(null);
                  } else {
                    setSortBy("sharer_id");
                    setLastClickedSort("sharer_id");
                  }
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
              <div className="col-md-3 mb-3" key={sharer.id}>
                <a href={`/homepage/sharers/${sharer.id}`} style={{ textDecoration: 'none', color: 'inherit', overflow: 'scroll', whiteSpace: 'nowrap' }}>
                  <Card id="kard">
                    <div id="rates">
                      {sharer.average_rating !== null
                        ? sharer.average_rating > 0
                          ? `${sharer.average_rating}/5`
                          : " N/A"
                        : "N/A"}
                    </div>
                    {sharer.image && (
                      <Card.Img
                        variant="top"
                        src={sharer.image}
                        id="da-pics"
                      />
                    )}
                    <Card.Body className="p-3 d-flex flex-column justify-content-between">
                      <div id="da-text">
                        <Card.Title style={{ textTransform: 'uppercase' }}>{sharer.name}</Card.Title>
                        <Card.Text>{sharer.description}</Card.Text>
                        <Card.Text style={{ lineHeight: '0.4rem' }}>
                          <small className="text-muted">{sharer.category}</small>
                        </Card.Text>
                        <Card.Text style={{ lineHeight: '0.4rem' }}>
                          <small className="text-muted">Followers : {sharer.total_followers}</small>
                        </Card.Text>
                        {/* <Card.Text>
                          Total rating:
                          {sharer.average_rating !== null
                            ? sharer.average_rating > 0
                              ? `${sharer.average_rating}/5`
                              : " N/A"
                            : "N/A"}
                        </Card.Text> */}
                      </div>
                      {/* <Link to={`/homepage/sharers/${sharer.id}`}>
                        <Button variant="primary">See More</Button>
                      </Link> */}
                    </Card.Body>
                  </Card>
                </a>
              </div>
            ))}
        </div>
        <Col xl={12} id="fol">
          <FollowedSharersList />
        </Col>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sharerList: state.sharerList,
  followState: state.follow, // Mapping Redux state to component props
});

export default connect(mapStateToProps, { listSharers })(Homepage);
