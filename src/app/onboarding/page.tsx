"use client";

import { useEffect, useState } from "react";
import { BasicInfo } from "@/components/onboarding/basic-info";
import { ProfessionalLinks } from "@/components/onboarding/professional-links";
import { EducationInterests } from "@/components/onboarding/education-interests";
import { PersonalPreferences } from "@/components/onboarding/personal-preferences";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { completeOnboarding } from "./_actions";

interface OnboardingFormData {
  contactNumber?: string;
  gender?: string;
  // Add other form fields as needed
}

const steps = [
  { title: "Basic Information", component: BasicInfo },
  { title: "Professional & Social Links", component: ProfessionalLinks },
  { title: "Education & Interests", component: EducationInterests },
  { title: "Personal & Event Preferences", component: PersonalPreferences },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingFormData>({});

  const user = useUser();

  const email = user?.user?.emailAddresses[0].emailAddress;
  localStorage.setItem("email", email || "");

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      console.log(formData);
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === steps.length) {
      console.log(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      console.log(formData);
    }
  };

  const savetoDB = async () => {
    const email = localStorage.getItem("email");
    const user = localStorage.getItem("info");
    const userData = JSON.parse(user || "[]");
    console.log("User Data from localStorage:", userData); // Debug log

    const onboardingData = {
      contact_number: userData[0]?.contactNumber || "",
      gender: userData[0]?.gender || "",
      linkedin: userData[1]?.linkedinProfile || "",
      github: userData[1]?.githubProfile || "",
      portfolio: userData[1]?.portfolio || "",
      resume: "test",
      college: userData[2]?.college || "",
      stack: userData[2]?.techStack || [],
      bio: userData[3]?.bio || "",
      description: userData[3]?.description || "",
      eventsInterested: userData[3]?.eventsInterested || [],
      email: email,
    };

    console.log("Sending to API:", onboardingData); // Debug log

    try {
      const response = await axios.post("/api/onboarding", onboardingData);
      console.log("API Response:", response.data);
      if (response.data.success) {
        // Redirect or show success 
        console.log("success")
        completeOnboarding(onboardingData)
      }
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      // Show error message to user
    }
  };

  const handleSubmit = (data: OnboardingFormData) => {
    setFormData({ ...formData, ...data });
    if (currentStep === steps.length - 1) {
      console.log("Form submitted:", formData);
      savetoDB();
    } else {
      handleNext();
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="container mx-auto">
        <div className="rounded-[22px] max-w-3xl mx-auto p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <h1 className="text-2xl font-bold text-center mb-4 text-black dark:text-white">
            Onboarding
          </h1>
          <p className="text-center mb-8 text-gray-700 dark:text-gray-300">
            Let's get to know you better
          </p>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div key={index} className="text-sm flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <CurrentStepComponent onSubmit={handleSubmit} data={formData} />

          <div className="mt-6 flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>
            )}
            {/* {currentStep < steps.length  && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ml-auto"
              >
                Next
              </button>
            )} */}
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ml-auto"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
