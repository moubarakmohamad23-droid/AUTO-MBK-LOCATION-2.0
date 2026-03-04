/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Phone, MessageCircle, MapPin, Mail, Clock, Car, Star, ChevronRight, ExternalLink, ShieldCheck, Zap, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Language = 'fr' | 'en' | 'de' | 'ar';

interface Translation {
  slogan: string;
  heroTitle: string;
  heroDesc: string;
  btnFleet: string;
  btnOccasion: string;
  callBtn: string;
  waBtn: string;
  fleetTitle: string;
  rentalTitle: string;
  occasionTitle: string;
  occasionDesc: string;
  occasionBtn: string;
  offerBadge: string;
  noticeText: string;
  catLuxe: string;
  catUtility: string;
  catComfort: string;
  reviewsTitle: string;
  hoursTitle: string;
  hoursText: string;
  addressTitle: string;
  footer: string;
}

const translations: Record<Language, Translation> = {
  fr: {
    slogan: "Votre partenaire automobile à Etoy • Lausanne • Genève",
    heroTitle: "AUTO <span class='text-red-600'>MBK</span>",
    heroDesc: "Location de véhicules Premium et vente de voitures d'occasion sélectionnées avec soin.",
    btnFleet: "Location MBK",
    btnOccasion: "Véhicules d'occasion",
    callBtn: "Appeler",
    waBtn: "WhatsApp",
    fleetTitle: "Notre Flotte de Location",
    rentalTitle: "MBK Location",
    occasionTitle: "Voitures d'occasion",
    occasionDesc: "Découvrez notre sélection de véhicules d'occasion sur AutoScout24. Qualité et fiabilité garanties par A.C.S AUTOMOBILES.",
    occasionBtn: "Voir sur AutoScout24",
    offerBadge: "Offre dès 20 CHF / jour",
    noticeText: "😊 Contactez-nous une heure avant votre passage.",
    catLuxe: "Voitures de Luxe",
    catUtility: "Voitures Utilitaires",
    catComfort: "Voitures Confortables",
    reviewsTitle: "Avis Clients",
    hoursTitle: "Horaires d'ouverture",
    hoursText: "Lundi – Samedi : 08h00 – 19h00<br/>Dimanche : Sur rendez-vous",
    addressTitle: "Contact & Localisation",
    footer: "AUTO MBK – A.C.S AUTOMOBILES • Etoy • Vaud • Suisse",
  },
  en: {
    slogan: "Your automotive partner in Etoy • Lausanne • Geneva",
    heroTitle: "AUTO <span class='text-red-600'>MBK</span>",
    heroDesc: "Premium car rental and carefully selected used car sales.",
    btnFleet: "MBK Rental",
    btnOccasion: "Used Vehicles",
    callBtn: "Call",
    waBtn: "WhatsApp",
    fleetTitle: "Our Rental Fleet",
    rentalTitle: "MBK Rental",
    occasionTitle: "Used Cars",
    occasionDesc: "Discover our selection of used vehicles on AutoScout24. Quality and reliability guaranteed by A.C.S AUTOMOBILES.",
    occasionBtn: "View on AutoScout24",
    offerBadge: "Offer from 20 CHF / day",
    noticeText: "😊 Please contact us one hour before your arrival.",
    catLuxe: "Luxury Cars",
    catUtility: "Utility Vehicles",
    catComfort: "Comfortable Cars",
    reviewsTitle: "Customer Reviews",
    hoursTitle: "Opening Hours",
    hoursText: "Monday – Saturday: 08:00 – 19:00<br/>Sunday by appointment",
    addressTitle: "Contact & Location",
    footer: "AUTO MBK – A.C.S AUTOMOBILES • Etoy • Vaud • Switzerland",
  },
  de: {
    slogan: "Ihr Automobilpartner in Etoy • Lausanne • Genf",
    heroTitle: "AUTO <span class='text-red-600'>MBK</span>",
    heroDesc: "Premium-Autovermietung und sorgfältig ausgewählte Gebrauchtwagen.",
    btnFleet: "MBK Vermietung",
    btnOccasion: "Gebrauchtwagen",
    callBtn: "Anrufen",
    waBtn: "WhatsApp",
    fleetTitle: "Unsere Mietflotte",
    rentalTitle: "MBK Vermietung",
    occasionTitle: "Gebrauchtwagen",
    occasionDesc: "Entdecken Sie unsere Auswahl an Gebrauchtwagen auf AutoScout24. Qualität und Zuverlässigkeit garantiert durch A.C.S AUTOMOBILES.",
    occasionBtn: "Auf AutoScout24 ansehen",
    offerBadge: "Angebot ab 20 CHF / Tag",
    noticeText: "😊 Bitte kontaktieren Sie uns eine Stunde vor Ihrer Ankunft.",
    catLuxe: "Luxusautos",
    catUtility: "Nutzfahrzeuge",
    catComfort: "Komfortable Autos",
    reviewsTitle: "Kundenbewertungen",
    hoursTitle: "Öffnungszeiten",
    hoursText: "Montag – Samstag: 08:00 – 19:00<br/>Sonntag nach Vereinbarung",
    addressTitle: "Kontakt & Standort",
    footer: "AUTO MBK – A.C.S AUTOMOBILES • Etoy • Vaud • Schweiz",
  },
  ar: {
    slogan: "شريكك في عالم السيارات في إتوي • لوزان • جنيف",
    heroTitle: "أوتو <span class='text-red-600'>MBK</span>",
    heroDesc: "تأجير سيارات فاخرة وبيع سيارات مستعملة مختارة بعناية.",
    btnFleet: "MBK للإيجار",
    btnOccasion: "سيارات مستعملة",
    callBtn: "اتصال",
    waBtn: "واتساب",
    fleetTitle: "أسطول التأجير لدينا",
    rentalTitle: "MBK للإيجار",
    occasionTitle: "سيارات مستعملة",
    occasionDesc: "اكتشف مجموعتنا من السيارات المستعملة على AutoScout24. الجودة والموثوقية مضمونة من قبل A.C.S AUTOMOBILES.",
    occasionBtn: "عرض على AutoScout24",
    offerBadge: "عرض يبدأ من 20 فرنك / اليوم",
    noticeText: "😊 يرجى الاتصال بنا قبل ساعة واحدة من وصولك.",
    catLuxe: "سيارات فاخرة",
    catUtility: "سيارات نفعية",
    catComfort: "سيارات مريحة",
    reviewsTitle: "آراء العملاء",
    hoursTitle: "ساعات العمل",
    hoursText: "من الاثنين إلى السبت : 08:00 – 19:00<br/>الأحد حسب الموعد",
    addressTitle: "العنوان ووسائل الاتصال",
    footer: "أوتو MBK – A.C.S AUTOMOBILES • إتوي • فود • سويسرا",
  },
};

interface CarData {
  id: string;
  name: string;
  price: string;
  img: string;
  category: string;
  description_fr: string;
  description_en: string;
  description_de: string;
  description_ar: string;
  features: string;
}

const clientReviews = [
  { name: "Jean-Pierre", text: "Service impeccable, voitures très propres et personnel professionnel !", lang: "FR", img: "https://i.pravatar.cc/150?u=jp" },
  { name: "Sarah Johnson", text: "Best car rental in Switzerland! The BMW M3 was a dream to drive.", lang: "EN", img: "https://i.pravatar.cc/150?u=sarah" },
  { name: "Marco Rossi", text: "Auto fantastiche e personale gentilissimo. Prezzi molto onesti per la zona.", lang: "IT", img: "https://i.pravatar.cc/150?u=marco" },
  { name: "Ahmed Al-Farsi", text: "تجربة رائعة جداً، السيارات حديثة والتعامل راقي جداً. أنصح به بشدة.", lang: "AR", img: "https://i.pravatar.cc/150?u=ahmed" },
  { name: "Elena Schmidt", text: "Sehr professionell und zuverlässig. Die Toyota Yaris war perfekt für die Stadt.", lang: "DE", img: "https://i.pravatar.cc/150?u=elena" },
  { name: "Giulia Bianchi", text: "Noleggio semplice e veloce. Macchine in ottime condizioni. Tornerò sicuramente!", lang: "IT", img: "https://i.pravatar.cc/150?u=giulia" },
];

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [reviewIdx, setReviewIdx] = useState(0);
  const [cars, setCars] = useState<CarData[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [activeCategory, setActiveCategory] = useState('confortable');
  const [editingCar, setEditingCar] = useState<CarData | null>(null);
  const [newCar, setNewCar] = useState<Partial<CarData>>({
    name: '', price: '', img: '', category: 'confortable',
    description_fr: '', description_en: '', description_de: '', description_ar: '', features: ''
  });

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    const normalizedInput = adminPassword.trim().toUpperCase();
    const normalizedSecret = 'LE MBK'.toUpperCase();
    
    if (normalizedInput === normalizedSecret) {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setAdminPassword('');
    } else {
      alert('Code incorrect. Essayez: LE MBK');
    }
  };

  const t = translations[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch("/api/cars");
      const data = await res.json();
      setCars(data);
    } catch (e) {
      console.error("Failed to fetch cars", e);
    }
  };

  const handleAddCar = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
    });
    setNewCar({ name: '', price: '', img: '', category: 'confortable', description_fr: '', description_en: '', description_de: '', description_ar: '', features: '' });
    setShowAdminModal(false);
    fetchCars();
  };

  const handleUpdateCar = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingCar) return;
    try {
      const res = await fetch(`/api/cars/${editingCar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCar),
      });
      if (res.ok) {
        alert("Véhicule mis à jour avec succès !");
        setEditingCar(null);
        fetchCars();
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau");
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, isEditing: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isEditing && editingCar) {
          setEditingCar({ ...editingCar, img: base64String });
        } else {
          setNewCar({ ...newCar, img: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteCar = async (id: string) => {
    if (confirm("Supprimer cette voiture ?")) {
      await fetch(`/api/cars/${id}`, { method: "DELETE" });
      fetchCars();
    }
  };

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIdx((prev) => (prev + 1) % clientReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => setReviewIdx((prev) => (prev + 1) % clientReviews.length);
  const prevReview = () => setReviewIdx((prev) => (prev - 1 + clientReviews.length) % clientReviews.length);

  const renderCarSection = (category: string, title: string, id: string) => {
    const filteredCars = cars.filter(c => c.category === category);
    if (filteredCars.length === 0) return null;

    return (
      <div id={id} className="mb-32 scroll-mt-40">
        <h3 className="text-4xl font-black text-white mb-16 uppercase tracking-tighter border-l-8 border-red-600 pl-8">
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCars.map((car, idx) => (
            <motion.div 
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-zinc-900/40 rounded-sm overflow-hidden border border-white/5 hover:border-red-600/30 transition-all duration-500 relative backdrop-blur-sm"
            >
              {isAdmin && (
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <button 
                    onClick={() => handleDeleteCar(car.id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-lg"
                  >
                    <Star size={16} className="rotate-45" />
                  </button>
                  <button 
                    onClick={() => setEditingCar(car)}
                    className="bg-white text-black px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-red-600 hover:text-white transition-colors"
                  >
                    MODIFIER
                  </button>
                </div>
              )}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={car.img} 
                  alt={car.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-[0.2em]">
                  {category === 'luxe' ? 'Exclusive' : 'Premium'}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{car.name}</h3>
                
                {(car.name.includes('Toyota') || car.features.includes('Caméra')) && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1.5 text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-500/10 px-2 py-1 rounded-sm">
                      <Zap size={10} /> Automatique
                    </div>
                    {car.features.split(',').map((f, i) => f.trim() && (
                      <div key={i} className="inline-flex items-center gap-1.5 text-zinc-400 text-[10px] font-black uppercase tracking-widest bg-zinc-800 px-2 py-1 rounded-sm">
                        {f.trim()}
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-zinc-500 text-sm mb-8 leading-relaxed font-medium">
                  {car[`description_${lang}` as keyof CarData] || car.description_fr}
                </p>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xl font-black text-red-600">{car.price}</span>
                  <a href="https://wa.me/41768302930" className="text-zinc-500 hover:text-red-600 transition-colors">
                    <MessageCircle size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-red-600/30 ${isRTL ? 'font-arabic' : ''}`}>
      {/* Admin Status Banner */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.5em] py-2 text-center sticky top-0 z-[60] shadow-2xl"
          >
            Mode Admin Activé • Bouton MODIFIER disponible sur chaque véhicule
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="bg-white/5 backdrop-blur-md text-zinc-400 py-2 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
          <div className="flex items-center gap-6">
            <a href="tel:+41768302930" className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
              <Phone size={12} className="text-red-600" /> 076 830 29 30
            </a>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin size={12} className="text-red-600" /> Rue du Stand 25, 1163 Etoy
            </span>
          </div>
          <div className="flex gap-4">
            {(['fr', 'en', 'de', 'ar'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`hover:text-white transition-colors ${lang === l ? 'text-red-600' : ''}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 px-4 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Artistic Oval Sporty Car Logo - M3 G80 Style */}
          <div className="relative group cursor-pointer px-10 py-6">
            {/* Artistic Oval Background - Tighter and more aggressive */}
            <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-[100%] rotate-[-4deg] group-hover:rotate-[4deg] transition-transform duration-700"></div>
            <div className="absolute inset-1 border border-emerald-500/50 rounded-[100%] rotate-[8deg] group-hover:rotate-[-8deg] transition-transform duration-1000"></div>
            
            <div className="relative flex flex-col items-center">
              <div className="relative mb-2">
                <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 group-hover:text-white transition-colors duration-500">
                  {/* M3 G80 Silhouette - Aggressive Profile */}
                  <path d="M10 45C10 42 12 40 15 40H90C93 40 95 42 95 45V52H10V45Z" fill="currentColor" />
                  <path d="M25 40L40 18H75L90 40H25Z" fill="currentColor" />
                  {/* Aggressive Front Lip */}
                  <path d="M10 52H20V54H10V52Z" fill="currentColor" />
                  {/* Rear Lip Spoiler */}
                  <path d="M90 38H97V40H90V38Z" fill="currentColor" />
                  {/* Open Trunk - Extreme angle */}
                  <path d="M90 40L120 15L110 40H90Z" fill="currentColor" className="animate-pulse" />
                  
                  {/* Drift / Wind Lines from Wheels */}
                  <motion.g 
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="opacity-60"
                  >
                    <path d="M15 56H-5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                    <path d="M50 56H30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                    <path d="M85 56H65" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                  </motion.g>

                  {/* Wheels */}
                  <circle cx="32" cy="52" r="7" fill="white" />
                  <circle cx="80" cy="52" r="7" fill="white" />
                </svg>
                
                {/* "Falling" AUTO MBK text - Larger and more inclined */}
                <div className="absolute top-[-10px] right-[-65px] pointer-events-none">
                  <motion.div 
                    initial={{ y: -30, opacity: 0, rotate: -20 }}
                    animate={{ y: [0, 20, 0], opacity: 1, rotate: [-20, -35, -20] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-start"
                  >
                    <span className="text-[18px] font-black text-white tracking-tighter leading-none drop-shadow-2xl italic">AUTO</span>
                    <span className="text-[28px] font-black text-emerald-500 italic tracking-tighter leading-none drop-shadow-[0_10px_25px_rgba(16,185,129,1)]">MBK</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10 font-black text-[11px] uppercase tracking-[0.3em] text-zinc-400">
            <a href="#location" className="hover:text-white transition-all hover:tracking-[0.4em]">{t.btnFleet}</a>
            <a href="#occasion" className="hover:text-white transition-all hover:tracking-[0.4em]">{t.occasionTitle}</a>
            <a href="#contact" className="hover:text-white transition-all hover:tracking-[0.4em]">Contact</a>
          </nav>

          <div className="flex items-center gap-6">
            <a href="https://wa.me/41768302930" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-emerald-500 transition-colors">
              <MessageCircle size={24} />
            </a>
            <a href="tel:+41768302930" className="bg-white text-black px-8 py-2.5 rounded-sm text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all hidden sm:block shadow-xl">
              {t.callBtn}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - Luxury Garage Storefront */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0">
          {/* High-End Garage Storefront / Showroom */}
          <img 
            src="https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&q=80&w=1920" 
            alt="AUTO MBK Luxury Garage" 
            className="w-full h-full object-cover brightness-[0.95] scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-flex items-center gap-4 bg-emerald-600 text-white px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl border-2 border-white"
          >
            <Zap size={16} className="fill-white" />
            {t.offerBadge}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl md:text-7xl font-black text-zinc-900 mb-6 tracking-tighter leading-none"
            dangerouslySetInnerHTML={{ __html: t.heroTitle.replace('text-red-600', 'text-emerald-600') }}
          />
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-zinc-600 mb-10 max-w-xl mx-auto font-medium leading-relaxed"
          >
            {t.heroDesc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <a href="#location" className="bg-emerald-600 hover:bg-zinc-900 text-white font-black px-10 py-4 rounded-sm transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 text-base uppercase tracking-widest">
              {t.btnFleet} <ChevronRight size={20} />
            </a>
            <a href="#occasion" className="bg-white hover:bg-emerald-600 hover:text-white text-zinc-900 font-black px-10 py-4 rounded-sm transition-all transform hover:scale-105 flex items-center gap-2 text-base uppercase tracking-widest border border-zinc-200">
              {t.btnOccasion}
            </a>
          </motion.div>
        </div>
      </section>

      {/* MBK Location Section - Back to Dark Theme */}
      <section id="location" className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b border-white/5 pb-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-red-600"></div>
              <div>
                <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[9px] block leading-none mb-1">{t.rentalTitle}</span>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">
                  {t.fleetTitle}
                </h2>
              </div>
            </div>
            
            {/* Category Tabs Integrated */}
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'confortable', label: t.catComfort },
                { id: 'luxe', label: t.catLuxe },
                { id: 'utilitaire', label: t.catUtility }
              ].map((cat) => (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 bg-white/5 text-zinc-500 hover:text-white border border-white/5 hover:bg-red-600 hover:border-red-600"
                >
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-12">
            {renderCarSection('confortable', t.catComfort, 'cat-confortable')}
            {renderCarSection('luxe', t.catLuxe, 'cat-luxe')}
            {renderCarSection('utilitaire', t.catUtility, 'cat-utilitaire')}
          </div>
        </div>
      </section>

      {/* AutoScout24 Section */}
      <section id="occasion" className="py-32 px-4 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-zinc-950 rounded-sm overflow-hidden relative border border-white/5 shadow-2xl">
            <div className="absolute inset-0 opacity-20">
              <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200" alt="Showroom" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 p-12 md:p-24 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 text-center md:text-left">
                <span className="text-red-600 font-black uppercase tracking-[0.4em] text-xs mb-6 block">A.C.S AUTOMOBILES</span>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                  {t.occasionTitle}
                </h2>
                <p className="text-zinc-400 text-xl mb-12 max-w-xl leading-relaxed font-medium">
                  {t.occasionDesc}
                </p>
                <a 
                  href="https://www.google.com/search?q=A.C.S+AUTOMOBILE+AUTOSCOUT" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-4 bg-red-600 text-white font-black px-12 py-5 rounded-sm hover:bg-red-700 transition-all transform hover:scale-105 shadow-2xl text-base uppercase tracking-widest"
                >
                  {t.occasionBtn} <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moving Reviews Carousel */}
      <section className="py-32 px-4 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-24 text-white tracking-tighter">
            {t.reviewsTitle}
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="flex items-center justify-center min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={reviewIdx}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="bg-zinc-900/50 p-12 md:p-16 rounded-sm border border-white/5 shadow-2xl w-full text-center relative backdrop-blur-sm"
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <img 
                      src={clientReviews[reviewIdx].img} 
                      alt={clientReviews[reviewIdx].name} 
                      className="w-24 h-24 rounded-full border-4 border-red-600 shadow-2xl object-cover"
                    />
                  </div>
                  
                  <div className="flex justify-center gap-1 mb-8 mt-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="fill-red-600 text-red-600" />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-white font-bold italic leading-relaxed mb-10">
                    "{clientReviews[reviewIdx].text}"
                  </p>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-black text-red-600 uppercase tracking-widest mb-2">
                      {clientReviews[reviewIdx].name}
                    </span>
                    <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest">
                      Client {clientReviews[reviewIdx].lang} • Vérifié
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <button 
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 bg-zinc-800/80 p-3 rounded-full hover:bg-red-600 transition-colors z-20 backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 bg-zinc-800/80 p-3 rounded-full hover:bg-red-600 transition-colors z-20 backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Contact & Map */}
      <section id="contact" className="py-32 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <span className="text-red-600 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Contact</span>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-12 leading-none">
              {t.addressTitle}
            </h2>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="bg-zinc-900 p-4 rounded-sm border border-white/5">
                  <MapPin className="text-red-600" size={24} />
                </div>
                <div>
                  <h4 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Adresse</h4>
                  <p className="text-lg font-bold text-white">Rue du Stand 25<br/>1163 Etoy, Suisse</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-zinc-900 p-4 rounded-sm border border-white/5">
                  <Phone className="text-red-600" size={24} />
                </div>
                <div>
                  <h4 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Téléphone</h4>
                  <a href="tel:+41768302930" className="text-lg font-bold text-white hover:text-red-600 transition-colors">076 830 29 30</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-zinc-900 p-4 rounded-sm border border-white/5">
                  <Clock className="text-red-600" size={24} />
                </div>
                <div>
                  <h4 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Horaires</h4>
                  <p className="text-lg font-bold text-white" dangerouslySetInnerHTML={{ __html: t.hoursText }} />
                </div>
              </div>
            </div>

            <div className="mt-20 flex gap-6">
              <a href="tel:+41768302930" className="flex-1 bg-red-600 text-white text-center py-5 rounded-sm font-black hover:bg-red-700 transition-colors text-base uppercase tracking-widest shadow-lg">
                {t.callBtn}
              </a>
              <a href="https://wa.me/41768302930" target="_blank" rel="noreferrer" className="flex-1 bg-zinc-800/50 text-white text-center py-5 rounded-sm font-black hover:bg-zinc-800 transition-colors text-base uppercase tracking-widest border border-white/5">
                WhatsApp
              </a>
            </div>
          </div>
          
          <div className="h-[500px] rounded-sm overflow-hidden shadow-2xl border border-white/5">
            <iframe 
              src="https://www.google.com/maps?q=Rue+du+Stand+25,+1163+Etoy&output=embed"
              className="w-full h-full grayscale invert opacity-70"
              title="AUTO MBK Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-20 px-4 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-3xl font-black tracking-tighter text-white flex items-center gap-2">
            <span className="bg-red-600 px-2 py-0.5 rounded-sm">AUTO</span>
            <span className="text-white">MBK</span>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-zinc-500 text-sm text-center md:text-right font-medium">
              © 2026 {t.footer}<br/>
              <span className="text-xs opacity-30 uppercase tracking-[0.2em] mt-2 block">Premium Automotive Experience</span>
            </p>
            <button 
              onClick={handleAdminToggle}
              className="text-[10px] text-zinc-800 hover:text-zinc-600 uppercase tracking-widest font-bold transition-colors"
            >
              {isAdmin ? "Quitter Admin" : "Admin Access"}
            </button>
            {isAdmin && (
              <button 
                onClick={() => setShowAdminModal(true)}
                className="bg-red-600 text-white px-4 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-red-700 shadow-lg shadow-red-600/20"
              >
                Ajouter une voiture
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Admin Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-white/10 p-8 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Ajouter un véhicule</h2>
                <button onClick={() => setShowAdminModal(false)} className="text-zinc-500 hover:text-white">Fermer</button>
              </div>
              
              <form onSubmit={handleAddCar} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Nom du véhicule</label>
                    <input 
                      type="text" required
                      className="w-full bg-zinc-950 border border-white/5 p-3 rounded-sm text-sm focus:border-red-600 outline-none"
                      value={newCar.name} onChange={e => setNewCar({...newCar, name: e.target.value})}
                      placeholder="ex: BMW M4"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Prix</label>
                    <input 
                      type="text" required
                      className="w-full bg-zinc-950 border border-white/5 p-3 rounded-sm text-sm focus:border-red-600 outline-none"
                      value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})}
                      placeholder="ex: 500 CHF / jour"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">URL Image (ou télécharger)</label>
                  <div className="flex gap-4">
                    <input 
                      type="text"
                      className="flex-1 bg-zinc-950 border border-white/5 p-3 rounded-sm text-sm focus:border-red-600 outline-none"
                      value={newCar.img} onChange={e => setNewCar({...newCar, img: e.target.value})}
                      placeholder="https://..."
                    />
                    <label className="bg-zinc-800 px-4 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-zinc-700">
                      Galerie
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, false)} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Catégorie</label>
                  <select 
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-sm text-sm focus:border-red-600 outline-none"
                    value={newCar.category} onChange={e => setNewCar({...newCar, category: e.target.value})}
                  >
                    <option value="luxe">Luxe</option>
                    <option value="utilitaire">Utilitaire</option>
                    <option value="confortable">Confortable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Description (FR)</label>
                  <textarea 
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-sm text-sm focus:border-red-600 outline-none h-24"
                    value={newCar.description_fr} onChange={e => setNewCar({...newCar, description_fr: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Options / Features (séparées par des virgules)</label>
                  <input 
                    type="text"
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-sm text-sm focus:border-red-600 outline-none"
                    value={newCar.features} onChange={e => setNewCar({...newCar, features: e.target.value})}
                    placeholder="Caméra de recul, Aide au parcage, etc."
                  />
                </div>

                <button type="submit" className="w-full bg-red-600 text-white font-black py-4 rounded-sm uppercase tracking-widest hover:bg-red-700 transition-colors">
                  Enregistrer le véhicule
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Edit Modal */}
      <AnimatePresence>
        {editingCar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-white/10 p-8 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Modifier le véhicule</h2>
                <button onClick={() => setEditingCar(null)} className="text-zinc-500 hover:text-white">Fermer</button>
              </div>
              
              <form onSubmit={handleUpdateCar} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Nom du véhicule</label>
                    <input 
                      type="text" required
                      className="w-full bg-zinc-950 border border-white/5 p-3 rounded-sm text-sm focus:border-red-600 outline-none"
                      value={editingCar.name} onChange={e => setEditingCar({...editingCar, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Prix</label>
                    <input 
                      type="text" required
                      className="w-full bg-zinc-950 border border-white/5 p-3 rounded-sm text-sm focus:border-red-600 outline-none"
                      value={editingCar.price} onChange={e => setEditingCar({...editingCar, price: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">URL Image (ou télécharger)</label>
                  <div className="flex gap-4">
                    <input 
                      type="text"
                      className="flex-1 bg-zinc-950 border border-white/5 p-3 rounded-sm text-sm focus:border-red-600 outline-none"
                      value={editingCar.img} onChange={e => setEditingCar({...editingCar, img: e.target.value})}
                    />
                    <label className="bg-zinc-800 px-4 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-zinc-700">
                      Galerie
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, true)} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Catégorie</label>
                  <select 
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-sm text-sm focus:border-red-600 outline-none"
                    value={editingCar.category} onChange={e => setEditingCar({...editingCar, category: e.target.value})}
                  >
                    <option value="luxe">Luxe</option>
                    <option value="utilitaire">Utilitaire</option>
                    <option value="confortable">Confortable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Description (FR)</label>
                  <textarea 
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-sm text-sm focus:border-red-600 outline-none h-24"
                    value={editingCar.description_fr} onChange={e => setEditingCar({...editingCar, description_fr: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Options / Features</label>
                  <input 
                    type="text"
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-sm text-sm focus:border-red-600 outline-none"
                    value={editingCar.features} onChange={e => setEditingCar({...editingCar, features: e.target.value})}
                  />
                </div>

                <button type="submit" className="w-full bg-red-600 text-white font-black py-4 rounded-sm uppercase tracking-widest hover:bg-red-700 transition-colors">
                  Mettre à jour le véhicule
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-zinc-900 border border-white/10 p-8 rounded-sm max-w-sm w-full shadow-2xl"
            >
              <h2 className="text-xl font-black uppercase tracking-tighter mb-6 text-center">Accès Restreint</h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <input 
                  type="password"
                  autoFocus
                  className="w-full bg-zinc-950 border border-white/5 p-4 rounded-sm text-center text-lg tracking-[0.5em] focus:border-red-600 outline-none"
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  placeholder="••••••"
                />
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 bg-zinc-800 text-white py-3 rounded-sm text-xs font-black uppercase tracking-widest"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-3 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-red-700"
                  >
                    Entrer
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
