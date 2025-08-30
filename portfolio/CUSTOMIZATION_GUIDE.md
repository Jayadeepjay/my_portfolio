# Portfolio Customization Guide

## 🎨 Color Scheme Customization

The current theme uses **purple/indigo** gradients. To change colors, update these classes throughout the codebase:

### Current Color Classes to Replace:
- `from-purple-400 to-indigo-300` → Your primary gradient
- `bg-purple-600 hover:bg-purple-700` → Primary buttons
- `text-purple-300` → Accent text
- `border-purple-400` → Borders
- `bg-purple-500/30` → Overlays

### Popular Color Schemes:

#### 🔵 Blue Theme
```css
from-blue-400 to-cyan-300
bg-blue-600 hover:bg-blue-700
text-blue-300
border-blue-400
bg-blue-500/30
```

#### 🟢 Green Theme
```css
from-green-400 to-emerald-300
bg-green-600 hover:bg-green-700
text-green-300
border-green-400
bg-green-500/30
```

#### 🟠 Orange Theme
```css
from-orange-400 to-red-300
bg-orange-600 hover:bg-orange-700
text-orange-300
border-orange-400
bg-orange-500/30
```

#### 🌈 Rainbow Theme
```css
from-pink-400 via-purple-400 to-indigo-400
bg-gradient-to-r from-pink-600 to-purple-600
text-pink-300
border-pink-400
bg-pink-500/30
```

## 📝 Content Updates Required

### 1. Personal Information (`/data/personaldata.js`)
- [ ] Replace "Your Name" with your actual name
- [ ] Update role/profession
- [ ] Add your real email and phone
- [ ] Write compelling about and summary sections
- [ ] Update social media links
- [ ] Add your resume PDF to `/public/resume.pdf`

### 2. Projects (`/data/projectdata.js`)
- [ ] Add 3-6 of your best projects
- [ ] Include detailed descriptions
- [ ] List actual technologies used
- [ ] Add GitHub repository links
- [ ] Include live demo URLs if available
- [ ] Add project images to `/public/projects/`

### 3. Skills (`/data/skillsdata.js`)
- [ ] Update with your actual programming languages
- [ ] Add frameworks and libraries you know
- [ ] Include tools and databases
- [ ] List your soft skills
- [ ] Set accurate proficiency levels (1-100)

### 4. Certificates (`/data/certificatesdata.js`)
- [ ] Add relevant certifications
- [ ] Include completion dates
- [ ] Write detailed descriptions
- [ ] Add certificate images to `/public/certificates/`

## 🖼️ Required Images

### Profile Photo
- **File**: `/public/profile.jpg`
- **Size**: 400x400px or larger
- **Format**: JPG, PNG, or WebP

### Project Images
- **Location**: `/public/projects/`
- **Size**: 800x600px recommended
- **Examples**: `project1.jpg`, `ecommerce-app.jpg`

### Certificate Images
- **Location**: `/public/certificates/`
- **Size**: 800x600px recommended
- **Examples**: `aws-cert.jpg`, `react-cert.jpg`

## 🚀 Deployment Steps

### 1. GitHub Setup
```bash
# Create new repository on GitHub
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-portfolio.git
git push -u origin main
```

### 2. Vercel Deployment (Optional)
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Import your portfolio repository
4. Deploy automatically

### 3. Custom Domain (Optional)
1. Buy domain from Namecheap, GoDaddy, etc.
2. Add domain in Vercel settings
3. Update DNS records

## 🔧 Additional Customizations

### Contact Form Integration
Add to `/pages/contact.jsx`:
```javascript
// Using FormSubmit (free)
<form action="https://formsubmit.co/your-email@domain.com" method="POST">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```

### Google Analytics
Add to `/pages/_app.js`:
```javascript
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}
```

### SEO Optimization
Update `/pages/_document.js` with your meta tags:
```javascript
<meta name="description" content="Your Name - Your Role. Professional portfolio showcasing projects and skills." />
<meta name="keywords" content="your, keywords, here" />
<meta property="og:title" content="Your Name - Portfolio" />
<meta property="og:description" content="Your professional summary" />
<meta property="og:image" content="/profile.jpg" />
```

## 📋 Checklist

- [ ] Update personal information
- [ ] Add your projects
- [ ] Update skills and proficiency levels
- [ ] Add certificates
- [ ] Add profile photo
- [ ] Add project images
- [ ] Add certificate images
- [ ] Add resume PDF
- [ ] Customize color scheme (optional)
- [ ] Test locally (`npm run dev`)
- [ ] Deploy to GitHub
- [ ] Deploy to Vercel (optional)
- [ ] Add custom domain (optional)
- [ ] Add contact form (optional)
- [ ] Add Google Analytics (optional)

## 🎯 Pro Tips

1. **Quality over Quantity**: Showcase your best 3-6 projects rather than many mediocre ones
2. **Keep it Updated**: Regularly update your portfolio with new projects and skills
3. **Mobile First**: Test your portfolio on mobile devices
4. **Performance**: Optimize images and keep file sizes small
5. **SEO**: Use descriptive titles and meta descriptions
6. **Accessibility**: Ensure good contrast and readable fonts 