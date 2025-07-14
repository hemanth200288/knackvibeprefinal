import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, BarChart3, Send, ArrowRight } from 'lucide-react';
import aiCard1 from '@/assets/ai-card-1.jpg';
import aiCard2 from '@/assets/ai-card-2.jpg';
import aiCard3 from '@/assets/ai-card-3.jpg';

gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ElementType;
  color: string;
}

const cards: Card[] = [
  {
    id: 1,
    title: "Data Gathering",
    subtitle: "Social Intelligence",
    description: "AI agents continuously monitor and collect data from multiple social media platforms simultaneously.",
    image: aiCard1,
    icon: Zap,
    color: "primary"
  },
  {
    id: 2,
    title: "Smart Analysis", 
    subtitle: "Pattern Recognition",
    description: "Advanced neural networks analyze trends, sentiment, and engagement patterns in real-time.",
    image: aiCard2,
    icon: BarChart3,
    color: "secondary"
  },
  {
    id: 3,
    title: "Autonomous Posting",
    subtitle: "Intelligent Engagement", 
    description: "AI creates and publishes optimized content based on analyzed data and audience behavior.",
    image: aiCard3,
    icon: Send,
    color: "primary"
  }
];

export const ScrollingCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    // Set 3D perspective
    gsap.set(wrapper, { 
      perspective: 2000,
      transformStyle: "preserve-3d" 
    });

    // Set up smooth 3D horizontal scroll animation
    const totalDistance = (cards.length - 1) * 100;
    
    const scrollTween = gsap.to(container, {
      x: `-${totalDistance}vw`,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: `+=${window.innerHeight * 3.5}`, // Optimized for smoother flow
        scrub: 0.8, // Smoother scrub for more natural movement
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const cardIndex = Math.min(Math.floor(progress * cards.length), cards.length - 1);
          setCurrentCard(cardIndex);
          
          // Gentle 3D depth effect during scroll
          gsap.set(container, {
            rotationY: progress * -8, // Reduced rotation for subtlety
            rotationX: progress * -2,
            z: progress * -200,
            transformOrigin: "center center -300px"
          });
        }
      }
    });

    // Enhanced smooth 3D card animations
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      // Initial smooth 3D state
      gsap.set(card, {
        x: 300,
        opacity: 0,
        rotationY: 30, // Reduced initial rotation
        rotationX: 10,
        scale: 0.8,
        z: -150,
        transformOrigin: "center center"
      });

      // Create smooth 3D entrance animation
      const cardTrigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: `+=${window.innerHeight * 3.5}`,
        scrub: 0.8, // Consistent smooth scrub
        onUpdate: (self) => {
          const progress = self.progress;
          const cardDelay = index * 0.15; // Smoother card timing
          const cardProgress = gsap.utils.clamp(0, 1, (progress * cards.length) - index + cardDelay);
          const exitProgress = gsap.utils.clamp(0, 1, (progress * cards.length) - index - 0.7);
          
          if (cardProgress > 0) {
            // Smooth entrance animation with easing
            const easedProgress = gsap.utils.interpolate(0, 1, cardProgress);
            const easedExit = gsap.utils.interpolate(0, 1, exitProgress);
            
            gsap.set(card, {
              x: gsap.utils.interpolate(300, 0, easedProgress),
              opacity: easedProgress * (1 - easedExit * 0.6),
              rotationY: gsap.utils.interpolate(30, 0, easedProgress) + easedExit * -15,
              rotationX: gsap.utils.interpolate(10, 0, easedProgress),
              scale: gsap.utils.interpolate(0.8, 1, easedProgress) - (easedExit * 0.15),
              z: gsap.utils.interpolate(-150, 0, easedProgress) - (easedExit * 80),
              ease: "power2.out"
            });
          }
        }
      });

      // Gentle floating animation for natural movement
      gsap.to(card, {
        y: "+=8",
        rotationZ: 0.5,
        duration: 4 + index * 0.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={wrapperRef}
      className="relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-muted/10"
      style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
    >
      <div 
        ref={containerRef}
        className="flex h-screen"
        style={{ width: `${cards.length * 100}vw` }}
      >
        {cards.map((card, index) => {
          const Icon = card.icon;
          
          return (
            <div
              key={card.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="w-screen h-full flex items-center justify-center px-8"
            >
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Card Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-${card.color}/10 border border-${card.color}/20`}>
                        <Icon className={`w-6 h-6 text-${card.color}`} />
                      </div>
                      <span className={`text-sm font-semibold text-${card.color} tracking-wider uppercase`}>
                        {card.subtitle}
                      </span>
                    </div>
                    
                    <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
                      <span className="text-gradient">{card.title}</span>
                    </h2>
                  </div>
                  
                  <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                    {card.description}
                  </p>

                  <div className="flex items-center gap-4 pt-4">
                    <div className={`w-2 h-2 rounded-full bg-${card.color} animate-pulse`} />
                    <span className="text-sm text-muted-foreground">
                      Step {card.id} of {cards.length}
                    </span>
                  </div>
                </div>

                {/* Card Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative overflow-hidden rounded-3xl glass-morphism">
                    <img 
                      src={card.image}
                      alt={card.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    
                    {/* Floating indicator */}
                    <div className="absolute top-6 right-6">
                      <div className={`p-2 rounded-full bg-${card.color}/90 backdrop-blur-sm`}>
                        <Icon className="w-4 h-4 text-background" />
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className={`absolute -top-6 -left-6 w-24 h-24 bg-${card.color}/10 rounded-full animate-float`} 
                       style={{ animationDelay: `${index * 0.5}s` }} />
                  <div className={`absolute -bottom-4 -right-4 w-16 h-16 bg-secondary/10 rounded-full animate-float`} 
                       style={{ animationDelay: `${index * 0.5 + 1}s` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-3 glass-morphism px-6 py-3 rounded-full">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentCard ? 'bg-primary w-8' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
          <ArrowRight className="w-4 h-4 text-muted-foreground ml-2" />
        </div>
      </div>
    </section>
  );
};