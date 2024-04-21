import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      try {
        if (token) {
            const response = await fetch('http://localhost:3000/users/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.status === 401) {
                navigate('/login')
              } else {
                const data = await response.json();
                localStorage.setItem('email', data.email)
                navigate('/messages')
              }
        } else {
            navigate('/login')
        }
        
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();

  }, [navigate]);

  return <div />;
}
