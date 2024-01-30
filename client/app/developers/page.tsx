import NavBar from '@/components/Navbar';
import GitHubIcon from '@/public/icon/gitHubIcon';
import { developers } from '@/services/devInfo';
import { DeveloperCardProps } from '@/types/DeveloperCardProps';
import { LinkedinIcon } from 'lucide-react';
import React from 'react'

const DeveloperCard: React.FC<DeveloperCardProps> = ({ name, role, avatar, info, linkedin, github }) => (
    <div className="card bg-white shadow-lg rounded-2xl overflow-hidden h-[450px] flex flex-col">
        <img src={`/devAvatars/${avatar}`} alt={`${name} avatar`} className="w-40 h-40 mx-auto mt-4" />
        <div className="flex-1 p-4 flex flex-col justify-between overflow-auto">
            <div>
                <h6 className="text-center text-lg font-semibold">{name}</h6>
                <p className="text-center text-sm text-gray-600 py-2">{role}</p>
                <p className="text-center text-sm text-gray-600">{info}</p>
            </div>
            <div className="flex justify-center items-center my-4 ">
                {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 mx-2">
                        <LinkedinIcon />
                    </a>
                )}
                {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" className="text-black mx-2">
                        <GitHubIcon />
                    </a>
                )}
            </div>
        </div>
    </div>
);

const Developers = () => {
    return (
        <>
            <NavBar />
            <div className="container mx-auto mt-16 mb-8 px-16">
                <h3 className="text-center text-3xl font-bold mb-4">Developers Page</h3>
                <div className="bg-white shadow-md rounded-2xl p-8 mb-6">
                    <p className="text-center">
                        Welcome! Here you can find information and resources for developers working on EquityAI project.
                    </p>
                </div>
                <h4 className="text-center text-2xl font-bold my-8">Meet the Team</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {developers.map((developer, index) => (
                        <DeveloperCard key={index} {...developer} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Developers