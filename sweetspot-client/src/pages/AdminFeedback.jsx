import { useState, useEffect } from 'react';

export default function AdminFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('feedback');

  useEffect(() => {
    const fetchData = () => {
      try {
        // Get feedback from localStorage mock data
        const feedbackData = JSON.parse(localStorage.getItem('mockFeedback') || '[]');
        setFeedback(feedbackData);

        // Get messages from localStorage mock data
        const messagesData = JSON.parse(localStorage.getItem('mockMessages') || '[]');
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading feedback...</div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Admin Dashboard
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white p-1 rounded-lg shadow-sm">
        <button
          onClick={() => setActiveTab('feedback')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'feedback'
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Customer Feedback ({feedback.length})
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'messages'
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Contact Messages ({messages.length})
        </button>
      </div>

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Customer Feedback</h2>
          {feedback.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No feedback available
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedback.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 mt-2">{item.message}</p>
                  <div className="mt-2">
                    Rating: {item.rating}/5
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Contact Messages</h2>
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No messages available
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {messages.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.email}</p>
                      {item.phone && <p className="text-sm text-gray-600">{item.phone}</p>}
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {item.inquiryType}
                    </span>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-medium text-gray-700 mb-1">Subject:</h4>
                    <p className="text-gray-800">{item.subject}</p>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-medium text-gray-700 mb-1">Message:</h4>
                    <p className="text-gray-600">{item.message}</p>
                  </div>

                  <div className="text-sm text-gray-500">
                    {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
