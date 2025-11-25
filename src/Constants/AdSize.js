import { Gift, Link2, Maximize2, Monitor } from "lucide-react";

export const AD_SIZES = {
  MEDIUM_RECTANGLE: { value: "300x250", label: "300×250 (Medium Rectangle)" },
  LARGE_RECTANGLE: { value: "336x280", label: "336×280 (Large Rectangle)" },
  LEADERBOARD: { value: "728x90", label: "728×90 (Leaderboard)" },
  HALF_PAGE: { value: "300x600", label: "300×600 (Half Page)" },
  MOBILE_BANNER: { value: "320x50", label: "320×50 (Mobile Banner)" },
  LARGE_MOBILE_BANNER: { value: "320x100", label: "320×100 (Large Mobile Banner)" },
};

// For easy iteration (like mapping inside a select or button group)
export const AD_SIZE_LIST = Object.values(AD_SIZES);


export const adTypes = [
  { value: 'Banner Ads', icon: Monitor, color: 'purple' },
  { value: 'Rewarded Ads', icon: Gift, color: 'green' },
  { value: 'Interstitial Ads', icon: Maximize2, color: 'blue' },
  { value: 'URL Shortener', icon: Link2, color: 'orange' },
];