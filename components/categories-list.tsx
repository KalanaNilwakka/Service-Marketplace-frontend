"use client"

import { useCategories, type Category } from "@/contexts/categories-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

interface CategoriesListProps {
  isAdmin?: boolean
  onEdit?: (category: Category) => void
}

export function CategoriesList({ isAdmin = false, onEdit }: CategoriesListProps) {
  const { categories, isLoading } = useCategories()

  if (isLoading) {
    return (
      <div className="col-span-full text-center py-12 text-muted-foreground">
        Loading categories...
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Card key={category.id} className="relative group">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="text-4xl mb-2">{category.icon}</div>
              {isAdmin && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit?.(category)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit {category.name}</span>
                  </Button>
                </div>
              )}
            </div>
            <CardTitle className="text-lg">{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{category.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
      {categories.length === 0 && (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          No categories available. {isAdmin && "Add one to get started!"}
        </div>
      )}
    </div>
  )
}
