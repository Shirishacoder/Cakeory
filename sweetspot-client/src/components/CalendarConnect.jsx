import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

function CalendarConnect({ onConnect, onDisconnect }) {
  const [isConnected, setIsConnected] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("calendar_token")) {
      setIsConnected(true);
    }
  }, []);

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar.readonly",
    onSuccess: (tokenResponse) => {
      localStorage.setItem("calendar_token", tokenResponse.access_token);
      setIsConnected(true);
      onConnect(tokenResponse.access_token);
      setOpen(false); // ✅ close modal after success
    },
  });

  const disconnectCalendar = () => {
    localStorage.removeItem("calendar_token");
    setIsConnected(false);
    onDisconnect();
    setOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        📅 Google Calendar
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          
          <div className="bg-white rounded-xl w-80 p-5 relative shadow-xl">
            
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Google Calendar
            </h2>

            {isConnected ? (
              <>
                <p className="text-sm text-green-600 mb-4">
                  ✅ Calendar connected
                </p>

                <button
                  onClick={disconnectCalendar}
                  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Disconnect Calendar
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Connect your Google Calendar to detect upcoming birthdays.
                </p>

                <button
                  onClick={() => login()}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Connect Google Calendar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CalendarConnect;
