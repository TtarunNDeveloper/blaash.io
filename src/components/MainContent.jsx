import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function MainContent() {
  const handleLoginSuccess = (response) => {
    console.log(response);
    // Send token to your backend for further processing
    fetch('https://your-backend-url.com/auth/google/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: response.credential,
      }),
    })
    
    // .then((response) => {
    //   // Handle response from backend
    // });
  };

  const handleLoginFailure = (error) => {
    console.error(error);
  };

  return (
    <main className="ml-5 mt-4 flex-1 p-4 bg-gray-100">
      <div className="playlists p-4 bg-white rounded-lg shadow-md">
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </GoogleOAuthProvider>
      </div>
      <aside className="video-details mt-4 p-4 bg-white rounded-lg shadow-md">
        {/* Your video details here */}
      </aside>
    </main>
  );
}

export default MainContent;
