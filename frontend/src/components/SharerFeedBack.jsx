import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSharerFeedback } from "../actions/sharerActions";
import { Card, ListGroup } from "react-bootstrap";
import red from "../designs/images/red.png";
import blue from "../designs/images/blue.png";
import green from "../designs/images/green.png";
import gold from "../designs/images/gold.png";
import silver from "../designs/images/silver.png";
import bronze from "../designs/images/bronze.png";

function SharerFeedBack() {
  const dispatch = useDispatch();
  const { feedback, error } =
    useSelector((state) => state.sharerfeedback) || {};

  useEffect(() => {
    dispatch(getSharerFeedback());
  }, [dispatch]);

  return (
    <div>
      <h1 className="mb-4">Sharer Feedback</h1>
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {error && <p>Error: {error}</p>}
        {!error && feedback && feedback.length > 0 ? (
          <Card bg="primary">
            <ListGroup variant="flush">
              {feedback.map((feedbackItem, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex align-items-center">
                    <img
                      src={feedbackItem.profile_picture}
                      alt="User Profile"
                      className="rounded-circle mr-3"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div>
                      <h5 className="mb-0">{feedbackItem.username}</h5>
                      <p className="mb-0">Rating: {feedbackItem.rating}</p>
                    </div>
                  </div>
                  <p>Comment: {feedbackItem.comment}</p>

                  <p>
                    Tier List:
                    {feedbackItem.user_tier === "tier3" && (
                      <img src={blue} style={{ maxWidth: "4rem" }} />
                    )}
                    {feedbackItem.user_tier === "tier2" && (
                      <img src={red} style={{ maxWidth: "4rem" }} />
                    )}
                    {feedbackItem.user_tier === "tier1" && (
                      <img src={green} style={{ maxWidth: "4rem" }} />
                    )}
                  </p>

                  <p>
                    Badge:{" "}
                    {feedbackItem.badge === "Gold" && (
                      <img src={gold} style={{ maxWidth: "2rem" }} />
                    )}
                    {feedbackItem.badge === "Silver" && (
                      <img src={silver} style={{ maxWidth: "2rem" }} />
                    )}
                    {feedbackItem.badge === "Bronze" && (
                      <img src={bronze} style={{ maxWidth: "2rem" }} />
                    )}
                    {feedbackItem.badge === "None" && "none"}
                  </p>

                  {feedbackItem.edited ? (
                    <p>Edited: {feedbackItem.last_edit_date}</p>
                  ) : (
                    <p>{feedbackItem.time_posted}</p>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        ) : (
          !error && <ListGroup.Item>No feedbacks yet.</ListGroup.Item>
        )}
      </div>
    </div>
  );
}

export default SharerFeedBack;
