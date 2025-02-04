import { useState } from "react"

export function ProfessionalLinks({ onSubmit, data }: { onSubmit: (data: any) => void; data: any }) {
  const [formData, setFormData] = useState({
    linkedinProfile: data.linkedinProfile || "",
    githubProfile: data.githubProfile || "",
    portfolio: data.portfolio || "",
    resume: data.resume || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    localStorage.setItem("info", JSON.stringify([...JSON.parse(localStorage.getItem("info") || "[]"), formData]))
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          LinkedIn Profile (Optional)
        </label>
        <input
          id="linkedinProfile"
          type="text"
          value={formData.linkedinProfile}
          onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="githubProfile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          GitHub Profile (Optional)
        </label>
        <input
          id="githubProfile"
          type="text"
          value={formData.githubProfile}
          onChange={(e) => setFormData({ ...formData, githubProfile: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Portfolio (Optional)
        </label>
        <input
          id="portfolio"
          type="text"
          value={formData.portfolio}
          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Resume Upload (Optional)
        </label>
        <input
          id="resume"
          type="file"
          onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Submit</button>
    </form>
  )
}

