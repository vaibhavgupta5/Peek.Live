"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import axios from "axios";

export default function OnboardingComponent() {
  const [error, setError] = useState("");
  const { user } = useUser(); // Ensure user is fully loaded
  const router = useRouter();


  const User = {
    onboardingDone : false,
    firstName : user?.firstName,
    lastName : user?.lastName,
    fullName : user?.fullName,
    email : user?.primaryEmailAddress?.emailAddress,
    id : user?.id,
    image: user?.imageUrl,
  }

  console.log(User)

  if (user) {
    localStorage.setItem("userLocal", JSON.stringify(User));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const applicationName = formData.get("applicationName");
    const applicationType = formData.get("applicationType");

    if (!applicationName || !applicationType) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      const res = await axios.post("/api/onboarding", {
        applicationName,
        applicationType,
      });

      if (res.data.success) {
        await user?.reload();
        router.push("/");
      } else {
        setError(res.data.message || "Failed to complete onboarding.");
      }
    } catch (err) {
      console.error("Error:", err.response || err);
      setError(
        err.response?.data?.message ||
          "An error occurred while completing onboarding."
      );
    }
  };

  return (
    <div>
      <h1>Welcome to Onboarding</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Application Name</label>
          <p>Enter the name of your application.</p>
          <input type="text" name="applicationName" required />
        </div>

        <div>
          <label>Application Type</label>
          <p>Describe the type of your application.</p>
          <input type="text" name="applicationType" required />
        </div>

        {error && <p className="text-red-600">Error: {error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
