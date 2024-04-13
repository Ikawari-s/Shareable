import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listAdminUsers, searchUser } from "../actions/adminActions";
import { BsCheck, BsX } from "react-icons/bs";
import AdminCreateUser from "../components/AdminCreateUser";
import AdminUpdateUser from "../components/AdminUpdateUser";
import AdminDeleteUser from "../components/AdminDeleteUser";
import { Card, Button } from "react-bootstrap";
function AdminUserDashboard() {
  const dispatch = useDispatch();
  const { loading, usersData, error } = useSelector((state) => state.userAdmin);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && !userInfo.user_info.is_admin) {
      navigate("/homepage");
    } else {
      dispatch(listAdminUsers());
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(searchUser(searchQuery));
  }, [dispatch, searchQuery]);

  const handleUpdateUser = (userId) => {
    console.log("Update user with ID:", userId);
  };

  const handleDeleteUser = (userId) => {
    // Function to delete user
    console.log("Delete user with ID:", userId);
  };

  const filteredUsers = usersData.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt">
      <h1 className="mb-4">Admin User Dashboard</h1>
      <input
        type="text"
        placeholder="Search by username or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control mb-4"
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="row">
          {filteredUsers.map((user, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>User ID: {user.id}</Card.Title>
                  <Card.Text>Email: {user.email}</Card.Text>
                  <Card.Text>Username: {user.username}</Card.Text>
                  <Card.Text>
                    Is Active: {user.is_active ? <BsCheck /> : <BsX />}
                  </Card.Text>
                  <Card.Text>
                    Is Staff: {user.is_staff ? <BsCheck /> : <BsX />}
                  </Card.Text>
                  <Card.Text>
                    Is Sharer: {user.is_sharer ? <BsCheck /> : <BsX />}
                  </Card.Text>
                  <Card.Text>
                    Is Superuser: {user.is_superuser ? <BsCheck /> : <BsX />}
                  </Card.Text>
                  <Card.Text>Badge: {user.badge}</Card.Text>
                  <div className="mb-2">
                    <AdminUpdateUser
                      userId={user.id}
                      isActive={user.is_active}
                      isStaff={user.is_staff}
                      isSharer={user.is_sharer}
                      isSuperuser={user.is_superuser}
                      onUpdateUser={handleUpdateUser}
                    />
                  </div>
                  <div>
                    <AdminDeleteUser userId={user.id} />
                  </div>
                </Card.Body>
                <Card.Img
                  variant="bottom"
                  src={user.profile_picture_url}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </Card>
            </div>
          ))}
        </div>
      )}
      <div style={{ position: "fixed", top: "20px", right: "20px" }}>
        <AdminCreateUser />
      </div>
    </div>
  );
}

export default AdminUserDashboard;
