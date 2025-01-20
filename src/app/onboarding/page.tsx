"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OnboardingComponent() {
  const [error, setError] = useState("");
  const { user } = useUser(); // Get the current user from Clerk
  const router = useRouter();

  // Function to save the user to the database
  const saveUserToDB = async () => {
    if (!user) return;

    const userData = {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
    };

    // Ensure required fields are present
    if (!userData.firstName || !userData.lastName || !userData.email) {
      setError("Incomplete user information.");
      return;
    }

    try {
        console.log(userData);
      const response = await axios.post("/api/addUser", userData);
      if (!response.data.success) {
        console.log(response.data);
        setError(response.data.message || "Failed to save user.");
      } else {
        console.log("User added successfully!");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while saving the user."
      );
    }
  };

  // Save the user when the component mounts if the user exists
  useEffect(() => {
    saveUserToDB();
  }, [user]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
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
        await user?.reload(); // Reload user data from Clerk API
        router.push("/"); // Navigate to the homepage after successful onboarding
      } else {
        setError(res.data.message || "Failed to complete onboarding.");
      }
    } catch (err) {
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
