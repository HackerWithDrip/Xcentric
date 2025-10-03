import { useEffect, useState, useRef, useMemo, useCallback, memo } from 'react'
import { getImage, getAsset } from './assets/images'
import { brandData } from './data/brandData'

// Splash Screen Component - Memoized for performance
const SplashScreen = memo(function SplashScreen({ onComplete }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [showCircularTransition, setShowCircularTransition] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    // First image (img23.jpg) for 3.5 seconds
    const timer1 = setTimeout(() => {
      setIsBlinking(true)
      setTimeout(() => {
        setCurrentImage(1) // Switch to img98.jpg
        setIsBlinking(false)
      }, 400) // Half of blink duration
    }, 3500)

    // Second image (img98.jpg) for 2.5 seconds, then start circular transition
    const timer2 = setTimeout(() => {
      setShowCircularTransition(true)
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onComplete(), 100) // Small delay for smooth transition
      }, 1000) // Circular transition takes 1 second
    }, 6000) // 3.5 + 2.5 = 6 seconds total

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-night flex items-center justify-center">
      <div className="relative w-full h-full">
        <img 
          src={currentImage === 0 ? getAsset('img23.jpg') : getAsset('img98.jpg')} 
          alt="Splash" 
          className={`w-full h-full object-cover opacity-80 transition-all duration-1000 ${isBlinking ? 'smooth-blink' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-night/60 via-transparent to-night/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellowBrand to-purpleBrand animate-pulse xcentric-logo">
              Xcentric
            </h1>
            <p className="mt-4 text-xl text-gray-300 animate-fade-in-up">
              Brand Solutions
            </p>
            <div className="mt-6 flex justify-center">
              <img 
                src={getAsset('img25.png')} 
                alt="Brand Icon" 
                className="w-16 h-16 md:w-20 md:h-20 opacity-90 animate-fade-in-up animation-delay-400"
              />
            </div>
          </div>
        </div>
        {/* Circular opening animation overlay - only shows after second image */}
        {showCircularTransition && (
          <div className="absolute inset-0 bg-night circular-reveal"></div>
        )}
      </div>
    </div>
  )
})

// Lazy loading hook with scroll-triggered animations - optimized
function useIntersectionObserver() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          observer.disconnect() // Unobserve after first visibility to save resources
        }
      },
      { threshold: 0.1, rootMargin: '50px' } // Reduced threshold and added margin for earlier loading
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  return [ref, isVisible]
}

function Nav({ onContactClick, showBackButton, onBackClick }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm bg-night/40 border-b border-white/10 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {showBackButton ? (
          <button onClick={onBackClick} className="flex items-center gap-2 text-gold hover:scale-105 transition-transform duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-xl font-semibold tracking-wide xcentric-logo">Back to Home</span>
          </button>
        ) : (
          <div className="text-2xl font-semibold text-gold tracking-wide transition-transform duration-300 hover:scale-105 xcentric-logo">Xcentric</div>
        )}
        <nav className="hidden md:flex gap-8 text-sm text-gray-200">
          <a href="#services" className="px-4 py-2 rounded-full border border-white/30 hover:border-gold transition-all duration-300 transform hover:scale-105 hover:bg-white/5 group">
            <span className="group-hover:text-gold">Services</span>
          </a>
          <a href="#work" className="px-4 py-2 rounded-full border border-white/30 hover:border-gold transition-all duration-300 transform hover:scale-105 hover:bg-white/5 group">
            <span className="group-hover:text-gold">Work</span>
          </a>
          <a href="#about" className="px-4 py-2 rounded-full border border-white/30 hover:border-gold transition-all duration-300 transform hover:scale-105 hover:bg-white/5 group">
            <span className="group-hover:text-gold">About</span>
          </a>
          <button onClick={onContactClick} className="px-4 py-2 rounded-full border border-white/30 hover:border-gold transition-all duration-200 transform hover:scale-105 hover:bg-white/5 group">
            <span className="group-hover:text-gold">Contact</span>
          </button>
        </nav>
      </div>
    </header>
  )
}

function Hero({ data }) {
  return (
    <section className="pt-28 md:pt-36 animate-fade-in">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="animate-slide-in-left">
          <p className="uppercase text-purpleBrand tracking-widest font-semibold animate-pulse">Success Stories</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight text-gold animate-fade-in-up">
            {data?.sections?.find(s => s.id === 'hero')?.title || 'Inspiring Brand Solutions'}
          </h1>
          <p className="mt-4 text-lg text-gray-200 animate-fade-in-up animation-delay-200">
            {data?.sections?.find(s => s.id === 'hero')?.subtitle || 'We architect growth through human‑centered strategy.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
            <a href="#services" className="px-5 py-3 rounded-full border border-white/30 hover:border-gold transition-all duration-300 transform hover:scale-105 hover:bg-white/5 group">
              <span className="group-hover:text-gold">Our Services</span>
            </a>
            <a href="#work" className="px-5 py-3 rounded-full border border-white/30 hover:border-gold transition-all duration-300 transform hover:scale-105 hover:bg-white/5 group">
              <span className="group-hover:text-gold">Case Studies</span>
            </a>
          </div>
        </div>
        <div className="relative h-72 md:h-[28rem] rounded-2xl overflow-hidden border border-white/10 animate-slide-in-right group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(166,76,230,.35),rgba(243,199,64,.2),transparent_70%)]" />
          <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-500 group-hover:opacity-60 group-hover:scale-105 animate-slow-zoom" style={{backgroundImage:`url(${getAsset('img98.jpg')})`}} />
          <div className="absolute bottom-6 left-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellowBrand to-purpleBrand transition-all duration-300 group-hover:scale-105">Xcentric</div>
        </div>
      </div>
    </section>
  )
}

function Services({ data }) {
  const categories = data?.sections?.find(s => s.id === 'services')?.categories || []
  const [ref, isVisible] = useIntersectionObserver()
  return (
    <section ref={ref} id="services" className={`py-20 relative ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
      <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(50%_50%_at_30%_20%,black,transparent)]">
        <div className="absolute -left-12 top-10 w-1 rotate-45 h-[120%] bg-gradient-to-b from-purpleBrand via-gold to-tealBrand animate-pulse" />
        <div className="absolute right-10 top-0 w-1 -rotate-45 h-[120%] bg-gradient-to-b from-yellowBrand via-purpleBrand to-gold animate-pulse animation-delay-1000" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gold animate-fade-in-up">What we do</h2>
        <p className="mt-2 text-gray-300 animate-fade-in-up animation-delay-200">We architect growth by aligning purpose, people and performance.</p>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            let iconFileName = `${cat.name}.png`;
            if (cat.name === 'Artwork & Pack Design') {
              iconFileName = 'Artwork.png';
            } else if (cat.name === 'Big Idea / Campaign Platform') {
              iconFileName = 'Big Idea.png';
            } else if (cat.name === 'BTL Loyalty & Engagement Programs') {
              iconFileName = 'BTL.png';
            } else if (cat.name === 'Retail Mapping & Strategy') {
              iconFileName = 'Retail.png';
            } else if (cat.name === 'Brand Innovation') {
              iconFileName = 'Brand-Innovation.png';
            } else if (cat.name === 'Fresh Insight') {
              iconFileName = 'Fresh.png';
            } else if (cat.name === 'Marketing Capability') {
              iconFileName = 'Marketing2.png';
            } else if (cat.name === 'Events & Activations') {
              iconFileName = 'Events.png';
            }
            const iconSrc = getAsset(iconFileName) || getImage(idx+20);
            return (
              <div key={cat.name} className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 transform hover:scale-105 hover:border-gold hover:shadow-2xl hover:shadow-gold/20 animate-fade-in-up" style={{animationDelay: `${idx * 100}ms`}}>
                <div className="text-xl font-semibold text-gold group-hover:text-yellowBrand transition-colors duration-300 uppercase">{cat.name}</div>
                <div className="mt-3 h-28 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-white/5">
                  <img src={iconSrc} alt={cat.name} loading="lazy" className="max-h-20 max-w-[80%] object-contain opacity-70 group-hover:opacity-90 transition-all duration-300 group-hover:scale-110" />
                </div>
                <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside group-hover:text-gray-200 transition-colors duration-300">
                  {cat.bullets.map(item => (
                    <li key={item} className="transition-all duration-300 group-hover:translate-x-1">{item}</li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
function About({ data }) {
  const about = data?.sections?.find(s => s.id === 'about')
  const [ref, isVisible] = useIntersectionObserver()
  return (
    <section ref={ref} id="about" className={`py-24 relative ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
      <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_70%_40%,black,transparent)]">
        <div className="absolute left-6 top-10 w-1 rotate-45 h-[120%] bg-gradient-to-b from-gold via-purpleBrand to-yellowBrand animate-pulse" />
        <div className="absolute right-0 top-0 w-1 -rotate-45 h-[120%] bg-gradient-to-b from-tealBrand via-gold to-purpleBrand animate-pulse animation-delay-1000" />
      </div>
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10 items-start">
        <div className="rounded-2xl overflow-hidden border border-white/10 relative group animate-slide-in-left min-h-[400px] md:min-h-[500px]">
          <img className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-105" alt="Human‑centricity" loading="lazy" src={getAsset('img40.jpg') || getImage(12)} />
          <div className="absolute inset-0 bg-gradient-to-tr from-night/80 via-night/40 to-night/20" />
          <div className="absolute inset-x-4 bottom-4 md:bottom-8 md:left-8 md:right-8 animate-fade-in-up animation-delay-400">
            <p className="text-yellowBrand text-xs md:text-sm uppercase tracking-widest">Our Promise</p>
            <h3 className="mt-2 text-xl md:text-3xl lg:text-4xl font-bold text-gold leading-tight">{about?.promiseTitle}</h3>
            <p className="mt-2 md:mt-3 text-gray-200 text-xs md:text-sm lg:text-base leading-relaxed">We champion the voice of consumers in crafting our solutions designed to align your business objectives, deliver commercial success and ultimately leading to better products, services and experiences for the people you serve.</p>
          </div>
        </div>
        <div className="animate-slide-in-right">
          <h2 className="text-3xl md:text-4xl font-bold text-gold animate-fade-in-up">WHO WE ARE</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {about?.who?.map((item, idx) => {
              const iconMap = {
                'We are NOT a traditional agency': 'img55.png',
                'We are PASSIONATE': 'img53.png',
                'We TAILOR‑MAKE': 'img54.png',
                'We are your GROWTH PARTNERS': 'img56.png'
              }
              const iconSrc = getAsset(iconMap[item.title] || '')
              // Build two-line titles to match design
              let line1 = item.title
              let line2 = ''
              if (item.title === 'We are NOT a traditional agency') {
                line1 = 'We are NOT'
                line2 = 'a traditional agency'
              } else if (item.title === 'We are PASSIONATE') {
                line1 = 'We are'
                line2 = 'PASSIONATE'
              } else if (item.title === 'We TAILOR‑MAKE') {
                line1 = 'We'
                line2 = 'TAILOR‑MAKE'
              } else if (item.title === 'We are your GROWTH PARTNERS') {
                line1 = 'We are your'
                line2 = 'GROWTH PARTNERS'
              }
              return (
                <div key={item.title} className="group p-6 rounded-2xl border border-white/10 bg-white/5 text-center flex flex-col items-center transition-all duration-200 transform hover:scale-105 hover:border-gold hover:shadow-2xl hover:shadow-gold/20 animate-fade-in-up" style={{animationDelay: `${idx * 150}ms`}}>
                  {iconSrc && (
                    <img src={iconSrc} alt="icon" loading="lazy" className="w-12 h-12 object-contain mb-4 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  )}
                  <div className="text-gold font-semibold leading-tight group-hover:text-yellowBrand transition-colors duration-300">
                    <div>{line1}</div>
                    <div>{line2}</div>
                  </div>
                  <p className="mt-3 text-sm text-gray-300 max-w-xs group-hover:text-gray-200 transition-colors duration-300">{item.copy}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Work({ data }) {
  const clients = data?.sections?.find(s => s.id === 'work')?.clients || []
  const [ref, isVisible] = useIntersectionObserver()
  return (
    <section ref={ref} id="work" className={`py-20 border-t border-white/10 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gold animate-fade-in-up">Success stories</h2>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {clients.map((c, i) => {
            const extension = c === 'Lactalis' ? '.svg' : '.png';
            const fileName = `${c.replaceAll(' ', '-').replaceAll('&', 'and')}${extension}`;
            const logo = getAsset(fileName) || getImage(60);
            return (
              <a key={c} href="#" className="group relative aspect-square rounded-xl bg-white border border-white/10 overflow-hidden transform transition-all duration-200 hover:scale-110 hover:border-gold hover:shadow-2xl hover:shadow-gold/20 animate-fade-in-up" style={{animationDelay: `${i * 100}ms`}}>
                <img src={logo} alt={c} loading="lazy" className="absolute inset-0 w-full h-full object-contain p-6 opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 text-center text-sm font-semibold text-gray-100 p-2 bg-night/60 group-hover:bg-night/80 group-hover:text-gold transition-all duration-300">{c}</div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer({ onContactClick }) {
  const [ref, isVisible] = useIntersectionObserver()
  return (
    <footer ref={ref} id="contact" className={`py-12 border-t border-white/10 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-gray-300">© {new Date().getFullYear()} <span className="xcentric-logo text-gold">Xcentric</span> Brand Solutions</div>
        <div className="text-gold font-bold">Developed By DynastyTech</div>
        <button onClick={onContactClick} className="px-5 py-3 rounded-full border border-white/30 hover:border-gold transition-all duration-200 transform hover:scale-105 hover:bg-white/5 group">
          <span className="group-hover:text-gold">Contact Us</span>
        </button>
      </div>
    </footer>
  )
}

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 bg-gradient-xcentric animate-fade-in">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellowBrand to-purpleBrand mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300">
            Let's discuss how we can help grow your brand
          </p>
        </div>

        <div className="bg-night/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl animate-fade-in-up animation-delay-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-night/60 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-night/60 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-all duration-200"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-night/60 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-all duration-200"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-night/60 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-all duration-200"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 bg-night/60 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-all duration-200 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-gray-400">* Required fields</p>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-gold to-yellowBrand text-night font-semibold rounded-full hover:shadow-lg hover:shadow-gold/50 transition-all duration-200 transform hover:scale-105"
              >
                Send Message
              </button>
            </div>

            {isSubmitted && (
              <div className="mt-4 p-4 bg-tealBrand/20 border border-tealBrand rounded-lg text-center animate-fade-in">
                <p className="text-tealBrand font-medium">Thank you! We'll get back to you soon.</p>
              </div>
            )}
          </form>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 animate-fade-in-up animation-delay-400">
          <div className="text-center p-6 bg-night/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-gold transition-all duration-200">
            <div className="text-gold text-3xl mb-3">📧</div>
            <h3 className="font-semibold text-white mb-2">Email</h3>
            <p className="text-gray-400 text-sm">hello@xcentric.agency</p>
          </div>

          <div className="text-center p-6 bg-night/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-gold transition-all duration-200">
            <div className="text-gold text-3xl mb-3">📍</div>
            <h3 className="font-semibold text-white mb-2">Location</h3>
            <p className="text-gray-400 text-sm">Johannesburg, South Africa</p>
          </div>

          <div className="text-center p-6 bg-night/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-gold transition-all duration-200">
            <div className="text-gold text-3xl mb-3">⏰</div>
            <h3 className="font-semibold text-white mb-2">Working Hours</h3>
            <p className="text-gray-400 text-sm">Mon - Fri, 9:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [data, setData] = useState(null)
  const [showSplash, setShowSplash] = useState(true)
  const [showContactPage, setShowContactPage] = useState(false)
  
  useEffect(() => {
    // Try to fetch from API first, fallback to static data for production
    fetch("/api/brand")
      .then(r => r.json())
      .then(setData)
      .catch(() => {
        console.log('Using static data (production mode)')
        setData(brandData)
      })
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  const handleContactClick = () => {
    setShowContactPage(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToHome = () => {
    setShowContactPage(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  if (showContactPage) {
    return (
      <div>
        <Nav onContactClick={handleContactClick} showBackButton={true} onBackClick={handleBackToHome} />
        <ContactPage />
      </div>
    )
  }

  return (
    <div>
      <Nav onContactClick={handleContactClick} showBackButton={false} />
      <Hero data={data} />
      <About data={data} />
      <Services data={data} />
      <Work data={data} />
      <Footer onContactClick={handleContactClick} />
    </div>
  )
}

export default App
