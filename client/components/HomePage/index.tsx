import ArrowRightIcon from '@/public/icon/arrowRightIcon';
import InfoIcon from '@/public/icon/infoIcon';
import React, { useState } from 'react';
import UploadFile from '../Upload';

const HomePage = () => {
    const [showLeftOnMobile, setShowLeftOnMobile] = useState(false);

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className={`bg-white fixed z-10 h-full ${showLeftOnMobile ? 'slide-in' : 'slide-out'} md:relative md:w-1/4`}>
                <div className="flex justify-end">
                    <ArrowRightIcon
                        className="w-6 h-6 mt-16 mr-4 md:hidden"
                        onClick={() => setShowLeftOnMobile(false)} />
                </div>
                <p className="text-center text-black">Left Content</p>
            </div>
            <div className={`bg-cover bg-center bg-no-repeat h-screen ${!showLeftOnMobile || 'md:block'} md:w-3/4 h-full`}
                style={{ backgroundImage: 'url(https://www.sysarb.se/wp-content/uploads/2023/05/Gradient_final_1-scaled.jpg)' }}
            >
                <div className="flex justify-end">
                    <InfoIcon
                        className="w-8 h-8 mt-16 mr-4 md:hidden"
                        onClick={() => setShowLeftOnMobile(true)} />
                </div>
                <UploadFile/>
            </div>
        </div>
    );
};

export default HomePage;
