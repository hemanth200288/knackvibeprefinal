import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Brain, Sparkles } from 'lucide-react';
import aiHeroBrain from '@/assets/ai-hero-brain.jpg';

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .from(imageRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");

    // Continuous floating animation for the image
    gsap.to(imageRef.current, {
      y: -20,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden neural-grid"
    >
      {/* Neural flow background elements */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-neural-flow"
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-primary">
              <Brain className="w-8 h-8" />
              <span className="text-sm font-semibold tracking-wider uppercase">
                AI-Powered Social Intelligence
              </span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-6xl lg:text-8xl font-bold leading-none"
            >
              <span className="text-gradient">KnackVibe</span>
              <br />
              <span className="text-foreground/80">Agents</span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Autonomous AI agents that gather, analyze, and engage with social media content seamlessly.
            </p>

            <div className="flex items-center gap-4">
              <div className="animate-pulse-glow w-4 h-4 bg-primary rounded-full" />
              <span className="text-sm text-primary font-medium">Live & Analyzing</span>
              <Sparkles className="w-4 h-4 text-secondary" />
            </div>
          </div>

          {/* Hero Image */}
          <div 
            ref={imageRef}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={aiHeroBrain}
                alt="AI Neural Network Brain"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full animate-float" 
                 style={{ animationDelay: '0s' }} />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary/20 rounded-full animate-float" 
                 style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 -right-8 w-12 h-12 bg-primary/30 rounded-full animate-float" 
                 style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};