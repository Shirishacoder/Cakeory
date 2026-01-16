import { useEffect, useState } from "react";

function CalendarNotifications() {
  const [notifications, setNotifications] = useState([]);

  // ⬇️ STEP 1 HAPPENS HERE
  useEffect(() => {
    const token = localStorage.getItem("calendar_token"); // existing token

    if (!token) return;

    fetchCalendarEvents(token);
  }, []);

  async function fetchCalendarEvents(token) {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events?" +
        "timeMin=" + new Date().toISOString() +
        "&maxResults=10&singleEvents=true&orderBy=startTime",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    processEvents(data.items || []);
  }

  function processEvents(events) {
    const today = new Date();
    const messages = [];

    events.forEach((event) => {
      const eventDate =
        event.start.date || event.start.dateTime;

      const daysLeft = Math.ceil(
        (new Date(eventDate) - today) /
          (1000 * 60 * 60 * 24)
      );

      if (daysLeft === 0) {
        messages.push(`🎉 Today is ${event.summary}`);
      } else if (daysLeft === 1) {
        messages.push(`⏰ Tomorrow is ${event.summary}`);
      } else if (daysLeft <= 7) {
        messages.push(
          `📅 In ${daysLeft} days: ${event.summary}`
        );
      }
    });

    setNotifications(messages);
  }

  if (notifications.length === 0) return null;

  return (
    <div style={{ margin: "20px", padding: "10px" }}>
      {notifications.map((msg, index) => (
        <div
          key={index}
          style={{
            background: "#fff3cd",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          {msg}
        </div>
      ))}
    </div>
  );
}

export default CalendarNotifications;
