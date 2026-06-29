import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { cartAPI } from '../api/client'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const CartContext = createContext(null)

const CART_KEY = 'bushido_cart'

function getLocalCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]')
  } catch {
    return []
  }
}
function saveLocalCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function CartProvider({ children }) {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchServerCart = useCallback(async () => {
    if (!token) return
    setIsLoading(true)
    try {
      const res = await cartAPI.get()
      setItems(res.data.items || [])
    } catch {
      // silent
    } finally {
      setIsLoading(false)
    }
  }, [token])

  // Load cart
  useEffect(() => {
    if (token) {
      fetchServerCart()
    } else {
      setItems(getLocalCart())
    }
  }, [token, fetchServerCart])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  const addItem = async (productId, quantity = 1) => {
    if (token) {
      try {
        const res = await cartAPI.addItem({ product_id: productId, quantity })
        setItems(res.data.items || [])
        toast.success('Added to cart ⚔️')
      } catch (err) {
        toast.error(err?.response?.data?.error || 'Could not add item')
      }
    } else {
      // Guest cart
      setItems((prev) => {
        const existing = prev.find((i) => i.product_id === productId)
        let next
        if (existing) {
          next = prev.map((i) =>
            i.product_id === productId ? { ...i, quantity: i.quantity + quantity } : i
          )
        } else {
          next = [
            ...prev,
            {
              id: productId,
              product_id: productId,
              name: 'Product',
              price: 0,
              quantity,
              image_key: '',
              stock: 99,
            },
          ]
        }
        saveLocalCart(next)
        return next
      })
      toast.success('Added to cart ⚔️')
    }
  }

  const updateItem = async (id, quantity) => {
    if (quantity <= 0) {
      return removeItem(id)
    }
    if (token) {
      try {
        const res = await cartAPI.updateItem(id, quantity)
        setItems(res.data.items || [])
      } catch (err) {
        toast.error(err?.response?.data?.error || 'Could not update')
      }
    } else {
      setItems((prev) => {
        const next = prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        saveLocalCart(next)
        return next
      })
    }
  }

  const removeItem = async (id) => {
    if (token) {
      try {
        const res = await cartAPI.removeItem(id)
        setItems(res.data.items || [])
        toast.success('Item removed')
      } catch (err) {
        toast.error(err?.response?.data?.error || 'Could not remove')
      }
    } else {
      setItems((prev) => {
        const next = prev.filter((i) => i.id !== id)
        saveLocalCart(next)
        return next
      })
      toast.success('Item removed')
    }
  }

  const clearCart = () => {
    setItems([])
    if (!token) saveLocalCart([])
  }

  const addBundle = async (bundleId) => {
    if (token) {
      try {
        const res = await cartAPI.addBundle(bundleId)
        setItems(res.data.items || [])
        toast.success('Bundle added to cart ⚔️')
      } catch (err) {
        toast.error(err?.response?.data?.error || 'Could not add bundle')
      }
    } else {
      toast.error('Please login to add bundles')
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        count,
        isLoading,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        addBundle,
        refetch: fetchServerCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
