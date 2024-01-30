import GitHubIcon from '@/public/icon/gitHubIcon';
import { DeveloperCardProps } from '@/types/DeveloperCardProps';
import { LinkedinIcon } from 'lucide-react';
import React from 'react'

const DeveloperCard: React.FC<DeveloperCardProps> = ({ name, role, avatar, info, linkedin, github }) => (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden">
        <img src={`/Devs_avatars/${avatar}`} alt={`${name} avatar`} className="w-24 h-24 mx-auto mt-4" />
        <div className="p-4">
            <h6 className="text-center text-lg font-semibold">{name}</h6>
            <p className="text-center text-sm text-gray-600 py-2">{role}</p>
            <p className="text-center text-sm text-gray-600">{info}</p>
            <div className="flex justify-center mt-4">
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
        <div>Developers</div>
    )
}

export default Developers