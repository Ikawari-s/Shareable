// Screen.js
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { listSharers } from '../actions/sharerActions'; // Import your Redux action
import Header from '../components/Header';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Homepage({ sharerList, listSharers }) {
  const [searchTerm, setSearchTerm] = useState('');

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-2">
            <input
              type="text"
              placeholder="Search Sharer name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{ marginTop: '10px' }}
            />
          </div>
        </div>
        <div className="row">
          {filteredSharers.map((sharer) => (
            <div className="col-md-4 mb-3" key={sharer.id}>
              <Card style={{ width: '18rem' }}>
                {sharer.image && (
                  <Card.Img
                    variant="top"
                    src={sharer.image}
                    style={{ width: '100%', height: 'auto' }}
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
                  <Button variant="primary">See More</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sharerList: state.sharerList, // Mapping Redux state to component props
});

export default connect(mapStateToProps, { listSharers })(Homepage); // Connecting component to Redux store
