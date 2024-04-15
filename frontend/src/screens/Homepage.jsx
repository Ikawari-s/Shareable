import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { listSharers } from "../actions/sharerActions";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FollowedSharersList from "../components/FollowedSharersList";
import { Link } from "react-router-dom";
import "../designs/HomePage.css";
import {Row, Col} from 'react-bootstrap'
function Homepage({ sharerList, listSharers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSortBy, setCurrentSortBy] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { loading, error, sharers } = sharerList;

  useEffect(() => {
    listSharers(currentSortBy, 'desc', searchTerm, selectedCategory);
  }, [currentSortBy, listSharers, searchTerm, selectedCategory]);

  const handleSort = (sortField, sortOrder) => {
    const sortParam = `${sortField}_${sortOrder}`;
    setCurrentSortBy(sortParam === currentSortBy ? "all" : sortParam);
  };

  const handleSpecialSort = (specialSort) => {
    setCurrentSortBy(specialSort === currentSortBy ? "all" : specialSort);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value === "Not specified" ? "Not specified" : value);
  };

const filteredSharers = Array.isArray(sharers)
  ? sharers.filter((sharer) => {
      const matchNameOrCategory =
        sharer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sharer.category &&
          sharer.category.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchDescription =
        sharer.description &&
        sharer.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === "all" || 
        selectedCategory === "Not specified" || // Ensure to include all when "Not specified"
        (sharer.category &&
          sharer.category.toLowerCase() === selectedCategory.toLowerCase());

      return (
        (matchNameOrCategory || matchDescription) && // Match by name, category, or description
        matchCategory
      );
    })
  : [];


  return (
    <div className="brap" style={{width:'90vw'}}>
      {/* <h1>HOMEPAGE NEW</h1> */}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />

      {/* Sorting Buttons */}
      <div className="mb-3 d-flex" style={{justifyContent: 'space-between'}}>
        <Button
          id="buttones"
          variant={currentSortBy === "all" ? "primary" : "outline-primary"}
          onClick={() => handleSpecialSort("all")}
        >
          All
        </Button>
        <Button
          id="buttones"
          variant={
            currentSortBy === "total_followers_asc"
              ? "primary"
              : "outline-primary"
          }
          onClick={() => handleSort("total_followers", "asc")}
        >
          Followers (Low to High)
        </Button>
        <Button
          id="buttones"
          variant={
            currentSortBy === "total_followers_desc"
              ? "primary"
              : "outline-primary"
          }
          onClick={() => handleSort("total_followers", "desc")}
        >
          Followers (High to Low)
        </Button>
        <Button
          id="buttones"
          variant={
            currentSortBy === "average_rating_asc"
              ? "primary"
              : "outline-primary"
          }
          onClick={() => handleSort("average_rating", "asc")}
        >
          Rating (Low to High)
        </Button>
        <Button
          id="buttones"
          variant={
            currentSortBy === "average_rating_desc"
              ? "primary"
              : "outline-primary"
          }
          onClick={() => handleSort("average_rating", "desc")}
        >
          Rating (High to Low)
        </Button>
        <Button
          id="buttones"
          variant={currentSortBy === "latest" ? "primary" : "outline-primary"}
          onClick={() => handleSpecialSort("latest")}
        >
          Latest Sharer
        </Button>
      </div>

      {/* Category Dropdown */}
      <div className="mb-3">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="form-control"
          style={{color:'#777777'}}
        >
          <option value="all">All Categories</option>
          <option value="Art">Art</option>
          <option value="Comics">Comics</option>
          <option value="Writing">Writing</option>
          <option value="Music">Music</option>
          <option value="Podcasts">Podcasts</option>
          <option value="Video & Film">Video & Film</option>
          <option value="Photography">Photography</option>
          <option value="Crafts & DIY">Crafts & DIY</option>
          <option value="Dance & Theater">Dance & Theater</option>
          <option value="Gaming">Gaming</option>
          <option value="Education">Education</option>
          <option value="Science">Science</option>
          <option value="Technology">Technology</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Fashion & Beauty">Fashion & Beauty</option>
          <option value="Food & Cooking">Food & Cooking</option>
          <option value="Travel & Outdoor">Travel & Outdoor</option>
          <option value="Business & Entrepreneurship">
            Business & Entrepreneurship
          </option>
          <option value="Parenting & Family">Parenting & Family</option>
          <option value="Manga">Manga</option> {/* Added Manga */}
           <option value="Sports">Sports</option>
           <option value="Not specified">Not specified</option>
        </select>
      </div>

       {/* Display Sharers */}
      <div className="row">
        {filteredSharers.length === 0 ? (
          <div className="col-md-12 text-center">
            <h1>No results found.</h1>
          </div>
        ) : (
          filteredSharers.map((sharer) => (
            <div className="col-md-3 mb-3" key={sharer.id}>
              <Link
              to={`/homepage/sharers/${sharer.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                overflow: "scroll",
                whiteSpace: "nowrap",
              }}
            >
              <Card id="kard">
                <div id="rates">
                  {sharer.average_rating !== null
                    ? sharer.average_rating > 0
                      ? `${sharer.average_rating}/5`
                      : " N/A"
                    : "N/A"}
                </div>
                {sharer.image && (
                  <Card.Img variant="top" src={sharer.image} id="da-pics" />
                )}
                <Card.Body className="p-3 d-flex flex-column justify-content-between">
                  <div id="da-text">
                    <Card.Title style={{ textTransform: "uppercase" }}>
                      {sharer.name}
                    </Card.Title>
                    <Card.Text>{sharer.description}</Card.Text>
                    <Card.Text style={{ lineHeight: "0.4rem" }}>


                      <small className="text-muted"> {sharer.category ? sharer.category : "No category"}</small>


                    </Card.Text>
                    <Card.Text style={{ lineHeight: "0.4rem" }}>
                      <small className="text-muted">
                        Followers : {sharer.total_followers}
                      </small>
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Link>
            </div>
          ))
        )}
      </div>

      {/* Display followed sharers list */}
      
      <FollowedSharersList />
      

      {/* Show loading state if data is being fetched */}
      {loading && <div>Loading...</div>}

      {/* Show error message if API request fails */}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  sharerList: state.sharerList,
});

const mapDispatchToProps = {
  listSharers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
