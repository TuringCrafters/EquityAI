import ArrowRightIcon from '@/public/icon/arrowRightIcon';
import InfoIcon from '@/public/icon/infoIcon';
import React, { useState } from 'react';
import UploadFile from '../Upload';
import SampleFileForUpload from '../SampleFile';

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

                <div className="flex flex-col justify-between mx-4 md:mt-20 h-5/6">
                    <div>
                        <h1 className="text-slate-950 text-4xl font-bold mb-4">EquityAI Analysis</h1>
                        <p className=" text-sm text-neutral-500">
                            Explore this predictive anomaly detection application designed to
                            address the challenges associated with identifying and rectifying
                            pay discrepancies within an organization.
                        </p>
                    </div>

                    <div>
                        <h2 className="mt-4 text-slate-950 text-2xl font-bold mb-5">
                            How do we conduct Pay Equity Analysis?
                        </h2>
                        <p className="text-sm text-neutral-500 mb-2">
                            In order to conduct your company analysis provide us information regarding age,
                            gender, location, salary and used currency, job positions. and years of experience of your employees.
                        </p>

                        <p className="mt-4 text-sm text-neutral-500 mb-2">
                            <span className="font-bold">Step 1</span> - import your data using .xlsx or .csv file
                        </p>

                        <p className="text-sm text-neutral-500 mb-2">
                            <span className="font-bold">Step 2</span> - submit your information
                        </p>

                        <p className="text-sm text-neutral-500 mb-2">
                            <span className="font-bold">Step 3</span> - review and save your analysis
                        </p>

                        <p className="text-sm text-neutral-500 mb-2">
                            <span className="font-bold">Step 4</span> - communicate with your organisation and improve your practices
                        </p>
                    </div>

                    <div>
                        <p className="mt-5 font-semibold tracking-tighter text-center">
                            Not sure what to submit?
                        </p>
                        <p className="font-semibold tracking-tighter text-center">
                            Check out our example data and try it out!
                        </p>
                        <SampleFileForUpload />
                    </div>
                </div>
            </div>
            <div className={`bg-cover bg-center bg-no-repeat h-screen ${!showLeftOnMobile || 'md:block'} md:w-3/4 h-full`}
                style={{ backgroundImage: 'url(https://www.sysarb.se/wp-content/uploads/2023/05/Gradient_final_1-scaled.jpg)' }}
            >
                <div className="flex justify-end">
                    <InfoIcon
                        className="w-8 h-8 mt-16 mr-4 md:hidden"
                        onClick={() => setShowLeftOnMobile(true)} />
                </div>
                <UploadFile />
            </div>
        </div>
    );
};

export default HomePage;
