import SampleFileForUpload from '@/components/SampleFile';
import { HomePageContentType } from '@/types/HomePageContentType';
import { ArrowRightIcon } from 'lucide-react';
import React from 'react'


const HomePageContent: React.FC<HomePageContentType> = ({
    showLeftOnMobile,
    setShowLeftOnMobile
}) => {
    return (
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
                        How to conduct Pay Equity Analysis?
                    </h2>
                    <p className="text-sm text-neutral-500 mb-2">
                        To perform a comprehensive analysis of your company, please provide details about your employees,
                        including their age, gender, location, salary and currency used, job positions, and years of experience.
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
            <div className="text-neutral-500 mt-8 ml-4">&copy;EquityAi, 2024</div>
        </div>
    )
}

export default HomePageContent;