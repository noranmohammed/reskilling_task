import React, { useState } from 'react';
import SignInForm from '../components/signinForm';
import SignupForm from '../components/SignupForm';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between forms

  const toggleForm = () => {
    setIsSignUp((prev) => !prev); // Toggle the form
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Authentication</h1>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        {isSignUp ? <SignupForm /> : <SignInForm />}
        <button
          onClick={toggleForm}
          className="mt-4 w-full bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-300"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}