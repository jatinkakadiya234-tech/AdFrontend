import React from 'react';
import { Globe, Smartphone, Layout, CreditCard, Gift, Code, Pause, Play } from 'lucide-react';

const platformConfig = {
  web: { icon: Globe, label: 'Web', color: 'blue' },
  ios: { icon: Smartphone, label: 'iOS', color: 'gray' },
  android: { icon: Smartphone, label: 'Android', color: 'green' },
  flutter: { icon: Layout, label: 'Flutter', color: 'blue' },
  'react-native': { icon: Layout, label: 'React Native', color: 'cyan' }
};

const formatConfig = {
  banner: { icon: Layout, label: 'Banner', color: 'blue' },
  interstitial: { icon: CreditCard, label: 'Interstitial', color: 'purple' },
  rewarded: { icon: Gift, label: 'Rewarded', color: 'yellow' },
  native: { icon: Layout, label: 'Native', color: 'green' }
};

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const AdUnitCard = ({ unit, onEdit, onToggleStatus, onGetCode, onDelete }) => {
  const PlatformIcon = platformConfig[unit.platform]?.icon || Globe;
  const FormatIcon = formatConfig[unit.format]?.icon || Layout;

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all"
      onClick={() => onEdit(unit)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {unit.name}
          </h3>
          <code className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {unit.id}
          </code>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
          unit.status === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            unit.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
          }`}></span>
          {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300">
          <PlatformIcon className="w-4 h-4" />
          {platformConfig[unit.platform]?.label}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300">
          <FormatIcon className="w-4 h-4" />
          {formatConfig[unit.format]?.label}
        </span>
        <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300">
          {unit.size}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Impressions</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{formatNumber(unit.impressions)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Revenue</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">${unit.revenue.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">CTR</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{unit.ctr.toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Fill Rate</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{unit.fillRate.toFixed(1)}%</div>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={(e) => { e.stopPropagation(); onGetCode(unit); }}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <Code className="w-4 h-4" />
          Get Code
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleStatus(unit.id); }}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          {unit.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {unit.status === 'active' ? 'Pause' : 'Resume'}
        </button>
      </div>
    </div>
  );
};

export default AdUnitCard;

// import React from 'react';
// import { Globe, Smartphone, Layout, CreditCard, Gift, Code, Pause, Play } from 'lucide-react';

// const platformConfig = {
//   web: { icon: Globe, label: 'Web', color: 'blue' },
//   ios: { icon: Smartphone, label: 'iOS', color: 'gray' },
//   android: { icon: Smartphone, label: 'Android', color: 'green' },
//   flutter: { icon: Layout, label: 'Flutter', color: 'blue' },
//   'react-native': { icon: Layout, label: 'React Native', color: 'cyan' }
// };

// const formatConfig = {
//   banner: { icon: Layout, label: 'Banner', color: 'blue' },
//   interstitial: { icon: CreditCard, label: 'Interstitial', color: 'purple' },
//   rewarded: { icon: Gift, label: 'Rewarded', color: 'yellow' },
//   native: { icon: Layout, label: 'Native', color: 'green' }
// };

// const formatNumber = (num) => {
//   if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
//   if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
//   return num.toString();
// };

// const AdUnitCard = ({ unit, onEdit, onToggleStatus, onGetCode, onDelete }) => {
//   const PlatformIcon = platformConfig[unit.platform]?.icon || Globe;
//   const FormatIcon = formatConfig[unit.format]?.icon || Layout;

//   return (
//     <div
//       className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
//       onClick={() => onEdit(unit)}
//     >
//       {/* Header */}
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-1">{unit.name}</h3>
//           <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
//             {unit.id}
//           </code>
//         </div>
//         <span
//           className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
//             unit.status === 'active'
//               ? 'bg-green-50 text-green-700'
//               : 'bg-yellow-50 text-yellow-700'
//           }`}
//         >
//           <span
//             className={`w-1.5 h-1.5 rounded-full ${
//               unit.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
//             }`}
//           ></span>
//           {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
//         </span>
//       </div>

//       {/* Info Tags */}
//       <div className="flex flex-wrap gap-2 mb-5">
//         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
//           <PlatformIcon className="w-4 h-4" />
//           {platformConfig[unit.platform]?.label}
//         </span>
//         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
//           <FormatIcon className="w-4 h-4" />
//           {formatConfig[unit.format]?.label}
//         </span>
//         <span className="px-2.5 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
//           {unit.size}
//         </span>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 gap-3 mb-5 p-4 bg-gray-50 rounded-lg">
//         <div>
//           <div className="text-xs text-gray-500 uppercase mb-1">Impressions</div>
//           <div className="text-lg font-semibold text-gray-900">
//             {formatNumber(unit.impressions)}
//           </div>
//         </div>
//         <div>
//           <div className="text-xs text-gray-500 uppercase mb-1">Revenue</div>
//           <div className="text-lg font-semibold text-gray-900">
//             ${unit.revenue.toFixed(2)}
//           </div>
//         </div>
//         <div>
//           <div className="text-xs text-gray-500 uppercase mb-1">CTR</div>
//           <div className="text-lg font-semibold text-gray-900">
//             {unit.ctr.toFixed(1)}%
//           </div>
//         </div>
//         <div>
//           <div className="text-xs text-gray-500 uppercase mb-1">Fill Rate</div>
//           <div className="text-lg font-semibold text-gray-900">
//             {unit.fillRate.toFixed(1)}%
//           </div>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-2 pt-4 border-t border-gray-200">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onGetCode(unit);
//           }}
//           className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           <Code className="w-4 h-4" />
//           Get Code
//         </button>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onToggleStatus(unit.id);
//           }}
//           className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           {unit.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//           {unit.status === 'active' ? 'Pause' : 'Resume'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdUnitCard;
