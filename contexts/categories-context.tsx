"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

export interface Category {
  id: number
  name: string
  description: string
  icon: string
}

const iconMap: Record<string, string> = {
  home: "🏠",
  professional: "💼",
  health: "💪",
  education: "📚",
  tech: "💻",
  transportation: "🚗",
  food: "🍽️",
  arts: "🎨",
  maintenance: "🔧",
  communication: "📱",
  healthcare: "🏥",
  travel: "✈️"
}

const reverseIconMap = Object.fromEntries(
  Object.entries(iconMap).map(([key, value]) => [value, key])
)

interface CategoriesContextType {
  categories: Category[]
  addCategory: (name: string, description: string, icon: string) => void
  updateCategory: (id: number, category: Omit<Category, "id">) => void
  isLoading: boolean
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined)

const initialCategories: Category[] = []

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const fetchCategories = async () => {
      if (!user) {
        setCategories([])
        return
      }

      try {
        setIsLoading(true)
        const response = await fetch("http://localhost:8080/api/v1/categories", {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }
        const data = await response.json()
        const formattedCategories = data.map((cat: any) => ({
          id: cat.categoryId,
          name: cat.name,
          description: cat.description,
          icon: iconMap[cat.icon] || "🏷️"
        }))
        setCategories(formattedCategories)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [user])

  const addCategory = async (name: string, description: string, icon: string) => {
    try {
      const newCategory = await fetch("http://localhost:8080/api/v1/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({ name, description, icon: reverseIconMap[icon] })
      }).then(res => res.json())
      setCategories([...categories, { name, description, icon, id: newCategory.categoryId }])}
    catch (error) {
      console.error("Error adding category:", error)
    }
  }

  const updateCategory = (id: number, category: Omit<Category, "id">) => {
    try {
      fetch(`http://localhost:8080/api/v1/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(category)
      }).then(res => {
        if (!res.ok) {
          throw new Error("Failed to update category")
        }
        setCategories(categories.map(c => (c.id === id ? { ...c, ...category } : c)))
      })}
    catch (error) {
      console.error("Error updating category:", error)
    }
  }

  return (
    <CategoriesContext.Provider value={{ categories, addCategory, updateCategory, isLoading }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoriesContext)
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider")
  }
  return context
}
