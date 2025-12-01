import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "../hooks/use-toast"

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const { toast } = useToast()

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

    const openCart = () => setIsCartOpen(true)
    const closeCart = () => setIsCartOpen(false)
    const toggleCart = () => setIsCartOpen((v) => !v)

    const addToCart = (product) => {
        const existingItem = cart.find((item) => item.id === product.id)
        setCart((prevCart) => {
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
        toast({
            title: existingItem ? "Cantidad actualizada" : "Producto agregado",
            description: existingItem
                ? `${product.titulo} cantidad incrementada en el carrito`
                : `${product.titulo} ha sido agregado al carrito`,
        })
    }

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const simulacionGenerica = (isFlag, setIsFlag, action = null, delay = 3000) => {
      if (isFlag) return Promise.reject(new Error("Operación en curso"))
      setIsFlag(true)
      return new Promise((resolve) => setTimeout(resolve, delay))
          .then(() => {
              if (typeof action === "function") {
                  return action()
              }
              return undefined
          })
          .finally(() => {
              setIsFlag(false)
          })
  }

    const simulacionFinalizacionCompra = (delay = 3000) =>
        simulacionGenerica(isProcessing, setIsProcessing, null, delay)

    return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
          isCartOpen,
          openCart,
          closeCart,
          toggleCart,
          isProcessing,
          simulacionGenerica,
          simulacionLLamadaAlBack: simulacionFinalizacionCompra,

      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}