"use client"

import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { CategoriesProvider } from "@/contexts/categories-context"
import { AuthForm } from "@/components/auth-form"
import { AdminDashboard } from "@/components/admin-dashboard"
import { UserDashboard } from "@/components/user-dashboard"

function AppContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-2xl">SM</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Service Marketplace</h1>
          <p className="text-muted-foreground">
            Your one-stop platform for finding and offering services
          </p>
        </div>
        <AuthForm />
      </div>
    )
  }

  if (user?.roles?.includes("ROLE_ADMIN")) {
    return <AdminDashboard />
  }

  return <UserDashboard />
}

export default function HomePage() {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <AppContent />
      </CategoriesProvider>
    </AuthProvider>
  )
}
