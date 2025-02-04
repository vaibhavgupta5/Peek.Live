import { useState } from "react"

interface BasicInfoProps {
  onSubmit: (data: any) => void;
  data: any;
}

export function BasicInfo({ onSubmit, data }: BasicInfoProps) {
  const [formData, setFormData] = useState({
    contactNumber: data.contactNumber || "",
    gender: data.gender || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    localStorage.setItem("info", JSON.stringify([formData]))
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
      <div>
        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Contact Number (Optional)
        </label>
        <input
          id="contactNumber"
          type="tel"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender (Optional)</label>
        <div className="flex space-x-4">
          {["Male", "Female", "Other"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                value={option.toLowerCase()}
                checked={formData.gender === option.toLowerCase()}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="mr-2"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
      <button 
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Continue
      </button>
    </form>
  )
}

