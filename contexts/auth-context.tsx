"use client"

import { error } from "console"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "ROLE_ADMIN" | "ROLE_PROVIDER" | "ROLE_CONSUMER"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, firstName: string, lastName: string, roles: string[]) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database (in a real app, this would be a database)
const mockUsers: (User & { password: string })[] = [
  { id: "1", email: "admin@example.com", password: "admin123", firstName: "Admin", lastName: "User", roles: ["ROLE_ADMIN"] },
  { id: "2", email: "provider@example.com", password: "provider123", firstName: "Service", lastName: "Provider", roles: ["ROLE_PROVIDER"] },
  { id: "3", email: "consumer@example.com", password: "consumer123", firstName: "Consumer", lastName: "User", roles: ["ROLE_CONSUMER"] },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState(mockUsers)

  useEffect(() => {
    // Check for existing session
    const storedUser = sessionStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try{
      const response = await fetch("http://localhost:8080/api/v1/noauth/signin",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      if(!response.ok)
        return {success: false, error: "Invalid username or password"}

      const data = await response.json();

      sessionStorage.setItem("token", data.token)
      console.log("Logged in user:", {id: data.id, email: data.email, firstName: data.firstName, lastName: data.lastName, role: data.role})
      setUser({id: data.id, email: data.email, firstName: data.firstName, lastName: data.lastName, roles: data.roles})
      return {success: true}

    } catch(error) {
      return {success: false, error: "Something went wrong"}
    }
  }

  const signup = async (email: string, password: string, firstName: string, lastName: string, roles: string[]) => {
    try{
      const response = await fetch("http://localhost:8080/api/v1/noauth/signup",{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          roles,
          password
        })
      })

      const data = await response.json();

      if(!response.ok){
        const message = data.map((e:any) => e.message).join(", ")
        return {success: false, error: message}
      }

      return {success: true}
      
    } catch (error){
      return {success:false, error: "Something went wrong"}
    }
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem("userId")
    sessionStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
