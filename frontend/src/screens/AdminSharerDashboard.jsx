import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSharerIncomeAdmin, searchSharer } from '../actions/adminActions';
import AdminPatchSharer from '../components/AdminPatchSharer';
import AdminSendIncome from '../components/AdminSendIncome';
import { Card, Button } from 'react-bootstrap';

function AdminSharerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, sharerData, error } = useSelector(state => state.sharerIncomeAdmin);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && !userInfo.user_info.is_admin) {
      navigate('/homepage');
    } else {
      dispatch(getSharerIncomeAdmin());
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(searchSharer(searchQuery));
  }, [dispatch, searchQuery]);

  const filteredSharerData = sharerData ? sharerData.filter(sharer => 
    sharer[0].name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sharer[0].email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sharer[0].id.toString().includes(searchQuery) 
  ) : [];



  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ flexShrink: 0, textAlign: 'center', padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Admin Sharer Dashboard</h1>
        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
          />
        </div>
      </header>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', width: '100%', padding: '20px', margin: '0 auto' }}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div>
              {filteredSharerData.length > 0 ? (
                filteredSharerData.map((sharer, index) => (
                  <Card key={index} id={`sharer-${sharer[0].id}`} style={{ marginBottom: '20px' }}>
                    <Card.Body>
                      <Card.Title>ID: {sharer[0].id}</Card.Title>
                      <Card.Text>Email: {sharer[0].email}</Card.Text>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Card.Img src={sharer[0].image} alt={sharer[0].username} style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }} />
                        <div>
                          <Card.Title>{sharer[0].name}</Card.Title>
                          <Card.Text>{sharer[0].description}</Card.Text>
                        </div>
                      </div>
                      <div>
                        <Card.Text>Total Earnings: ${sharer[1].total_earnings}</Card.Text>
                        <Card.Text>Twenty Percent Less Earning Send: ${sharer[1].twenty_percent_less_earning_send}</Card.Text>
                        <Card.Text>Twenty Percent Cut: ${sharer[1].twenty_percent_cut}</Card.Text>
                      </div>
                      <AdminPatchSharer sharerId={sharer[0].id} />
                      {sharer[1].total_earnings > 0 && <AdminSendIncome sharerId={sharer[0].id} />}
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No matching data found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSharerDashboard;
