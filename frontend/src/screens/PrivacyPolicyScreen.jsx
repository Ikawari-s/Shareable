import React from "react";
import Footer from "../components/Footer";

const PrivacyPolicyScreen = () => {
  return (
    <>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ textAlign: "center", margin: "3rem" }}>
          Privacy Policy
        </h1>
        <p>
          Thank you for choosing to register with our website. This Privacy
          Policy outlines how we collect, use, and protect your personal
          information. By registering an account on our website, you agree to
          the terms described herein.
        </p>
        <ol style={{ paddingLeft: "20px" }}>
          <li>
            <h3>Information We Collect</h3>
            <p>
              When you register an account on our website, we collect certain
              personal information, including but not limited to:
            </p>
            <ul>
              <li>Your name</li>
              <li>Email address</li>
              <li>
                PayPal email address (for users who wish to earn or spend money
                on our platform)
              </li>
            </ul>
          </li>
          <li>
            <h3>Use of Information</h3>
            <p>We use the information collected for the following purposes:</p>
            <ul>
              <li>To create and manage your account</li>
              <li>
                To facilitate transactions between users who wish to earn or
                spend money on our platform
              </li>
              <li>
                To communicate with you regarding your account, transactions,
                and updates about our services
              </li>
            </ul>
          </li>
          <li>
            <h3>PayPal Integration</h3>
            <p>
              Users who wish to earn money (referred to as "Sharers") on our
              platform must provide their PayPal email address during
              registration. Similarly, users who want to purchase content from
              Sharers must also use the email associated with their PayPal
              account.
            </p>
          </li>
          <li>
            <h3>Refund Policy</h3>
            <p>
              Please note that all transactions made on our platform are final.
              We do not offer refunds for purchases made. Users are encouraged
              to review the content and terms carefully before making a
              purchase.
            </p>
          </li>

          <li>
            <h3>Third-Party Links</h3>
            <p>
              Our website may contain links to third-party websites or services.
              Please note that we are not responsible for the privacy practices
              or content of these third-party sites. We encourage you to review
              the privacy policies of these websites before providing any
              personal information.
            </p>
          </li>
          <li>
            <h3>Updates to Privacy Policy</h3>
            <p>
              We reserve the right to update or modify this Privacy Policy at
              any time without prior notice. Any changes will be effective
              immediately upon posting on our website. It is your responsibility
              to review this Privacy Policy periodically for updates.
            </p>
          </li>
          <li>
            <h3>Contact Us</h3>
            <p>
              If you have any questions or concerns regarding this Privacy
              Policy or the handling of your personal information, please
              contact us at [insert contact information].
            </p>
          </li>
        </ol>
        <p>
          By registering an account on our website, you acknowledge that you
          have read, understood, and agree to the terms of this Privacy Policy.
          Thank you for choosing to be a part of our community.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyScreen;
