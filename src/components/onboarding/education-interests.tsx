import { useState } from "react"

const techStacks = ["JavaScript", "TypeScript", "React", "Vue", "Angular", "Node.js", "Python", "Java", "C#", "Ruby"]

export function EducationInterests({ onSubmit, data }: { onSubmit: (data: any) => void; data: any }) {
  const [formData, setFormData] = useState({
    college: data.college || "",
    techStack: data.techStack || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    localStorage.setItem("info", JSON.stringify([...JSON.parse(localStorage.getItem("info") || "[]"), formData]))
    onSubmit(formData)
  }

  const handleTechStackChange = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter((t: string) => t !== tech)
        : [...prev.techStack, tech],
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="college" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          College (Optional)
        </label>
        <input
          id="college"
          type="text"
          value={formData.college}
          onChange={(e) => setFormData({ ...formData, college: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tech Stack (Optional, multi-select)
        </label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {techStacks.map((tech) => (
            <label key={tech} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.techStack.includes(tech)}
                onChange={() => handleTechStackChange(tech)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{tech}</span>
            </label>
          ))}
        </div>
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Submit</button>
    </form>
  )
}

