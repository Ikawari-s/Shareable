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
    setShowConfirmation(false);
  };

  return (
    <div className="wat">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : sharer ? (
        <div className="text-center py-3 hi" style={{ textAlign: "center" }}>
          {sharer.cover_photo && (
            <img
              className="cober"
              src={sharer.cover_photo}
              alt="Cover-Photo"
            />
          )}
          {sharer.image && (
            <img
              src={sharer.image}
              alt="Profile"
              id="pfp"
            />
          )}
          <div id="tex">
          <h1>{sharer.name}</h1>
          <p className="username">@{sharer.username}</p>
          <p>{sharer.description}</p>
          <p style={{opacity:'0.7', fontWeight:'lighter'}}>{sharer.total_followers} followers ∘ {sharer.category ? sharer.category : "Not Specified"} ∘ {sharer.average_rating !== null
                    ? sharer.average_rating > 0
                      ? `${sharer.average_rating}/5`
                      : " No ratings yet"
                    : "N/A"}</p> 
          </div>
          {/* <PostCount sharerId={id} /> */}
          <div>
          {showConfirmation && (
              <div className="confirmation-overlay">
                <div className="confirmation-unfollow">
                  <p>Are you sure you want to unfollow?</p>
                  <button onClick={handleConfirmUnfollow}>Yes</button>
                  <button onClick={handleCancelUnfollow}>No</button>
                </div>
              </div>
            )}
            {isFollowing ? (
              <Button id="jaw" onClick={() => setShowConfirmation(true)}>
                <strong>Unfollow Sharer</strong>
              </Button>
              
            ) : (
              <>
              <h3 style={{letterSpacing:'.2rem', fontWeight: 'lighter'}}>Choose your membership</h3>
              <div className="row ra">
                <div className="column wo" id="bronze">
                  <h1>Tier 1</h1>
                  <PostCount sharerId={id} tier="tier1" />
                  <Button
                    id="pay"
                    onClick={() => handleTierButtonClick("tier1", 5)}
                  >
                    <strong>5$</strong>
                  </Button>
                </div>
                <div className="column wo" id="gold">
                  <h1>Tier 3</h1>
                  <PostCount sharerId={id} tier="tier3" />
                  <Button
                    id="pay"
                    onClick={() => handleTierButtonClick("tier3", 20)}
                  >
                    <strong>20$</strong>
                  </Button>
                  
                </div>
                <div className="column wo" id="silver" >
                  <h1>Tier 2</h1>
                  <PostCount sharerId={id} tier="tier2" />
                  <Button
                    id="pay"
                    onClick={() => handleTierButtonClick("tier2", 10)}
                  >
                    <strong>10$</strong>
                  </Button>
                </div>
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
          </div>

          <div className="col-md-12">
      <div className="d-flex" style={{ textAlign: 'left' }}>
      <div className="nain">
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
                  {/* <h6>FOLLOW NOW!</h6> */}
                  <div className="toppy" style={{width:'60rem', height:'5rem', padding:'1rem 0rem', textAlign:'center', overflow:'visible'}}>
                  <h1>Preview Content</h1>
                  </div>
                  <PreviewContent sharerId={id} />
                </div>
              )}
          </div>
       	</div>
        <div>
        <div className="toppy">
          <div>
          <TopDonor sharerId={id} />
          </div>
        </div>  
         <div className="tippy">
            <div>
              <TipBox sharerId={id} />
            </div>
        </div>
        <div className="ratty">    
          <div className="">
          {isFollowing && !userHasRated && (
              <PostSharerRatingsComponent sharerId={id} />
            )}
            <div className="fetch-ratings-box">
              <FetchSharerRatingsComponent sharerId={id} />
            </div>
          </div>	
      </div>
      </div>
        </div>    


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