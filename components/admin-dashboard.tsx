"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CategoriesList } from "@/components/categories-list"
import { CategoryForm } from "@/components/category-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Category } from "@/contexts/categories-context"

export function AdminDashboard() {
  const [formOpen, setFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    setFormOpen(open)
    if (!open) {
      setEditingCategory(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Service Categories</h2>
            <p className="text-muted-foreground">
              Manage your service categories - add, edit, or remove them.
            </p>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
        <CategoriesList isAdmin onEdit={handleEdit} />
        <CategoryForm
          open={formOpen}
          onOpenChange={handleOpenChange}
          editingCategory={editingCategory}
        />
      </main>
    </div>
  )
}
