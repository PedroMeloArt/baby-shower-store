"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, Package, Heart, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type Purchase = {
  purchase_id: string
  session_id: string
  name: string
  message: string
  email: string
  amount_total: number
  currency: string
  items: { desc?: string | null; qty?: number | null; subtotal?: number | null }[]
  created_at: string
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [purchase, setPurchase] = useState<Purchase | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const sessionId = searchParams.get("session_id")
    
    if (!sessionId) {
      setError("Nenhuma sessão encontrada")
      setLoading(false)
      return
    }

    // Call confirm endpoint
    const confirmPurchase = async () => {
      try {
        const response = await fetch(
          `https://baby-shower-stripe.vercel.app/api/confirm?session_id=${sessionId}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        )

        if (!response.ok) {
          throw new Error('Falha ao confirmar compra')
        }

        const data = await response.json()
        setPurchase(data.purchase)
        setLoading(false)
      } catch (err) {
        console.error('Confirm error:', err)
        setError('Erro ao confirmar compra. Por favor, contate o suporte.')
        setLoading(false)
      }
    }

    confirmPurchase()
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-gradient flex items-center justify-center px-6">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
          <p className="text-lg font-display text-premium">Confirmando sua compra...</p>
        </div>
      </div>
    )
  }

  if (error || !purchase) {
    return (
      <div className="min-h-screen bg-luxury-gradient flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-card rounded-3xl p-8 text-center border border-primary/10 bg-boutique-shadow">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-display text-premium mb-4">Erro</h1>
          <p className="text-muted-foreground mb-6">{error || "Compra não encontrada"}</p>
          <Button
            onClick={() => router.push("/")}
            className="!bg-rose-800 hover:!bg-rose-700 !text-white"
            style={{ backgroundColor: '#9f1239', color: '#ffffff' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a loja
          </Button>
        </div>
      </div>
    )
  }

  const amountInReais = (purchase.amount_total / 100).toFixed(2).replace(".", ",")

  return (
    <div className="min-h-screen bg-luxury-gradient py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-display text-premium mb-4">
            Compra Confirmada!
          </h1>
          <p className="text-xl text-muted-foreground font-body-luxury">
            Obrigado por contribuir para o chá de fraldas da Sophia! 💖
          </p>
        </div>

        {/* Purchase Details Card */}
        <div className="bg-card rounded-3xl p-8 border border-primary/10 bg-boutique-shadow mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-display text-premium">Detalhes da Compra</h2>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID da Compra:</span>
              <span className="font-medium text-premium">{purchase.purchase_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nome:</span>
              <span className="font-medium text-premium">{purchase.name}</span>
            </div>
            {purchase.email && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-premium">{purchase.email}</span>
              </div>
            )}
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground">Total Pago:</span>
              <span className="text-2xl font-display text-premium">R$ {amountInReais}</span>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-primary/10 pt-6">
            <h3 className="font-display text-lg text-premium mb-4">Itens Comprados</h3>
            <div className="space-y-3">
              {purchase.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-accent/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">📦</div>
                    <div>
                      <p className="font-medium text-premium">{item.desc}</p>
                      <p className="text-sm text-muted-foreground">Qtd: {item.qty}</p>
                    </div>
                  </div>
                  {item.subtotal && (
                    <span className="font-medium text-premium">
                      R$ {(item.subtotal / 100).toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          {purchase.message && (
            <div className="border-t border-primary/10 pt-6 mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg text-premium">Sua Mensagem</h3>
              </div>
              <p className="text-muted-foreground italic bg-accent/20 p-4 rounded-xl">
                "{purchase.message}"
              </p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-card rounded-3xl p-8 border border-primary/10 bg-boutique-shadow mb-8">
          <h2 className="text-2xl font-display text-premium mb-4">Próximos Passos</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <span>Você receberá um email de confirmação com os detalhes da compra</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <span>Os pais da Sophia receberão sua mensagem e contribuição</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <span>As fraldas serão compradas com sua contribuição antes do evento</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <span>Compareça ao chá de fraldas no dia 25 de Outubro às 15:30!</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push("/")}
            className="!bg-rose-800 hover:!bg-rose-700 !text-white px-8 py-6 text-lg rounded-2xl"
            style={{ backgroundColor: '#9f1239', color: '#ffffff' }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para a Loja
          </Button>
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="px-8 py-6 text-lg rounded-2xl border-2 border-primary/20 hover:border-primary/30"
          >
            🖨️ Imprimir Recibo
          </Button>
        </div>
      </div>
    </div>
  )
}

