// Homepage.js

import Header from '../components/Header';

import React, { useState, useEffect } from 'react';
import jsonData from './sampledata.json';
import '../style.css';

function Homepage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setData(jsonData);
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

  return (
    <>
    <Header />
      <h3 className='text-center my-3'>Search for Sharers you love!</h3>
      <div className="searchBox">
            <input
              id="searchInput"
              className="searchInput"
              type="text"
              placeholder="Search here..."
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <div className="templateContainer">
              {filteredData.map((item) => (
                <div className="template" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.bio}</p>
                </div>
              ))}
            </div>
          </div>
    </>
  );
}

export default Homepage;
