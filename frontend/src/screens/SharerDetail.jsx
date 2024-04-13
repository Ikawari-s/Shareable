import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { DetailSharers, getSharerPostCount } from "../actions/sharerActions";
import { followSharer, unfollowSharer, getExpiration } from "../actions/followActions"; // Import the followSharer action creator
import {
  FetchSharerRatingsComponent,
  PostSharerRatingsComponent,
} from "../components/Rating";
import PostCount from "../components/PostCount";
import PreviewContent from "../components/PreviewContent";
import TipBox from "../components/Tipbox";
import TopDonor from "../components/Topdonor";
import TierOneLatest from "../components/TierOneLatest";
import TierTwoLatest from "../components/TierTwoLatest";
import TierThreeLatest from "../components/TierThreeLatest";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const SharerDetail = ({
  sharer,
  loading,
  error,
  DetailSharers,
  followSharer,
  unfollowSharer,
  getSharerPostCount,
}) => {
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [isFollowing, setIsFollowing] = useState(false);
  const [userHasRated, setUserHasRated] = useState(false);
  const [currentTier, setCurrentTier] = useState(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [followTier, setFollowTier] = useState(null);
  const [showPaypalModal, setShowPaypalModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onError = (err) => {
    console.error("PayPal SDK error:", err);
  };

  useEffect(() => {
    if (
      userInfo &&
      userInfo.sharer_id &&
      Number(userInfo.sharer_id) === Number(id)
    ) {
      navigate("/sharer-page");
    }
  }, [userInfo, id, navigate]);

  useEffect(() => {
    let script;
    if (!paypalLoaded) {
      script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=ATyV_k4Cl0uXb3m5rslF-APNEeMSqlO2xp42GOJoMOb7mzeguFi2028uPwa5UOTSbN8U7rjnKpOYFQT8&currency=USD";
      script.async = true;
      script.onload = () => setPaypalLoaded(true);
      document.body.appendChild(script);
    }

    return () => {
      if (script && script.parentNode === document.body && !paypalLoaded) {
        script.parentNode.removeChild(script);
      }
    };
  }, [paypalLoaded]);

  const createOrder = (data, actions) => {
    const amount = selectedAmount;
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
            currency_code: "USD",
          },
        },
      ],
    });
  };

  useEffect(() => {
    const followedSharers = Object.values(userInfo?.followed_sharers || {})
      .flatMap((tier) => tier)
      .map((sharer) => parseInt(sharer));

    setIsFollowing(followedSharers.includes(parseInt(id)));
  }, [id, userInfo]);

  useEffect(() => {
    const expirationDates = userInfo?.expiration_dates || {};
    const currentDateTime = new Date();

    Object.entries(expirationDates).forEach(([sharerId, expirationDate]) => {
      if (new Date(expirationDate) <= currentDateTime) {
        const updatedUserInfo = { ...userInfo };
        for (const tier in updatedUserInfo.followed_sharers) {
          updatedUserInfo.followed_sharers[tier] =
            updatedUserInfo.followed_sharers[tier].filter(
              (sharer) => sharer !== parseInt(sharerId)
            );
        }
        delete updatedUserInfo.expiration_dates[sharerId];
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      }
    });
  }, [userInfo, unfollowSharer]);

  useEffect(() => {
    const checkAndRefresh = () => {
      const expirationDates = userInfo?.expiration_dates || {};
      const currentDateTime = new Date();

      const isExpired = Object.entries(expirationDates).some(
        ([sharerId, expirationDate]) => {
          return new Date(expirationDate) <= currentDateTime;
        }
      );

      if (isExpired) {
        window.location.reload();
      }
    };

    const interval = setInterval(checkAndRefresh, 20 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [userInfo]);

  const handleCreateOrder = (data, actions) => {
    return createOrder(data, actions);
  };

const onApprove = (data, actions) => {
  return actions.order.capture().then(() => {
    followSharer(id, followTier, selectedAmount)
      .then(() => {
        const updatedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        updatedUserInfo.followed_sharers[followTier].push(parseInt(id));
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        dispatch(getExpiration()).then(() => {
          window.location.reload();
        });
      })  
      .catch((error) => {
        console.error("Error following sharer:", error);
      });
  });
};


  useEffect(() => {
    DetailSharers(id);
    getSharerPostCount(id);
    const followedSharers =
      JSON.parse(localStorage.getItem("followedSharers")) || [];
    setIsFollowing(
      Array.isArray(followedSharers) && followedSharers.includes(id)
    );
  }, [id, DetailSharers, getSharerPostCount]);

  useEffect(() => {
    const followedSharers = Object.values(userInfo?.followed_sharers || {})
      .flatMap((tier) => tier)
      .map((sharer) => parseInt(sharer));

    setIsFollowing(followedSharers.includes(parseInt(id)));
  }, [id, userInfo]);

  const updateSelectedTierAndAmount = (tier, amount) => {
    setCurrentTier(tier);
    setFollowTier(tier);
    setSelectedAmount(amount);
  };

  const handleTierButtonClick = (tier, amount) => {
    console.log("Selected Amount:", amount);
    console.log("Tier:", tier);
    console.log("Sharer ID:", id);
    setCurrentTier(tier);
    setFollowTier(tier);
    setSelectedAmount(amount);
    setShowPaypalModal(false); 
    setTimeout(() => setShowPaypalModal(true), 100); 
  };

  const handleUnfollow = () => {
    const followedSharers = userInfo?.followed_sharers;

    if (!followedSharers || Object.keys(followedSharers).length === 0) {
      console.error("Followed sharers data is missing or empty.");
      return;
    }

    let currentTier = null;

    Object.entries(followedSharers).forEach(([tier, ids]) => {
      if (ids.includes(parseInt(id))) {
        currentTier = tier;
      }
    });

    if (!currentTier) {
      console.error("Current Tier is not set.");
      return;
    }

    unfollowSharer(id, currentTier);
    setIsFollowing(false);

    const updatedUserInfo = { ...userInfo };
    updatedUserInfo.followed_sharers[currentTier] =
      updatedUserInfo.followed_sharers[currentTier].filter(
        (sharerId) => sharerId !== parseInt(id)
      );

    delete updatedUserInfo.expiration_dates[id];
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
  };

  const handleConfirmUnfollow = () => {
    setShowConfirmation(false); // Hide the confirmation modal
    handleUnfollow(); // Call the existing unfollow function
  };

  const handleCancelUnfollow = () => {
    setShowConfirmation(false); // Hide the confirmation modal
    // You can add any additional cancel logic here if needed
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : sharer ? (
        <div className="text-center py-3" style={{ textAlign: "center" }}>
          {sharer.cover_photo && (
            <img
              src={sharer.cover_photo}
              alt="Cover-Photo"
              style={{ position: "relative", width: "100%", height: "50vh" }}
            />
          )}
          {sharer.image && (
            <img
              src={sharer.image}
              alt="Profile"
              style={{
                width: "10rem",
                height: "10rem",
                borderRadius: "50%",
                padding: "0.2rem",
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "white",
              }}
            />
          )}
          <h2>{sharer.name}</h2>
          <p>@{sharer.username}</p>
          <p>{sharer.description}</p>
          <p>Category: {sharer.category ? sharer.category : "Not Specified"}</p>
          <PostCount sharerId={id} />
          <div>
            {isFollowing ? (
              <Button onClick={() => setShowConfirmation(true)}>
                Unfollow Sharer
              </Button>
            ) : (
              <>
                <div>
                  <PostCount sharerId={id} tier="tier1" />
                  <Button
                    variant="success"
                    onClick={() => handleTierButtonClick("tier1", 5)}
                    style={{ backgroundColor: "green" }}
                  >
                    Tier 1 - 5$
                  </Button>
                </div>
                <div>
                  <PostCount sharerId={id} tier="tier2" />
                  <Button
                    variant="success"
                    onClick={() => handleTierButtonClick("tier2", 10)}
                    style={{ backgroundColor: "red" }}
                  >
                    Tier 2 - 10$
                  </Button>
                </div>
                <div>
                  <PostCount sharerId={id} tier="tier3" />
                  <Button
                    variant="success"
                    onClick={() => handleTierButtonClick("tier3", 20)}
                    style={{ backgroundColor: "blue" }}
                  >
                    Tier 3 - 20$
                  </Button>
                </div>
              </>
            )}
            {/* PayPal button section */}
            {showPaypalModal && followTier && paypalLoaded && (
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ATyV_k4Cl0uXb3m5rslF-APNEeMSqlO2xp42GOJoMOb7mzeguFi2028uPwa5UOTSbN8U7rjnKpOYFQT8",
                  currency: "USD",
                }}
              >
                <div>
                  <PayPalButtons
                    style={{ layout: "horizontal" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    amount={selectedAmount}
                  />
                </div>
              </PayPalScriptProvider>
            )}
            {showConfirmation && (
              <div className="confirmation-overlay">
                <div className="confirmation-modal">
                  <p>Are you sure you want to unfollow?</p>
                  <button onClick={handleConfirmUnfollow}>Yes</button>
                  <button onClick={handleCancelUnfollow}>No</button>
                </div>
              </div>
            )}
          </div>

          <div>
            {isFollowing ? (
              <div>
                {userInfo.followed_sharers.tier1.includes(parseInt(id)) && (
                  <TierOneLatest sharerId={id} />
                )}
                {userInfo.followed_sharers.tier2.includes(parseInt(id)) && (
                  <TierTwoLatest sharerId={id} />
                )}
                {userInfo.followed_sharers.tier3.includes(parseInt(id)) && (
                  <TierThreeLatest sharerId={id} />
                )}
              </div>
            ) : (
              <div>
                <h6>FOLLOW NOW!</h6>
                <h3>Preview Content</h3>
                <PreviewContent sharerId={id} />
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: 1, marginRight: "20px" }}>
              <TopDonor sharerId={id} />
            </div>
            <div style={{ flex: 1 }}>
              <TipBox sharerId={id} />
            </div>
          </div>
          <Link to={"/homepage"}>
            <Button variant="primary">Go Back</Button>
          </Link>
          <div className="scroll-box overflow-auto">
            <div className="fetch-ratings-box">
              <FetchSharerRatingsComponent sharerId={id} />
            </div>
            {isFollowing && !userHasRated && (
              <PostSharerRatingsComponent sharerId={id} />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sharer: state.SharerDetail.sharer,
  loading: state.SharerDetail.loading,
  error: state.SharerDetail.error,
});

const mapDispatchToProps = {
  DetailSharers,
  followSharer, // Connect the followSharer action creator
  unfollowSharer,
  getSharerPostCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(SharerDetail);