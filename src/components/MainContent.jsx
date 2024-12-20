function MainContent() {
    const handleImportClick = () => {
      window.location.href = "https://bb0f-2405-201-d02e-3047-7055-6f49-6d5a-87f3.ngrok-free.app/auth/google";
    };
  
    return (
      <main className="ml-5 mt-4 flex-1 p-4 bg-gray-100">
        <div className="playlists p-4 bg-white rounded-lg shadow-md">
          <button 
            className="bg-transparent text-black border-black px-4 py-2 rounded"
            onClick={handleImportClick}
          >
            Import From Youtube
          </button>
          {/* Your playlist content here */}
        </div>
        <aside className="video-details mt-4 p-4 bg-white rounded-lg shadow-md">
          {/* Your video details here */}
        </aside>
      </main>
    );
  }
  
  export default MainContent;
  