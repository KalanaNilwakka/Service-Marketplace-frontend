"use client"

import { useState, useEffect } from "react"
import { useCategories, type Category } from "@/contexts/categories-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CategoryFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingCategory?: Category | null
}

const iconOptions = ["🏠", "💼", "💪", "📚", "💻", "🚗", "🍽️", "🎨", "🔧", "📱", "🏥", "✈️"]

export function CategoryForm({ open, onOpenChange, editingCategory }: CategoryFormProps) {
  const { addCategory, updateCategory } = useCategories()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("🏠")

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name)
      setDescription(editingCategory.description)
      setIcon(editingCategory.icon)
    } else {
      setName("")
      setDescription("")
      setIcon("🏠")
    }
  }, [editingCategory, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory) {
      updateCategory(editingCategory.id, { name, description, icon })
    } else {
      addCategory(name, description, icon)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {editingCategory
              ? "Update the category details below."
              : "Fill in the details for the new service category."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`text-2xl p-2 rounded-lg border-2 transition-colors ${
                      icon === opt
                        ? "border-primary bg-primary/10"
                        : "border-transparent hover:border-muted"
                    }`}
                    onClick={() => setIcon(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g., Home Services"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the category..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingCategory ? "Save Changes" : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
