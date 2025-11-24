// import React, { useState } from 'react';
// import { X, Copy, Check } from 'lucide-react';

// const generateCode = (unit) => {
//   const codeMap = {
//     web: `<!-- Add this script to your <head> -->
// <script src="https://cdn.yourplatform.com/ads.js"></script>

// <!-- Place this where you want the ad -->
// <div data-ad-unit-id="${unit.id}" 
//      data-ad-format="${unit.format}"
//      data-ad-size="${unit.size}">
// </div>`,
//     ios: `// Import SDK
// import YourPlatformAds

// // Initialize in AppDelegate
// YourPlatformAds.initialize(withAppId: "YOUR_APP_ID")

// // Load ad
// let banner = BannerAdView(
//     adUnitId: "${unit.id}", 
//     size: .${unit.size.replace('x', '_')}
// )
// banner.load()
// view.addSubview(banner)`,
//     android: `// Add to build.gradle
// implementation 'com.yourplatform:ad-sdk:1.0.0'

// // Initialize in Application
// YourPlatformAds.initialize(this, "YOUR_APP_ID");

// // Load ad
// BannerAdView banner = new BannerAdView(this, "${unit.id}");
// banner.load();
// layout.addView(banner);`,
//     flutter: `# Add to pubspec.yaml
// dependencies:
//   yourplatform_ads: ^1.0.0

// # Use in widget
// YourPlatformBannerAd(
//   adUnitId: '${unit.id}',
//   size: AdSize.${unit.size},
// )`,
//     'react-native': `// Install
// npm install @yourplatform/react-native-ads

// // Use in component
// import { BannerAd } from '@yourplatform/react-native-ads';

// <BannerAd
//   adUnitId="${unit.id}"
//   size="${unit.size}"
// />`
//   };
//   return codeMap[unit.platform] || 'Code not available';
// };

// const CodeModal = ({ isOpen, onClose, unit }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     const code = generateCode(unit);
//     navigator.clipboard.writeText(code).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   if (!isOpen || !unit) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//         <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center z-10">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Integration Code</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="mb-4">
//             <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{unit.name}</h3>
//             <code className="text-sm text-gray-500 dark:text-gray-400">{unit.id}</code>
//           </div>

//           <div className="relative">
//             <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">
//               <code>{generateCode(unit)}</code>
//             </pre>
//             <button
//               onClick={handleCopy}
//               className={`absolute top-4 right-4 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                 copied
//                   ? 'bg-green-500 text-white'
//                   : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
//               }`}
//             >
//               {copied ? (
//                 <span className="flex items-center gap-2">
//                   <Check className="w-4 h-4" />
//                   Copied!
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-2">
//                   <Copy className="w-4 h-4" />
//                   Copy Code
//                 </span>
//               )}
//             </button>
//           </div>

//           <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
//             <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Implementation Tips</h4>
//             <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
//               <li>• Test in development mode before going live</li>
//               <li>• Verify domain is registered in your account</li>
//               <li>• Check browser console for any errors</li>
//               <li>• Ads may take a few minutes to start serving</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeModal;



import React, { useState } from "react";
import { X, Copy, Check } from "lucide-react";

const generateCode = (unit) => {
  const codeMap = {
    web: `<!-- Add this script to your <head> -->
<script src="https://cdn.yourplatform.com/ads.js"></script>

<!-- Place this where you want the ad -->
<div data-ad-unit-id="${unit.id}" 
     data-ad-format="${unit.format}"
     data-ad-size="${unit.size}">
</div>`,
    ios: `// Import SDK
import YourPlatformAds

// Initialize in AppDelegate
YourPlatformAds.initialize(withAppId: "YOUR_APP_ID")

// Load ad
let banner = BannerAdView(
    adUnitId: "${unit.id}", 
    size: .${unit.size.replace("x", "_")}
)
banner.load()
view.addSubview(banner)`,
    android: `// Add to build.gradle
implementation 'com.yourplatform:ad-sdk:1.0.0'

// Initialize in Application
YourPlatformAds.initialize(this, "YOUR_APP_ID");

// Load ad
BannerAdView banner = new BannerAdView(this, "${unit.id}");
banner.load();
layout.addView(banner);`,
    flutter: `# Add to pubspec.yaml
dependencies:
  yourplatform_ads: ^1.0.0

# Use in widget
YourPlatformBannerAd(
  adUnitId: '${unit.id}',
  size: AdSize.${unit.size},
)`,
    "react-native": `// Install
npm install @yourplatform/react-native-ads

// Use in component
import { BannerAd } from '@yourplatform/react-native-ads';

<BannerAd
  adUnitId="${unit.id}"
  size="${unit.size}"
/>`,
  };
  return codeMap[unit.platform] || "Code not available";
};

const CodeModal = ({ isOpen, onClose, unit }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = generateCode(unit);
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen || !unit) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== HEADER ===== */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Integration Code
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="p-6">
          <div className="mb-5">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {unit.name}
            </h3>
            <code className="text-sm text-gray-500">{unit.id}</code>
          </div>

          {/* Code Block */}
          <div className="relative mb-6">
            <pre className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto text-sm leading-relaxed shadow-inner">
              <code>{generateCode(unit)}</code>
            </pre>
            <button
              onClick={handleCopy}
              className={`absolute top-4 right-4 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {copied ? (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy Code
                </span>
              )}
            </button>
          </div>

          {/* Tips Section */}
          <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              Implementation Tips
            </h4>
            <ul className="text-sm text-blue-800 space-y-1.5 list-disc list-inside">
              <li>Test the ad in development mode before going live</li>
              <li>Ensure your domain or app ID is verified in your account</li>
              <li>Check browser console or device logs for SDK errors</li>
              <li>Ads may take a few minutes to begin serving</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
