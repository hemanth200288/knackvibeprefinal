import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Clock, 
  TrendingUp, 
  Target, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
  color: string;
}

const benefits: Benefit[] = [
  {
    icon: Clock,
    title: "24/7 Automation",
    description: "Never miss a moment. AI agents work continuously without breaks.",
    value: "100%",
    color: "primary"
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "Real-time insights and trend prediction with 95% accuracy.",
    value: "95%",
    color: "secondary"
  },
  {
    icon: Target,
    title: "Precise Targeting",
    description: "AI-driven audience analysis for maximum engagement impact.",
    value: "300%",
    color: "primary"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process millions of data points in milliseconds.",
    value: "< 1ms",
    color: "secondary"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade security with end-to-end encryption.",
    value: "100%",
    color: "primary"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Monitor and engage across all major social platforms.",
    value: "50+",
    color: "secondary"
  }
];

export const BenefitsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    if (!container || !header) return;

    // Initial zoom effect setup
    gsap.set(container, { 
      scale: 0.5, 
      opacity: 0,
      perspective: 1500,
      transformStyle: "preserve-3d"
    });
    
    gsap.set(header, { 
      y: 200, 
      opacity: 0, 
      scale: 1.2,
      rotationX: 30
    });

    // Zoom in entrance effect
    ScrollTrigger.create({
      trigger: container,
      start: "top 90%",
      end: "top 30%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(container, {
          scale: 0.5 + progress * 0.5,
          opacity: progress,
          rotationX: (1 - progress) * -10
        });
        
        gsap.set(header, {
          y: 200 * (1 - progress),
          opacity: progress,
          scale: 1.2 - progress * 0.2,
          rotationX: 30 * (1 - progress)
        });
      }
    });

    // Sequential card animations with zoom and scroll
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.set(card, {
        y: 150,
        opacity: 0,
        rotationX: 45,
        rotationY: 20 * (index % 2 === 0 ? 1 : -1),
        scale: 0.6,
        z: -200
      });

      // Fixed individual card scroll trigger with precise timing
      ScrollTrigger.create({
        trigger: container,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const cardDelay = index * 0.12;
          const cardProgress = Math.max(0, Math.min(1, (progress - cardDelay) * 3));
          
          gsap.set(card, {
            y: 150 * (1 - cardProgress),
            opacity: cardProgress,
            rotationX: 45 * (1 - cardProgress),
            rotationY: 20 * (index % 2 === 0 ? 1 : -1) * (1 - cardProgress),
            scale: 0.6 + cardProgress * 0.4,
            z: -200 + cardProgress * 200
          });
        }
      });

      // Enhanced hover effect with 3D transform
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -20,
          scale: 1.08,
          rotationY: 5 * (index % 2 === 0 ? 1 : -1),
          z: 50,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotationY: 0,
          z: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    // Zoom out exit effect
    ScrollTrigger.create({
      trigger: container,
      start: "bottom 40%",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(container, {
          scale: 1 - progress * 0.3,
          opacity: 1 - progress * 0.5,
          rotationY: progress * 15,
          z: progress * -500
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-[150vh] py-20 relative overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background"
      style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 neural-grid opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className="text-center space-y-8 mb-16"
        >
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary tracking-wider uppercase">
              Why Choose KnackVive
            </span>
            <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
            <span className="text-gradient">Unleash the Power</span>
            <br />
            <span className="text-foreground">of AI Automation</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your social media strategy with intelligent automation that delivers measurable results.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group relative"
              >
                <div className="glass-morphism rounded-2xl p-8 h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300 cursor-pointer">
                  {/* Icon and value */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-xl bg-${benefit.color}/10 border border-${benefit.color}/20 group-hover:bg-${benefit.color}/20 transition-colors duration-300`}>
                      <Icon className={`w-8 h-8 text-${benefit.color}`} />
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold text-${benefit.color}`}>
                        {benefit.value}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        Performance
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                  
                  {/* Hover arrow */}
                  <div className="mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    <span className="text-sm font-medium mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-${benefit.color}/40 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${30 + i * 20}%`,
                          animationDelay: `${i * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 glass-morphism px-8 py-4 rounded-full">
            <span className="text-lg font-medium">Ready to revolutionize your social strategy?</span>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-float" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/5 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};