import React, { useState } from 'react';

const HomePage = () => {
  const [showLeftOnMobile, setShowLeftOnMobile] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <div className={`bg-white fixed z-10 h-full ${showLeftOnMobile ? 'slide-in' : 'slide-out'} md:relative md:w-1/4`}>
        <button
          className="mt-40 ml-4 md:hidden"
          onClick={() => setShowLeftOnMobile(false)}
        >
          Show Right
        </button>
        <p className="text-center text-white">Left Content</p>
      </div>
      <div className={`bg-cover bg-center bg-no-repeat h-screen ${!showLeftOnMobile || 'md:block'} md:w-3/4 h-full`}
      style={{ backgroundImage: 'url(https://www.sysarb.se/wp-content/uploads/2023/05/Gradient_final_1-scaled.jpg)'}}
      >
        <button
          className="mt-40 ml-4 md:hidden"
          onClick={() => setShowLeftOnMobile(true)}
        >
          Show Left
        </button>
        <p className="text-center text-white">Right Content</p>
      </div>
    </div>
  );
};

export default HomePage;
