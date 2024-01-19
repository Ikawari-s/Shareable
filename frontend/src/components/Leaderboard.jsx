import React from "react";
import users from "./users";
import "react-bootstrap";

function Leaderboard() {
  const sortedUsers = [...users].sort((a, b) => b.donation - a.donation);

  return (
    <div>
      <table class="table">
        <thead>
          <h1>Leaderboard</h1>
          <tr>
            <th class="text-light" scope="col">
              #
            </th>
            <th class="text-light" scope="col">
              Name
            </th>
            <th class="text-light" scope="col">
              Donation
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index}>
              <th scope="row" class="bg-transparent text-light">
                {" "}
                {index + 1}
              </th>
              <td class="bg-transparent text-light">
                {user.name}{" "}
                {index === 0 ? (
                  <strong>(gold medal icon here)</strong>
                ) : index === 1 ? (
                  <strong>(silver medal here)</strong>
                ) : index === 2 ? (
                  <strong>(bronze medal here)</strong>
                ) : (
                  ""
                )}
              </td>
              <td class="bg-transparent text-light">{user.donation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
