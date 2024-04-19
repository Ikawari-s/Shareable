import React from "react";
import Footer from "../components/Footer";
import GuestHeader from "../components/GuestHeader";

const ShareableIntro = () => {
  return (
    <>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "2rem",
          lineHeight: "1.6",

          borderRadius: "8px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
            textAlign: "center",
            marginTop: "5rem",
          }}
        >
          Welcome to Shareable
        </h1>
        <div style={{ maxWidth: "50rem", margin: "auto" }}>
          <p>
            Welcome to Shareable, your gateway to exclusive content from your
            favorite creators across various mediums. In today's digital age,
            where the internet shapes our daily lives, Shareable emerges as a
            vibrant platform bridging the gap between creators and their
            dedicated audience.
          </p>
          <p>
            In today’s world where the internet is a huge part of our daily
            life, people are creating interesting and different contents for
            different people. Shareable is a subscription website where people
            can access exclusive contents from different content creators such
            as musicians, artists, writers, and more. The website would like to
            provide an equal opportunity for both creator and users, benefiting
            users to access exclusive contents from their favorite creators, and
            creators to gain monetary compensation.
          </p>

          <p>
            Our platform is built on the principles of fairness and equality. We
            strive to create an environment where both creators and users
            benefit mutually. Creators gain monetary compensation for their hard
            work and dedication, while users gain access to exclusive content
            that enriches their lives and fosters meaningful connections.
          </p>
          <p>
            Discover a world of exclusive content and support your favorite
            creators by joining Shareable today. Whether you're a creator
            looking to showcase your talents or a user seeking premium content,
            Shareable is your destination for exploration, engagement, and
            empowerment. Join us and become part of a community where creativity
            thrives, connections are forged, and possibilities are endless.
            Together, let's make sharing and experiencing exclusive content a
            seamless and enriching journey.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShareableIntro;
