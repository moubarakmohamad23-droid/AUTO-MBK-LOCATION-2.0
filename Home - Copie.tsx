import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/language';
import { useCars, Car } from '../lib/api';
import { Logo } from '../components/Logo';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Reviews } from '../components/Reviews';
import { generateHeroImage } from '../services/imageService';
import { 
  ArrowRight, 
  Car as CarIcon, 
  ExternalLink, 
  Phone, 
  MapPin, 
  Mail, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft,
  Clock,
  Facebook,
  Globe,
  Star,
  Truck,
  X
} from 'lucide-react';

function CarRow({ title, cars, id, onCarClick }: { title: string; cars: Car[]; id: string; onCarClick: (car: Car) => void }) {
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  if (cars.length === 0) return null;

  return (
    <div id={id} className="mb-16 relative group/row">
      <h3 className="text-2xl md:text-3xl font-black text-white mb-6 px-6 md:px-16 flex items-center gap-3 tracking-tighter uppercase">
        <span className="w-1.5 h-8 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></span>
        {title}
      </h3>
      
      <div className="relative px-4 md:px-16">
        {showLeft && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-8 z-30 bg-black/60 hover:bg-black/90 text-white w-12 flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100 hidden md:flex"
          >
            <ChevronLeft size={40} />
          </button>
        )}
        
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-0 pb-8"
        >
          {cars.map((car) => (
            <motion.div
              key={car.id}
              onClick={() => onCarClick(car)}
              className="w-full group relative rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl cursor-pointer border border-zinc-800/50 hover:border-red-600/30 transition-all"
              whileHover={{ scale: 1.02, zIndex: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="aspect-video w-full overflow-hidden relative">
                <img 
                  src={car.img} 
                  alt={car.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />
                <div className="absolute top-4 right-4">
                  <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-xl uppercase tracking-widest">
                    {car.price}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-black text-xl text-red-600 mb-1 tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{car.name}</h4>
                <p className="text-zinc-400 text-sm line-clamp-1 group-hover:line-clamp-none transition-all duration-300 mb-4 leading-relaxed opacity-0 group-hover:opacity-100">
                  {(car as any)[`description_${language}`] || car.description_en}
                </p>
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    {car.features && car.features.split(',').slice(0, 2).map((f, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 bg-red-600/20 px-2 py-1 rounded border border-red-500/20">
                        {f.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-lg">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {showRight && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-8 z-30 bg-black/60 hover:bg-black/90 text-white w-12 flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100 hidden md:flex"
          >
            <ChevronRight size={40} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const { t, language } = useLanguage();
  const { cars } = useCars();
  const [scrolled, setScrolled] = useState(false);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Check if we already have a generated image in storage to keep it stable
    const savedImage = localStorage.getItem('mbk_hero_image');
    if (savedImage) {
      setHeroImage(savedImage);
    } else {
      generateHeroImage().then(data => {
        if (data) {
          const base64 = `data:image/png;base64,${data}`;
          setHeroImage(base64);
          localStorage.setItem('mbk_hero_image', base64);
        }
      });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const luxeCars = cars.filter(c => c.category === 'luxe');
  const comfortCars = cars.filter(c => c.category === 'confortable');
  const utilityCars = cars.filter(c => c.category === 'utilitaire');

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-green-500/30 overflow-x-hidden">
      {/* Top Info Bar */}
      <div className="absolute top-0 left-0 right-0 z-[60] bg-gradient-to-b from-black/80 to-transparent text-zinc-300 py-3 px-6 text-[10px] md:text-xs flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <a href="mailto:mbklocation.ch@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={12} /> mbklocation.ch@gmail.com
          </a>
          <div className="hidden sm:flex items-center gap-1.5">
            <Clock size={12} /> Fermé aujourd'hui
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white transition-colors"><Facebook size={14} /></a>
          <div className="h-3 w-[1px] bg-zinc-700 mx-2"></div>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Header - Inspired by Viviane Auto */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/95 shadow-2xl py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="scale-75 md:scale-90" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-bold text-red-600 border-b-2 border-red-600 pb-1">Accueil</button>
            <button onClick={() => scrollTo('rentals')} className="text-sm font-bold text-zinc-300 hover:text-red-600 transition-colors">Voitures de location</button>
            <button onClick={() => scrollTo('occasion')} className="text-sm font-bold text-zinc-300 hover:text-red-600 transition-colors">Voitures d'occasion</button>
            <button onClick={() => scrollTo('contact')} className="text-sm font-bold text-zinc-300 hover:text-red-600 transition-colors">Contact</button>
          </nav>

          <div className="flex items-center gap-3">
            <a href="https://wa.me/41768302930" target="_blank" rel="noreferrer" className="bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-full transition-all active:scale-95 shadow-lg shadow-green-900/20">
              <MessageCircle size={18} />
            </a>
            <a href="tel:+41768302930" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-black transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-green-900/20">
              <Phone size={16} />
              <span className="hidden sm:inline">076 830 29 30</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage || "/toyotabmw.jpg"} 
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1920&auto=format&fit=crop";
            }}
            className="w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-zinc-950" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-block"
          >
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="bg-red-600 text-white px-8 py-3 rounded-full text-base font-black tracking-widest uppercase mb-6 shadow-[0_0_30px_rgba(220,38,38,0.6)] border-2 border-white/20"
            >
              {t('offer.daily')}
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-[0.85] text-white drop-shadow-2xl"
          >
            AUTO MBK <br />
            <span className="text-red-600">EXCELLENCE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-white/80 text-sm md:text-lg font-bold uppercase tracking-[0.2em] mb-8"
          >
            Location Vaud entre Lausanne et Genève <br />
            <span className="text-xs md:text-sm text-white/60">Morges • Nyon • Gland • Aubonne • Etoy</span>
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <button 
              onClick={() => scrollTo('rentals')}
              className="bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-2xl"
            >
              Louer une voiture
            </button>
            <button 
              onClick={() => scrollTo('occasion')}
              className="bg-zinc-900/80 backdrop-blur-md text-white border border-zinc-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-zinc-800 transition-all active:scale-95 shadow-2xl flex items-center gap-3"
            >
              Acheter une voiture
              <ExternalLink size={20} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Category Navigation Rectangles */}
      <div className="relative z-20 -mt-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 'comfort', title: t('voiture.comfortable'), icon: <CarIcon />, color: 'from-blue-600 to-blue-950', accent: 'bg-blue-500' },
          { id: 'luxe', title: t('voiture.luxury'), icon: <Star />, color: 'from-red-600 to-red-950', accent: 'bg-red-500' },
          { id: 'utility', title: t('voiture.utility'), icon: <Truck />, color: 'from-zinc-700 to-zinc-900', accent: 'bg-zinc-500' }
        ].map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo(cat.id)}
            className={`relative overflow-hidden h-32 rounded-3xl p-8 flex items-center justify-between group shadow-2xl bg-gradient-to-br ${cat.color} border border-white/10`}
          >
            <div className="relative z-10 text-left">
              <span className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-1 block">Découvrir</span>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">{cat.title}</h3>
            </div>
            <div className="relative z-10 w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-md group-hover:bg-white/20 transition-all group-hover:scale-110">
              {cat.icon}
            </div>
            <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity translate-x-1/4 translate-y-1/4">
              <CarIcon size={160} />
            </div>
            <div className={`absolute bottom-0 left-0 w-full h-1 ${cat.accent} scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
          </motion.button>
        ))}
      </div>

      {/* Main Content Sections */}
      <main id="rentals" className="pt-32 pb-20">
        <CarRow id="comfort" title={t('category.confortable')} cars={comfortCars} onCarClick={setSelectedCar} />
        <CarRow id="luxe" title={t('category.luxe')} cars={luxeCars} onCarClick={setSelectedCar} />
        <CarRow id="utility" title={t('category.utilitaire')} cars={utilityCars} onCarClick={setSelectedCar} />

        {/* Modal for Car Details */}
        <AnimatePresence>
          {selectedCar && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCar(null)}
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.3)]"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedCar.img} 
                  alt={selectedCar.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
                  <h2 className="text-3xl md:text-5xl font-black text-red-600 mb-2 uppercase tracking-tighter drop-shadow-2xl">{selectedCar.name}</h2>
                  <p className="text-white/80 text-lg font-bold">{selectedCar.price}</p>
                  <p className="text-zinc-300 mt-4 max-w-2xl">
                    {(selectedCar as any)[`description_${language}`] || selectedCar.description_en}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedCar(null)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all"
                >
                  <X size={24} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Marketing Section - Used Cars */}
        <div id="occasion" className="px-6 max-w-7xl mx-auto my-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block relative h-[500px] rounded-[3rem] overflow-hidden group shadow-2xl border border-zinc-800"
          >
            <img 
              src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1920&auto=format&fit=crop" 
              alt="BMW M3 G80" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 p-12 flex flex-col justify-center max-w-2xl">
              <span className="text-amber-500 font-black tracking-[0.3em] uppercase mb-4">Opportunité Unique</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
                Découvrez nos <br /> voitures d'occasion
              </h2>
              <p className="text-zinc-300 text-lg mb-8 font-medium">
                Des véhicules sélectionnés avec soin, révisés et garantis. Trouvez la perle rare chez A.C.S Automobile.
              </p>
              <a 
                href="https://www.google.com/search?q=a.c.s+automobile+autoscout"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 text-white font-black uppercase tracking-widest group-hover:gap-6 transition-all"
              >
                Voir le catalogue <ArrowRight className="text-amber-500" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="bg-zinc-900/30 py-20">
          <Reviews />
        </div>

        {/* Contact Section */}
        <div id="contact" className="px-6 max-w-7xl mx-auto mt-20">
          <div className="bg-zinc-900 rounded-[3rem] p-8 md:p-20 border border-zinc-800 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                >
                  <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter text-white uppercase">
                    {t('home.contact')}
                  </h2>
                  <div className="inline-flex items-center gap-3 bg-orange-500/10 text-orange-400 px-6 py-3 rounded-2xl border border-orange-500/20 mb-10">
                    <span className="text-2xl">😊</span>
                    <p className="font-bold text-sm">{t('contact.call_ahead')}</p>
                  </div>
                </motion.div>
                
                <div className="space-y-8">
                  <a href="tel:+41768302930" className="flex items-center gap-6 text-2xl md:text-3xl font-black text-white hover:text-red-500 transition-all group">
                    <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xl">
                      <Phone size={28} />
                    </div>
                    076 830 29 30
                  </a>
                  
                  <a 
                    href="https://wa.me/41768302930" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-6 text-2xl md:text-3xl font-black text-white hover:text-red-500 transition-all group"
                  >
                    <div className="w-16 h-16 bg-red-900/30 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xl">
                      <MessageCircle size={28} />
                    </div>
                    WhatsApp
                  </a>

                  <a 
                    href="mailto:mbklocation.ch@gmail.com" 
                    className="flex items-center gap-6 text-2xl md:text-3xl font-black text-white hover:text-red-500 transition-all group"
                  >
                    <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xl">
                      <Mail size={28} />
                    </div>
                    mbklocation.ch@gmail.com
                  </a>

                  <div className="flex items-center gap-6 text-2xl md:text-3xl font-black text-white">
                    <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-red-600 shadow-xl">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <p className="leading-none">Rue du Stand 25</p>
                      <p className="text-sm text-zinc-500 font-bold mt-2 uppercase tracking-widest">1163 Etoy, Suisse</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[500px] bg-zinc-800 rounded-[2.5rem] overflow-hidden border border-zinc-700 shadow-2xl relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.367776450628!2d6.4172!3d46.4839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c3a2a2a2a2a2b%3A0x0!2zNDbCsDI5JzAyLjAiTiA2wrAyNScwMS45IkU!5e0!3m2!1sen!2sch!4v1620000000000!5m2!1sen!2sch" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
                  allowFullScreen 
                  loading="lazy" 
                />
                <div className="absolute inset-0 pointer-events-none border-[12px] border-zinc-900 rounded-[2.5rem]" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SEO Section */}
      <section className="py-10 bg-zinc-950 border-t border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mb-6">Zones de service MBK Location</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-zinc-600 text-sm font-medium">
            <span>Location voiture Etoy</span>
            <span>Location voiture Aubonne</span>
            <span>Location voiture Gland</span>
            <span>Location voiture Rolle</span>
            <span>Location voiture Morges</span>
            <span>Location voiture Nyon</span>
            <span>Location voiture Lausanne</span>
            <span>Location voiture Genève</span>
            <span>Location voiture Canton de Vaud</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
            <div className="flex items-center gap-4">
              <Logo className="scale-110" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">Accueil</button>
              <button onClick={() => scrollTo('rentals')} className="text-sm font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">Location</button>
              <button onClick={() => scrollTo('occasion')} className="text-sm font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">Occasion</button>
              <button onClick={() => scrollTo('contact')} className="text-sm font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">Contact</button>
            </div>
          </div>

          <div className="h-[1px] bg-zinc-900 w-full mb-8"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600">
            <div className="text-xs font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Auto MBK. Excellence Automobile.
            </div>
            <div className="flex items-center gap-6">
              <Link to="/admin" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-red-500 transition-colors">Admin Access</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

