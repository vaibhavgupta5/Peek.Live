import { useState } from "react"

const events = ["Hackathons", "Workshops", "Conferences", "Networking Events", "Tech Talks"]

export function PersonalPreferences({ onSubmit, data }: { onSubmit: (data: any) => void; data: any }) {
  const [formData, setFormData] = useState({
    bio: data.bio || "",
    description: data.description || "",
    eventsInterested: data.eventsInterested || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("info", JSON.stringify([...JSON.parse(localStorage.getItem("info") || "[]"), formData]))
    onSubmit(formData)
  }

  const handleEventChange = (event: string) => {
    setFormData((prev) => ({
      ...prev,
      eventsInterested: prev.eventsInterested.includes(event)
        ? prev.eventsInterested.filter((e: string) => e !== event)
        : [...prev.eventsInterested, event],
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Bio (Optional)
        </label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Write a short bio about yourself"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={4}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description (Optional)
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Provide a more detailed description of your skills and interests"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={4}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Events Interested In (Optional, multi-select)
        </label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {events.map((event) => (
            <label key={event} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.eventsInterested.includes(event)}
                onChange={() => handleEventChange(event)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{event}</span>
            </label>
          ))}
        </div>
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Submit</button>
    </form>
  )
}

