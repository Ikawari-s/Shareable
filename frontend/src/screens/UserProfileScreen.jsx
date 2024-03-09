// import React from "react";
// import { Row, Col, Card } from "react-bootstrap";
// import "../designs/UserProfileScreen.css";
// import Header from "../components/Header";
// import Leaderboard from "../components/Leaderboard";

// function UserProfileScreen() {
//   const localStorageValue = localStorage.getItem("userInfo");
//   const userInfo = localStorageValue ? JSON.parse(localStorageValue) : null;

//   return (
//     <>
//       {/* <Header /> */}
//       <div class="card mb-3" id="username-image">
//         <img
//           src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
//           class="card-img-top"
//           alt="..."
//           id="profile-image"
//         />

//         <div class="card-body">
//           {userInfo ? (
//             <h5 class="card-title">Email: {userInfo.user_info.email}</h5>
//           ) : (
//             <h5>No email found in local storage</h5>
//           )}
//         </div>
//       </div>

//       <Row>
//         <Col xl={2}>
//           <div class="card">
//             <h2 class="card-header">Followers</h2>
//             <div class="card-body">
//               <h5 class="card-title">Follower Name</h5>
//               <h5 class="card-title">Follower Name</h5>
//               <h5 class="card-title">Follower Name</h5>
//             </div>
//           </div>
//           <div class="card mt-2">
//             <h2 class="card-header">Artworks?</h2>
//             <div class="card-body">
//               <h5 class="card-title">Image here</h5>
//               <h5 class="card-title">Image here</h5>
//               <h5 class="card-title">Image here</h5>
//             </div>
//           </div>
//         </Col>
//         <Col>
//           <div class="card h-10 h5-1 mb-1">
//             <h1>Welcome</h1>
//           </div>
//           <div class="row row-cols-1 row-cols-md-3 g-4 ">
//             <div class="col">
//               <div class="card h-100">
//                 <div class="card-body">
//                   <h5 class="card-title text-center">₱100</h5>
//                   <ul>
//                     <li>text</li>
//                     <li>text</li>
//                     <li>text</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div class="col">
//               <div class="card h-100">
//                 <div class="card-body">
//                   <h5 class="card-title text-center">₱200</h5>
//                   <ul>
//                     <li>text</li>
//                     <li>text</li>
//                     <li>text</li>
//                     <li>text</li>
//                     <li>text</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div class="col">
//               <div class="card h-100">
//                 <div class="card-body">
//                   <h5 class="card-title text-center">₱300</h5>
//                   <ul>
//                     <li>text</li>
//                     <li>text</li>
//                     <li>text</li>
//                     <li>text</li>
//                     <li>text</li>
//                     <li>text</li>
//                     <li>text</li>
//                     <li>text</li>
//                     <li>text</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div class="card mt-2 h5-2">
//             <h1 class="cart-title text-center">
//               Donate to you favorite creator
//             </h1>
//             <button type="button" class="btn btn-outline-light">
//               Donate
//             </button>
//           </div>
//         </Col>
//         <Col xl={4}>
//           <div class="card">
//             <h5 class="card-header">Reviews</h5>
//             <div class="card-body">
//               <h5 class="card-title">User Name</h5>
//               <h5 class="card-text">text here</h5>
//               <h5 class="card-title">User Name</h5>
//               <h5 class="card-text">text here</h5>
//               <h5 class="card-title">User Name</h5>
//               <h5 class="card-text">text here</h5>
//             </div>
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <div class="card mt-2">
//             <Leaderboard />
//           </div>
//         </Col>
//       </Row>
//     </>
//   );
// }

// export default UserProfileScreen;

// COMMENT KO MUNA UNG DESIGN 

import React, { useState } from 'react';
import "../designs/UserProfileScreen.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button} from "react-bootstrap";

const localStorageValue = localStorage.getItem("userInfo");
const userInfo = localStorageValue ? JSON.parse(localStorageValue) : null;

const Countries = [
  { id: 1, name: 'Afghanistan' },
  { id: 2, name: 'Albania' },
  { id: 3, name: 'Algeria' },
  { id: 4, name: 'Andorra' },
  { id: 5, name: 'Angola' },
  { id: 6, name: 'Antigua and Barbuda' },
  { id: 7, name: 'Argentina' },
  { id: 8, name: 'Armenia' },
  { id: 9, name: 'Australia' },
  { id: 10, name: 'Austria' },
  { id: 11, name: 'Azerbaijan' },
  { id: 12, name: 'Bahamas' },
  { id: 13, name: 'Bahrain' },
  { id: 14, name: 'Bangladesh' },
  { id: 15, name: 'Barbados' },
  { id: 16, name: 'Belarus' },
  { id: 17, name: 'Belgium' },
  { id: 18, name: 'Belize' },
  { id: 19, name: 'Benin' },
  { id: 20, name: 'Bhutan' },
  { id: 21, name: 'Bolivia' },
  { id: 22, name: 'Bosnia and Herzegovina' },
  { id: 23, name: 'Botswana' },
  { id: 24, name: 'Brazil' },
  { id: 25, name: 'Brunei' },
  { id: 26, name: 'Bulgaria' },
  { id: 27, name: 'Burkina Faso' },
  { id: 28, name: 'Burundi' },
  { id: 29, name: 'Cabo Verde' },
  { id: 30, name: 'Cambodia' },
  { id: 31, name: 'Cameroon' },
  { id: 32, name: 'Canada' },
  { id: 33, name: 'Central African Republic' },
  { id: 34, name: 'Chad' },
  { id: 35, name: 'Chile' },
  { id: 36, name: 'China' },
  { id: 37, name: 'Colombia' },
  { id: 38, name: 'Comoros' },
  { id: 39, name: 'Congo' },
  { id: 40, name: 'Costa Rica' },
  { id: 41, name: 'Croatia' },
  { id: 42, name: 'Cuba' },
  { id: 43, name: 'Cyprus' },
  { id: 44, name: 'Czech Republic' },
  { id: 45, name: 'Denmark' },
  { id: 46, name: 'Djibouti' },
  { id: 47, name: 'Dominica' },
  { id: 48, name: 'Dominican Republic' },
  { id: 49, name: 'East Timor (Timor-Leste)' },
  { id: 50, name: 'Ecuador' },
  { id: 51, name: 'Egypt' },
  { id: 52, name: 'El Salvador' },
  { id: 53, name: 'Equatorial Guinea' },
  { id: 54, name: 'Eritrea' },
  { id: 55, name: 'Estonia' },
  { id: 56, name: 'Eswatini' },
  { id: 57, name: 'Ethiopia' },
  { id: 58, name: 'Fiji' },
  { id: 59, name: 'Finland' },
  { id: 60, name: 'France' },
  { id: 61, name: 'Gabon' },
  { id: 62, name: 'Gambia' },
  { id: 63, name: 'Georgia' },
  { id: 64, name: 'Germany' },
  { id: 65, name: 'Ghana' },
  { id: 66, name: 'Greece' },
  { id: 67, name: 'Grenada' },
  { id: 68, name: 'Guatemala' },
  { id: 69, name: 'Guinea' },
  { id: 70, name: 'Guinea-Bissau' },
  { id: 71, name: 'Guyana' },
  { id: 72, name: 'Haiti' },
  { id: 73, name: 'Honduras' },
  { id: 74, name: 'Hungary' },
  { id: 75, name: 'Iceland' },
  { id: 76, name: 'India' },
  { id: 77, name: 'Indonesia' },
  { id: 78, name: 'Iran' },
  { id: 79, name: 'Iraq' },
  { id: 80, name: 'Ireland' },
  { id: 81, name: 'Israel' },
  { id: 82, name: 'Italy' },
  { id: 83, name: 'Ivory Coast' },
  { id: 84, name: 'Jamaica' },
  { id: 85, name: 'Japan' },
  { id: 86, name: 'Jordan' },
  { id: 87, name: 'Kazakhstan' },
  { id: 88, name: 'Kenya' },
  { id: 89, name: 'Kiribati' },
  { id: 90, name: 'Korea, North' },
  { id: 91, name: 'Korea, South' },
  { id: 92, name: 'Kosovo' },
  { id: 93, name: 'Kuwait' },
  { id: 94, name: 'Kyrgyzstan' },
  { id: 95, name: 'Laos' },
  { id: 96, name: 'Latvia' },
  { id: 97, name: 'Lebanon' },
  { id: 98, name: 'Lesotho' },
  { id: 99, name: 'Liberia' },
  { id: 100, name: 'Libya' },
  { id: 101, name: 'Liechtenstein' },
  { id: 102, name: 'Lithuania' },
  { id: 103, name: 'Luxembourg' },
  { id: 104, name: 'Madagascar' },
  { id: 105, name: 'Malawi' },
  { id: 106, name: 'Malaysia' },
  { id: 107, name: 'Maldives' },
  { id: 108, name: 'Mali' },
  { id: 109, name: 'Malta' },
  { id: 110, name: 'Marshall Islands' },
  { id: 111, name: 'Mauritania' },
  { id: 112, name: 'Mauritius' },
  { id: 113, name: 'Mexico' },
  { id: 114, name: 'Micronesia' },
  { id: 115, name: 'Moldova' },
  { id: 116, name: 'Monaco' },
  { id: 117, name: 'Mongolia' },
  { id: 118, name: 'Montenegro' },
  { id: 119, name: 'Morocco' },
  { id: 120, name: 'Mozambique' },
  { id: 121, name: 'Myanmar' },
  { id: 122, name: 'Namibia' },
  { id: 123, name: 'Nauru' },
  { id: 124, name: 'Nepal' },
  { id: 125, name: 'Netherlands' },
  { id: 126, name: 'New Zealand' },
  { id: 127, name: 'Nicaragua' },
  { id: 128, name: 'Niger' },
  { id: 129, name: 'Nigeria' },
  { id: 130, name: 'North Macedonia' },
  { id: 131, name: 'Norway' },
  { id: 132, name: 'Oman' },
  { id: 133, name: 'Pakistan' },
  { id: 134, name: 'Palau' },
  { id: 135, name: 'Palestine' },
  { id: 136, name: 'Panama' },
  { id: 137, name: 'Papua New Guinea' },
  { id: 138, name: 'Paraguay' },
  { id: 139, name: 'Peru' },
  { id: 140, name: 'Philippines' },
  { id: 141, name: 'Poland' },
  { id: 142, name: 'Portugal' },
  { id: 143, name: 'Qatar' },
  { id: 144, name: 'Romania' },
  { id: 145, name: 'Russia' },
  { id: 146, name: 'Rwanda' },
  { id: 147, name: 'Saint Kitts and Nevis' },
  { id: 148, name: 'Saint Lucia' },
  { id: 149, name: 'Saint Vincent and the Grenadines' },
  { id: 150, name: 'Samoa' },
  { id: 151, name: 'San Marino' },
  { id: 152, name: 'Sao Tome and Principe' },
  { id: 153, name: 'Saudi Arabia' },
  { id: 154, name: 'Senegal' },
  { id: 155, name: 'Serbia' },
  { id: 156, name: 'Seychelles' },
  { id: 157, name: 'Sierra Leone' },
  { id: 158, name: 'Singapore' },
  { id: 159, name: 'Slovakia' },
  { id: 160, name: 'Slovenia' },
  { id: 161, name: 'Solomon Islands' },
  { id: 162, name: 'Somalia' },
  { id: 163, name: 'South Africa' },
  { id: 164, name: 'South Sudan' },
  { id: 165, name: 'Spain' },
  { id: 166, name: 'Sri Lanka' },
  { id: 167, name: 'Sudan' },
  { id: 168, name: 'Suriname' },
  { id: 169, name: 'Sweden' },
  { id: 170, name: 'Switzerland' },
  { id: 171, name: 'Syria' },
  { id: 172, name: 'Taiwan' },
  { id: 173, name: 'Tajikistan' },
  { id: 174, name: 'Tanzania' },
  { id: 175, name: 'Thailand' },
  { id: 176, name: 'Togo' },
  { id: 177, name: 'Tonga' },
  { id: 178, name: 'Trinidad and Tobago' },
  { id: 179, name: 'Tunisia' },
  { id: 180, name: 'Turkey' },
  { id: 181, name: 'Turkmenistan' },
  { id: 182, name: 'Tuvalu' },
  { id: 183, name: 'Uganda' },
  { id: 184, name: 'Ukraine' },
  { id: 185, name: 'United Arab Emirates' },
  { id: 186, name: 'United Kingdom' },
  { id: 187, name: 'United States' },
  { id: 188, name: 'Uruguay' },
  { id: 189, name: 'Uzbekistan' },
  { id: 190, name: 'Vanuatu' },
  { id: 191, name: 'Vatican City' },
  { id: 192, name: 'Venezuela' },
  { id: 193, name: 'Vietnam' },
  { id: 194, name: 'Yemen' },
  { id: 195, name: 'Zambia' },
  { id: 196, name: 'Zimbabwe' },
];


const Settings = () => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    
      <form class="settings-form">
        <div class="title">
          <h1 class="text-white"><b>User</b></h1>
          <div className="section-container">
          <div class="d-flex justify-content-around"><Nav.Link id="itaas" as={Link} to="/userprofile">Profile Information</Nav.Link><Nav.Link id="itaas" as={Link} to="/userprofileaccount">Account</Nav.Link></div>
            <div class="card h-10 h5-1 mb-1"className="card custom-card-background text-white" style={{ backgroundColor: "black", width: "50rem", margin: "auto" }}>
              <h1 class="profInfo">Profile Information</h1>
                <div style={{ width: "47rem", margin: "20px" }}>
                <label>Profile</label>
                <div><img src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
              class="card-img-top" alt="..."
              id="profile-image"/><Button className="change-btn" style={{ margin: "30px" }} variant="primary">Upload photo</Button></div>
                <label>Display name</label>
                <div><input type="text" id="displayName" value={userInfo.user_info.username} disabled /></div>
                <label>Email</label>
                <div><input type="email" id="email" value={userInfo.user_info.email} disabled /></div>
                <label>Country of Residence</label>
                <div><select id="country" value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Please select a country...</option>
                {Countries.map ((country) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))}
                </select></div>
              <Button className="save-btn" style={{ width: "6rem", margin: "30px" }} variant="primary">Save</Button>
            </div>
            </div>
          </div>
          <br />
          <div class="card h-10 h5-1 mb-1"className="card custom-card-background text-white" style={{ backgroundColor: "black", width: "50rem", margin: "auto" }}>
          <div className="membership-container">
            <h4>Memberships ✓</h4>
            <ol>
              <li>Followed sharer 1: TIER 2</li>
              <li>Followed sharer 2: TIER 3</li>
              <li>Followed sharer 3: TIER 1</li>
            </ol>
          </div>
          </div>
        </div>
      </form>
  );
};

export default Settings;
