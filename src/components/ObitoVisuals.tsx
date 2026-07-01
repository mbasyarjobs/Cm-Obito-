/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Obito's Mangekyou Sharingan (The iconic 3-prong spiral Kamui design)
export const MangekyouSharingan: React.FC<{ size?: number; className?: string; animated?: boolean }> = ({
  size = 120,
  className = '',
  animated = true
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${className} ${animated ? 'animate-[spin_20s_linear_infinite]' : ''}`}
      style={{ filter: 'drop-shadow(0 0 8px rgba(255, 26, 26, 0.6))' }}
    >
      {/* Outer border */}
      <circle cx="50" cy="50" r="46" fill="#000000" stroke="#ff1a1a" strokeWidth="2" />
      {/* Red Iris background */}
      <circle cx="50" cy="50" r="42" fill="#ff1a1a" />
      
      {/* Inner Ring */}
      <circle cx="50" cy="50" r="28" fill="none" stroke="#000000" strokeWidth="1.5" strokeDasharray="5,2" opacity="0.3" />

      {/* Central Pupil */}
      <circle cx="50" cy="50" r="9" fill="#000000" />

      {/* The 3 Curved Prongs (Obito's custom Kamui Mangekyou pattern) */}
      {/* Prong 1 */}
      <path
        d="M 50,41 C 42,41 38,20 50,6 C 53,24 58,35 50,41 Z"
        fill="#000000"
        transform="rotate(0, 50, 50)"
      />
      {/* Prong 2 */}
      <path
        d="M 50,41 C 42,41 38,20 50,6 C 53,24 58,35 50,41 Z"
        fill="#000000"
        transform="rotate(120, 50, 50)"
      />
      {/* Prong 3 */}
      <path
        d="M 50,41 C 42,41 38,20 50,6 C 53,24 58,35 50,41 Z"
        fill="#000000"
        transform="rotate(240, 50, 50)"
      />

      {/* Connection curves joining the prongs to the outer edge */}
      <path
        d="M 50,9 C 68,14 78,35 73,50 C 65,34 56,22 50,9 Z"
        fill="#000000"
        opacity="0.95"
      />
      <path
        d="M 50,9 C 68,14 78,35 73,50 C 65,34 56,22 50,9 Z"
        fill="#000000"
        opacity="0.95"
        transform="rotate(120, 50, 50)"
      />
      <path
        d="M 50,9 C 68,14 78,35 73,50 C 65,34 56,22 50,9 Z"
        fill="#000000"
        opacity="0.95"
        transform="rotate(240, 50, 50)"
      />
    </svg>
  );
};

// Rinnegan (Concentric rings with soft purple glow)
export const Rinnegan: React.FC<{ size?: number; className?: string; animated?: boolean }> = ({
  size = 120,
  className = '',
  animated = true
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${className} ${animated ? 'animate-[pulse_4s_ease-in-out_infinite]' : ''}`}
      style={{ filter: 'drop-shadow(0 0 10px rgba(138, 43, 226, 0.6))' }}
    >
      {/* Background/Sclera */}
      <circle cx="50" cy="50" r="46" fill="#0c0714" stroke="#8a2be2" strokeWidth="2.5" />
      
      {/* Rinnegan Lavender/Purple concentric circles */}
      <circle cx="50" cy="50" r="42" fill="#a482e6" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="#25103d" strokeWidth="2" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#25103d" strokeWidth="2" />
      <circle cx="50" cy="50" r="21" fill="none" stroke="#25103d" strokeWidth="2" />
      <circle cx="50" cy="50" r="14" fill="none" stroke="#25103d" strokeWidth="2" />
      <circle cx="50" cy="50" r="7" fill="none" stroke="#25103d" strokeWidth="1.5" />
      
      {/* Tiny pupil */}
      <circle cx="50" cy="50" r="3" fill="#000000" />
      
      {/* Optional Sharingan rings on Rinnegan (representing Sasuke's/Madara's/Obito's dual influence) */}
      {/* Let's keep this clean and pure Rinnegan for Obito's left eye */}
    </svg>
  );
};

// Orange Spiral Mask (Tobi/Obito's signature mask)
export const OrangeMask: React.FC<{ size?: number; className?: string }> = ({
  size = 100,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`${className}`}
      style={{ filter: 'drop-shadow(0 4px 10px rgba(255, 115, 0, 0.4))' }}
    >
      {/* Main Mask Shape */}
      <path
        d="M 60,10 C 25,10 15,35 15,60 C 15,90 30,110 60,110 C 90,110 105,90 105,60 C 105,35 95,10 60,10 Z"
        fill="#ff7300"
        stroke="#4a2200"
        strokeWidth="3"
      />
      
      {/* Eye hole black background */}
      <ellipse cx="80" cy="45" rx="7" ry="11" fill="#000" />
      {/* Glow of Sharingan in the dark eyehole */}
      <circle cx="80" cy="45" r="3" fill="#ff1a1a" className="animate-pulse" />

      {/* The Spiral Ridges originating from the eye hole */}
      <path
        d="M 80,45 C 50,25 25,45 35,70 C 45,95 85,95 95,75 C 105,50 85,25 60,30 C 40,35 30,60 45,75 C 60,90 85,75 75,55 C 70,45 60,45 60,55"
        fill="none"
        stroke="#301500"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      
      {/* Shadowing for 3D effect */}
      <path
        d="M 15,60 C 15,90 30,110 60,110 C 90,110 105,90 105,60"
        fill="none"
        stroke="#000"
        strokeWidth="4"
        opacity="0.15"
      />
    </svg>
  );
};

// White War Mask (Rinnegan-inspired pattern from Third Shinobi World War / Akatsuki leader Obito)
export const WhiteMask: React.FC<{ size?: number; className?: string }> = ({
  size = 100,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`${className}`}
      style={{ filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.15))' }}
    >
      {/* Mask Base */}
      <path
        d="M 60,10 C 25,10 18,35 18,60 C 18,90 32,110 60,110 C 88,110 102,90 102,60 C 102,35 95,10 60,10 Z"
        fill="#eef2f7"
        stroke="#a1a8b5"
        strokeWidth="3.5"
      />
      
      {/* Left Eye Hole (Rinnegan) */}
      <ellipse cx="40" cy="48" rx="8" ry="11" fill="#121214" />
      {/* Glow of Rinnegan purple in left eyehole */}
      <circle cx="40" cy="48" r="3" fill="#b066ff" className="animate-pulse" />

      {/* Right Eye Hole (Sharingan) */}
      <ellipse cx="80" cy="48" rx="8" ry="11" fill="#121214" />
      {/* Glow of Sharingan red in right eyehole */}
      <circle cx="80" cy="48" r="3" fill="#ff1a1a" className="animate-pulse" />

      {/* Concentric circle patterns on the mask face */}
      <circle cx="60" cy="60" r="30" fill="none" stroke="#717a8a" strokeWidth="2" opacity="0.4" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="#717a8a" strokeWidth="2" opacity="0.3" />
      <circle cx="60" cy="60" r="18" fill="none" stroke="#717a8a" strokeWidth="2" opacity="0.5" />
      
      {/* Vertical line through the center */}
      <path d="M 60,10 L 60,110" fill="none" stroke="#717a8a" strokeWidth="1.5" opacity="0.3" />
      
      {/* Sharingan Tomoe marks printed on the white mask */}
      <path
        d="M 60,25 C 63,25 65,27 65,30 C 65,33 60,35 58,32 C 57,30 58,25 60,25 Z"
        fill="#000"
        opacity="0.6"
      />
      <path
        d="M 60,95 C 57,95 55,93 55,90 C 55,87 60,85 62,88 C 63,90 62,95 60,95 Z"
        fill="#000"
        opacity="0.6"
      />
    </svg>
  );
};

// Akatsuki Cloud (Iconic Akatsuki emblem)
export const AkatsukiCloud: React.FC<{ size?: number; className?: string; animated?: boolean }> = ({
  size = 80,
  className = '',
  animated = false
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 65"
      className={`${className} ${animated ? 'animate-[pulse-slow_4s_ease-in-out_infinite]' : ''}`}
      style={{ filter: 'drop-shadow(0 4px 8px rgba(255, 26, 26, 0.4))' }}
    >
      {/* Cloud Shape */}
      <path
        d="M 25,35 
           C 15,35 10,43 15,50 
           C 20,57 32,57 38,52 
           C 42,57 58,57 62,50 
           C 68,55 82,53 85,45 
           C 88,35 78,28 70,30 
           C 72,18 55,10 45,18 
           C 38,12 24,18 25,30"
        fill="#ff1a1a"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Inside shading lines to give Akatsuki cloud signature look */}
      <path
        d="M 15,50 C 25,43 35,46 38,52"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
      <path
        d="M 70,30 C 60,25 50,32 45,40"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
    </svg>
  );
};

// Ambient Kamui Vortex background animation
export const KamuiVortexBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-15">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] h-[160vw] max-w-[2000px] max-h-[2000px] animate-[spin_50s_linear_infinite]">
        <svg viewBox="0 0 500 500" width="100%" height="100%" className="text-sharingan-red opacity-30">
          <defs>
            <radialGradient id="kamuiGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff1a1a" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#8a2be2" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#121214" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0d0d0f" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="250" cy="250" r="240" fill="url(#kamuiGrad)" />
          
          {/* Vortex Spirals */}
          <path
            d="M 250,250 Q 300,100 450,150 T 400,380 T 150,420 T 80,220 T 250,250"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeDasharray="10 5"
          />
          <path
            d="M 250,250 Q 200,400 50,350 T 100,120 T 350,80 T 420,280 T 250,250"
            fill="none"
            stroke="#8a2be2"
            strokeWidth="2.5"
            strokeDasharray="8 4"
            transform="rotate(60 250 250)"
          />
          <path
            d="M 250,250 Q 150,250 150,100 T 380,50 T 450,300 T 250,250"
            fill="none"
            stroke="#ff1a1a"
            strokeWidth="1.5"
            transform="rotate(180 250 250)"
          />
        </svg>
      </div>
    </div>
  );
};
