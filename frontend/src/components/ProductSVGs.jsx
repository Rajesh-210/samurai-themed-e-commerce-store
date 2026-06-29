import React from 'react'

// ─── KATANAS ──────────────────────────────────────────────────────────

export function OniSlayerSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      {/* Blade */}
      <polygon points="200,20 208,260 192,260" fill="#c8d8e8" stroke="#a0b8c8" strokeWidth="0.5"/>
      {/* Wavy hamon line */}
      <path d="M193,80 Q196,90 193,100 Q196,110 193,120 Q196,130 193,140 Q196,150 193,160 Q196,170 193,180 Q196,190 193,200 Q196,210 193,220 Q196,230 193,240 Q196,250 193,258" fill="none" stroke="#e8f0ff" strokeWidth="1.5" opacity="0.9"/>
      {/* Edge shine */}
      <line x1="206" y1="25" x2="207" y2="255" stroke="white" strokeWidth="0.5" opacity="0.6"/>
      {/* Blood groove */}
      <line x1="200" y1="30" x2="200" y2="255" stroke="#8899aa" strokeWidth="0.5" opacity="0.4"/>
      {/* Tsuba (guard) - oni face */}
      <ellipse cx="200" cy="262" rx="30" ry="12" fill="#1a0020" stroke="#8B0000" strokeWidth="2"/>
      {/* Oni face on tsuba */}
      <ellipse cx="192" cy="260" rx="5" ry="4" fill="#8B0000"/>
      <ellipse cx="208" cy="260" rx="5" ry="4" fill="#8B0000"/>
      {/* Oni eyes */}
      <ellipse cx="192" cy="259" rx="2" ry="2" fill="#ff4400"/>
      <ellipse cx="208" cy="259" rx="2" ry="2" fill="#ff4400"/>
      {/* Oni horns */}
      <polygon points="188,254 185,248 191,254" fill="#8B0000"/>
      <polygon points="212,254 215,248 209,254" fill="#8B0000"/>
      {/* Oni teeth */}
      <path d="M196,265 L198,268 L200,265 L202,268 L204,265" fill="none" stroke="#8B0000" strokeWidth="1.5"/>
      {/* Habaki (collar) */}
      <rect x="194" y="270" width="12" height="8" fill="#888" stroke="#aaa" strokeWidth="0.5"/>
      {/* Tsuka (grip) - red wrap */}
      <rect x="193" y="278" width="14" height="14" fill="#5a0000" stroke="#8B0000" strokeWidth="0.5"/>
      {/* Wrap pattern */}
      <line x1="193" y1="282" x2="207" y2="282" stroke="#8B0000" strokeWidth="1"/>
      <line x1="193" y1="286" x2="207" y2="286" stroke="#8B0000" strokeWidth="1"/>
      <line x1="196" y1="278" x2="196" y2="292" stroke="#8B0000" strokeWidth="0.5"/>
      <line x1="200" y1="278" x2="200" y2="292" stroke="#8B0000" strokeWidth="0.5"/>
      <line x1="204" y1="278" x2="204" y2="292" stroke="#8B0000" strokeWidth="0.5"/>
      {/* Kashira (pommel) */}
      <rect x="192" y="292" width="16" height="6" fill="#333" stroke="#666" strokeWidth="0.5"/>
      <circle cx="170" cy="80" r="3" fill="#8B0000" opacity="0.7"/>
      <circle cx="230" cy="120" r="2" fill="#8B0000" opacity="0.5"/>
      <circle cx="165" cy="150" r="2" fill="#8B0000" opacity="0.6"/>
      <text x="200" y="18" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="9" letterSpacing="3">ONI SLAYER</text>
    </svg>
  )
}

export function ShadowReaperSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <polygon points="200,15 207,258 193,258" fill="#1a1a2e" stroke="#2a2a3a" strokeWidth="1"/>
      <line x1="205" y1="20" x2="206.5" y2="255" stroke="#3a3a4a" strokeWidth="0.8"/>
      <line x1="200" y1="20" x2="200" y2="255" stroke="#111" strokeWidth="0.3"/>
      <circle cx="200" cy="262" r="18" fill="#0d0d0d" stroke="#1a1a2e" strokeWidth="2"/>
      <line x1="185" y1="262" x2="215" y2="262" stroke="#2a2a3a" strokeWidth="1"/>
      <line x1="200" y1="247" x2="200" y2="277" stroke="#2a2a3a" strokeWidth="1"/>
      <rect x="194" y="278" width="12" height="7" fill="#111" stroke="#222" strokeWidth="0.5"/>
      <rect x="193" y="285" width="14" height="12" fill="#0d0d0d" stroke="#1a1a2e" strokeWidth="0.5"/>
      <line x1="193" y1="288" x2="207" y2="288" stroke="#1a1a2e" strokeWidth="1.5"/>
      <line x1="193" y1="292" x2="207" y2="292" stroke="#1a1a2e" strokeWidth="1.5"/>
      <rect x="192" y="297" width="16" height="5" fill="#0d0d0d" stroke="#1a1a2e" strokeWidth="0.5"/>
      <circle cx="150" cy="100" r="40" fill="#0d0d0d" opacity="0.5"/>
      <circle cx="250" cy="180" r="35" fill="#0d0d0d" opacity="0.4"/>
      <text x="200" y="150" textAnchor="middle" fill="#1a1a2e" fontFamily="serif" fontSize="20" opacity="0.4">影</text>
      <text x="200" y="18" textAnchor="middle" fill="#A89880" fontFamily="serif" fontSize="9" letterSpacing="3">SHADOW REAPER</text>
    </svg>
  )
}

export function DragonBreathSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <polygon points="200,15 208,258 192,258" fill="#c8d0b0" stroke="#d4c060" strokeWidth="0.5"/>
      <path d="M193,60 Q197,70 194,80 Q197,90 194,100 Q197,110 194,120 Q197,130 194,140 Q197,150 194,160 Q197,170 194,180 Q197,190 194,200 Q197,210 194,220 Q197,230 194,245 Q197,255 194,258" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.9"/>
      <line x1="206" y1="20" x2="207" y2="255" stroke="#ffe080" strokeWidth="0.8" opacity="0.7"/>
      <ellipse cx="200" cy="264" rx="32" ry="13" fill="#1a1400" stroke="#C9A84C" strokeWidth="2"/>
      <path d="M175,264 Q180,256 190,264 Q200,272 210,264 Q220,256 225,264" fill="none" stroke="#C9A84C" strokeWidth="2"/>
      <path d="M224,262 L228,260 L226,264 L230,265 L225,267 Z" fill="#C9A84C"/>
      <circle cx="226" cy="262" r="1.5" fill="#ff6600"/>
      <rect x="194" y="275" width="12" height="8" fill="#C9A84C" stroke="#d4b55e" strokeWidth="0.5"/>
      <rect x="193" y="283" width="14" height="14" fill="#2a1800" stroke="#C9A84C" strokeWidth="0.5"/>
      <line x1="193" y1="287" x2="207" y2="287" stroke="#C9A84C" strokeWidth="1.5"/>
      <line x1="193" y1="291" x2="207" y2="291" stroke="#C9A84C" strokeWidth="1.5"/>
      <rect x="191" y="297" width="18" height="5" fill="#C9A84C" stroke="#d4b55e" strokeWidth="0.5"/>
      <text x="200" y="18" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="9" letterSpacing="3">DRAGON'S BREATH</text>
    </svg>
  )
}

export function GhostBladeSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <polygon points="200,15 208,258 192,258" fill="#e8eef5" stroke="#c8c0da" strokeWidth="0.5"/>
      <line x1="205" y1="20" x2="206" y2="254" stroke="white" strokeWidth="1.5" opacity="0.8"/>
      <ellipse cx="200" cy="264" rx="30" ry="12" fill="#d0d8e0" stroke="#e8eef5" strokeWidth="2"/>
      <rect x="194" y="274" width="12" height="8" fill="#c0c8d0" stroke="#d0d8e0" strokeWidth="0.5"/>
      <rect x="193" y="282" width="14" height="14" fill="#e0e8f0" stroke="#c0c8d0" strokeWidth="0.5"/>
      <rect x="192" y="296" width="16" height="5" fill="#c0c8d0" stroke="#d0d8e0" strokeWidth="0.5"/>
      <text x="200" y="18" textAnchor="middle" fill="#c0c8d0" fontFamily="serif" fontSize="9" letterSpacing="3">GHOST BLADE</text>
    </svg>
  )
}

export function BloodMoonKatanaSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <circle cx="200" cy="130" r="60" fill="#1a0505" stroke="#8B0000" strokeWidth="1" opacity="0.4"/>
      <polygon points="200,15 208,258 192,258" fill="#b8c8d8" stroke="#a0b0c0" strokeWidth="0.5"/>
      <circle cx="200" cy="266" r="20" fill="#1a0505" stroke="#8B0000" strokeWidth="2"/>
      <rect x="194" y="284" width="12" height="7" fill="#5a0000" stroke="#8B0000" strokeWidth="0.5"/>
      <rect x="193" y="291" width="14" height="14" fill="#3a0000" stroke="#8B0000" strokeWidth="0.5"/>
      <rect x="192" y="305" width="16" height="5" fill="#5a0000" stroke="#8B0000" strokeWidth="0.5"/>
      <text x="200" y="18" textAnchor="middle" fill="#C0392B" fontFamily="serif" fontSize="9" letterSpacing="3">BLOOD MOON</text>
    </svg>
  )
}

// ─── SAMURAI TEES ─────────────────────────────────────────────────────

export function RoninSilhouetteTSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#111"/>
      <path d="M100,40 L150,20 L165,55 C175,50 190,45 200,45 C210,45 225,50 235,55 L250,20 L300,40 L285,90 L260,80 L260,240 L140,240 L140,80 L115,90 Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="2"/>
      <path d="M175,45 Q200,65 225,45" fill="none" stroke="#2a2a2a" strokeWidth="3"/>
      <circle cx="200" cy="130" r="45" fill="#1a1a1a" stroke="#c8c8c8" strokeWidth="1.5"/>
      <circle cx="215" cy="120" r="35" fill="#1a1a1a" stroke="#1a1a1a"/>
      <g fill="white" opacity="0.9">
        <circle cx="200" cy="105" r="8"/>
        <rect x="194" y="113" width="12" height="22"/>
        <rect x="194" y="135" width="5" height="18"/>
        <rect x="201" y="135" width="5" height="18"/>
        <rect x="183" y="115" width="11" height="4"/>
        <rect x="206" y="115" width="11" height="4"/>
        <rect x="215" y="117" width="2" height="32"/>
        <rect x="212" y="117" width="8" height="3"/>
      </g>
      <text x="200" y="225" textAnchor="middle" fill="#333" fontFamily="serif" fontSize="10" letterSpacing="4">BUSHIDO</text>
    </svg>
  )
}

export function BushidoCodeTeeSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0a1a"/>
      <path d="M100,40 L150,20 L165,55 C175,50 190,45 200,45 C210,45 225,50 235,55 L250,20 L300,40 L285,90 L260,80 L260,240 L140,240 L140,80 L115,90 Z" fill="#0d1a3a" stroke="#1a2a5a" strokeWidth="2"/>
      <polygon points="200,75 203.5,195 196.5,195" fill="#d0dce8" stroke="#a0b0c0" strokeWidth="0.5"/>
      <ellipse cx="200" cy="198" rx="16" ry="7" fill="#2a3a1a" stroke="#a0b050" strokeWidth="1.5"/>
      <rect x="196.5" y="205" width="7" height="22" fill="#1a0a0a" stroke="#444" strokeWidth="0.5"/>
      <text x="200" y="228" textAnchor="middle" fill="#1a2a5a" fontFamily="serif" fontSize="10" letterSpacing="4">BUSHIDO</text>
    </svg>
  )
}

export function CherryBlossomWarriorTeeSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0f0f0f"/>
      <path d="M100,40 L150,20 L165,55 C175,50 190,45 200,45 C210,45 225,50 235,55 L250,20 L300,40 L285,90 L260,80 L260,240 L140,240 L140,80 L115,90 Z" fill="#1c1c1c" stroke="#2c2c2c" strokeWidth="2"/>
      <path d="M175,135 Q175,90 200,85 Q225,90 225,135 Z" fill="#2a2a3a" stroke="#4a4a5a" strokeWidth="1.5"/>
      <path d="M196,86 L200,70 L204,86" fill="#C9A84C" stroke="#C9A84C" strokeWidth="0.5"/>
      {[[155,110],[245,115],[158,165],[242,160],[165,195],[235,195],[175,85],[225,90]].map(([cx,cy],i)=>(
        <g key={i} transform={`translate(${cx},${cy})`}>
          <circle cx="0" cy="-7" r="4" fill="#ff8899" opacity="0.8"/>
          <circle cx="6.6" cy="-2.2" r="4" fill="#ffaab5" opacity="0.8"/>
          <circle cx="4.1" cy="5.7" r="4" fill="#ff8899" opacity="0.8"/>
          <circle cx="-4.1" cy="5.7" r="4" fill="#ffb5c0" opacity="0.8"/>
          <circle cx="-6.6" cy="-2.2" r="4" fill="#ff8899" opacity="0.8"/>
          <circle cx="0" cy="0" r="2.5" fill="#ffdd88"/>
        </g>
      ))}
      <text x="200" y="228" textAnchor="middle" fill="#2c2c2c" fontFamily="serif" fontSize="10" letterSpacing="4">BUSHIDO</text>
    </svg>
  )
}

export function VoidSwordsmanTeeSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#050505"/>
      <path d="M100,40 L150,20 L165,55 C175,50 190,45 200,45 C210,45 225,50 235,55 L250,20 L300,40 L285,90 L260,80 L260,240 L140,240 L140,80 L115,90 Z" fill="#111" stroke="#1a1a1a" strokeWidth="2"/>
      <path d="M185,175 L195,130 L200,115" fill="none" stroke="#8B0000" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="200" cy="108" r="7" fill="none" stroke="#8B0000" strokeWidth="2.5"/>
      <path d="M195,130 L175,120 L163,118" fill="none" stroke="#8B0000" strokeWidth="3" strokeLinecap="round"/>
      <path d="M163,118 L240,95" fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round"/>
      <text x="200" y="228" textAnchor="middle" fill="#1a1a1a" fontFamily="serif" fontSize="10" letterSpacing="4">BUSHIDO</text>
    </svg>
  )
}

export function DragonTempleTeeSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0d0010"/>
      <path d="M100,40 L150,20 L165,55 C175,50 190,45 200,45 C210,45 225,50 235,55 L250,20 L300,40 L285,90 L260,80 L260,240 L140,240 L140,80 L115,90 Z" fill="#1a0028" stroke="#2a0038" strokeWidth="2"/>
      <rect x="186" y="188" width="28" height="8" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
      <rect x="188" y="175" width="24" height="13" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
      <line x1="200" y1="145" x2="200" y2="130" stroke="#C9A84C" strokeWidth="2"/>
      <path d="M220,195 Q240,180 235,160 Q230,140 215,130 Q205,122 200,115 Q195,122 185,130 Q170,140 165,160 Q160,180 180,195" fill="none" stroke="#C9A84C" strokeWidth="2.5"/>
      <text x="200" y="228" textAnchor="middle" fill="#2a0038" fontFamily="serif" fontSize="10" letterSpacing="4">BUSHIDO</text>
    </svg>
  )
}

export function LastStandTeeSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#080808"/>
      <path d="M100,40 L150,20 L165,55 C175,50 190,45 200,45 C210,45 225,50 235,55 L250,20 L300,40 L285,90 L260,80 L260,240 L140,240 L140,80 L115,90 Z" fill="#0f0f0f" stroke="#1a1a1a" strokeWidth="2"/>
      <g fill="white" opacity="0.9">
        <circle cx="200" cy="112" r="7"/>
        <rect x="195" y="119" width="10" height="20"/>
        <rect x="180" y="118" width="3" height="28"/>
        <rect x="217" y="118" width="3" height="28"/>
      </g>
      <g fill="white" opacity="0.85" transform="translate(-30,5)">
        <circle cx="200" cy="115" r="6.5"/>
        <rect x="195" y="122" width="10" height="18"/>
        <rect x="182" y="100" width="3" height="26"/>
      </g>
      <g fill="white" opacity="0.85" transform="translate(30,5)">
        <circle cx="200" cy="115" r="6.5"/>
        <rect x="195" y="122" width="10" height="18"/>
        <rect x="215" y="100" width="3" height="26"/>
      </g>
      <text x="200" y="228" textAnchor="middle" fill="#1a1a1a" fontFamily="serif" fontSize="10" letterSpacing="4">LAST STAND</text>
    </svg>
  )
}

// ─── ARMOR ────────────────────────────────────────────────────────────

export function KageChestPlateSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <path d="M140,80 Q140,60 200,55 Q260,60 260,80 L270,200 Q260,220 200,225 Q140,220 130,200 Z" fill="#1a1a2a" stroke="#4a4a6a" strokeWidth="2"/>
      <circle cx="200" cy="140" r="20" fill="none" stroke="#C9A84C" strokeWidth="2"/>
      <path d="M200,122 L207,136 L222,136 L210,145 L215,160 L200,152 L185,160 L190,145 L178,136 L193,136 Z" fill="#C9A84C"/>
      <text x="200" y="290" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="9" letterSpacing="3">KAGE CHEST PLATE</text>
    </svg>
  )
}

export function OniMaskSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <path d="M130,80 Q130,50 200,45 Q270,50 270,80 L265,200 Q260,230 200,235 Q140,230 135,200 Z" fill="#8B0000" stroke="#a00000" strokeWidth="2"/>
      <path d="M165,72 Q158,45 168,40 Q175,42 172,65" fill="#6a0000" stroke="#8B0000" strokeWidth="2"/>
      <path d="M235,72 Q242,45 232,40 Q225,42 228,65" fill="#6a0000" stroke="#8B0000" strokeWidth="2"/>
      <ellipse cx="172" cy="120" rx="22" ry="18" fill="#1a0000" stroke="#ff4400" strokeWidth="2"/>
      <ellipse cx="228" cy="120" rx="22" ry="18" fill="#1a0000" stroke="#ff4400" strokeWidth="2"/>
      <circle cx="172" cy="120" r="6" fill="#ff2200"/>
      <circle cx="228" cy="120" r="6" fill="#ff2200"/>
      <text x="200" y="265" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="9" letterSpacing="3">ONI MASK SET</text>
    </svg>
  )
}

export function KabutoHelmetSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <path d="M130,160 Q130,70 200,60 Q270,70 270,160 Z" fill="#1a1a2a" stroke="#3a3a5a" strokeWidth="2"/>
      <path d="M195,62 L190,35 L195,40 L200,28 L205,40 L210,35 L205,62 Z" fill="#C9A84C" stroke="#d4b55e" strokeWidth="1"/>
      <circle cx="200" cy="115" r="15" fill="none" stroke="#C9A84C" strokeWidth="2"/>
      <text x="200" y="260" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="9" letterSpacing="3">SAMURAI KABUTO HELMET</text>
    </svg>
  )
}

// ─── ACCESSORIES ─────────────────────────────────────────────────────

export function WallMountSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <rect x="110" y="60" width="180" height="180" fill="#3d2a1a" stroke="#5d4a2a" strokeWidth="3"/>
      <rect x="120" y="70" width="160" height="160" fill="none" stroke="#6d5a3a" strokeWidth="1.5"/>
      <rect x="155" y="140" width="90" height="10" fill="#C9A84C" stroke="#d4b55e" strokeWidth="1"/>
      <text x="200" y="258" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="9" letterSpacing="3">KATANA WALL MOUNT</text>
    </svg>
  )
}

export function BushidoJournalSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <rect x="145" y="50" width="25" height="200" fill="#3d1a0a" stroke="#5d2a1a" strokeWidth="2"/>
      <rect x="170" y="50" width="130" height="200" fill="#5d2a0a" stroke="#8d4a1a" strokeWidth="2"/>
      <text x="235" y="110" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="22" letterSpacing="5">武</text>
      <text x="235" y="140" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="22" letterSpacing="5">士</text>
      <text x="235" y="170" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="22" letterSpacing="5">道</text>
      <rect x="295" y="140" width="15" height="20" fill="#C9A84C" stroke="#d4b55e" strokeWidth="1"/>
      <text x="200" y="270" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="9" letterSpacing="3">BUSHIDO JOURNAL</text>
    </svg>
  )
}

export function MaintenanceKitSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <path d="M140,120 L140,220 Q140,230 155,230 Q170,230 170,220 L170,120 Q170,110 165,105 L165,90 Q165,85 162,82 Q158,80 155,82 Q152,85 152,90 L152,105 Q147,110 140,120 Z" fill="#1a3a1a" stroke="#2a5a2a" strokeWidth="2"/>
      <path d="M190,110 Q230,105 260,115 L265,220 Q225,228 185,220 Z" fill="#3a2a1a" stroke="#5a4a2a" strokeWidth="1.5"/>
      <circle cx="280" cy="160" r="28" fill="#d4c0a0" stroke="#c0ac90" strokeWidth="2"/>
      <text x="200" y="265" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="9" letterSpacing="3">MAINTENANCE KIT</text>
    </svg>
  )
}

// ─── TRAINING GEAR ───────────────────────────────────────────────────

export function BokkenSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <path d="M200,20 Q204,22 206,260 Q200,265 194,260 Q196,22 200,20 Z" fill="#6b4a2a" stroke="#8b6a4a" strokeWidth="1"/>
      <ellipse cx="200" cy="262" rx="20" ry="8" fill="#3a2a1a" stroke="#5a4a2a" strokeWidth="2"/>
      <rect x="195" y="270" width="10" height="30" fill="#4a3020" stroke="#6a5040" strokeWidth="1"/>
      <text x="200" y="18" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="9" letterSpacing="3">IAIDO BOKKEN</text>
    </svg>
  )
}

export function DojoMatSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <path d="M60,80 L340,80 L320,220 L80,220 Z" fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="2"/>
      <ellipse cx="200" cy="150" rx="45" ry="25" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.7"/>
      <text x="200" y="265" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="9" letterSpacing="3">DOJO TRAINING MAT</text>
    </svg>
  )
}

export function ShinaiSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#0a0009"/>
      <g transform="rotate(-15, 200, 150)">
        <line x1="200" y1="20" x2="200" y2="250" stroke="#8B7030" strokeWidth="12"/>
        <circle cx="200" cy="230" r="12" fill="#2a1a0a" stroke="#C9A84C" strokeWidth="2"/>
        <rect x="195" y="240" width="10" height="35" fill="#1a0a0a" stroke="#333" strokeWidth="1"/>
      </g>
      <g transform="rotate(15, 200, 150)">
        <line x1="200" y1="20" x2="200" y2="250" stroke="#7B6020" strokeWidth="10"/>
        <circle cx="200" cy="228" r="10" fill="#1a1008" stroke="#C9A84C" strokeWidth="2"/>
        <rect x="196" y="238" width="8" height="30" fill="#0a0805" stroke="#222" strokeWidth="1"/>
      </g>
      <text x="200" y="295" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="9" letterSpacing="3">SPARRING SHINAI SET</text>
    </svg>
  )
}

// ─── GENERIC FALLBACK ─────────────────────────────────────────────────

export function GenericSVG({ name }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="#120018"/>
      <rect x="20" y="20" width="360" height="260" fill="none" stroke="#2A2A3A" strokeWidth="1"/>
      <text x="200" y="130" textAnchor="middle" fill="#C9A84C" fontFamily="serif" fontSize="50">⚔</text>
      <text x="200" y="180" textAnchor="middle" fill="#A89880" fontFamily="sans-serif" fontSize="12" letterSpacing="2">{name?.toUpperCase()}</text>
    </svg>
  )
}

// ─── REGISTRY ─────────────────────────────────────────────────────────

const SVG_MAP = {
  'oni-slayer': OniSlayerSVG,
  'shadow-reaper': ShadowReaperSVG,
  "dragon's-breath": DragonBreathSVG,
  'dragons-breath': DragonBreathSVG,
  'ghost-blade': GhostBladeSVG,
  'blood-moon-katana': BloodMoonKatanaSVG,
  'ronin-silhouette-tee': RoninSilhouetteTSVG,
  'bushido-code-tee': BushidoCodeTeeSVG,
  'cherry-blossom-warrior-tee': CherryBlossomWarriorTeeSVG,
  'void-swordsman-tee': VoidSwordsmanTeeSVG,
  'dragon-temple-tee': DragonTempleTeeSVG,
  'last-stand-tee': LastStandTeeSVG,
  'kage-chest-plate': KageChestPlateSVG,
  'oni-mask-set': OniMaskSVG,
  'samurai-kabuto-helmet': KabutoHelmetSVG,
  'katana-wall-mount': WallMountSVG,
  'bushido-journal': BushidoJournalSVG,
  'sword-maintenance-kit': MaintenanceKitSVG,
  'iaido-practice-bokken': BokkenSVG,
  'dojo-training-mat': DojoMatSVG,
  'sparring-shinai-set': ShinaiSVG,
}

export function getProductSVG(imageKey, name) {
  const key = (imageKey || name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const Component = SVG_MAP[key]
  if (Component) return <Component />
  // Try partial match
  const partial = Object.keys(SVG_MAP).find(k => key.includes(k) || k.includes(key.split('-')[0]))
  if (partial) {
    const PartialComponent = SVG_MAP[partial]
    return <PartialComponent />
  }
  return <GenericSVG name={name} />
}
