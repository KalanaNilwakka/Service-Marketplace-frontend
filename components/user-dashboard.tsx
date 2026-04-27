"use client"

import { Header } from "@/components/header"
import { CategoriesList } from "@/components/categories-list"
import { useAuth } from "@/contexts/auth-context"

export function UserDashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Service Categories</h2>
          <p className="text-muted-foreground">
            {user?.roles?.includes("ROLE_PROVIDER")
              ? "Browse available service categories to offer your services."
              : "Explore service categories to find what you need."}
          </p>
        </div>
        <CategoriesList />
      </main>
    </div>
  )
}
