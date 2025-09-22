# 👶 Loja de Fraldas - Chá de Fraldas da Sophia

Uma loja online elegante e moderna para o chá de fraldas da pequena Sophia, desenvolvida com Next.js e Tailwind CSS. O projeto oferece uma experiência de compra simplificada com carrinho de compras, filtros por marca e tamanho, e integração de pagamento.

## ✨ Características

- 🛒 **Carrinho de Compras Interativo** - Adicione, remova e ajuste quantidades
- 🏷️ **Filtros Inteligentes** - Por marca (Pampers, Huggies, MamyPoko) e tamanho (RN, P, M, G)
- 📱 **Design Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- 💳 **Múltiplas Formas de Pagamento** - PIX instantâneo e cartão de crédito/débito
- 🎨 **UI Moderna** - Interface elegante com gradientes e animações suaves
- ⚡ **Performance Otimizada** - Carregamento rápido e experiência fluida
- 🌐 **Estático** - Pronto para deploy em GitHub Pages, Netlify, Vercel

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/loja-fraldas.git
   cd loja-fraldas
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
# Gerar build estático
npm run build

# Os arquivos estáticos estarão na pasta 'out/'
# Pronto para deploy em qualquer servidor estático
```

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 14
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Componentes**: Radix UI + shadcn/ui
- **Ícones**: Lucide React
- **Fontes**: Geist Sans & Mono
- **Analytics**: Vercel Analytics
- **Pagamentos**: Stripe (integrado)

## 📁 Estrutura do Projeto

```
loja-fraldas/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   └── ui/               # Componentes de UI (shadcn/ui)
├── hooks/                # Custom hooks
├── lib/                  # Utilitários
├── public/               # Arquivos estáticos
├── styles/               # Estilos adicionais
├── out/                  # Build estático (gerado)
└── package.json          # Dependências e scripts
```

## 🎨 Personalização

### Cores e Tema
O projeto usa uma paleta de cores rosa/rose personalizada. Para alterar:

1. Edite `tailwind.config.js` para modificar as cores
2. Ajuste as classes CSS nos componentes
3. Atualize as variáveis CSS em `globals.css`

### Produtos
Para adicionar/editar produtos, modifique o array `products` em `app/page.tsx`:

```typescript
const products = [
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
  // ... mais produtos
]
```

### Informações do Evento
Altere as informações do chá de fraldas em `app/page.tsx`:

```typescript
// Data do evento
<span className="font-medium">25 de outubro</span>

// Local
<span className="font-medium">fortaleza</span>

// Nome do bebê
<span className="block font-medium bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
  sophia
</span>
```

## 🚀 Deploy

### GitHub Pages

1. **Configure o repositório**
   ```bash
   git remote add origin https://github.com/seu-usuario/loja-fraldas.git
   ```

2. **Crie um workflow do GitHub Actions** (`.github/workflows/deploy.yml`):
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

### Vercel

1. Conecte seu repositório
2. Configure:
   - **Framework Preset**: Next.js
   - **Output Directory**: `out`
3. Deploy!

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Linter ESLint
npm run export       # Export estático (já configurado no build)
```

## 📱 Funcionalidades

### Carrinho de Compras
- ✅ Adicionar/remover produtos
- ✅ Ajustar quantidades
- ✅ Cálculo automático do total
- ✅ Persistência durante a sessão

### Filtros e Ordenação
- ✅ Filtrar por marca (Todas, Pampers, Huggies, MamyPoko, Kits)
- ✅ Ordenar por nome, preço ou avaliação
- ✅ Interface intuitiva

### Pagamento
- ✅ Seleção de método (PIX/Cartão)
- ✅ Interface preparada para integração Stripe
- ✅ Validação de formulário

### Design
- ✅ Responsivo (mobile-first)
- ✅ Animações suaves
- ✅ Gradientes e sombras
- ✅ Acessibilidade

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **Email**: email@email.com
- **Evento**: Chá de Fraldas da Sophia
- **Data**: 25 de outubro de 2025
- **Local**: Fortaleza

---

Feito com ❤️ para a pequena Sophia 👶
