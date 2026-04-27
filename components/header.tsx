"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const { user, logout } = useAuth()

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      case "ROLE_PROVIDER":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      default:
        return "bg-green-500/10 text-green-600 border-green-500/20"
    }
  }

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SM</span>
          </div>
          <h1 className="text-xl font-bold">Service Marketplace</h1>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Welcome, <span className="font-medium text-foreground">{user.firstName + " " + user.lastName}</span>
              </span>
              {user.roles?.map((role: string, index: number) => (
                <Badge key={index} variant="outline" className={getRoleBadgeColor(role)}>
                  {role}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
