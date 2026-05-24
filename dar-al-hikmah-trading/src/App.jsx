import './index.css'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import About from './components/About'
import Products from './components/Products'
import Partners from './components/Partners'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import QuoteForm from './components/QuoteForm'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <LanguageProvider>
      <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
        <Navbar />
        <Hero />
        <Ticker />
        <About />
        <Products />
        <Partners />
        <Services />
        <WhyUs />
        <QuoteForm />
        <Contact />
        <Footer />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  )
}
