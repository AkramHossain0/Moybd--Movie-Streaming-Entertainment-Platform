'use client';

import React, { useEffect, useState } from "react";

const Captcha = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Dynamically load the reCAPTCHA script if it isn't already loaded
    const existingScript = document.querySelector(
      `script[src="https://www.google.com/recaptcha/api.js?render=6LdAysYqAAAAAE0RNISV2RHhK3YROMM0JOpckrYl"]`
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=6LdAysYqAAAAAE0RNISV2RHhK3YROMM0JOpckrYl";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure grecaptcha is available
    if (!window.grecaptcha) {
      alert("reCAPTCHA failed to load. Please refresh the page.");
      return;
    }

    setLoading(true);

    try {
      // Execute reCAPTCHA
      const token = await window.grecaptcha.execute(
        "6LdAysYqAAAAAE0RNISV2RHhK3YROMM0JOpckrYl",
        { action: "submit_form" }
      );

      // Send the token to your backend for verification
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/captcha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("CAPTCHA verified:", data.message);
        alert("CAPTCHA verified successfully!");
      } else {
        console.error("CAPTCHA verification failed:", data.error);
        alert("CAPTCHA verification failed!");
      }
    } catch (error) {
      console.error("Error during CAPTCHA verification:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Submit the Form</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Captcha;
