import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { DetailSharers, getSharerPostCount } from "../actions/sharerActions";
import SharerLatestPost from "./SharerLatestPost";
import { followSharer, unfollowSharer } from "../actions/followActions";
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
  const navigate = useNavigate();

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

  const handleFollowToggle = (tier) => {
    const updatedUserInfo = userInfo ? { ...userInfo } : {};
    updatedUserInfo.followed_sharers = updatedUserInfo.followed_sharers || {};
    const idInt = parseInt(id);

    const isCurrentlyFollowing = Object.values(updatedUserInfo.followed_sharers)
      .flatMap((t) => t)
      .includes(idInt);

    const updatedFollowedSharers = { ...updatedUserInfo.followed_sharers };
    Object.keys(updatedFollowedSharers).forEach((t) => {
      updatedFollowedSharers[t] = updatedFollowedSharers[t].filter(
        (sharerId) => sharerId !== idInt
      );
    });

    if (!isCurrentlyFollowing) {
      updatedFollowedSharers[tier] = [...updatedFollowedSharers[tier], idInt];
    }

    setIsFollowing(!isFollowing);
    setCurrentTier(tier);
    updatedUserInfo.followed_sharers = updatedFollowedSharers;
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

    if (isCurrentlyFollowing) {
      unfollowSharer(id, tier);
    } else {
      followSharer(id, tier);
    }
  };

  const handleUnfollow = () => {
    console.log("ID:", id);
  
    // Extract followed sharers data from userInfo
    const followedSharers = userInfo?.followed_sharers;
  
    // Ensure followedSharers exists and has tiers
    if (!followedSharers || Object.keys(followedSharers).length === 0) {
      console.error("Followed sharers data is missing or empty.");
      return;
    }
  
    let currentTier = null;
  
    // Check each tier to find the one containing the current id
    Object.entries(followedSharers).forEach(([tier, ids]) => {
      if (ids.includes(parseInt(id))) {
        currentTier = tier;
      }
    });
  
    console.log("Current Tier:", currentTier);
  
    // Ensure currentTier is set properly
    if (!currentTier) {
      console.error("Current Tier is not set.");
      return;
    }
  
    // Unfollow the sharer from the current tier
    unfollowSharer(id, currentTier);
    setIsFollowing(false);
  
    // Remove the sharer id from the followed sharers list in userInfo
    const updatedUserInfo = { ...userInfo };
    updatedUserInfo.followed_sharers[currentTier] =
      updatedUserInfo.followed_sharers[currentTier].filter(
        (sharerId) => sharerId !== parseInt(id)
      );
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
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
          <p>{sharer.description}</p>
          <p>Category: {sharer.category}</p>
          <PostCount sharerId={id} />
          <div>
            {isFollowing ? (
              <Button onClick={handleUnfollow}>Unfollow Sharer</Button>
            ) : (
              <>
                <Button
                  variant="success"
                  onClick={() => handleFollowToggle("tier1")}
                >
                  Tier 1
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleFollowToggle("tier2")}
                >
                  Tier 2
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleFollowToggle("tier3")}
                >
                  Tier 3
                </Button>
              </>
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
  followSharer,
  unfollowSharer,
  getSharerPostCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(SharerDetail);
