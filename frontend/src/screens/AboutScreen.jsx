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
            The primary objective of Shareable is to connect patrons or users
            with exclusive content from their favorite creators through
            subscriptions or tiers, be it monthly, annually, or per creation. We
            aim to cater to diverse preferences, creating a platform that
            resonates with users' needs and drives engagement.
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
            The number one reason that people pay for content is because they
            can’t get the information they need elsewhere for free. Successful
            membership websites tend to be run by people deeply immersed in
            their subject, whose access to certain sources, background knowledge
            and informed opinion creates sustainable advantage and value.
          </p>
          <p>
            People pay for content because it enhances their trust in its
            quality. That explains why news corporations aligned with values
            such as objectivity and reliability are the ones with the highest
            number of subscribers. Also, media that offer complete information
            regarding a topic generate a higher sense of trust amongst
            consumers.
          </p>
          <p>
            This means that your target audience must comprehend how your
            service or product will help them and be able to visualize the
            possible outcome before they spend a coin. Unlike free content,
            where you only list ideas and tips, paid content is a complete and
            detailed guide that can be followed to get actual results (Kaiwen,
            2021).
          </p>
          <p>
            Selling exclusive content on YouTube can be a win-win for both
            creators and their subscribers. It allows creators to monetize their
            content further while offering a unique experience to their most
            dedicated fans. As YouTube continues to evolve, this approach to
            content monetization is likely to play a significant role in the
            platform’s future. It’s a great way for creators to build deeper
            relationships with their biggest fans, establish a recurring revenue
            stream, and have more control over their business.
          </p>
          <p>
            This website was created so people can access exclusive content from
            different creators and for the creators to gain monetary
            compensation. As well as providing equal opportunity for both users
            and creators. As a result, Shareable will be a way for different
            people to explore different creators with various content.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShareableIntro;
