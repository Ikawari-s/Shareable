import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listAdminUsers, searchUser } from "../actions/adminActions"; 
import { BsCheck, BsX } from "react-icons/bs";
import AdminCreateUser from "../components/AdminCreateUser";
import AdminUpdateUser from "../components/AdminUpdateUser";
import AdminDeleteUser from "../components/AdminDeleteUser";

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
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{ overflowY: "scroll", maxHeight: "100vh", maxWidth: "300vw" }}
      >
        <h1>Admin User Dashboard</h1>
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
          <div>
            {filteredUsers.map((user, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  padding: "10px",
                }}
              >
                <div>
                  <h3>User ID: {user.id}</h3>
                  <p>Email: {user.email}</p>
                  <p>Username: {user.username}</p>
                  <p>Is Active: {user.is_active ? <BsCheck /> : <BsX />}</p>
                  <p>Is Staff: {user.is_staff ? <BsCheck /> : <BsX />}</p>
                  <p>Is Sharer: {user.is_sharer ? <BsCheck /> : <BsX />}</p>
                  <p>Is Superuser: {user.is_superuser ? <BsCheck /> : <BsX />}</p>
                  <p>Badge: {user.badge}</p>
                  <div style={{ marginBottom: "10px" }}>
                    <AdminUpdateUser
                      userId={user.id}
                      isActive={user.is_active}
                      isStaff={user.is_staff}
                      isSharer={user.is_sharer}
                      isSuperuser={user.is_superuser}
                      onUpdateUser={handleUpdateUser}
                    />
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <AdminDeleteUser userId={user.id} />
                  </div>
                </div>
                <div>
                  <img
                    src={user.profile_picture_url}
                    alt="Profile"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ position: "absolute", top: "20px", right: "20px" }}>
        <AdminCreateUser />
      </div>
    </div>
  );
}

export default AdminUserDashboard;
