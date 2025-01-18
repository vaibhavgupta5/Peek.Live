import React from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'

const InfoCard: React.FC = () => {

  return (
    <div className="w-full  h-full  bg-white rounded-2xl shadow-lg ">
      <div className="p-4 space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Details</h2>
        <InfoItem icon={<Calendar className="w-5 h-5 text-indigo-500" />} label="Date" value="12" />
        <InfoItem icon={<Clock className="w-5 h-5 text-indigo-500" />} label="Time" value="23:00" />
        <InfoItem icon={<MapPin className="w-5 h-5 text-indigo-500" />} label="Location" value="Ghaziabad" />
        <InfoItem icon={<MapPin className="w-5 h-5 text-indigo-500" />} label="Team Size" value="2-5" />
      </div>
    </div>
  )
}

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4">
    {icon}
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
)

export default InfoCard

