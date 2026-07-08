import React, { useState, useEffect } from 'react';

// Custom Icons as SVGs to ensure perfect rendering without external dependencies
const Icons = {
  Scissors: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
  ),
  Product: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18.01"/><path d="M8 6h8"/><path d="M8 10h8"/><path d="M8 14h8"/></svg>
  ),
  Star: ({ filled, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  Location: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Phone: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  Clock: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  Calendar: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  ),
  User: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  ChevronDown: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"/></svg>
  ),
  Menu: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  ),
  X: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  Google: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
  )
};

export default function App() {
  // Brand colors extracted from mockup
  const colors = {
    dark: '#141716',
    gold: '#B89564',
    lightGold: '#D4B886',
    textLight: '#F5F5F5',
    textMuted: '#9CA3AF',
    bgLight: '#FAFAFA'
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans antialiased text-gray-800" style={{ backgroundColor: colors.bgLight }}>
      {/* Injecting Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      <Navigation isScrolled={isScrolled} colors={colors} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main>
        <HeroSection colors={colors} />
        <FeaturesBar colors={colors} />
        <BookingSection colors={colors} />
        <ServicesSection colors={colors} />
        <ReviewsSection colors={colors} />
        <PreFooterCTA colors={colors} />
      </main>

      <Footer colors={colors} />
    </div>
  );
}

function Navigation({ isScrolled, colors, mobileMenuOpen, setMobileMenuOpen }) {
  const navLinks = ['HOME', 'ÜBER UNS', 'LEISTUNGEN', 'PREISE', 'GALERIE', 'KONTAKT'];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-lg' : 'py-6'
      }`}
      style={{ backgroundColor: isScrolled ? 'rgba(20, 23, 22, 0.95)' : 'transparent', backdropFilter: isScrolled ? 'blur(10px)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-3xl font-serif font-bold tracking-widest cursor-pointer">
          ANITA<br/><span className="text-sm font-sans tracking-[0.3em] font-light">COIFFEUR</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
          {navLinks.map((link, idx) => (
            <a key={idx} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-300 hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <button 
          className="hidden md:flex items-center space-x-2 px-6 py-3 rounded-sm font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: colors.gold, color: '#fff' }}
        >
          <span>TERMIN BUCHEN</span>
          <Icons.Calendar className="w-4 h-4" />
        </button>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full py-4 shadow-xl border-t border-gray-800" style={{ backgroundColor: colors.dark }}>
          <nav className="flex flex-col space-y-4 px-6 text-center text-sm tracking-wide">
            {navLinks.map((link, idx) => (
              <a key={idx} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-300 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>
                {link}
              </a>
            ))}
            <button className="flex items-center justify-center space-x-2 px-6 py-3 rounded-sm font-medium mx-auto w-full max-w-[200px]" style={{ backgroundColor: colors.gold, color: '#fff' }}>
              <span>TERMIN BUCHEN</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function HeroSection({ colors }) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20">
      {/* Background Image - requested interior image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('image_cd763e.jpg')` }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
            Ihr Friseur <br/>für Stil & <br/>
            <span style={{ color: colors.gold }} className="italic">Wohlbefinden</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-200 mb-10 max-w-lg leading-relaxed">
            Bei Anita Coiffeur stehen Sie im Mittelpunkt. Wir verbinden handwerkliches Können mit modernen Trends – für Ihren perfekten Look.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              className="px-8 py-4 rounded-sm font-medium flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-all"
              style={{ backgroundColor: colors.gold, color: '#fff' }}
            >
              <span>TERMIN BUCHEN</span>
              <Icons.Calendar className="w-5 h-5" />
            </button>
            <button 
              className="px-8 py-4 rounded-sm font-medium border transition-all hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
            >
              MEHR ÜBER UNS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesBar({ colors }) {
  const features = [
    { icon: Icons.Scissors, title: 'Erfahrene Stylisten', desc: 'Unser Team liebt Haare und seinen Beruf.' },
    { icon: Icons.Product, title: 'Hochwertige Produkte', desc: 'Wir verwenden nur Produkte von höchster Qualität.' },
    { icon: Icons.Star, title: 'Persönliche Beratung', desc: 'Individuell abgestimmt auf Ihren Typ und Ihre Wünsche.' },
  ];

  return (
    <section className="py-12" style={{ backgroundColor: colors.dark }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start space-x-4">
              <div className="p-3 rounded-full border border-gray-700 mt-1" style={{ color: colors.gold }}>
                <feat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{feat.title}</h3>
                <p className="text-gray-400 text-sm font-light">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSection({ colors }) {
  // Form State
  const [service, setService] = useState('');
  const [staff, setStaff] = useState('');
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Mock Data
  const servicesList = ['Haarschnitt (Damen)', 'Haarschnitt (Herren)', 'Färben & Strähnen', 'Waschen & Föhnen', 'Bartpflege'];
  const staffList = ['Beliebig', 'Anita', 'Sarah', 'Michael'];
  const availableTimes = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  const handleBooking = () => {
    if (service && staff && date && selectedTime) {
      setBookingSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setBookingSuccess(false);
        setService(''); setStaff(''); setDate(''); setSelectedTime('');
      }, 3000);
    }
  };

  return (
    <section id="kontakt" className="py-24 relative" style={{ backgroundColor: colors.bgLight }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Image & Info Card */}
          <div className="relative">
             {/* Using the exterior image as requested */}
            <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-lg overflow-hidden shadow-2xl relative">
              <img src="image_cd7624.jpg" alt="Anita Coiffeur Storefront" className="w-full h-full object-cover" />
            </div>
            
            {/* Floating Info Card */}
            <div 
              className="absolute -bottom-8 -right-4 md:-right-12 lg:-right-8 xl:-right-16 p-8 rounded-lg shadow-xl max-w-sm w-full border border-gray-700"
              style={{ backgroundColor: colors.dark, color: '#fff' }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <Icons.Location className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: colors.gold }} />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Anita Coiffeur</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Greenhyaccat 1<br/>5048 Schöftland<br/>Schweiz</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-6 text-sm">
                <Icons.Phone className="w-5 h-5 flex-shrink-0" style={{ color: colors.gold }} />
                <p className="text-gray-300">062 721 25 25</p>
              </div>
              <div className="flex items-start space-x-4 text-sm">
                <Icons.Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: colors.gold }} />
                <p className="text-gray-300 leading-relaxed">Di – Fr: 08:00 – 18:30<br/>Sa: 07:30 – 15:00</p>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Booking Form */}
          <div className="pt-12 lg:pt-0 lg:pl-12">
            <p className="text-sm font-semibold tracking-widest mb-2 uppercase" style={{ color: colors.gold }}>Online Termin Buchen</p>
            <h2 className="text-4xl font-serif font-bold mb-8">Wählen Sie Ihren Wunschtermin</h2>

            <div className="space-y-5 bg-white p-8 rounded-xl shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100">
              
              {/* Service Dropdown */}
              <div className="relative">
                <Icons.Scissors className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select 
                  className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-4 pl-12 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all cursor-pointer"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="" disabled>Leistung auswählen</option>
                  {servicesList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <Icons.ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Staff Dropdown */}
              <div className="relative">
                <Icons.User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select 
                  className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-4 pl-12 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all cursor-pointer"
                  value={staff}
                  onChange={(e) => setStaff(e.target.value)}
                >
                  <option value="" disabled>Mitarbeiter auswählen</option>
                  {staffList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <Icons.ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Date Picker */}
              <div className="relative">
                <Icons.Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="date"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-4 pl-12 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all cursor-pointer min-h-[58px]"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Dynamic Time Slots (Shows only if Date is selected) */}
              <div className={`transition-all duration-500 overflow-hidden ${date ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                <p className="text-sm text-gray-500 mb-3 font-medium">Verfügbare Zeiten am {date}</p>
                <div className="grid grid-cols-4 gap-3">
                  {availableTimes.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-md border text-sm font-medium transition-all ${
                        selectedTime === time 
                          ? 'bg-[#141716] text-white border-[#141716] shadow-md' 
                          : 'bg-white text-gray-700 border-gray-200 hover:border-amber-500 hover:text-amber-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button & Success Message */}
              <div className="pt-4">
                {bookingSuccess ? (
                  <div className="w-full py-4 rounded-md bg-green-50 text-green-700 text-center font-medium border border-green-200 flex items-center justify-center space-x-2">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                     <span>Termin erfolgreich angefragt!</span>
                  </div>
                ) : (
                  <button 
                    onClick={handleBooking}
                    disabled={!service || !staff || !date || !selectedTime}
                    className="w-full py-4 rounded-md font-medium text-white transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: colors.dark }}
                  >
                    <span>TERMIN BUCHEN</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ServicesSection({ colors }) {
  const services = [
    { icon: Icons.Scissors, title: 'Schneiden', desc: 'Trendige Schnitte für jeden Typ.' },
    { icon: Icons.Product, title: 'Styling', desc: 'Föhnen, Glätten und mehr.' },
    { icon: Icons.Star, title: 'Farbe', desc: 'Brillante Farben und Highlights.' }, // using Star as placeholder for Bowl
    { icon: Icons.User, title: 'Pflege', desc: 'Intensive Pflege für gesundes Haar.' }, // using User as placeholder
    { icon: Icons.User, title: 'Herren', desc: 'Perfekte Looks für den Mann.' },
  ];

  return (
    <section id="leistungen" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold tracking-widest mb-2 uppercase" style={{ color: colors.gold }}>Unsere Leistungen</p>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16">Für Sie & Ihn</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((srv, idx) => (
            <div key={idx} className="group bg-gray-50 border border-gray-100 p-8 rounded-xl hover:shadow-xl transition-all duration-300 flex flex-col items-center hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 text-gray-700 group-hover:text-amber-600 transition-colors">
                <srv.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">{srv.title}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-grow">{srv.desc}</p>
              <button className="text-sm font-semibold flex items-center space-x-1 text-gray-800 group-hover:text-amber-600 transition-colors">
                <span>MEHR ERFAHREN</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button className="px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors text-sm tracking-wide">
            ALLE LEISTUNGEN ANSEHEN
          </button>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection({ colors }) {
  // Curated list based on user request: mostly 5 stars, one 4 star
  const reviews = [
    { name: "Maria S.", time: "vor 2 Wochen", rating: 5, text: "Sehr freundliches Team und tolle Beratung! Bin jedes Mal rundum zufrieden.", avatar: "https://i.pravatar.cc/150?u=maria" },
    { name: "Thomas B.", time: "vor 1 Monat", rating: 5, text: "Top Haarschnitt und super Service. Man fühlt sich hier einfach wohl.", avatar: "https://i.pravatar.cc/150?u=thomas" },
    { name: "Sandra L.", time: "vor 3 Wochen", rating: 4, text: "Endlich ein Coiffeur, der meine Wünsche genau versteht. Absolut empfehlenswert!", avatar: "https://i.pravatar.cc/150?u=sandra" },
    { name: "Pascal K.", time: "vor 2 Monaten", rating: 5, text: "Professionell, sauber und immer pünktlich. Ich komme gerne wieder.", avatar: "https://i.pravatar.cc/150?u=pascal" },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: colors.bgLight }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold tracking-widest mb-2 uppercase" style={{ color: colors.gold }}>Google Bewertungen</p>
        <h2 className="text-4xl font-serif font-bold mb-16 relative inline-block">
          Das sagen unsere Kunden
          {/* Subtle underline decoration */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gray-300"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-left relative">
              <div className="flex items-center space-x-4 mb-4">
                <img src={rev.avatar} alt={rev.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-gray-900">{rev.name}</h4>
                  <p className="text-xs text-gray-500">{rev.time}</p>
                </div>
                <div className="absolute top-6 right-6">
                  <Icons.Google />
                </div>
              </div>
              <div className="flex text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Icons.Star key={i} filled={i < rev.rating} className="w-4 h-4" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{rev.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button 
            className="px-8 py-4 rounded-md font-medium text-white transition-all hover:bg-gray-800 text-sm tracking-wide"
            style={{ backgroundColor: colors.dark }}
          >
            ALLE GOOGLE BEWERTUNGEN ANSEHEN
          </button>
        </div>
      </div>
    </section>
  );
}

function PreFooterCTA({ colors }) {
  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#1C2520' }}>
       {/* Subtle background pattern/gradient simulation */}
       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
       <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-white">
          <div className="flex items-center mb-6 md:mb-0">
            <Icons.Scissors className="w-12 h-12 mr-6 text-[#B89564] opacity-80" />
            <div>
              <p className="text-[#B89564] text-sm font-semibold uppercase tracking-widest mb-1">Bereit für Ihren neuen Look?</p>
              <h2 className="text-3xl font-serif font-bold">Wir freuen uns auf Sie!</h2>
            </div>
          </div>
          <button 
            className="px-8 py-4 rounded-sm font-medium transition-all hover:opacity-90 whitespace-nowrap flex items-center space-x-2"
            style={{ backgroundColor: colors.gold, color: '#fff' }}
          >
            <span>JETZT TERMIN BUCHEN</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
       </div>
    </section>
  );
}

function Footer({ colors }) {
  return (
    <footer className="text-gray-300 pt-20 pb-8" style={{ backgroundColor: '#0B0F0D' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div>
          <div className="text-white text-3xl font-serif font-bold tracking-widest mb-6">
            ANITA<br/><span className="text-sm font-sans tracking-[0.3em] font-light">COIFFEUR</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Ihr Friseur in Schöftland – mit Leidenschaft für schöne Haare.
          </p>
          <div className="flex space-x-4">
            {/* Social Icons Placeholder */}
            <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 cursor-pointer transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 cursor-pointer transition-colors">
               <span className="sr-only">Facebook</span>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </div>
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-white font-semibold mb-6 tracking-wide">LINKS</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Über uns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Leistungen</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Preise</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Galerie</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
          </ul>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="text-white font-semibold mb-6 tracking-wide">LEISTUNGEN</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Schneiden</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Styling</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Farbe</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pflege</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Herren</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mèches & Balayage</a></li>
          </ul>
        </div>

        {/* Contact & Map Column */}
        <div>
          <h4 className="text-white font-semibold mb-6 tracking-wide">KONTAKT</h4>
          <ul className="space-y-4 text-sm mb-6">
            <li className="flex items-start">
              <Icons.Location className="w-5 h-5 mr-3 mt-0.5 text-[#B89564] flex-shrink-0" />
              <span>Greenhyaccat 1<br/>5048 Schöftland<br/>Schweiz</span>
            </li>
            <li className="flex items-center">
              <Icons.Phone className="w-5 h-5 mr-3 text-[#B89564] flex-shrink-0" />
              <span>062 721 25 25</span>
            </li>
            <li className="flex items-start">
              <Icons.Clock className="w-5 h-5 mr-3 mt-0.5 text-[#B89564] flex-shrink-0" />
              <span>Di – Fr: 08:00 – 18:30<br/>Sa: 07:30 – 15:00</span>
            </li>
          </ul>
          
          {/* Map Mockup */}
          <div className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            {/* Minimalist Map Representation */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icons.Location className="w-8 h-8 text-[#B89564]" />
            </div>
            <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-[#141716] border border-gray-600 rounded text-xs font-medium text-white hover:bg-gray-800 transition-colors">
              ROUTE PLANEN
            </button>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>© 2026 Anita Coiffeur. Alle Rechte vorbehalten.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-300 transition-colors">Impressum</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}