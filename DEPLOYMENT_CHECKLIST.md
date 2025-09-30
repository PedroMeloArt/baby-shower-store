# ✅ Stripe Integration Deployment Checklist

## 📋 Pre-Deployment Status

### ✅ Completed Setup

1. **Directory Structure**
   - ✅ Main project: `LojaFraldas` (GitHub Pages)
   - ✅ Stripe backend: `LojaFraldas-Stripe-Backend` (Vercel)
   - ✅ Clear separation of concerns

2. **Frontend Updates**
   - ✅ `app/page.tsx` updated with Stripe integration
   - ✅ Payment processing state added (`isProcessingCard`)
   - ✅ API call logic implemented (line 915-945)
   - ✅ Error handling included

3. **Backend Setup**
   - ✅ Serverless function created (`api/create-checkout.ts`)
   - ✅ Dependencies installed (`stripe`, `@vercel/node`, `typescript`)
   - ✅ CORS configured for GitHub Pages
   - ✅ Git repository initialized and committed

4. **Documentation**
   - ✅ Complete deployment guide
   - ✅ Architecture documentation
   - ✅ Quick start commands
   - ✅ Troubleshooting guide

---

## 🚀 Deployment Steps (Follow in Order)

### Step 1: Get Stripe API Key ⏱️ 5 minutes

- [ ] Create Stripe account at https://stripe.com
- [ ] Navigate to Developers → API keys
- [ ] Copy Secret key (starts with `sk_test_...`)
- [ ] Save key securely (you'll need it for Vercel)

**Documentation:** See `STRIPE_INTEGRATION_GUIDE.md` - Step 1

---

### Step 2: Deploy Stripe Backend ⏱️ 15 minutes

#### 2.1 Create GitHub Repository
- [ ] Go to https://github.com/new
- [ ] Name: `loja-fraldas-stripe-backend`
- [ ] Make it PRIVATE (recommended)
- [ ] Don't initialize with README
- [ ] Click "Create repository"

#### 2.2 Push Code to GitHub
```powershell
cd C:\Users\nedeh\OneDrive\Drive\Documentos\Code\LojaFraldas-Stripe-Backend
git remote add origin https://github.com/YOUR_USERNAME/loja-fraldas-stripe-backend.git
git branch -M main
git push -u origin main
```

- [ ] Code pushed to GitHub successfully

#### 2.3 Deploy to Vercel
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New..." → "Project"
- [ ] Import `loja-fraldas-stripe-backend` repository
- [ ] Add environment variable:
  - Name: `STRIPE_SECRET_KEY`
  - Value: [Your Stripe secret key]
  - Environment: All (Production, Preview, Development)
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Copy Vercel domain (e.g., `loja-fraldas-stripe-backend.vercel.app`)

**Documentation:** See `STRIPE_INTEGRATION_GUIDE.md` - Step 2

---

### Step 3: Update Frontend ⏱️ 2 minutes

- [ ] Open `app/page.tsx` in main project
- [ ] Find line 915: `const VERCEL_API_URL = ...`
- [ ] Replace with your Vercel domain:
  ```typescript
  const VERCEL_API_URL = 'https://YOUR-ACTUAL-DOMAIN.vercel.app/api/create-checkout';
  ```
- [ ] Save file

**Documentation:** See `STRIPE_INTEGRATION_GUIDE.md` - Step 3

---

### Step 4: Deploy Frontend ⏱️ 10 minutes

```powershell
cd C:\Users\nedeh\OneDrive\Drive\Documentos\Code\PedroMeloArt\LojaFraldas
git add app/page.tsx
git commit -m "Add Stripe card payment integration"
npm run build
npm run export
git add out/
git commit -m "Deploy with Stripe integration"
git subtree push --prefix out origin gh-pages
```

- [ ] Frontend committed
- [ ] Build completed successfully
- [ ] Deployed to GitHub Pages

**Documentation:** See `STRIPE_INTEGRATION_GUIDE.md` - Step 4

---

### Step 5: Test Everything ⏱️ 5 minutes

#### 5.1 Test API Directly
```powershell
curl -X POST https://YOUR-PROJECT.vercel.app/api/create-checkout `
  -H "Content-Type: application/json" `
  -d '{\"amount\": 100, \"items\": [{\"id\": 1, \"brand\": \"Test\", \"size\": \"M\", \"price\": \"R$ 100,00\", \"count\": 10, \"quantity\": 1}]}'
```

- [ ] API returns JSON with checkout URL

#### 5.2 Test on Website
- [ ] Visit https://pedromeloart.github.io/baby-shower-store/
- [ ] Add products to cart
- [ ] Click "Carrinho"
- [ ] Select "Cartão" payment method
- [ ] Click "Finalizar Compra"
- [ ] Redirected to Stripe checkout
- [ ] Amount is **pre-filled** (not manual entry)

#### 5.3 Complete Test Payment
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Expiry: `12/34`
- [ ] CVC: `123`
- [ ] ZIP: `12345`
- [ ] Payment completes
- [ ] Redirected back to your site

**Documentation:** See `STRIPE_INTEGRATION_GUIDE.md` - Step 5

---

## 🎯 Post-Deployment Verification

### Frontend (GitHub Pages)
- [ ] Site loads correctly
- [ ] PIX payment still works
- [ ] Card payment button appears
- [ ] No console errors (F12 → Console)

### Backend (Vercel)
- [ ] Deployment successful
- [ ] Environment variable set
- [ ] API endpoint accessible
- [ ] Logs show no errors

### Integration
- [ ] Frontend calls Vercel API
- [ ] API creates Stripe session
- [ ] User redirected to Stripe
- [ ] Amount pre-filled correctly
- [ ] Success/cancel redirects work

---

## 🔒 Security Checklist

- [ ] Stripe secret key NOT in Git
- [ ] Stripe secret key stored in Vercel env vars
- [ ] Using test mode (`sk_test_...`)
- [ ] CORS configured in `vercel.json`
- [ ] No sensitive data in frontend code

---

## 📊 Project Health

### Main Project
- **Location:** `C:\Users\nedeh\OneDrive\Drive\Documentos\Code\PedroMeloArt\LojaFraldas`
- **Status:** ✅ Ready for deployment
- **Dependencies:** ✅ All installed
- **Git:** Clean working directory

### Stripe Backend
- **Location:** `C:\Users\nedeh\OneDrive\Drive\Documentos\Code\LojaFraldas-Stripe-Backend`
- **Status:** ✅ Ready for deployment
- **Dependencies:** ✅ Installed (stripe, @vercel/node, typescript)
- **Git:** Committed, ready to push

---

## 🐛 Common Issues & Solutions

### Issue: "Module not found: stripe"
**Solution:** Run `npm install` in Stripe backend directory

### Issue: "STRIPE_SECRET_KEY is undefined"
**Solution:** Add environment variable in Vercel Dashboard → Settings → Environment Variables

### Issue: CORS error
**Solution:** Check `vercel.json` has correct CORS headers, redeploy if needed

### Issue: "Failed to create checkout session"
**Solution:** Check Vercel logs, verify Stripe key is correct

---

## 🎉 Success Criteria

You'll know everything is working when:

✅ No console errors on your website  
✅ Card payment redirects to Stripe  
✅ Cart total is automatically filled in  
✅ Test payment completes successfully  
✅ Redirected back to your site after payment  

---

## 📈 Next Steps (Optional Enhancements)

After successful deployment, consider:

1. **Add Customer Input Fields**
   - Name field before checkout
   - Email field for receipts

2. **Improve UX**
   - Loading animation during redirect
   - Success confirmation modal
   - Payment history tracking

3. **Analytics**
   - Track conversion rates
   - Monitor cart abandonment
   - Payment success/failure metrics

4. **Go Live**
   - Activate Stripe account
   - Get production API keys
   - Update environment variables
   - Test with real payments

---

## 📞 Support

### Documentation
- `STRIPE_INTEGRATION_GUIDE.md` - Main deployment guide
- `STRIPE_SETUP_SUMMARY.md` - Quick reference
- `ARCHITECTURE.md` - Technical details
- `QUICK_START.md` - Command reference

### External Resources
- Stripe Docs: https://stripe.com/docs
- Vercel Docs: https://vercel.com/docs
- Test Cards: https://stripe.com/docs/testing

### Dashboards
- Stripe: https://dashboard.stripe.com
- Vercel: https://vercel.com/dashboard
- GitHub: https://github.com

---

## ✅ Final Checklist

Before marking as complete:

- [ ] All deployment steps completed
- [ ] All tests passed
- [ ] No errors in browser console
- [ ] No errors in Vercel logs
- [ ] Documentation reviewed
- [ ] Backup of configuration saved

**Total Estimated Time:** 30-40 minutes  
**Cost:** $0 (free tiers)  
**Payment Fees:** 3.4% + R$0.40 per transaction  

---

**Ready to deploy? Follow the steps in `STRIPE_INTEGRATION_GUIDE.md`!** 🚀
