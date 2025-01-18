'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import FAQ from './FAQ'
import { Trophy, Award, Gift } from 'lucide-react';

const tabsData = [
  { id: 'faq', label: 'FAQ' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'sponsors', label: 'Sponsors' },
  { id: 'prize', label: 'Prize' },
  { id: 'problem-statement', label: 'Problem Statement' },
]

const ToggleTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0].id)

  return (
    <div className="w-full  max-w-4xl  mx-auto">
      <div className="flex flex-wrap  absolute  gap-2 ">
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4  py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className=" rounded-lg p-4  pt-16 h-full">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'faq' && <FAQContent />}
          {activeTab === 'timeline' && <TimelineContent />}
          {activeTab === 'sponsors' && <SponsorsContent />}
          {activeTab === 'prize' && <PrizeContent />}
          {activeTab === 'problem-statement' && <ProblemStatementContent />}
        </motion.div>
      </div>
    </div>
  )
}

const FAQContent: React.FC = () => (
  <div>
<FAQ />

  </div>
)

const TimelineContent: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-4">Event Timeline</h2>
    <ul className="space-y-4">
      <li className="flex items-center">
        <div className="bg-indigo-600 text-black rounded-full w-4 h-4 mr-4"></div>
        <div>
          <h3 className="text-lg font-semibold text-white">Registration Opens</h3>
          <p className="text-gray-300">July 1, 2023</p>
        </div>
      </li>
      <li className="flex items-center">
        <div className="bg-indigo-600 rounded-full w-4 h-4 mr-4"></div>
        <div>
          <h3 className="text-lg font-semibold text-white">Hackathon Starts</h3>
          <p className="text-gray-300">August 15, 2023</p>
        </div>
      </li>
      {/* Add more timeline items as needed */}
    </ul>
  </div>
)

const SponsorsContent: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-4">Our Sponsors</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-center">
        <span className="text-xl font-semibold text-white">TechCorp</span>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-center">
        <span className="text-xl font-semibold text-white">InnovateCo</span>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-center">
        <span className="text-xl font-semibold text-white">FutureTech</span>
      </div>
      {/* Add more sponsor items as needed */}
    </div>
  </div>
)

const PrizeContent: React.FC = () => (
    <div className=" rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-white mb-4 ">Prizes</h2>
    <div className="space-y-2 md:mr-4 ">
      <PrizeCard
        place="1st Place"
        prize="$5,000"
        extra="Mentorship opportunity with TechCorp"
        icon={<Trophy className="w-8 h-8" />}
      />
      <PrizeCard
        place="2nd Place"
        prize="$3,000"
        extra="6-month InnovateCo software license"
        icon={<Award className="w-8 h-8" />}
      />
      <PrizeCard
        place="3rd Place"
        prize="$1,500"
        extra="FutureTech gadget bundle"
        icon={<Gift className="w-8 h-8" />}
      />
    </div>
  </div>
)

const ProblemStatementContent: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-4">Problem Statement</h2>
    <p className="text-gray-300 mb-4">
      Urban areas are facing increasing challenges due to rapid population growth, climate change, and resource scarcity. Your task is to develop innovative technological solutions that address one or more of the following urban issues:
    </p>
    <ul className="list-disc list-inside space-y-2 text-gray-300">
      <li>Sustainable transportation and mobility</li>
      <li>Energy-efficient buildings and infrastructure</li>
      <li>Smart waste management and recycling</li>
      <li>Urban agriculture and food security</li>
      <li>Water conservation and management</li>
    </ul>
    <p className="text-gray-300 mt-4">
      Your solution should be scalable, cost-effective, and have a significant positive impact on urban sustainability.
    </p>
  </div>
)

export default ToggleTabs

interface PrizeCardProps {
    place: string;
    prize: string;
    extra: string;
    icon: React.ReactNode;
  }
  
  const PrizeCard: React.FC<PrizeCardProps> = ({ place, prize,  icon }) => (
    <div className="border text-black  bg-white border-gray-200 rounded-lg p-3  transition-all duration-300 ease-in-out hover:shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-md  ">{place}</h3>
          <p className="text-xl font-bold ">{prize}</p>
        </div>
      </div>
    </div>
  );