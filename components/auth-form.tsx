"use client"

import { useState } from "react"
import { useAuth, type UserRole } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [role, setRole] = useState<string[]>(["ROLE_CONSUMER"])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (isLogin) {
        const result = await login(email, password)
        if (!result.success) {
          setError(result.error || "Login failed")
        }
      } else {
        const result = await signup(email, password, firstName, lastName, role)
        if (!result.success) {
          setError(result.error || "Signup failed")
          return
        }
        alert("Signup successful! Redirecting to login...")
        setIsLogin(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {isLogin ? "Sign In" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin
            ? "Enter your credentials to access your account"
            : "Fill in the details to create your account"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="role">Account Type</Label>
              <Select value={role[0]} onValueChange={(value: string) => setRole([value])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ROLE_CONSUMER">Consumer</SelectItem>
                  <SelectItem value="ROLE_PROVIDER">Service Provider</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="text-primary underline-offset-4 hover:underline"
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
              }}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
          {isLogin}
        </CardFooter>
      </form>
    </Card>
  )
}
