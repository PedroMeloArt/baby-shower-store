# 👶 Boutique Sophia - Chá de Fraldas Premium

Uma boutique online elegante e moderna para o chá de fraldas da pequena Sophia, desenvolvida com Next.js 14 e Tailwind CSS. O projeto oferece uma experiência de compra sofisticada com carrinho de compras, filtros por marca e tamanho, e sistema de pagamento integrado.

## ✨ Características

- 🛒 **Carrinho de Compras Interativo** - Adicione, remova e ajuste quantidades em tempo real
- 🏷️ **Filtros Inteligentes** - Filtre por marca (Pampers, Huggies, MamyPoko) e categorias (Fraldas, Kits)
- 📊 **Ordenação Avançada** - Ordene produtos por nome, preço ou avaliação
- 📱 **Design Responsivo** - Interface otimizada para desktop, tablet e mobile
- 💳 **Múltiplas Formas de Pagamento** - PIX instantâneo e cartão de crédito/débito
- 🎨 **UI Boutique de Luxo** - Interface elegante com paleta rosa sofisticada e animações suaves
- ⚡ **Performance Otimizada** - Carregamento rápido com React useMemo para cálculos otimizados
- 🌐 **Export Estático** - Pronto para deploy em GitHub Pages, Netlify, Vercel

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18 ou superior
- npm, yarn ou pnpm

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/boutique-sophia.git
   cd boutique-sophia
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Execute em modo de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. **Abra no navegador**
   ```
   http://localhost:3000
   ```

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Os arquivos estáticos estarão na pasta 'out/'
# Pronto para deploy em qualquer servidor estático
```

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14.2.16
- **Linguagem**: TypeScript 5
- **Estilização**: Tailwind CSS 4.1.9
- **Componentes UI**: Radix UI + shadcn/ui (personalizados)
- **Ícones**: Lucide React
- **Fontes**: Geist Sans & Mono
- **Analytics**: Vercel Analytics
- **Animações**: tw-animate-css

## 📁 Estrutura do Projeto

```
boutique-sophia/
├── app/                      # App Router do Next.js
│   ├── globals.css          # Estilos globais e tema luxury
│   ├── layout.tsx           # Layout principal com fonts
│   └── page.tsx             # Página principal (catálogo + carrinho)
├── components/
│   └── ui/                  # Componentes UI (apenas os usados)
│       ├── accordion.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       └── card.tsx
├── lib/
│   └── utils.ts             # Utilitários (cn para merge de classes)
├── public/
│   └── Sophia_1.png         # Imagem da hero section (versão anterior)
│   └── Sophia_2.png         # Imagem da hero section (versão atual)
├── components.json          # Configuração shadcn/ui
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração TypeScript
└── README.md                # Este arquivo
```

## 🎨 Personalização

### Cores e Tema

O projeto usa uma paleta de cores rosa/rose sofisticada para criar uma experiência boutique de luxo. Para personalizar:

**Edite as variáveis CSS em `app/globals.css`:**

```css
:root {
  --primary: oklch(0.25 0.2 340);           /* Rose escuro */
  --accent: oklch(0.92 0.04 345);           /* Champagne pink */
  --boutique-shadow: oklch(0.85 0.03 340);  /* Sombra rosa suave */
  /* ... outras variáveis */
}
```

### Produtos

Para adicionar/editar produtos, modifique o array `products` em `app/page.tsx`:

```typescript
const products: Product[] = [
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
  // ... mais produtos
]
```

### Informações do Evento

Altere as informações do chá de fraldas na seção footer de `app/page.tsx`:

```typescript
// Data: linha ~666
<p className="text-lg font-display font-medium">25 de Outubro</p>

// Horário: linha ~678
<p className="text-lg font-display font-medium">15:30</p>

// Local: linha ~690
<p className="text-base font-display font-medium">Edf. Villa Damasco</p>

// Endereço: linha ~699
<p className="text-base font-body-luxury opacity-90 leading-relaxed">
  Rua Tibúrcio Cavalcante, 255 - Meireles
</p>
```

## 🚀 Deploy

### GitHub Pages

1. **Configure o repositório**
   ```bash
   git remote add origin https://github.com/seu-usuario/boutique-sophia.git
   ```

2. **Crie um workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

3. **Ative GitHub Pages** nas configurações do repositório

### Netlify

1. Conecte seu repositório GitHub
2. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
3. Deploy automático!

### Vercel (Recomendado)

1. Conecte seu repositório
2. Vercel detecta automaticamente Next.js
3. Deploy instantâneo!

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento (http://localhost:3000)
npm run build        # Build para produção (gera pasta out/)
npm run start        # Servidor de produção
npm run lint         # Linter ESLint
npm run export       # Export estático (incluído no build)
```

## 📱 Funcionalidades Detalhadas

### Carrinho de Compras
- ✅ Adicionar produtos com um clique
- ✅ Ajustar quantidades (+ / -)
- ✅ Remover produtos
- ✅ Cálculo automático do total
- ✅ Contador de itens no badge
- ✅ Modal elegante com overlay

### Filtros e Ordenação
- ✅ Filtrar por marca: Todas, Pampers, Huggies, MamyPoko, Kits
- ✅ Ordenar por: Nome (A-Z, Z-A), Preço (crescente/decrescente), Avaliação
- ✅ Agrupamento por categoria
- ✅ Interface sticky que acompanha o scroll

### Sistema de Pagamento
- ✅ Seleção de método: PIX ou Cartão
- ✅ Interface preparada para integração Stripe
- ✅ Validação de formulário
- ✅ Feedback visual de seleção

### Design Boutique
- ✅ Paleta rosa sofisticada com gradientes
- ✅ Animações suaves (hover, float)
- ✅ Sombras elegantes (boutique-shadow)
- ✅ Typography luxury (Geist fonts)
- ✅ Responsivo mobile-first
- ✅ Acessibilidade (ARIA labels, focus states)

## 🧹 Otimizações Realizadas

### Limpeza de Código
- ✅ Removidos 42 componentes UI não utilizados
- ✅ Removidas 5 imagens placeholder não referenciadas
- ✅ Removidas pastas e arquivos não utilizados (hooks/, styles/, theme-provider)
- ✅ Imports otimizados (removidos Badge e CreditCard não usados)

### Refatoração
- ✅ Tipos TypeScript extraídos e reutilizáveis (Product, CartItem, PaymentMethod)
- ✅ Código organizado com comentários descritivos
- ✅ Props de componentes tipadas corretamente
- ✅ useMemo para otimização de performance (filtros, carrinho)

### Performance
- ✅ Cálculos memorizados com useMemo
- ✅ Build estático otimizado
- ✅ Imagens otimizadas com Next.js Image
- ✅ CSS purge automático do Tailwind

## 📊 Componentes Mantidos

Apenas os componentes essenciais foram mantidos:
- `accordion` - FAQ section
- `badge` - Status e badges
- `button` - Botões interativos
- `card` - Cards de produtos

Todos os outros 42 componentes UI não utilizados foram removidos para manter o codebase limpo e focado.

## 📋 To-Do List

### Próximas Funcionalidades e Melhorias

1. **Enable User Messages on Purchase**  
   Permitir que os usuários enviem uma mensagem ao completar uma compra. Explorar opções para armazenar ou transmitir essas mensagens em tempo real, como salvá-las em um repositório público do GitHub (adequado para hospedagem no GitHub Pages).

2. **Track Purchased Items**  
   Implementar uma forma de registrar e visualizar quais itens cada usuário comprou. Considerar salvar essas informações ou enviá-las em tempo real, possivelmente usando um repositório público do GitHub como armazenamento.

3. **Integrate Stripe Payments**  
   Adicionar integração com Stripe para suportar pagamentos com cartão de crédito e débito.

4. **Add Product Images**  
   Incluir imagens para todos os produtos para melhorar a experiência do usuário.

5. **Expand Product Catalog and Categories**  
   Adicionar produtos adicionais e organizá-los em categorias apropriadas.

6. **Update AI Baby Picture**  
   Substituir a imagem atual de bebê gerada por IA por uma nova.

7. **Add Successful Payment Modal/Notification**  
   Implementar um modal ou notificação elegante que apareça após o pagamento ser processado com sucesso, confirmando a compra e exibindo os detalhes da transação.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 📞 Informações do Evento

**Chá de Fraldas da Sophia**
- 📅 **Data**: 25 de Outubro de 2025 (Sábado)
- 🕐 **Horário**: 15:30
- 📍 **Local**: Edf. Villa Damasco - Salão de Festas
- 🏠 **Endereço**: Rua Tibúrcio Cavalcante, 255 - Meireles, Fortaleza - CE
- 📱 **Contato**: (85) 99798-6787

---

Feito com 💖 para a pequena Sophia 👶

*Boutique experience powered by Next.js, TypeScript, and Tailwind CSS*