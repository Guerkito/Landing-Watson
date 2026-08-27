import React from "react";

export const Icon = ({ d, size = 24, color = "currentColor", style, ...rest }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    style={style} {...rest}
  >
    {d}
  </svg>
);

export const Icons = {
  Mic: (p) => <Icon {...p} d={<><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><path d="M12 18v4"/><path d="M8 22h8"/></>}/>,
  AudioLines: (p) => <Icon {...p} d={<><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></>}/>,
  Shield: (p) => <Icon {...p} d={<><path d="M20 13c0 5-3.5 7.5-8 8.5-4.5-1-8-3.5-8-8.5V6l8-3 8 3z"/><path d="m9 12 2 2 4-4"/></>}/>,
  Lock: (p) => <Icon {...p} d={<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>}/>,
  Stethoscope: (p) => <Icon {...p} d={<><path d="M4 4v6a4 4 0 0 0 8 0V4"/><path d="M6 4h.01M10 4h.01"/><path d="M12 14v3a4 4 0 0 0 8 0"/><circle cx="20" cy="11" r="2"/></>}/>,
  Clipboard: (p) => <Icon {...p} d={<><rect x="7" y="5" width="10" height="16" rx="2"/><path d="M9 5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M9 11h6M9 15h6"/></>}/>,
  Building: (p) => <Icon {...p} d={<><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 21V12h6v9"/><path d="M8 7h.01M12 7h.01M16 7h.01"/></>}/>,
  Cpu: (p) => <Icon {...p} d={<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></>}/>,
  CloudOff: (p) => <Icon {...p} d={<><path d="M3 3l18 18"/><path d="M22 17.5a4.5 4.5 0 0 0-3.5-7.4 7 7 0 0 0-13.4 2.4"/><path d="M5.5 8A4.5 4.5 0 0 0 6 17h12"/></>}/>,
  Cloud: (p) => <Icon {...p} d={<><path d="M17.5 19a4.5 4.5 0 1 0 0-9 7 7 0 0 0-13.4 2.4A4.5 4.5 0 0 0 5.5 19h12z"/></>}/>,
  Check: (p) => <Icon {...p} d={<path d="m5 12 5 5 9-11"/>}/>,
  CheckCircle: (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>}/>,
  Alert: (p) => <Icon {...p} d={<><path d="m12 3-9 16h18z"/><path d="M12 10v4M12 17h.01"/></>}/>,
  Arrow: (p) => <Icon {...p} d={<><path d="M5 12h14M13 5l7 7-7 7"/></>}/>,
  User: (p) => <Icon {...p} d={<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>}/>,
  Users: (p) => <Icon {...p} d={<><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M17 11a4 4 0 0 0 0-8"/><path d="M22 21a7 7 0 0 0-5-6.7"/></>}/>,
  Briefcase: (p) => <Icon {...p} d={<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></>}/>,
  Activity: (p) => <Icon {...p} d={<path d="M3 12h4l2-7 4 14 2-7h6"/>}/>,
  Award: (p) => <Icon {...p} d={<><circle cx="12" cy="9" r="6"/><path d="m9 13-2 8 5-3 5 3-2-8"/></>}/>,
  Server: (p) => <Icon {...p} d={<><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 8h.01M7 17h.01"/></>}/>,
  Settings: (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>}/>,
  HeartPulse: (p) => <Icon {...p} d={<><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-.6 1-1.5 2-2.5 3"/><path d="M3.5 13H8l2-3 3 6 2-3h5.5"/></>}/>,
};
