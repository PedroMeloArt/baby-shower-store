"use client"

import { useRouter } from "next/navigation"
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

// Note: router.push() automatically handles basePath in Next.js
// We don't need to manually add it for router navigation

export default function CancelPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-luxury-gradient flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-card rounded-3xl p-8 text-center border border-primary/10 bg-boutique-shadow">
        {/* Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-orange-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-display text-premium mb-4">
          Compra Cancelada
        </h1>

        {/* Message */}
        <p className="text-lg text-muted-foreground font-body-luxury mb-8">
          Não se preocupe! Nenhuma cobrança foi realizada. Você pode voltar e tentar novamente quando quiser.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.push("/")}
            className="!bg-rose-800 hover:!bg-rose-700 !text-white px-8 py-4 text-lg rounded-2xl"
            style={{ backgroundColor: '#9f1239', color: '#ffffff' }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para a Loja
          </Button>
          
          <Button
            onClick={() => router.push("/#produtos")}
            variant="outline"
            className="px-8 py-4 text-lg rounded-2xl border-2 border-primary/20 hover:border-primary/30"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Continuar Comprando
          </Button>
        </div>

        {/* Help text */}
        <p className="text-sm text-muted-foreground mt-8">
          Precisa de ajuda? Entre em contato pelo{" "}
          <a 
            href="https://api.whatsapp.com/send/?phone=5585997986787"
            target="_blank"
            className="text-primary hover:underline"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </div>
  )
}

