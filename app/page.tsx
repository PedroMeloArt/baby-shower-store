"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ShoppingCart, X, Plus, Minus, CreditCard, Heart, Star, Gift, Zap, Shield } from "lucide-react"

const products = [
  // Recém-Nascido
  {
    id: 1,
    brand: "Pampers",
    size: "RN",
    count: 20,
    price: "R$ 25,90",
    category: "RN",
    rating: 4.8,
    description: "Proteção premium para recém-nascidos",
  },
  {
    id: 2,
    brand: "Huggies",
    size: "RN",
    count: 22,
    price: "R$ 28,50",
    category: "RN",
    rating: 4.7,
    description: "Suavidade e conforto garantidos",
  },
  {
    id: 3,
    brand: "MamyPoko",
    size: "RN",
    count: 24,
    price: "R$ 30,00",
    category: "RN",
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
    category: "P",
    rating: 4.8,
    description: "Proteção premium para pequenos",
  },
  {
    id: 5,
    brand: "Huggies",
    size: "P",
    count: 20,
    price: "R$ 35,50",
    category: "P",
    rating: 4.7,
    description: "Conforto que acompanha o crescimento",
  },
  {
    id: 6,
    brand: "MamyPoko",
    size: "P",
    count: 22,
    price: "R$ 38,00",
    category: "P",
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
    category: "M",
    rating: 4.8,
    description: "Proteção premium média",
  },
  {
    id: 8,
    brand: "Huggies",
    size: "M",
    count: 18,
    price: "R$ 42,50",
    category: "M",
    rating: 4.7,
    description: "Flexibilidade e proteção",
  },
  {
    id: 9,
    brand: "MamyPoko",
    size: "M",
    count: 20,
    price: "R$ 45,00",
    category: "M",
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
    category: "G",
    rating: 4.8,
    description: "Proteção premium grande",
  },
  {
    id: 11,
    brand: "Huggies",
    size: "G",
    count: 16,
    price: "R$ 48,50",
    category: "G",
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

type CartItem = {
  id: number
  brand: string
  size: string
  count: string | number
  price: string
  quantity: number
  description?: string
}

type PaymentMethod = "pix" | "card" | null

const ProductCard = ({
  product,
  onAddToCart,
}: { product: (typeof products)[0]; onAddToCart: (product: (typeof products)[0]) => void }) => {
  return (
    <Card className="group bg-white border border-rose-200 hover:border-rose-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-rose-50 to-pink-50 relative flex items-center justify-center">
        <div className="text-6xl text-rose-300 group-hover:scale-110 transition-transform duration-300">📦</div>
        <Badge className="absolute top-4 right-4 bg-rose-800 text-white text-xs font-medium shadow-sm">
          {product.size}
        </Badge>
        <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-gray-700">{product.rating}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-rose-900 text-lg">{product.brand}</h3>
        </div>

        <p className="text-sm text-rose-600 mb-2 leading-relaxed">{product.description}</p>

        <p className="text-sm text-rose-500 mb-4 font-medium">
          {typeof product.count === "number" ? `${product.count} unidades` : product.count}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-rose-900">{product.price}</span>
          <Button
            size="sm"
            className="bg-rose-800 hover:bg-rose-700 text-white px-6 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-200"
            onClick={() => onAddToCart(product)}
          >
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </Card>
  )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="group text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-rose-900 mb-4">{title}</h3>
      <p className="text-rose-600 leading-relaxed">{description}</p>
    </div>
  )
}

export default function DiaperStore() {
  const [activeFilter, setActiveFilter] = useState("Todas")
  const [sortBy, setSortBy] = useState("name-asc")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)

  const addToCart = (product: (typeof products)[0]) => {
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
      setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <header className="relative bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fillRule=%22evenodd%22%3E%3Cg%20fill=%22#f9a8d4%22%20fillOpacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-light text-rose-800 text-balance leading-tight tracking-tight">
                  fraldas para
                  <span className="block font-medium bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    sophia
                  </span>
                </h1>
                <p className="text-xl text-rose-600 font-light leading-relaxed max-w-lg">
                  Uma seleção cuidadosa de produtos premium para nossa pequena princesa
                </p>
              </div>

              <div className="flex items-center gap-8 text-rose-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                  <span className="font-medium">25 de outubro</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                  <span className="font-medium">fortaleza</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Badge
                  variant="outline"
                  className="border-rose-300 text-rose-700 bg-white/80 px-6 py-3 text-sm font-medium shadow-sm"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  entrega direta
                </Badge>
                <Badge
                  variant="outline"
                  className="border-rose-300 text-rose-700 bg-white/80 px-6 py-3 text-sm font-medium shadow-sm"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  pagamento seguro
                </Badge>
                <Badge
                  variant="outline"
                  className="border-rose-300 text-rose-700 bg-white/80 px-6 py-3 text-sm font-medium shadow-sm"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  troca garantida
                </Badge>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-9xl text-rose-400/40 animate-pulse">👶</div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-300 rounded-full opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-rose-300 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-8 px-4 bg-white/80 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {brandTabs.map((tab) => (
                <Button
                  key={tab}
                  variant="ghost"
                  onClick={() => setActiveFilter(tab)}
                  className={`px-6 py-3 text-sm font-medium transition-all duration-200 rounded-full ${
                    activeFilter === tab
                      ? "bg-rose-800 text-white shadow-md"
                      : "text-rose-600 hover:text-rose-900 hover:bg-rose-100"
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-rose-200 rounded-xl px-6 py-3 pr-12 text-sm font-medium text-rose-700 hover:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors shadow-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-rose-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-rose-900 mb-4">produtos selecionados</h2>
            <p className="text-rose-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Cada produto foi cuidadosamente escolhido pensando no conforto e bem-estar da pequena Sophia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-rose-900 mb-6">por que escolher nossa curadoria</h2>
            <p className="text-rose-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Facilitamos sua participação no chá de fraldas com um processo simples, seguro e carinhoso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <FeatureCard
              icon={<Gift className="w-8 h-8 text-rose-600" />}
              title="entrega cuidadosa"
              description="Enviamos diretamente aos pais com uma mensagem personalizada e seu nome como remetente"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-rose-600" />}
              title="processo simples"
              description="Compra online segura, sem complicações ou deslocamentos. Tudo resolvido em poucos cliques"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-rose-600" />}
              title="pagamento flexível"
              description="PIX instantâneo ou cartão de crédito com total segurança. Escolha como preferir"
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-rose-900 mb-6">perguntas frequentes</h2>
            <p className="text-rose-600 text-lg leading-relaxed">
              Esclarecemos suas dúvidas para que você tenha total tranquilidade
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-6">
            <AccordionItem value="item-1" className="border border-rose-200 rounded-xl shadow-sm">
              <AccordionTrigger className="px-8 py-6 text-left font-semibold text-rose-900 hover:no-underline text-lg">
                Como funciona a entrega?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-rose-600 leading-relaxed text-base">
                Enviamos direto para os pais da Sophia! Após a compra, as fraldas são entregues no endereço fornecido,
                com seu nome como remetente para que eles saibam quem enviou o presente.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-rose-200 rounded-xl shadow-sm">
              <AccordionTrigger className="px-8 py-6 text-left font-semibold text-rose-900 hover:no-underline text-lg">
                Posso escolher marca específica?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-rose-600 leading-relaxed text-base">
                Sim! Temos Pampers, Huggies e MamyPoko disponíveis em todos os tamanhos. Você pode escolher a marca de
                sua preferência ou optar pelos kits mistos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-rose-200 rounded-xl shadow-sm">
              <AccordionTrigger className="px-8 py-6 text-left font-semibold text-rose-900 hover:no-underline text-lg">
                E se o bebê não usar o tamanho?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-rose-600 leading-relaxed text-base">
                Os pais podem trocar por outro tamanho sem problemas! Trabalhamos com lojas parceiras que aceitam
                trocas, garantindo que as fraldas sejam sempre úteis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-rose-200 rounded-xl shadow-sm">
              <AccordionTrigger className="px-8 py-6 text-left font-semibold text-rose-900 hover:no-underline text-lg">
                Como os pais sabem quem enviou?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-rose-600 leading-relaxed text-base">
                Incluímos seu nome e uma mensagem carinhosa na entrega, para que os pais saibam que o presente veio de
                você com muito amor para a pequena Sophia.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-rose-900 to-pink-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-light mb-8">organizado com carinho para sophia</h3>
          <div className="space-y-4 text-rose-200">
            <p className="text-lg">dúvidas? ana@email.com</p>
            <p className="text-sm opacity-80">chá de fraldas • 25 de outubro de 2025</p>
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-rose-200">
              <h2 className="text-2xl font-light text-rose-900">Seu Carrinho</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(false)}
                className="text-rose-600 hover:text-rose-900"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
              {cart.length === 0 ? (
                <div className="p-8 text-center text-rose-600">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-rose-300" />
                  <p>Seu carrinho está vazio</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-rose-200 rounded-lg">
                      <div className="w-16 h-16 bg-rose-100 rounded-lg flex items-center justify-center">
                        <div className="text-2xl">📦</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-rose-900">{item.brand}</h3>
                        <p className="text-sm text-rose-600">Tamanho {item.size}</p>
                        <p className="text-sm text-rose-600">
                          {typeof item.count === "number" ? `${item.count} unidades` : item.count}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-rose-900">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-rose-900">{item.price}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-rose-500 hover:text-rose-700 text-xs"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-rose-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-medium text-rose-900">Total:</span>
                  <span className="text-2xl font-medium text-rose-900">
                    R$ {cartTotal.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-rose-900 mb-4">Forma de Pagamento</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={paymentMethod === "pix" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("pix")}
                      className={`p-4 h-auto flex flex-col items-center gap-2 ${
                        paymentMethod === "pix"
                          ? "bg-rose-800 text-white"
                          : "border-rose-200 text-rose-700 hover:bg-rose-50"
                      }`}
                    >
                      <div className="text-2xl">💳</div>
                      <span className="font-medium">PIX</span>
                      <span className="text-xs opacity-75">Instantâneo</span>
                    </Button>
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 h-auto flex flex-col items-center gap-2 ${
                        paymentMethod === "card"
                          ? "bg-rose-800 text-white"
                          : "border-rose-200 text-rose-700 hover:bg-rose-50"
                      }`}
                    >
                      <CreditCard className="w-6 h-6" />
                      <span className="font-medium">Cartão</span>
                      <span className="text-xs opacity-75">Crédito/Débito</span>
                    </Button>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="mb-6 p-4 border border-rose-200 rounded-lg bg-rose-50">
                    <h4 className="font-medium text-rose-900 mb-3">Dados do Cartão</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white border border-rose-200 rounded text-rose-600 text-sm">
                        🔒 Integração Stripe - Dados seguros do cartão
                      </div>
                      <p className="text-xs text-rose-600">
                        Seus dados são protegidos com criptografia de ponta a ponta
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "pix" && (
                  <div className="mb-6 p-4 border border-rose-200 rounded-lg bg-rose-50">
                    <h4 className="font-medium text-rose-900 mb-3">Pagamento PIX</h4>
                    <p className="text-sm text-rose-600 mb-3">
                      Após confirmar, você receberá o código PIX para pagamento instantâneo
                    </p>
                  </div>
                )}

                <Button className="w-full bg-rose-800 hover:bg-rose-700 text-white py-3" disabled={!paymentMethod}>
                  {paymentMethod === "pix"
                    ? "Gerar PIX"
                    : paymentMethod === "card"
                      ? "Finalizar Compra"
                      : "Selecione a forma de pagamento"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="fixed bottom-8 right-8 z-40">
        <Button
          onClick={() => setIsCartOpen(true)}
          className="bg-rose-800 hover:bg-rose-700 text-white relative shadow-2xl hover:shadow-3xl transition-all duration-300 px-8 py-4 rounded-2xl group"
        >
          <ShoppingCart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-semibold">Carrinho</span>
          {cartItemsCount > 0 && (
            <Badge className="absolute -top-3 -right-3 bg-pink-600 text-white text-sm min-w-[24px] h-6 flex items-center justify-center rounded-full shadow-lg animate-pulse">
              {cartItemsCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  )
}
