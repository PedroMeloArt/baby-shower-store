"use client"

import type React from "react"
import Image from "next/image"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronDown, ShoppingCart, X, Plus, Minus, Heart, Star, Gift, Zap, Shield, QrCode, Calendar, Clock, MapPin, Phone } from "lucide-react"
import { PixModal } from "@/components/pix-modal"

// Types
type Product = {
  id: number
  brand: string
  size: string
  count: string | number
  price: string
  category: string
  rating: number
  description: string
}

type CartItem = Product & {
  quantity: number
}

type PaymentMethod = "pix" | "card" | null

// Product Data
const products: Product[] = [
  // Recém-Nascido
  {
    id: 1,
    brand: "Pampers",
    size: "RN",
    count: 20,
    price: "R$ 25,90",
    category: "Fraldas",
    rating: 4.8,
    description: "Proteção premium para recém-nascidos",
  },
  {
    id: 2,
    brand: "Huggies",
    size: "RN",
    count: 22,
    price: "R$ 28,50",
    category: "Fraldas",
    rating: 4.7,
    description: "Suavidade e conforto garantidos",
  },
  {
    id: 3,
    brand: "MamyPoko",
    size: "RN",
    count: 24,
    price: "R$ 30,00",
    category: "Fraldas",
    rating: 4.6,
    description: "Absorção superior japonesa",
  },

  // Tamanho P
  {
    id: 4,
    brand: "Pampers",
    size: "P",
    count: 18,
    price: "R$ 32,90",
    category: "Fraldas",
    rating: 4.8,
    description: "Proteção premium para pequenos",
  },
  {
    id: 5,
    brand: "Huggies",
    size: "P",
    count: 20,
    price: "R$ 35,50",
    category: "Fraldas",
    rating: 4.7,
    description: "Conforto que acompanha o crescimento",
  },
  {
    id: 6,
    brand: "MamyPoko",
    size: "P",
    count: 22,
    price: "R$ 38,00",
    category: "Fraldas",
    rating: 4.6,
    description: "Tecnologia japonesa avançada",
  },

  // Tamanho M
  {
    id: 7,
    brand: "Pampers",
    size: "M",
    count: 16,
    price: "R$ 40,90",
    category: "Fraldas",
    rating: 4.8,
    description: "Proteção premium média",
  },
  {
    id: 8,
    brand: "Huggies",
    size: "M",
    count: 18,
    price: "R$ 42,50",
    category: "Fraldas",
    rating: 4.7,
    description: "Flexibilidade e proteção",
  },
  {
    id: 9,
    brand: "MamyPoko",
    size: "M",
    count: 20,
    price: "R$ 45,00",
    category: "Fraldas",
    rating: 4.6,
    description: "Absorção de longa duração",
  },

  // Tamanho G
  {
    id: 10,
    brand: "Pampers",
    size: "G",
    count: 14,
    price: "R$ 45,90",
    category: "Fraldas",
    rating: 4.8,
    description: "Proteção premium grande",
  },
  {
    id: 11,
    brand: "Huggies",
    size: "G",
    count: 16,
    price: "R$ 48,50",
    category: "Fraldas",
    rating: 4.7,
    description: "Liberdade de movimento",
  },

  // Kits
  {
    id: 12,
    brand: "Kit Misto",
    size: "Variado",
    count: "3 pacotes",
    price: "R$ 95,00",
    category: "Kits",
    rating: 4.9,
    description: "Combinação perfeita de marcas",
  },
  {
    id: 13,
    brand: "Kit Crescimento",
    size: "P+M+G",
    count: "3 pacotes",
    price: "R$ 120,00",
    category: "Kits",
    rating: 4.9,
    description: "Acompanha todo o crescimento",
  },
]

const brandTabs = ["Todas", "Pampers", "Huggies", "MamyPoko", "Kits"]
const sortOptions = [
  { value: "name-asc", label: "Nome A-Z" },
  { value: "name-desc", label: "Nome Z-A" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "rating", label: "Melhor avaliação" },
]

const ProductCard = ({
  product,
  onAddToCart,
  cartItems,
  onUpdateQuantity,
}: { 
  product: Product
  onAddToCart: (product: Product) => void
  cartItems: CartItem[]
  onUpdateQuantity: (productId: number, newQuantity: number) => void
}) => {
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantityInCart = cartItem?.quantity || 0;
  

  return (
    <Card className="group bg-card border border-primary/10 hover:border-primary/20 hover-lift bg-boutique-shadow hover:bg-boutique-shadow-lg transition-all duration-300 overflow-hidden backdrop-luxury h-full flex flex-col">
      <div className="aspect-square bg-gradient-to-br from-accent/30 via-primary/5 to-accent/20 relative flex items-center justify-center">
        {/* Elegant background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,hsl(345,20%,96%)_100%)] opacity-30"></div>
        
        {/* Product image placeholder with luxury styling */}
        <div className="relative">
          <div className="text-6xl text-primary/30 group-hover:scale-110 transition-transform duration-500 ease-out">📦</div>
          <div className="absolute inset-0 text-6xl text-primary/10 blur-sm group-hover:scale-105 transition-transform duration-500">📦</div>
        </div>
        
        {/* Subtle size badge */}
        <div className="absolute top-4 right-4 text-sm font-medium text-muted-foreground/70">
          {product.size}
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-xl text-premium leading-tight">{product.brand}</h3>
        </div>

        <p className="text-sm text-muted-foreground mb-4 font-body-luxury leading-relaxed flex-1 min-h-[2.5rem]">{product.description}</p>

        <p className="text-sm text-muted-foreground mb-6 font-body-luxury font-medium opacity-80">
          {typeof product.count === "number" ? `${product.count} unidades` : product.count}
        </p>

        <div className="flex items-center justify-between mt-auto relative z-10">
          <span className="text-2xl font-display font-medium text-premium">{product.price}</span>
          
          <div className="relative z-20">
            {quantityInCart === 0 ? (
              <button
                className="bg-rose-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors"
                onClick={() => onAddToCart(product)}
                style={{
                  backgroundColor: '#9f1239',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Adicionar
              </button>
            ) : (
              <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg px-1 py-0.5">
                <button
                  className="w-6 h-6 bg-gray-100 rounded text-sm flex items-center justify-center"
                  onClick={() => onUpdateQuantity(product.id, quantityInCart - 1)}
                  style={{ cursor: 'pointer' }}
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-sm">{quantityInCart}</span>
                <button
                  className="w-6 h-6 bg-gray-100 rounded text-sm flex items-center justify-center"
                  onClick={() => onUpdateQuantity(product.id, quantityInCart + 1)}
                  style={{ cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="group text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-accent/40 via-primary/10 to-accent/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 bg-boutique-shadow-lg border border-primary/10 backdrop-luxury hover-lift">
        {icon}
      </div>
      <h3 className="text-xl font-display text-premium mb-4">{title}</h3>
      <p className="text-sm text-muted-foreground font-body-luxury leading-relaxed">{description}</p>
    </div>
  )
}

export default function DiaperStore() {
  const [activeFilter, setActiveFilter] = useState("Todas")
  const [sortBy, setSortBy] = useState("name-asc")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [showPixModal, setShowPixModal] = useState(false)
  const [isProcessingCard, setIsProcessingCard] = useState(false)


  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setCart((prevCart) => 
        prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
      )
    }
  }

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("R$ ", "").replace(",", "."))
      return total + price * item.quantity
    }, 0)
  }, [cart])

  const cartItemsCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  const filteredProducts = useMemo(() => {
    const filtered =
      activeFilter === "Todas"
        ? products
        : products.filter((product) => {
            if (activeFilter === "Kits") {
              return product.category === "Kits"
            }
            return product.brand === activeFilter
          })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.brand.localeCompare(b.brand)
        case "name-desc":
          return b.brand.localeCompare(a.brand)
        case "price-asc":
          const priceA = Number.parseFloat(a.price.replace("R$ ", "").replace(",", "."))
          const priceB = Number.parseFloat(b.price.replace("R$ ", "").replace(",", "."))
          return priceA - priceB
        case "price-desc":
          const priceA2 = Number.parseFloat(a.price.replace("R$ ", "").replace(",", "."))
          const priceB2 = Number.parseFloat(b.price.replace("R$ ", "").replace(",", "."))
          return priceB2 - priceA2
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })
  }, [activeFilter, sortBy])

  // Group products by category
  const groupedProducts = useMemo(() => {
    if (activeFilter !== "Todas") {
      return [{ category: activeFilter, products: filteredProducts }]
    }

    const categoryLabels: Record<string, string> = {
      "Fraldas": "Fraldas",
      "Kits": "Kits"
    }

    const groups: Record<string, typeof products> = {}
    
    filteredProducts.forEach((product) => {
      if (!groups[product.category]) {
        groups[product.category] = []
      }
      groups[product.category].push(product)
    })

    return Object.entries(groups).map(([category, products]) => ({
      category: categoryLabels[category] || category,
      products
    }))
  }, [filteredProducts, activeFilter])

  return (
    <div className="min-h-screen bg-luxury-gradient">
      {/* Hero Section */}
      <header className="relative bg-luxury-gradient min-h-screen px-6 overflow-hidden flex items-center">
        {/* Hero Section - Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(345,40%,94%)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(340,60%,92%)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,hsl(350,30%,95%)_0%,transparent_50%)]"></div>
        </div>

        {/* Hero Section - Floating Decorative Elements */}
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-primary/15 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-primary/25 rounded-full animate-float" style={{animationDelay: '4s'}}></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              {/* Hero Section - Brand Mark */}
              <div className="flex items-center gap-3 text-primary/60">
                <div className="w-8 h-px bg-primary/30"></div>
                <span className="text-sm font-medium tracking-[0.2em] uppercase">Baby boutique</span>
                <div className="w-8 h-px bg-primary/30"></div>
              </div>

              <div className="space-y-8">
                <h1 className="text-7xl lg:text-8xl font-display text-premium text-balance leading-[0.9] tracking-[-0.02em]">
                  Fraldas para
                  <span className="block text-luxury-gradient font-medium">
                    Sophia
                  </span>
                </h1>
                <p className="text-2xl text-muted-foreground font-body-luxury leading-relaxed max-w-lg">
                  Uma lista de presentes selecionados com carinho para nossa pequena princesa
                </p>
              </div>


            </div>

            {/* Hero Section - Main Image Area */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/5 via-accent/10 to-primary/8 rounded-[2rem] flex items-center justify-center bg-boutique-shadow-xl border border-primary/10 overflow-hidden">
                {/* Elegant overlay pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(345,20%,96%)_70%)] opacity-50"></div>
                
                {/* Main image with luxury styling */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/baby-shower-store/Sophia-Gemini.png"
                    alt="Sophia - Beautiful baby portrait"
                    width={400}
                    height={400}
                    className="object-cover rounded-2xl shadow-2xl animate-float"
                    style={{
                      filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))',
                    }}
                  />
                  {/* Elegant overlay for extra luxury effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 rounded-2xl"></div>
                </div>
              </div>
              
              {/* Sophisticated floating decorations */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl backdrop-luxury border border-primary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary/50" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl backdrop-luxury border border-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary/50" />
              </div>
              <div className="absolute top-1/4 -left-4 w-8 h-8 bg-gradient-to-br from-primary/15 to-accent/15 rounded-xl backdrop-luxury border border-primary/10"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Products Section with Sticky Filter */}
      <div className="relative">
        {/* Filter Bar - Sticky until end of Products section */}
        <section className="py-8 px-6 bg-card/80 backdrop-luxury border-b border-primary/10 bg-boutique-shadow sticky top-0 z-30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {brandTabs.map((tab) => (
                  <Button
                    key={tab}
                    variant={activeFilter === tab ? "default" : "ghost"}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-6 py-3 font-medium transition-all duration-300 rounded-xl hover-lift ${
                      activeFilter === tab
                        ? "!bg-rose-800 !text-white !border-rose-800 bg-boutique-shadow-lg border-2"
                        : "text-gray-600 hover:text-rose-800 hover:bg-rose-50 border-2 border-transparent hover:border-rose-300"
                    }`}
                    style={activeFilter === tab ? {
                      backgroundColor: '#9f1239',
                      color: '#ffffff',
                      borderColor: '#9f1239'
                    } : {}}
                  >
                    {tab}
                  </Button>
                ))}
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-card border border-primary/20 rounded-xl px-6 py-3 pr-12 font-medium text-premium hover:border-primary/30 focus:outline-none focus:ring-2 ring-luxury focus:border-primary/40 transition-all duration-200 bg-boutique-shadow hover-lift backdrop-luxury"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Products Content */}
        <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-px bg-primary/30"></div>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">produtos</span>
              <div className="w-8 h-px bg-primary/30"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-display text-premium mb-6">Produtos</h2>
            <p className="text-lg text-muted-foreground font-body-luxury max-w-2xl mx-auto leading-relaxed">
              Produtos premium escolhidos especialmente para Sophia
            </p>
          </div>

          <div className="space-y-16">
            {groupedProducts.map((group, groupIndex) => (
              <div key={group.category}>
                {/* Category Header with Separator */}
                <div className="mb-8">
                  <div className="flex items-center gap-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-primary/20"></div>
                    <h3 className="text-2xl font-display text-premium px-4">
                      {group.category}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/20 to-primary/20"></div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {group.products.map((product) => {
                    const cartItem = cart.find(item => item.id === product.id);
                    const quantityInCart = cartItem?.quantity || 0;
                    return (
                      <ProductCard 
                        key={`${product.id}-${quantityInCart}`}
                        product={product} 
                        onAddToCart={addToCart}
                        cartItems={cart}
                        onUpdateQuantity={updateQuantity}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>
      </div>

      {/* Why Use This Site Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-card to-accent/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-px bg-primary/30"></div>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">Baby Boutique</span>
              <div className="w-8 h-px bg-primary/30"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display text-premium mb-4">Por Que este Site?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Gift className="w-6 h-6 text-primary" />}
              title="Sem Erros ou Surpresas"
              description="Você contribui online, nós compramos exatamente o que precisamos dos tipos e tamanhos certos."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="Praticidade Total"
              description="Sem ir à loja, sem adivinhar a fralda certa. Sua contribuição é rápida e sem preocupação!"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-primary" />}
              title="Tranquilidade para Nós"
              description="Garantimos as fraldas certas e evitamos a correria de coordenar quem traz o quê."
            />
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-px bg-primary/30"></div>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">dúvidas</span>
              <div className="w-8 h-px bg-primary/30"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display text-premium mb-4">Perguntas Frequentes</h2>
            <p className="text-base text-muted-foreground font-body-luxury leading-relaxed">
              Esclarecemos suas dúvidas principais
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-primary/10 rounded-2xl bg-boutique-shadow backdrop-luxury">
              <AccordionTrigger className="px-6 py-6 text-left font-display text-premium hover:no-underline text-lg">
                Como funciona a contribuição?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground font-body-luxury leading-relaxed text-base">
                Você escolhe o produto que deseja presentear e contribui com o valor equivalente. Nós usamos as contribuições para comprar as fraldas nas lojas, garantindo que a Sophia receba exatamente o que precisa!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-primary/10 rounded-2xl bg-boutique-shadow backdrop-luxury">
              <AccordionTrigger className="px-6 py-6 text-left font-display text-premium hover:no-underline text-lg">
                Os preços são reais?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground font-body-luxury leading-relaxed text-base">
                Sim! Todos os preços são baseados em lojas reais. Sua contribuição vai direto para a compra das fraldas nos tamanhos e marcas que mais precisamos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-primary/10 rounded-2xl bg-boutique-shadow backdrop-luxury">
              <AccordionTrigger className="px-6 py-6 text-left font-display text-premium hover:no-underline text-lg">
                Como os pais sabem quem contribuiu?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground font-body-luxury leading-relaxed text-base">
                Após sua contribuição, registramos seu nome e manteremos os pais informados sobre quem participou com carinho do chá de fraldas da Sophia!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-primary/10 rounded-2xl bg-boutique-shadow backdrop-luxury">
              <AccordionTrigger className="px-6 py-6 text-left font-display text-premium hover:no-underline text-lg">
                Preciso levar algo no dia do evento?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground font-body-luxury leading-relaxed text-base">
                Não! Essa é a melhor parte - sua contribuição online já está completa. Venha ao evento apenas para celebrar e se divertir, sem preocupações!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* About The Event & Contact Section */}
      <footer className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-10">
            {/* Event Title */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="w-8 h-px bg-primary-foreground/30"></div>
                <span className="text-sm font-medium tracking-[0.3em] uppercase opacity-80">Sobre o Evento</span>
                <div className="w-8 h-px bg-primary-foreground/30"></div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-display text-luxury-gradient">
                Chá de Fraldas da Sophia
              </h3>
            </div>

            {/* Event Details Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Date */}
              <div className="flex flex-col items-center gap-3 p-6 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm border border-primary-foreground/20">
                <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-80 mb-1">Data</p>
                  <p className="text-lg font-display font-medium">25 de Outubro</p>
                  <p className="text-sm opacity-70">Sábado, 2025</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex flex-col items-center gap-3 p-6 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm border border-primary-foreground/20">
                <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-80 mb-1">Horário</p>
                  <p className="text-lg font-display font-medium">15:30</p>
                  <p className="text-sm opacity-70">Tarde</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col items-center gap-3 p-6 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm border border-primary-foreground/20">
                <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-80 mb-1">Local</p>
                  <p className="text-base font-display font-medium">Edf. Villa Damasco</p>
                  <p className="text-sm opacity-70">Salão de Festas</p>
                </div>
              </div>
            </div>

            {/* Address with Map Link */}
            <div className="space-y-5">
              <p className="text-base font-body-luxury opacity-90 leading-relaxed">
                Rua Tibúrcio Cavalcante, 255 - Meireles
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rua+Tibúrcio+Cavalcante,+255+-+Meireles+-+Fortaleza+-+CE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-body-luxury opacity-75 hover:opacity-100 transition-opacity duration-300 group"
              >
                <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="border-b border-primary-foreground/30 group-hover:border-primary-foreground/60 transition-colors">
                  Ver localização
                </span>
              </a>
            </div>

            {/* Contact Section */}
            <div className="pt-8 border-t border-primary-foreground/20">
              <div className="space-y-3">
                <p className="text-sm font-body-luxury opacity-70 tracking-wide">
                  Dúvidas ou informações
                </p>
                <a
                  href="https://api.whatsapp.com/send/?phone=5585997986787"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-lg font-display font-medium opacity-90 hover:opacity-100 transition-opacity duration-300 group"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>(85) 99798-6787</span>
                </a>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="flex items-center justify-center gap-6 pt-6">
              <div className="w-6 h-6 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                <Gift className="w-3 h-3" />
              </div>
              <div className="w-8 h-8 bg-primary-foreground/15 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <div className="w-6 h-6 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-card rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden bg-boutique-shadow-xl border border-primary/10 backdrop-luxury">
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <div className="space-y-1">
                <h2 className="text-2xl font-display text-premium">Carrinho</h2>
                <p className="text-sm text-muted-foreground">Produtos selecionados com carinho</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(false)}
                className="text-muted-foreground hover:text-premium hover:bg-accent/50 rounded-2xl p-3 hover-lift"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
              {cart.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <div className="w-16 h-16 bg-accent/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-6 h-6 text-primary/50" />
                  </div>
                  <h3 className="text-lg font-display text-premium mb-2">Carrinho Vazio</h3>
                  <p className="text-sm font-body-luxury">Adicione produtos para continuar</p>
                </div>
              ) : (
                <>
                  <div className="p-8 space-y-6">
                    {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-6 p-6 border border-primary/10 rounded-2xl bg-accent/20 backdrop-luxury hover-lift">
                      <div className="w-20 h-20 bg-gradient-to-br from-accent/40 via-primary/10 to-accent/30 rounded-2xl flex items-center justify-center bg-boutique-shadow">
                        <div className="text-3xl">📦</div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-display text-lg text-premium">{item.brand}</h3>
                        <p className="text-sm text-muted-foreground font-body-luxury">Tamanho {item.size}</p>
                        <p className="text-sm text-muted-foreground font-body-luxury">
                          {typeof item.count === "number" ? `${item.count} unidades` : item.count}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 p-0 rounded-2xl border-primary/20 hover:border-primary/30 bg-card hover-lift"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center text-premium font-medium text-lg">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 p-0 rounded-2xl border-primary/20 hover:border-primary/30 bg-card hover-lift"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-display text-xl text-premium">{item.price}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-primary text-sm font-body-luxury hover-lift"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-primary/10 p-8">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-2xl font-display text-premium">Total:</span>
                  <span className="text-3xl font-display text-premium">
                    R$ {cartTotal.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-display text-premium mb-4">Forma de Pagamento</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={paymentMethod === "pix" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("pix")}
                      className={`p-6 h-auto flex flex-col items-center gap-3 rounded-2xl hover-lift transition-all duration-300 ${
                        paymentMethod === "pix"
                          ? "!bg-rose-800 !text-white bg-boutique-shadow-lg border-2 !border-rose-800"
                          : "border-2 border-rose-200 text-rose-700 hover:bg-rose-50 bg-card backdrop-luxury hover:text-rose-800"
                      }`}
                      style={paymentMethod === "pix" ? {
                        backgroundColor: '#9f1239',
                        color: '#ffffff',
                        borderColor: '#9f1239'
                      } : {}}
                    >
                      <QrCode className="w-8 h-8" />
                      <span className="font-display text-lg">PIX</span>
                      <span className="text-xs opacity-75">Instantâneo</span>
                    </Button>
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("card")}
                      className={`p-6 h-auto flex flex-col items-center gap-3 rounded-2xl hover-lift transition-all duration-300 ${
                        paymentMethod === "card"
                          ? "!bg-rose-800 !text-white bg-boutique-shadow-lg border-2 !border-rose-800"
                          : "border-2 border-rose-200 text-rose-700 hover:bg-rose-50 bg-card backdrop-luxury hover:text-rose-800"
                      }`}
                      style={paymentMethod === "card" ? {
                        backgroundColor: '#9f1239',
                        color: '#ffffff',
                        borderColor: '#9f1239'
                      } : {}}
                    >
                      <div className="text-3xl">💳</div>
                      <span className="font-display text-lg">Cartão</span>
                      <span className="text-xs opacity-75">Crédito/Débito</span>
                    </Button>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="mb-6 p-4 border border-primary/20 rounded-2xl bg-accent/20 backdrop-luxury">
                    <h4 className="font-display text-base text-premium mb-3">Dados do Cartão</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-card border border-primary/10 rounded-xl text-sm text-muted-foreground bg-boutique-shadow">
                        🔒 Processamento seguro via Stripe
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Dados protegidos com criptografia bancária
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "pix" && (
                  <div className="mb-6 p-4 border border-primary/20 rounded-2xl bg-accent/20 backdrop-luxury">
                    <h4 className="font-display text-base text-premium mb-3">Pagamento PIX</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Você receberá o código PIX após confirmar
                    </p>
                  </div>
                )}

                <Button 
                  className="w-full !bg-rose-800 hover:!bg-rose-700 !text-white py-4 rounded-2xl font-display text-lg bg-boutique-shadow hover:bg-boutique-shadow-lg transition-all duration-300 hover-lift border-2 !border-rose-600 disabled:!bg-gray-400 disabled:!text-gray-200 disabled:!border-gray-400 disabled:cursor-not-allowed" 
                  disabled={!paymentMethod || isProcessingCard}
                  onClick={async () => {
                    if (paymentMethod === 'pix') {
                      setShowPixModal(true);
                    } else if (paymentMethod === 'card') {
                      setIsProcessingCard(true);
                      try {
                        // Call Vercel serverless function (deployed separately)
                        const VERCEL_API_URL = 'https://baby-shower-stripe.vercel.app/api/create-checkout';
                        
                        const response = await fetch(VERCEL_API_URL, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            amount: cartTotal,
                            items: cart,
                            customerName: '', // Optional: add name input field
                            customerEmail: '', // Optional: add email input field
                          }),
                        });

                        if (!response.ok) {
                          throw new Error('Failed to create checkout session');
                        }

                        const data = await response.json();
                        
                        // Redirect to Stripe Checkout with preset amount
                        if (data.url) {
                          window.location.href = data.url;
                        }
                      } catch (error) {
                        console.error('Stripe checkout error:', error);
                        alert('Erro ao processar pagamento. Tente novamente.');
                        setIsProcessingCard(false);
                      }
                    }
                  }}
                  style={!paymentMethod ? {} : {
                    backgroundColor: '#9f1239',
                    color: '#ffffff',
                    borderColor: '#9f1239'
                  }}
                >
                  {isProcessingCard 
                    ? "Processando..."
                    : paymentMethod === "pix"
                      ? "Gerar PIX"
                      : paymentMethod === "card"
                        ? "Finalizar Compra"
                        : "Selecione a forma de pagamento"}
                </Button>
              </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-10 right-10 z-40">
        <Button
          onClick={() => setIsCartOpen(true)}
          className="!bg-rose-800 hover:!bg-rose-700 !text-white relative bg-boutique-shadow-xl hover:bg-boutique-shadow-2xl transition-all duration-500 px-8 py-4 rounded-2xl group backdrop-luxury border-2 border-rose-600"
          style={{
            backgroundColor: '#9f1239',
            color: '#ffffff',
            borderColor: '#9f1239'
          }}
        >
          <ShoppingCart className="w-6 h-6 mr-4 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium text-base">Carrinho</span>
          {cartItemsCount > 0 && (
            <div 
              className="absolute -top-2 -right-2 min-w-[24px] h-6 bg-red-600 text-white text-sm font-bold flex items-center justify-center rounded-full border-2 border-white shadow-lg"
              style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '12px',
                lineHeight: '1',
                zIndex: 100,
                minWidth: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {cartItemsCount}
            </div>
          )}
        </Button>
      </div>

      {/* Pix Modal */}
      <PixModal
        isOpen={showPixModal}
        onClose={() => setShowPixModal(false)}
        amount={cartTotal}
        orderItems={cart}
      />
    </div>
  )
}
