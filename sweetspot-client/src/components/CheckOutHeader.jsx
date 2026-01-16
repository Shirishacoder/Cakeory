import React from "react";
import { useNavigate } from "react-router-dom";

export default function CheckOutHeader() {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 transition"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#da8989"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Title */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700 flex items-center gap-2">
            Your Perfect Order Awaits
            <span className="animate-truck">🚚</span>
          </h1>

          <p className="text-sm text-gray-500">
            Where cravings meet convenience 🎂
          </p>
        </div>
      </div>

      {/* Truck animation */}
      <style>{`
        @keyframes drive {
          0% { transform: translateX(0); }
          50% { transform: translateX(6px); }
          100% { transform: translateX(0); }
        }
        .animate-truck {
          animation: drive 2s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}