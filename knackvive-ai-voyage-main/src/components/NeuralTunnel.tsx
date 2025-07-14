import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const NeuralTunnel = () => {
  const tunnelRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const connectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tunnel = tunnelRef.current;
    if (!tunnel) return;

    // Optimized neural network tunnel - faster and cooler animations
    ScrollTrigger.create({
      trigger: tunnel,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3, // Faster scrub for snappier response
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Enhanced zooming into the neural network
        const zoomProgress = Math.min(progress * 2.5, 1); // Faster zoom
        const exitProgress = Math.max(0, (progress - 0.4) * 2.5); // Earlier exit
        
        // Neural nodes - optimized tunnel effect with faster movement
        nodesRef.current.forEach((node, index) => {
          if (node) {
            const nodeProgress = (progress * 1.5 + index * 0.08) % 1; // Faster flow
            const scale = 0.2 + (1 - nodeProgress) * 2.5; // More dramatic scaling
            const z = (nodeProgress - 0.5) * 2500; // Deeper tunnel
            const opacity = nodeProgress < 0.85 ? 1 - nodeProgress * 0.4 : (1 - nodeProgress) * 6;
            
            gsap.set(node, {
              scale: scale * (1 + zoomProgress * 0.8),
              z: z - zoomProgress * 800,
              rotationY: nodeProgress * 900 * (index % 2 === 0 ? 1 : -1), // Faster rotation
              rotationX: nodeProgress * 450,
              opacity: opacity * (1 - exitProgress * 0.8),
              filter: `blur(${nodeProgress * 2.5}px) brightness(${1 + zoomProgress * 1.2}) saturate(${1 + zoomProgress * 0.8})`
            });
          }
        });

        // Neural connections - faster pulsing through the network
        connectionsRef.current.forEach((connection, index) => {
          if (connection) {
            const connectionProgress = (progress * 4 + index * 0.12) % 1; // Faster pulse
            const scaleX = 0.3 + connectionProgress * 2.5; // More dramatic scaling
            const opacity = Math.sin(connectionProgress * Math.PI) * 0.9 + 0.1;
            
            gsap.set(connection, {
              scaleX: scaleX * (1 + zoomProgress * 1.2),
              opacity: opacity * (1 - exitProgress * 0.9),
              rotationZ: connectionProgress * 450 * (index % 2 === 0 ? 1 : -1), // Faster rotation
              filter: `brightness(${1 + zoomProgress * 0.8}) saturate(${1 + zoomProgress * 1.2}) hue-rotate(${connectionProgress * 60}deg)`
            });
          }
        });

        // Central tunnel rings - faster spiral zoom effect
        const rings = tunnel.querySelectorAll('.tunnel-ring');
        rings.forEach((ring, index) => {
          const ringProgress = (progress * 2.5 + index * 0.15) % 1; // Faster rings
          const ringScale = ringProgress * 4; // More dramatic scaling
          const ringOpacity = ringProgress < 0.4 ? ringProgress * 2.5 : (1 - ringProgress) * 1.67;
          
          gsap.set(ring, {
            scale: ringScale * (1 + zoomProgress * 3),
            opacity: ringOpacity * (1 - exitProgress * 0.8),
            rotationZ: ringProgress * 270 + zoomProgress * 180, // Faster rotation
            filter: `blur(${ringProgress * 4}px) brightness(${1 + zoomProgress * 0.6})`
          });
        });
      }
    });

    // Enhanced floating animations with more energy
    nodesRef.current.forEach((node, index) => {
      if (node) {
        gsap.to(node, {
          x: `+=${Math.sin(index) * 40}`, // Increased movement
          y: `+=${Math.cos(index) * 30}`,
          duration: 3 + index * 0.2, // Faster floating
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      }
    });

    // Faster continuous rotation for connections
    connectionsRef.current.forEach((connection, index) => {
      if (connection) {
        gsap.to(connection, {
          rotation: `+=${720 * (index % 2 === 0 ? 1 : -1)}`, // Faster rotation
          duration: 15 + index * 1.5, // Faster duration
          ease: "none",
          repeat: -1
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Generate enhanced neural network nodes
  const generateNodes = () => {
    const nodes = [];
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      const radius = 30 + (i % 3) * 20;
      const x = 50 + Math.cos(angle) * radius;
      const y = 50 + Math.sin(angle) * radius;
      const size = 15 + Math.random() * 25;
      const hue = i % 2 === 0 ? 'primary' : 'secondary';
      
      nodes.push(
        <div
          key={i}
          ref={(el) => {
            if (el) nodesRef.current[i] = el;
          }}
          className={`absolute rounded-full bg-${hue}/20 backdrop-blur-md border border-${hue}/60 shadow-lg`}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            zIndex: 100 - i,
            transformStyle: "preserve-3d"
          }}
        >
          <div className={`w-full h-full rounded-full bg-${hue}/70 animate-pulse`}>
            <div className={`w-1/2 h-1/2 rounded-full bg-${hue} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping`} />
          </div>
        </div>
      );
    }
    return nodes;
  };

  // Generate enhanced neural connections
  const generateConnections = () => {
    const connections = [];
    for (let i = 0; i < 30; i++) {
      const startAngle = (i / 30) * Math.PI * 2;
      const endAngle = ((i + 5) / 30) * Math.PI * 2;
      const x = 50 + Math.cos(startAngle) * 35;
      const y = 50 + Math.sin(startAngle) * 35;
      const width = 80 + Math.random() * 120;
      const rotation = (endAngle - startAngle) * (180 / Math.PI);
      const hue = i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'accent';
      
      connections.push(
        <div
          key={i}
          ref={(el) => {
            if (el) connectionsRef.current[i] = el;
          }}
          className={`absolute h-px bg-gradient-to-r from-transparent via-${hue}/60 to-transparent shadow-sm`}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${width}px`,
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'left center',
            transformStyle: "preserve-3d"
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${hue} to-transparent animate-pulse`} />
        </div>
      );
    }
    return connections;
  };

  return (
    <section 
      ref={tunnelRef}
      className="h-[250vh] relative overflow-hidden bg-gradient-to-b from-background via-background/60 to-background/90"
      style={{ perspective: '2000px', transformStyle: "preserve-3d" }}
    >
      {/* Neural network background */}
      <div className="absolute inset-0 neural-grid opacity-20" />
      
      {/* Tunnel effect container */}
      <div className="absolute inset-0">
        {/* Background connections */}
        {generateConnections()}
        
        {/* Neural nodes */}
        {generateNodes()}
        
        {/* Enhanced central tunnel rings */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="tunnel-ring absolute border-2 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              width: `${100 + i * 80}px`,
              height: `${100 + i * 80}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: 50 - i,
              borderColor: i % 2 === 0 ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--secondary) / 0.2)',
              boxShadow: i % 2 === 0 ? '0 0 20px hsl(var(--primary) / 0.2)' : '0 0 15px hsl(var(--secondary) / 0.1)',
              transformStyle: "preserve-3d"
            }}
          />
        ))}
      </div>
      
      {/* Central text overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div className="text-center space-y-6 max-w-2xl mx-auto px-6">
          <h3 className="text-4xl lg:text-6xl font-bold text-gradient">
            Neural Deep Dive
          </h3>
          <p className="text-lg text-muted-foreground">
            Journey into the core of AI intelligence where data transforms into insights
          </p>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};