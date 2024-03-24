import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendTipBox } from "../actions/sharerActions";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function TipBox({ sharerId }) {
  const [tipAmount, setTipAmount] = useState("");
  const [paypalLoaded, setPaypalLoaded] = useState(false); 
  const dispatch = useDispatch();
  const { loading, error, tipBoxInfo } = useSelector(
    (state) => state.userTipBoxes
  );
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo ? userInfo.user_id : null;

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ATyV_k4Cl0uXb3m5rslF-APNEeMSqlO2xp42GOJoMOb7mzeguFi2028uPwa5UOTSbN8U7rjnKpOYFQT8&currency=USD";
    script.async = true;
    script.onload = () => setPaypalLoaded(true); 
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
    if (isNaN(tipAmount) || tipAmount <= 0) {
      console.error("Invalid tip amount:", tipAmount);
      return Promise.reject("Invalid tip amount");
    }
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: tipAmount,
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

      if (isNaN(tipAmount) || tipAmount <= 0) {
        console.error("Invalid tip amount:", tipAmount);
        return Promise.reject("Invalid tip amount");
      }

      dispatch(sendTipBox(userId, sharerId, tipAmount))
        .then((response) => {
          console.log("Tip box sent successfully:", response);
          setTipAmount("");
          window.location.reload();
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
        onChange={(e) => setTipAmount(parseFloat(e.target.value))}
        placeholder="Enter tip amount"
        min="0.1" 
        step="0.1"
      />

      {paypalLoaded && ( 
        <PayPalScriptProvider
          options={{
            "client-id":
              "ATyV_k4Cl0uXb3m5rslF-APNEeMSqlO2xp42GOJoMOb7mzeguFi2028uPwa5UOTSbN8U7rjnKpOYFQT8",
            currency: "USD",
          }}
        >
          <PayPalButtons
            createOrder={handleCreateOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </PayPalScriptProvider>
      )}

      {error && <div>Error: {error}</div>}
      {tipBoxInfo && <div>Tip box sent successfully!</div>}
    </div>
  );
}

export default TipBox;
