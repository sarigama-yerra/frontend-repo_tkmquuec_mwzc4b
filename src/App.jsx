import { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './components/pages/Home'
import Properties from './components/pages/Properties'
import PropertyDetails from './components/pages/PropertyDetails'
import Services from './components/pages/Services'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Booking from './components/pages/Booking'
import Terms from './components/pages/Terms'
import Privacy from './components/pages/Privacy'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Navbar() {
  const navItems = [
    { to: '/', label: 'الرئيسية' },
    { to: '/properties', label: 'العقارات' },
    { to: '/services', label: 'الخدمات' },
    { to: '/about', label: 'من نحن' },
    { to: '/contact', label: 'تواصل معنا' },
  ]
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 ring-2 ring-yellow-500/30 shadow-lg"></div>
          <div className="text-right">
            <p className="text-white font-bold leading-tight">Promparty Rent</p>
            <p className="text-xs text-yellow-300/80 leading-tight">عقارات بمعايير فاخرة</p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="text-white/80 hover:text-yellow-300 transition-colors">
              {item.label}
            </Link>
          ))}
          <Link to="/booking" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg transition-colors">
            احجز الآن
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-white/80 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <p className="text-xl font-bold text-white mb-3">Promparty Rent</p>
          <p className="text-sm text-white/60">تأجير عقارات فاخرة في ليبيا بمعايير خدمة راقية وتجربة حجز سهلة وسريعة.</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">روابط سريعة</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/properties" className="hover:text-yellow-300">العقارات</Link></li>
            <li><Link to="/services" className="hover:text-yellow-300">الخدمات</Link></li>
            <li><Link to="/about" className="hover:text-yellow-300">من نحن</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-300">تواصل</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">التواصل</p>
          <ul className="space-y-2 text-sm">
            <li>الهاتف: +218 91 000 0000</li>
            <li>واتساب: +218 91 000 0000</li>
            <li>البريد: info@promparty.ly</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">القانوني</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms" className="hover:text-yellow-300">الشروط والأحكام</Link></li>
            <li><Link to="/privacy" className="hover:text-yellow-300">سياسة الخصوصية</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">© {new Date().getFullYear()} Promparty Rent. جميع الحقوق محفوظة.</div>
    </footer>
  )
}

function WhatsAppFloat() {
  const phone = '+218910000000'
  return (
    <a href={`https://wa.me/${phone.replace(/[^\d]/g,'')}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"
       className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg">
      <span className="font-semibold">تواصل واتساب</span>
    </a>
  )
}

function App() {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <WhatsAppFloat />
      <Footer />
    </div>
  )
}

export default App
