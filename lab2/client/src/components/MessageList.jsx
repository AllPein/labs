import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function MessageList() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const [target, setTarget] = useState(null);
  const email = localStorage.getItem('email');

  const handleSignOut = async () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const sendMessage = () => {
    if (message) {
      fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ recieverEmail: target, content: message}),
      }).catch(() => {});
      setMessage('');
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch('http://localhost:3000/messages', {
        method: 'GET',
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('access_token'),
        }
      });
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();
  }, []);

  return (
    <div className="mt-5 bg-gray-50 rounded-lg dark:bg-gray-700 h-full w-full">
      <div className="flex justify-between mb-4">
        User: {email}
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white py-2 hover:bg-red-600 font-medium rounded-lg text-sm px-5"
        >
          Logout
        </button>
      </div>
      <input
        type="email"
        className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Target email"
        onInput={(e) => setTarget(e.target.value)}
      />
      <input
        className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onInput={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />

      <button
        className="mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={() => sendMessage()}
      >Send Message</button>
      <div className="overflow-y-auto max-h-96 mt-8">
        <p className='block mb-2 text-xl font-medium text-gray-900 dark:text-white'>All messages</p>
        {messages.map((message, index) => (
          <div
            key={index}
            className="bg-gray-200 p-4 rounded-lg mb-2 break-words"
          >
            <p>
              <span className="font-bold">From:</span> {message.from}
            </p>
            <p>
              <span className="font-bold">To:</span> {message.to}
            </p>
            <p>
              <span className="font-bold">Message:</span> {message.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessageList;
