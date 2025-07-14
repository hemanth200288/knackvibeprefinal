import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ExitPortal = () => {
  const portalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const portal = portalRef.current;
    const content = contentRef.current;
    
    if (!portal || !content) return;

    // Set initial state
    gsap.set(content, { 
      scale: 0.8, 
      opacity: 0,
      rotationX: 20 
    });
    
    // Portal entrance animation - only when fully in view
    ScrollTrigger.create({
      trigger: portal,
      start: "top 60%",
      end: "top 40%",
      toggleActions: "play none none reverse",
      onEnter: () => {
        gsap.to(content, {
          scale: 1,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out"
        });
      }
    });

    // Exit portal effect - separate trigger for the exit
    ScrollTrigger.create({
      trigger: portal,
      start: "center center",
      end: "bottom top",
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Only start exit animation when 70% through
        if (progress > 0.7) {
          const exitProgress = (progress - 0.7) / 0.3;
          gsap.set(content, {
            scale: 1 - exitProgress * 0.95,
            rotation: exitProgress * 360,
            opacity: Math.max(0.1, 1 - exitProgress * 0.9),
            z: exitProgress * -500
          });
        }
      }
    });

    // Floating circles animation
    circlesRef.current.forEach((circle, index) => {
      if (circle) {
        gsap.to(circle, {
          y: -100 + (index * 20),
          x: index % 2 === 0 ? 50 : -50,
          rotation: 360,
          duration: 6 + index * 2,
          ease: "none",
          repeat: -1,
          yoyo: true
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={portalRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-background to-muted/20"
      style={{ 
        perspective: '1200px',
        zIndex: 10 
      }}
    >
      {/* Animated background circles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) circlesRef.current[i] = el;
            }}
            className="absolute w-64 h-64 rounded-full opacity-10"
            style={{
              background: i % 2 === 0 ? 'var(--gradient-primary)' : 'var(--gradient-secondary)',
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div 
        ref={contentRef}
        className="text-center space-y-12 max-w-4xl mx-auto px-6 z-10"
      >
        {/* Main content */}
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary tracking-wider uppercase">
              Ready to Experience the Future
            </span>
            <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
          </div>
          
          <h2 className="text-6xl lg:text-8xl font-bold leading-tight">
            <span className="text-gradient">Enter the</span>
            <br />
            <span className="text-foreground">AI Dimension</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Step into a world where artificial intelligence transforms how we understand and engage with social media.
          </p>
        </div>

        {/* Portal effect */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse-glow p-1">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <ArrowUpRight className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          {/* Expanding rings */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"
              style={{
                width: `${160 + i * 40}px`,
                height: `${160 + i * 40}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          Scroll to leave this dimension
        </div>
      </div>
    </section>
  );
};