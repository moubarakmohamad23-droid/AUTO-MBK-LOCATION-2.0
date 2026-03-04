import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/language';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState } from 'react';

const reviews = [
  {
    id: 1,
    name: "Jean-Pierre",
    lang: "fr",
    text: "Service impeccable ! La voiture était propre et le personnel très arrangeant. Je recommande vivement.",
    rating: 5,
    img: "https://picsum.photos/seed/jp/100/100"
  },
  {
    id: 2,
    name: "Ahmed Al-Sayed",
    lang: "ar",
    text: "تجربة ممتازة، تعامل راقي وسيارات نظيفة جداً. أنصح الجميع بالتعامل معهم.",
    rating: 5,
    img: "https://picsum.photos/seed/ahmed/100/100"
  },
  {
    id: 3,
    name: "Sarah Smith",
    lang: "en",
    text: "Great experience! The booking process was smooth and the car was in perfect condition. Will rent again.",
    rating: 5,
    img: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    id: 4,
    name: "Hans Müller",
    lang: "de",
    text: "Sehr guter Service, freundliches Personal und faire Preise. Das Auto war top gepflegt.",
    rating: 5,
    img: "https://picsum.photos/seed/hans/100/100"
  }
];

export function Reviews() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="py-24 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            {t('reviews.title')}
          </h2>
          <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
        </div>
        
        <div className="relative group">
          {/* Navigation Arrows */}
          <button 
            onClick={prev}
            className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-zinc-900 border border-zinc-800 text-white rounded-full flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all shadow-2xl"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button 
            onClick={next}
            className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-zinc-900 border border-zinc-800 text-white rounded-full flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all shadow-2xl"
          >
            <ChevronRight size={28} />
          </button>

          {/* Review Card Screen */}
          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-[3rem] p-8 md:p-20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Quote size={140} className="text-red-600" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-8">
                  <div className="w-28 h-28 rounded-full border-4 border-red-600 p-1 shadow-[0_0_25px_rgba(220,38,38,0.3)]">
                    <img 
                      src={reviews[activeIndex].img} 
                      alt={reviews[activeIndex].name} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-2.5 rounded-full shadow-lg">
                    <Star size={18} fill="currentColor" />
                  </div>
                </div>

                <div className="flex gap-1.5 mb-8">
                  {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                    <Star key={i} size={24} className="text-red-600" fill="currentColor" />
                  ))}
                </div>

                <p className="text-xl md:text-3xl font-medium text-zinc-200 italic mb-10 leading-relaxed max-w-2xl">
                  "{reviews[activeIndex].text}"
                </p>

                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white uppercase tracking-tighter">{reviews[activeIndex].name}</span>
                  <span className="text-red-500 text-xs font-bold uppercase tracking-[0.4em] mt-2">Client Vérifié • {reviews[activeIndex].lang.toUpperCase()}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 transition-all rounded-full ${activeIndex === i ? 'w-10 bg-red-600' : 'w-2.5 bg-zinc-800'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
