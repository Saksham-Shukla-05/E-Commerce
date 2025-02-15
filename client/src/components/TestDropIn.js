// TestDropIn.js
import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";

const TestDropIn = () => {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);

  // Fetch client token (for example, from your backend)
  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/v1/product/token/braintree`
        );
        const data = await response.json();
        setClientToken(data.clientToken);
      } catch (error) {
        console.error("Error fetching client token:", error);
      }
    };

    fetchClientToken();
  }, []);

  useEffect(() => {
    return () => {
      if (instance) {
        instance.teardown();
      }
    };
  }, [instance]);

  return (
    <div>
      <h1>Test DropIn Integration</h1>
      {clientToken ? (
        <DropIn
          options={{
            authorization: clientToken,
            paypal: {
              flow: "vault",
            },
          }}
          onInstance={(instance) => {
            console.log("DropIn Instance:", instance);
            setInstance(instance);
          }}
        />
      ) : (
        <p>Loading client token...</p>
      )}
    </div>
  );
};

export default TestDropIn;
