import React from 'react';

const HeroIllustration = () => (
  <svg
    viewBox="0 0 520 340"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-lg mx-auto"
    aria-label="Ambulance dispatch city illustration"
  >
    {/* Sky / Background glow */}
    <ellipse cx="260" cy="280" rx="240" ry="50" fill="#1E3A5F" opacity="0.3" />

    {/* Buildings — back row */}
    <rect x="20" y="140" width="45" height="140" rx="4" fill="#1E293B" />
    <rect x="22" y="155" width="8" height="10" rx="1" fill="#3B82F6" opacity="0.6" />
    <rect x="34" y="155" width="8" height="10" rx="1" fill="#3B82F6" opacity="0.3" />
    <rect x="22" y="172" width="8" height="10" rx="1" fill="#3B82F6" opacity="0.5" />
    <rect x="34" y="172" width="8" height="10" rx="1" fill="#3B82F6" opacity="0.6" />
    <rect x="22" y="189" width="8" height="10" rx="1" fill="#3B82F6" opacity="0.2" />
    <rect x="34" y="189" width="8" height="10" rx="1" fill="#3B82F6" opacity="0.7" />
    {/* Antenna */}
    <rect x="40" y="130" width="3" height="12" rx="1" fill="#334155" />
    <circle cx="41.5" cy="129" r="2" fill="#EF4444" opacity="0.8" />

    <rect x="72" y="100" width="55" height="180" rx="4" fill="#0F2544" />
    <rect x="75" y="115" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.5" />
    <rect x="90" y="115" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.8" />
    <rect x="105" y="115" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.4" />
    <rect x="75" y="135" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.7" />
    <rect x="90" y="135" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.3" />
    <rect x="105" y="135" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.6" />
    <rect x="75" y="155" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.9" />
    <rect x="90" y="155" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.4" />
    <rect x="105" y="155" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.6" />
    {/* Red cross sign */}
    <rect x="87" y="88" width="14" height="5" rx="2" fill="#EF4444" opacity="0.9" />
    <rect x="91.5" y="83" width="5" height="14" rx="2" fill="#EF4444" opacity="0.9" />

    <rect x="390" y="120" width="50" height="160" rx="4" fill="#1E293B" />
    <rect x="393" y="133" width="9" height="11" rx="1" fill="#34D399" opacity="0.5" />
    <rect x="406" y="133" width="9" height="11" rx="1" fill="#34D399" opacity="0.8" />
    <rect x="419" y="133" width="9" height="11" rx="1" fill="#34D399" opacity="0.4" />
    <rect x="393" y="152" width="9" height="11" rx="1" fill="#34D399" opacity="0.7" />
    <rect x="406" y="152" width="9" height="11" rx="1" fill="#34D399" opacity="0.3" />
    <rect x="419" y="152" width="9" height="11" rx="1" fill="#34D399" opacity="0.6" />

    <rect x="450" y="150" width="60" height="130" rx="4" fill="#0F172A" />
    <rect x="453" y="163" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.5" />
    <rect x="467" y="163" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.9" />
    <rect x="481" y="163" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.3" />
    <rect x="453" y="183" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.7" />
    <rect x="467" y="183" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.5" />
    <rect x="481" y="183" width="10" height="12" rx="1" fill="#60A5FA" opacity="0.8" />

    {/* Road */}
    <rect x="0" y="278" width="520" height="62" rx="0" fill="#0F172A" />
    {/* Road lane marks */}
    <rect x="60" y="299" width="40" height="5" rx="2.5" fill="#334155" />
    <rect x="140" y="299" width="40" height="5" rx="2.5" fill="#334155" />
    <rect x="220" y="299" width="40" height="5" rx="2.5" fill="#334155" />
    <rect x="300" y="299" width="40" height="5" rx="2.5" fill="#334155" />
    <rect x="380" y="299" width="40" height="5" rx="2.5" fill="#334155" />
    <rect x="460" y="299" width="40" height="5" rx="2.5" fill="#334155" />
    {/* Sidewalk */}
    <rect x="0" y="272" width="520" height="8" rx="2" fill="#1E293B" />

    {/* Traffic Light Pole */}
    <rect x="310" y="200" width="5" height="74" rx="2" fill="#334155" />
    <rect x="305" y="195" width="15" height="38" rx="6" fill="#1E293B" />
    <circle cx="312.5" cy="204" r="4" fill="#EF4444" opacity="0.9" />
    <circle cx="312.5" cy="214" r="4" fill="#F59E0B" opacity="0.5" />
    <circle cx="312.5" cy="224" r="4" fill="#22C55E" opacity="0.5" />

    {/* ── Ambulance ── */}
    {/* Body */}
    <rect x="150" y="228" width="130" height="48" rx="8" fill="#FFFFFF" />
    {/* Cab / front section */}
    <path d="M270 244 L295 250 L295 276 L270 276 Z" fill="#E2E8F0" />
    {/* Windscreen */}
    <path d="M272 248 L292 253 L292 268 L272 268 Z" rx="2" fill="#60A5FA" opacity="0.5" />
    {/* Red stripe */}
    <rect x="150" y="245" width="130" height="7" fill="#EF4444" />
    <rect x="270" y="245" width="25" height="7" fill="#EF4444" />
    {/* Red cross on side */}
    <rect x="190" y="237" width="22" height="7" rx="2" fill="#EF4444" />
    <rect x="197" y="231" width="7" height="20" rx="2" fill="#EF4444" />
    {/* AMBULANCE text */}
    <text x="163" y="264" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#1E3A5F" letterSpacing="1.5">AMBULANCE</text>
    {/* Siren light bar */}
    <rect x="168" y="224" width="95" height="8" rx="4" fill="#334155" />
    <rect x="172" y="225.5" width="14" height="5" rx="2.5" fill="#EF4444" opacity="0.9" />
    <rect x="190" y="225.5" width="14" height="5" rx="2.5" fill="#60A5FA" opacity="0.9" />
    <rect x="208" y="225.5" width="14" height="5" rx="2.5" fill="#EF4444" opacity="0.9" />
    <rect x="226" y="225.5" width="14" height="5" rx="2.5" fill="#60A5FA" opacity="0.9" />
    <rect x="244" y="225.5" width="14" height="5" rx="2.5" fill="#EF4444" opacity="0.9" />
    {/* Wheels */}
    <circle cx="185" cy="277" r="14" fill="#1E293B" />
    <circle cx="185" cy="277" r="9" fill="#334155" />
    <circle cx="185" cy="277" r="4" fill="#94A3B8" />
    <circle cx="255" cy="277" r="14" fill="#1E293B" />
    <circle cx="255" cy="277" r="9" fill="#334155" />
    <circle cx="255" cy="277" r="4" fill="#94A3B8" />
    <circle cx="287" cy="277" r="12" fill="#1E293B" />
    <circle cx="287" cy="277" r="7" fill="#334155" />
    <circle cx="287" cy="277" r="3" fill="#94A3B8" />

    {/* Dispatch signal arcs from siren */}
    <path d="M215 215 Q215 195 235 185" stroke="#60A5FA" strokeWidth="1.5" fill="none" strokeDasharray="3 3" opacity="0.6" />
    <path d="M215 215 Q210 192 228 178" stroke="#60A5FA" strokeWidth="1" fill="none" strokeDasharray="3 3" opacity="0.4" />
    <path d="M215 215 Q220 193 242 182" stroke="#60A5FA" strokeWidth="1" fill="none" strokeDasharray="3 3" opacity="0.4" />

    {/* GPS pin 1 */}
    <circle cx="355" cy="175" r="6" fill="#22C55E" opacity="0.9" />
    <path d="M355 181 L355 192" stroke="#22C55E" strokeWidth="2" opacity="0.7" />

    {/* GPS pin 2 */}
    <circle cx="115" cy="190" r="5" fill="#F59E0B" opacity="0.8" />
    <path d="M115 195 L115 204" stroke="#F59E0B" strokeWidth="1.5" opacity="0.6" />

    {/* Dispatch route dots */}
    <circle cx="140" cy="260" r="2.5" fill="#60A5FA" opacity="0.8" />
    <circle cx="330" cy="260" r="2.5" fill="#22C55E" opacity="0.8" />
    <path d="M143 260 Q220 248 327 260" stroke="#60A5FA" strokeWidth="1" strokeDasharray="4 3" fill="none" opacity="0.5" />

    {/* Stars / signal dots in sky */}
    <circle cx="50" cy="80" r="1.5" fill="#60A5FA" opacity="0.5" />
    <circle cx="340" cy="60" r="1.5" fill="#60A5FA" opacity="0.4" />
    <circle cx="460" cy="90" r="1.5" fill="#60A5FA" opacity="0.5" />
    <circle cx="380" cy="45" r="1" fill="#F8FAFC" opacity="0.4" />
    <circle cx="145" cy="55" r="1" fill="#F8FAFC" opacity="0.4" />
  </svg>
);

export default HeroIllustration;
