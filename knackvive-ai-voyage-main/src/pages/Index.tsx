import { useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ScrollingCards } from '@/components/ScrollingCards';
import { NeuralTunnel } from '@/components/NeuralTunnel';
import { BenefitsShowcase } from '@/components/BenefitsShowcase';
import { ExitPortal } from '@/components/ExitPortal';

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = 'KnackVibe - AI Social Media Agents';
    
    // Ensure smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <HeroSection />
      <ScrollingCards />
      <NeuralTunnel />
      <BenefitsShowcase />
      <ExitPortal />
    </div>
  );
};

export default Index;
