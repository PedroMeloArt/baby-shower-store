import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Boutique Sophia - Chá de Fraldas Premium",
  description: "Uma curadoria exclusiva de produtos premium para o chá de fraldas da pequena Sophia. Experiência boutique com entrega cuidadosa e pagamento seguro.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: '/baby-shower-store/favicon.ico', sizes: 'any' }
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script async src="https://js.stripe.com/v3/buy-button.js"></script>
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
