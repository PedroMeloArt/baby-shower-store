"use client"

import { useState, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { X, Copy, Check, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildPixBRCode, generateTxId, validatePixConfig, formatBRL } from "@/lib/pix-utils"

interface PixModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  orderItems: Array<{
    id: number
    brand: string
    size: string
    count: string | number
    price: string
    quantity: number
    description: string
  }>
  customerName: string
  customerMessage: string
  onPaymentConfirmed: (sessionId: string) => void
}

export function PixModal({ isOpen, onClose, amount, orderItems, customerName, customerMessage, onPaymentConfirmed }: PixModalProps) {
  const [pixCode, setPixCode] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(true)
  const [copySuccess, setCopySuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txid, setTxid] = useState<string>("")
  const [isConfirming, setIsConfirming] = useState(false)
  const [confirmationError, setConfirmationError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      generatePixCode()
    }
  }, [isOpen])

  const generatePixCode = async () => {
    setIsGenerating(true)
    setError(null)

    // Simulate a brief loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800))

    try {
      const transactionId = generateTxId()
      setTxid(transactionId)

      // Pix Configuration (hardcoded - Pix keys are public by design)
      const pixKey = "mkarolina.holanda@gmail.com"
      const merchantName = "Karolina Holanda"
      const merchantCity = "Fortaleza"

      // Create order description
      const itemCount = orderItems.reduce((sum, item) => sum + item.quantity, 0)
      const description = `Pedido ${itemCount} itens`

      const config = {
        pixKey,
        amount,
        name: merchantName,
        city: merchantCity,
        description,
        txid: transactionId,
      }

      // Validate configuration
      const validationError = validatePixConfig(config)
      if (validationError) {
        setError(validationError)
        setIsGenerating(false)
        return
      }

      // Generate the BR Code
      const code = buildPixBRCode(config)
      setPixCode(code)
    } catch (err) {
      setError("Erro ao gerar código PIX. Tente novamente.")
      console.error("Pix generation error:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    if (!pixCode) return

    try {
      await navigator.clipboard.writeText(pixCode)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 3000)
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea")
      textArea.value = pixCode
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 3000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
      document.body.removeChild(textArea)
    }
  }

  const confirmPixPayment = async () => {
    if (!pixCode || !customerName.trim()) return
    
    setIsConfirming(true)
    setConfirmationError(null)

    try {
      const response = await fetch('https://baby-shower-stripe.vercel.app/api/pix/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: customerName.trim(),
          message: customerMessage.trim(),
          items: orderItems.map(item => ({
            brand: item.brand,
            size: item.size,
            count: item.count,
            price: item.price,
            quantity: item.quantity,
            description: item.description,
          })),
          amount: amount,
          txid: txid,
          pix_code: pixCode
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to confirm payment')
      }

      const data = await response.json()
      onPaymentConfirmed(data.session_id)
    } catch (error) {
      console.error('PIX confirmation error:', error)
      setConfirmationError(error instanceof Error ? error.message : 'Erro ao confirmar pagamento. Tente novamente.')
      setIsConfirming(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden bg-boutique-shadow-xl border border-primary/10 backdrop-luxury">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/10">
          <div className="space-y-1">
            <h2 className="text-2xl font-display text-premium">Pagamento via PIX</h2>
            <p className="text-sm text-muted-foreground">
              {isGenerating ? "Gerando código..." : "Escaneie o QR Code ou copie o código"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-premium hover:bg-accent/50 rounded-2xl p-3 hover-lift"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Loading State */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/40 via-primary/10 to-accent/30 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <p className="text-lg font-display text-premium mb-2">Gerando código PIX...</p>
              <p className="text-sm text-muted-foreground">Aguarde um momento</p>
            </div>
          )}

          {/* Error State */}
          {error && !isGenerating && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-lg font-display text-premium mb-2">Erro ao gerar PIX</p>
              <p className="text-sm text-muted-foreground mb-6 text-center">{error}</p>
              <Button
                onClick={generatePixCode}
                className="!bg-rose-800 hover:!bg-rose-700 !text-white px-6 py-3 rounded-2xl font-medium"
                style={{
                  backgroundColor: '#9f1239',
                  color: '#ffffff',
                }}
              >
                Tentar Novamente
              </Button>
            </div>
          )}

          {/* Success State - QR Code Display */}
          {pixCode && !isGenerating && !error && (
            <div className="space-y-6">
              {/* Amount Display */}
              <div className="text-center py-4 bg-gradient-to-br from-accent/20 via-primary/5 to-accent/10 rounded-2xl border border-primary/10">
                <p className="text-sm text-muted-foreground mb-2">Valor total</p>
                <p className="text-4xl font-display text-premium">{formatBRL(amount)}</p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center p-8 bg-white rounded-2xl border-2 border-primary/20">
                <QRCodeSVG
                  value={pixCode}
                  size={280}
                  level="M"
                  includeMargin={true}
                  className="w-full h-auto max-w-[280px]"
                />
              </div>

              {/* Instructions */}
              <div className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl p-6 border border-primary/10">
                <h3 className="font-display text-lg text-premium mb-4">Como pagar:</h3>
                <ol className="space-y-3 text-sm text-muted-foreground font-body-luxury">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-premium">
                      1
                    </span>
                    <span>Abra o aplicativo do seu banco</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-premium">
                      2
                    </span>
                    <span>Selecione a opção "Pix" e depois "Pagar com QR Code"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-premium">
                      3
                    </span>
                    <span>Escaneie o QR Code acima ou use o código Pix Copia e Cola abaixo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-premium">
                      4
                    </span>
                    <span>Confirme os dados e finalize o pagamento</span>
                  </li>
                </ol>
              </div>

              {/* Pix Copy-Paste Code */}
              <div className="space-y-3">
                <label className="block text-sm font-display text-premium">Código PIX (Copia e Cola)</label>
                <div className="relative">
                  <textarea
                    readOnly
                    value={pixCode}
                    className="w-full p-4 pr-12 bg-card border-2 border-primary/20 rounded-2xl text-sm text-muted-foreground font-mono resize-none focus:outline-none focus:ring-2 ring-luxury focus:border-primary/40"
                    rows={3}
                    onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                  />
                  <Button
                    onClick={copyToClipboard}
                    className={`absolute top-3 right-3 p-2 rounded-xl transition-all duration-300 hover-lift ${
                      copySuccess
                        ? "!bg-green-600 !text-white"
                        : "!bg-rose-800 hover:!bg-rose-700 !text-white"
                    }`}
                    style={
                      copySuccess
                        ? { backgroundColor: "#16a34a", color: "#ffffff" }
                        : { backgroundColor: "#9f1239", color: "#ffffff" }
                    }
                  >
                    {copySuccess ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Clique no campo para selecionar ou use o botão para copiar
                </p>
              </div>

              {/* Success Message */}
              {copySuccess && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in duration-300">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-800 font-medium">Código copiado com sucesso!</p>
                </div>
              )}

              {/* Transaction ID */}
              <div className="text-center pt-4 border-t border-primary/10">
                <p className="text-xs text-muted-foreground">
                  ID da Transação: <span className="font-mono font-medium">{txid}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Guarde este código para referência
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {pixCode && !isGenerating && !error && (
          <div className="border-t border-primary/10 p-6 bg-accent/5 space-y-4">
            {/* Error Message */}
            {confirmationError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-800 font-medium">{confirmationError}</p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={confirmPixPayment}
                disabled={isConfirming || !customerName.trim()}
                className="flex-1 !bg-green-600 hover:!bg-green-700 !text-white py-3 rounded-2xl font-display text-base transition-all duration-300 hover-lift disabled:!bg-gray-400 disabled:cursor-not-allowed"
                style={isConfirming || !customerName.trim() ? {} : {
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                }}
              >
                {isConfirming ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Confirmando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Já paguei
                  </>
                )}
              </Button>
              
              <Button
                onClick={onClose}
                disabled={isConfirming}
                variant="outline"
                className="px-8 py-3 rounded-2xl border-2 border-primary/20 hover:border-primary/30 font-display text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Fechar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
