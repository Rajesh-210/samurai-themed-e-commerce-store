import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authAPI } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    localStorage.removeItem('bushido_token')
    localStorage.removeItem('bushido_user')
    setUser(null)
    setToken(null)
  }, [])

  // Initialize from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('bushido_token')
    const storedUser = localStorage.getItem('bushido_user')
    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch {
        logout()
      }
    }
    setIsLoading(false)
  }, [logout])

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password })
    const { access_token, user: userData } = res.data
    localStorage.setItem('bushido_token', access_token)
    localStorage.setItem('bushido_user', JSON.stringify(userData))
    setToken(access_token)
    setUser(userData)
  }

  const register = async (username, email, password) => {
    const res = await authAPI.register({ username, email, password })
    const { access_token, user: userData } = res.data
    localStorage.setItem('bushido_token', access_token)
    localStorage.setItem('bushido_user', JSON.stringify(userData))
    setToken(access_token)
    setUser(userData)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
