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
    <div className="col sm-6"
        style={{ backgroundColor: "transparent", width: "35rem", margin: "auto", border: 'solid rgba(255,255,255,0.5) 1px', borderRadius: '.5rem', padding: '2rem', marginLeft: '.5rem', height: "30rem", overflowY: "auto" }}
        >
      <h1 className="mb-4">Sharer Feedback</h1>
      <div style={{ maxHeight: "19.9rem", overflowY: "auto", boxShadow: "0 2px 5px #00000080", borderRadius: '.4rem' }}>
        {error && <p>Error: {error}</p>}
        {!error && feedback && feedback.length > 0 ? (
            <ListGroup style={{background: 'none', boxShadow: "none"}}>
              {feedback.map((feedbackItem, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex align-items-center">
                    <img
                      src={feedbackItem.profile_picture}
                      alt="User Profile"
                      className="rounded-circle mr-3"
                      style={{ width: "2.5rem", height: "2.5rem", marginRight: '1rem' }}
                    />
                    <div>
                      <div className="d-flex align-items-center" style={{height: '1.3rem'}}>
                      <h5 className="mb-0">{feedbackItem.username}</h5>
                      <p>
                    {" "}
                    {feedbackItem.badge === "Gold" && (
                      <img src={gold} style={{ width: "3rem", marginTop:'1rem' }} />
                    )}
                    {feedbackItem.badge === "Silver" && (
                      <img src={silver} style={{ width: "3rem", marginTop:'1rem' }} />
                    )}
                    {feedbackItem.badge === "Bronze" && (
                      <img src={bronze} style={{ width: "3rem", marginTop:'1rem' }} />
                    )}
                    {feedbackItem.badge === "" && ""}
                  </p>
                      <p>
                    {feedbackItem.user_tier === "tier3" && (
                      <img src={blue} style={{ width: "3rem", marginTop:'1rem'}} />
                    )}
                    {feedbackItem.user_tier === "tier2" && (
                      <img src={red} style={{ width: "3rem", marginTop:'1rem' }} />
                    )}
                    {feedbackItem.user_tier === "tier1" && (
                      <img src={green} style={{ width: "3rem", marginTop:'1rem' }} />
                    )}
                  </p>
                    </div>  
                      <p className="mb-0" id="grates">{feedbackItem.rating}</p>
                      
                    </div>
                  </div>
                  {feedbackItem.edited ? (
                    <em>Edited: {feedbackItem.last_edit_date}</em>
                  ) : (
                    <em>{feedbackItem.time_posted}</em>
                  )}
                  <p style={{marginTop:'1rem'}}>Comment: {feedbackItem.comment}</p>

                  {/* <p>
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
                  </p> */}

                  {/* <p>
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
                  </p> */}

                  {/* {feedbackItem.edited ? (
                    <p>Edited: {feedbackItem.last_edit_date}</p>
                  ) : (
                    <p>{feedbackItem.time_posted}</p>
                  )} */}
                </ListGroup.Item>
              ))}
            </ListGroup>
        ) : (
          !error && <ListGroup.Item>No feedbacks yet.</ListGroup.Item>
        )}
      </div>
    </div>
  );
}

export default SharerFeedBack;
