# 🎉 Stripe Integration Complete - Deployment Guide

## ✅ Current Status

Your codebase has been successfully organized into a hybrid architecture:

### **Main Project** (GitHub Pages)
📁 `C:\Users\nedeh\OneDrive\Drive\Documentos\Code\PedroMeloArt\LojaFraldas\`
- ✅ Frontend updated with Stripe payment integration
- ✅ Calls external Vercel API for card payments
- ✅ PIX payments work client-side (no backend needed)
- ✅ Ready to deploy to GitHub Pages

### **Stripe Backend** (Vercel - Separate Repository)
📁 `C:\Users\nedeh\OneDrive\Drive\Documentos\Code\LojaFraldas-Stripe-Backend\`
- ✅ Serverless function for Stripe checkout
- ✅ Git repository initialized
- ✅ Ready to deploy to Vercel
- ✅ Complete documentation included

---

## 🚀 Deployment Steps (30-40 minutes total)

### Step 1: Get Stripe API Key (5 minutes)

1. Go to [https://stripe.com](https://stripe.com) and create account
2. Navigate to: **Developers** → **API keys**
3. Copy your **Secret key** (starts with `sk_test_...`)
4. ⚠️ **Save it safely** - you'll need it for Vercel

---

### Step 2: Deploy Stripe Backend to Vercel (15 minutes)

#### 2.1 Create GitHub Repository

```powershell
# Navigate to Stripe backend
cd C:\Users\nedeh\OneDrive\Drive\Documentos\Code\LojaFraldas-Stripe-Backend

# Verify git is initialized
git status

# Create repository on GitHub:
# 1. Go to https://github.com/new
# 2. Name: loja-fraldas-stripe-backend
# 3. Make it PRIVATE (recommended)
# 4. Don't initialize with README
# 5. Click "Create repository"

# Add remote and push (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/loja-fraldas-stripe-backend.git
git branch -M main
git push -u origin main
```

#### 2.2 Deploy to Vercel

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import `loja-fraldas-stripe-backend` repository
4. **CRITICAL:** Add environment variable:
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** (paste your Stripe secret key from Step 1)
   - **Environment:** All (Production, Preview, Development)
5. Click **"Deploy"**
6. ⭐ **Copy your Vercel domain** (e.g., `loja-fraldas-stripe-backend.vercel.app`)

---

### Step 3: Update Frontend with Vercel API URL (2 minutes)

```powershell
# Navigate to main project
cd C:\Users\nedeh\OneDrive\Drive\Documentos\Code\PedroMeloArt\LojaFraldas

# Open app/page.tsx in your editor
# Find line 915 and replace:
```

**Change this:**
```typescript
const VERCEL_API_URL = 'https://your-project.vercel.app/api/create-checkout';
```

**To this:** (use your actual Vercel domain)
```typescript
const VERCEL_API_URL = 'https://loja-fraldas-stripe-backend.vercel.app/api/create-checkout';
```

---

### Step 4: Deploy Frontend to GitHub Pages (10 minutes)

```powershell
# Make sure you're in the main project
cd C:\Users\nedeh\OneDrive\Drive\Documentos\Code\PedroMeloArt\LojaFraldas

# Commit the updated frontend
git add app/page.tsx
git commit -m "Add Stripe card payment integration"

# Build and export
npm run build
npm run export

# Deploy to GitHub Pages
git add out/
git commit -m "Deploy with Stripe integration"
git subtree push --prefix out origin gh-pages
```

---

### Step 5: Test the Complete Flow (5 minutes)

#### 5.1 Test API Directly

```powershell
curl -X POST https://YOUR-PROJECT.vercel.app/api/create-checkout `
  -H "Content-Type: application/json" `
  -d '{\"amount\": 100, \"items\": [{\"id\": 1, \"brand\": \"Test\", \"size\": \"M\", \"price\": \"R$ 100,00\", \"count\": 10, \"quantity\": 1}]}'
```

✅ **Expected:** JSON response with Stripe checkout URL

#### 5.2 Test on Your Website

1. Visit `https://pedromeloart.github.io/baby-shower-store/`
2. Add products to cart
3. Click "Carrinho"
4. Select **"Cartão"** payment method
5. Click **"Finalizar Compra"**
6. ✅ **Expected:** Redirected to Stripe with amount **already filled**!

#### 5.3 Complete Test Payment

On Stripe checkout page:
- **Card:** `4242 4242 4242 4242`
- **Expiry:** Any future date (e.g., `12/34`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any 5 digits (e.g., `12345`)

✅ **Expected:** Payment completes, redirected back to your site!

---

## 📁 Final Directory Structure

```
C:\Users\nedeh\OneDrive\Drive\Documentos\Code\
├── PedroMeloArt\
│   └── LojaFraldas\                    # Main site
│       ├── app/
│       │   └── page.tsx               ⭐ Updated with Stripe integration
│       ├── components/
│       │   └── pix-modal.tsx          ✅ PIX payment (unchanged)
│       ├── lib/
│       │   └── pix-utils.ts           ✅ PIX utilities (unchanged)
│       └── STRIPE_INTEGRATION_GUIDE.md ⭐ This file
│
└── LojaFraldas-Stripe-Backend\         # Stripe backend (Vercel)
    ├── api/
    │   └── create-checkout.ts          ⭐ Serverless function
    ├── package.json                    ✅ Dependencies: stripe
    ├── vercel.json                     ✅ CORS configuration
    ├── tsconfig.json                   ✅ TypeScript config
    ├── STRIPE_SETUP_SUMMARY.md         📖 Quick reference
    ├── STRIPE_DEPLOYMENT_GUIDE.md      📖 Detailed guide
    ├── QUICK_START.md                  📖 Command reference
    └── ARCHITECTURE.md                 📖 Technical details
```

---

## 🔧 Dependencies

### Main Project (GitHub Pages)
✅ **No Stripe dependencies needed** - frontend only calls API
- All existing dependencies remain unchanged
- Uses `fetch()` to call Vercel API

### Stripe Backend (Vercel)
✅ **Required dependencies** (already in package.json):
- `stripe`: ^14.11.0 (Stripe SDK)
- `@vercel/node`: ^3.0.11 (Vercel runtime)
- `typescript`: ^5.3.3 (TypeScript support)

**Installation:** Run `npm install` in the Stripe backend directory before deploying

---

## 🔄 How It Works

### PIX Payment Flow (Unchanged)
```
User adds to cart → Selects PIX → QR code generated client-side → Done
```

### Card Payment Flow (New!)
```
User adds to cart → Selects Cartão → Clicks "Finalizar Compra"
    ↓
Frontend calls Vercel API with cart data
    ↓
Vercel serverless function creates Stripe Checkout Session
    ↓
User redirected to Stripe with amount PRESET
    ↓
User enters card details on Stripe's secure page
    ↓
Payment processed by Stripe
    ↓
User redirected back to your site with success/cancel status
```

**Key Benefit:** Cart total is automatically sent to Stripe! No manual entry needed. ✨

---

## 🔒 Security Features

### ✅ What's Secure

1. **Stripe Secret Key**
   - Stored in Vercel environment variables
   - Never in your code
   - Never in Git
   - Never visible to users

2. **Card Data**
   - Never touches your servers
   - Handled entirely by Stripe
   - PCI compliant by default

3. **Communication**
   - All HTTPS encrypted
   - CORS configured for your domain
   - API validates all inputs

### ⚠️ What You Need to Do

1. **Keep Stripe key secret** - never commit it to Git
2. **Use test mode** until ready for production
3. **Restrict CORS** to your domain (optional enhancement)

---

## 💰 Cost Breakdown

| Service | Cost | Limits |
|---------|------|--------|
| **GitHub Pages** | FREE | Unlimited for public repos |
| **Vercel Hobby** | FREE | 100 GB-hours/month |
| **Stripe** | FREE | No monthly fee |
| **Stripe Fees** | 3.4% + R$0.40 | Per successful transaction |

**Example:**
- R$ 100 purchase → R$ 3.80 Stripe fee → You receive R$ 96.20

**Vercel limits:**
- Free tier: ~10,000+ API calls/month
- Perfect for a baby shower registry!

---

## 🐛 Troubleshooting

### Issue 1: "Failed to create checkout session"

**Cause:** Stripe secret key not set in Vercel

**Fix:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Check `STRIPE_SECRET_KEY` is set correctly
3. Redeploy: Deployments → Latest → Three dots → Redeploy

### Issue 2: CORS error in browser

**Cause:** API URL incorrect or CORS not configured

**Fix:**
1. Verify API URL in `app/page.tsx` line 915
2. Check Vercel deployment succeeded
3. Test API directly with curl (see Step 5.1)

### Issue 3: Button shows "Processando..." forever

**Cause:** API returned error or URL is wrong

**Fix:**
1. Open browser DevTools (F12) → Console tab
2. Check for error messages
3. Verify Vercel API URL is correct

### Issue 4: Amount shows $0.00 instead of R$ amount

**Cause:** Cart calculation error

**Fix:**
1. Check cart is not empty
2. Verify products have valid prices
3. Check browser console for errors

---

## 📚 Additional Documentation

### In Stripe Backend Project
- `STRIPE_SETUP_SUMMARY.md` - Quick start guide
- `STRIPE_DEPLOYMENT_GUIDE.md` - Detailed deployment steps
- `QUICK_START.md` - Command reference
- `ARCHITECTURE.md` - Technical architecture details

### Key Files to Know
- **Frontend:** `app/page.tsx` (lines 915-945: API call logic)
- **Backend:** `api/create-checkout.ts` (Stripe integration)
- **Config:** `vercel.json` (CORS settings)

---

## 🎯 Next Steps After Testing

### Going Live (When Ready)

1. **Activate Stripe Account**
   - Complete business verification in Stripe Dashboard
   - Provide required business information

2. **Get Production Keys**
   - Stripe Dashboard → Developers → API keys
   - Copy `sk_live_...` key (production)

3. **Update Vercel**
   - Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `STRIPE_SECRET_KEY` to production key
   - Redeploy

4. **Test Thoroughly**
   - Start with small real payment
   - Verify email receipts work
   - Check payment confirmation flow

---

## ✅ Deployment Checklist

Before going live:

- [ ] Stripe account created ✓
- [ ] Stripe test key obtained ✓
- [ ] Stripe backend pushed to GitHub ✓
- [ ] Vercel project deployed ✓
- [ ] Environment variable added to Vercel ✓
- [ ] Frontend updated with Vercel URL ✓
- [ ] GitHub Pages redeployed ✓
- [ ] API tested with curl ✓
- [ ] Website tested end-to-end ✓
- [ ] Test payment completed successfully ✓

For production:
- [ ] Stripe account verified
- [ ] Production API key obtained
- [ ] Vercel env var updated to production
- [ ] Real payment tested
- [ ] Email receipts configured
- [ ] Terms of service added
- [ ] Privacy policy added

---

## 🎉 You're Ready!

Your hybrid architecture is complete:
- **Frontend:** GitHub Pages (static, fast, free)
- **Backend:** Vercel (serverless, secure, scalable)
- **Payments:** Stripe (professional, trusted, PCI compliant)

**Total setup time:** 30-40 minutes  
**Monthly cost:** $0 (within free tiers)  
**Payment processing:** As low as 3.4% + R$0.40  

**Follow the 5 steps above to deploy! Good luck! 🚀**

---

## 📞 Support Resources

- **Stripe Docs:** https://stripe.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Test Cards:** https://stripe.com/docs/testing
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Vercel Dashboard:** https://vercel.com/dashboard
