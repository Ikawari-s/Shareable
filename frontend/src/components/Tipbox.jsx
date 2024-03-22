import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendTipBox } from "../actions/sharerActions";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function TipBox() {
  const [tipAmount, setTipAmount] = useState("");
  const dispatch = useDispatch();
  const { loading, error, tipBoxInfo } = useSelector(
    (state) => state.userTipBoxes
  );
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo ? userInfo.user_id : null;

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AT4h80m0QqFujyrFNSEoY_ol8p4ylScOPhYKE9ZLbUOSH6_Ty2Scf6ZLobmAt8Y_IJFuiI4BziZFv6jC&currency=USD";
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      if (script.parentNode === document.body) { 
        document.body.removeChild(script);
      }
    };
  }, []);
  

  const createOrder = (data, actions) => {
    const amountInput = document.getElementById("tipAmountInput");
    const tipAmount = parseFloat(amountInput.value);
    console.log("Tip amount:", tipAmount); 
    if (isNaN(tipAmount) || tipAmount <= 0) {
      console.error("Invalid tip amount:", tipAmount);
      return Promise.reject("Invalid tip amount");
    }
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: tipAmount.toFixed(2),
            currency_code: "USD",
          },
        },
      ],
    });
  };

  const handleCreateOrder = (data, actions) => {
    return createOrder(data, actions);
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const amountInput = document.getElementById("tipAmountInput");
      const tipAmount = parseFloat(amountInput.value);
      console.log("Captured order details:", details);
      console.log("Sending tip box with amount:", tipAmount);
  
      if (isNaN(tipAmount) || tipAmount <= 0) {
        console.error("Invalid tip amount:", tipAmount);
        return Promise.reject("Invalid tip amount");
      }
  
      dispatch(sendTipBox(userId, id, tipAmount))
        .then((response) => {
          console.log("Tip box sent successfully:", response);
          setTipAmount("");
        })
        .catch((error) => {
          console.error("Error sending tip box:", error);
        });
    });
  };
  
  

  const onError = (err) => {
    console.error("createOrder_error:", err);
  };

  return (
    <div>
      <h2>Tip Box</h2>
      <input
        id="tipAmountInput"
        type="number"
        value={tipAmount}
        onChange={(e) => {
          console.log("Input value:", e.target.value);
          setTipAmount(parseFloat(e.target.value)); 
        }}
        placeholder="Enter tip amount"
      />

      <PayPalScriptProvider
        options={{
          "client-id":
            "ASijs-TlfcMyxHCbpKvS8oVhv1EBtBUu5tp1MPgKRINvJrcy1SIv3Yv9jnAo-Uy3wUKAgRNRNvDbUe6t",
          currency: "USD",
        }}
      >
        <PayPalButtons
          createOrder={handleCreateOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </PayPalScriptProvider>
      {error && <div>Error: {error}</div>}
      {tipBoxInfo && <div>Tip box sent successfully!</div>}
    </div>
  );
}

export default TipBox;
