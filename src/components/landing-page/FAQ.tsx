'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { fadeInAnimation } from '@/utils/fadeInAnimation'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update and render them when data changes."
  },
  {
    question: "What are the key features of React?",
    answer: "Key features of React include: Virtual DOM for improved performance, Component-based architecture, JSX syntax, Unidirectional data flow, and React Hooks for state management in functional components."
  },
  {
    question: "What is JSX?",
    answer: "JSX is a syntax extension for JavaScript, recommended for use with React. It allows you to write HTML-like code within JavaScript, making it easier to describe what the UI should look like."
  },
  {
    question: "What are React Hooks?",
    answer: "React Hooks are functions that allow you to 'hook into' React state and lifecycle features from function components. They enable you to use state and other React features without writing a class component."
  }
]

const FAQItem: React.FC<{ item: FAQItem, isOpen: boolean, toggleOpen: () => void }> = ({ item, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-800">
      <button
        className="flex justify-between items-center w-full py-4 text-left transition-colors duration-300 hover:text-white"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="text-md font-medium">{item.question}</span>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInAnimation}
            className="pb-4 text-gray-400"
          >
            <p>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full overflow-scroll h-full mx-auto  rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
      <motion.div 
        className="space-y-1 overflow-scroll"
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0 },
          animate: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {faqData.map((item, index) => (
          <motion.div key={index} variants={fadeInAnimation}>
            <FAQItem
              item={item}
              isOpen={openIndex === index}
              toggleOpen={() => toggleOpen(index)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default FAQ

