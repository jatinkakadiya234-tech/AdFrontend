// import React, { useState, useEffect } from 'react';
// import { X, Plus, Check, Layout, CreditCard, Gift } from 'lucide-react';

// const formatConfig = {
//   banner: { icon: Layout, label: 'Banner', color: 'blue' },
//   interstitial: { icon: CreditCard, label: 'Interstitial', color: 'purple' },
//   rewarded: { icon: Gift, label: 'Rewarded', color: 'yellow' },
//   native: { icon: Layout, label: 'Native', color: 'green' }
// };

// const bannerSizes = [
//   { value: '320x50', label: '320×50 (Mobile)' },
//   { value: '728x90', label: '728×90 (Leaderboard)' },
//   { value: '300x250', label: '300×250 (Rectangle)' },
//   { value: '160x600', label: '160×600 (Skyscraper)' },
//   { value: 'responsive', label: 'Responsive' }
// ];

// const AdUnitModal = ({ isOpen, onClose, onSave, editingUnit }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     platform: '',
//     format: '',
//     size: '',
//     description: '',
//     autoRefresh: 60
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (editingUnit) {
//       setFormData({
//         name: editingUnit.name,
//         platform: editingUnit.platform,
//         format: editingUnit.format,
//         size: editingUnit.size,
//         description: editingUnit.description || '',
//         autoRefresh: editingUnit.autoRefresh || 60
//       });
//     } else {
//       setFormData({
//         name: '',
//         platform: '',
//         format: '',
//         size: '',
//         description: '',
//         autoRefresh: 60
//       });
//     }
//     setErrors({});
//   }, [editingUnit, isOpen]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {};

//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.platform) newErrors.platform = 'Platform is required';
//     if (!formData.format) newErrors.format = 'Format is required';
//     if (formData.format === 'banner' && !formData.size) {
//       newErrors.size = 'Size is required for banner ads';
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     onSave(formData);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//         <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center z-10">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//             {editingUnit ? 'Edit Ad Unit' : 'Create Ad Unit'}
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="p-6 space-y-5">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Ad Unit Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
//                 placeholder="e.g., Homepage Header Banner"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               />
//               {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
//             </div>

//             {/* Platform */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Platform <span className="text-red-500">*</span>
//               </label>
//               <select
//                 className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border ${errors.platform ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
//                 value={formData.platform}
//                 onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
//               >
//                 <option value="">Select Platform</option>
//                 <option value="web">🌐 Website (JavaScript)</option>
//                 <option value="ios">📱 iOS App (Swift)</option>
//                 <option value="android">🤖 Android App (Java/Kotlin)</option>
//                 <option value="flutter">🦋 Flutter App</option>
//                 <option value="react-native">⚛️ React Native App</option>
//               </select>
//               {errors.platform && <p className="mt-1 text-sm text-red-500">{errors.platform}</p>}
//             </div>

//             {/* Ad Format */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                 Ad Format <span className="text-red-500">*</span>
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 {Object.entries(formatConfig).map(([key, config]) => {
//                   const Icon = config.icon;
//                   return (
//                     <div
//                       key={key}
//                       className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                         formData.format === key
//                           ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
//                           : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
//                       }`}
//                       onClick={() => {
//                         setFormData({
//                           ...formData,
//                           format: key,
//                           size: key !== 'banner' ? 'Full Screen' : ''
//                         });
//                       }}
//                     >
//                       <div className="flex flex-col items-center text-center">
//                         <Icon className={`w-5 h-5 mb-2 ${formData.format === key ? 'text-primary-600' : 'text-gray-400'}`} />
//                         <span className={`text-sm font-medium ${formData.format === key ? 'text-primary-700' : 'text-gray-700 dark:text-gray-300'}`}>
//                           {config.label}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//               {errors.format && <p className="mt-2 text-sm text-red-500">{errors.format}</p>}
//             </div>

//             {/* Banner Size */}
//             {formData.format === 'banner' && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                   Ad Size <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {bannerSizes.map(size => (
//                     <button
//                       key={size.value}
//                       type="button"
//                       className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                         formData.size === size.value
//                           ? 'bg-primary-500 text-white'
//                           : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
//                       }`}
//                       onClick={() => setFormData({ ...formData, size: size.value })}
//                     >
//                       {size.label}
//                     </button>
//                   ))}
//                 </div>
//                 {errors.size && <p className="mt-2 text-sm text-red-500">{errors.size}</p>}
//               </div>
//             )}

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Description
//               </label>
//               <textarea
//                 className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
//                 placeholder="Optional notes..."
//                 rows="3"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               />
//             </div>

//             {/* Auto-refresh */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Auto-refresh
//               </label>
//               <select
//                 className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
//                 value={formData.autoRefresh}
//                 onChange={(e) => setFormData({ ...formData, autoRefresh: parseInt(e.target.value) })}
//               >
//                 <option value="0">Disabled</option>
//                 <option value="30">Every 30 seconds</option>
//                 <option value="60">Every 60 seconds</option>
//                 <option value="90">Every 90 seconds</option>
//                 <option value="120">Every 2 minutes</option>
//               </select>
//             </div>
//           </div>

//           <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors inline-flex items-center gap-2"
//             >
//               {editingUnit ? (
//                 <>
//                   <Check className="w-4 h-4" />
//                   Update Ad Unit
//                 </>
//               ) : (
//                 <>
//                   <Plus className="w-4 h-4" />
//                   Create Ad Unit
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdUnitModal;


import React, { useState, useEffect } from "react";
import { X, Plus, Check, Layout, CreditCard, Gift } from "lucide-react";
import { AD_SIZE_LIST } from "../../Constants/AdSize"; // ✅ Import your centralized constants

const formatConfig = {
  banner: { icon: Layout, label: "Banner" },
  interstitial: { icon: CreditCard, label: "Interstitial" },
  rewarded: { icon: Gift, label: "Rewarded" },
  native: { icon: Layout, label: "Native" },
};

const AdUnitModal = ({ isOpen, onClose, onSave, editingUnit }) => {
  const [formData, setFormData] = useState({
    name: "",
    platform: "",
    format: "",
    size: "",
    description: "",
    autoRefresh: 60,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUnit) {
      setFormData({
        name: editingUnit.name,
        platform: editingUnit.platform,
        format: editingUnit.format,
        size: editingUnit.size,
        description: editingUnit.description || "",
        autoRefresh: editingUnit.autoRefresh || 60,
      });
    } else {
      setFormData({
        name: "",
        platform: "",
        format: "",
        size: "",
        description: "",
        autoRefresh: 60,
      });
    }
    setErrors({});
  }, [editingUnit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.platform) newErrors.platform = "Platform is required";
    if (!formData.format) newErrors.format = "Format is required";
    if (formData.format === "banner" && !formData.size) {
      newErrors.size = "Size is required for banner ads";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingUnit ? "Edit Ad Unit" : "Create Ad Unit"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Unit Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2.5 bg-gray-50 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="e.g., Homepage Header Banner"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Platform */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full px-4 py-2.5 bg-gray-50 border ${
                  errors.platform ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                value={formData.platform}
                onChange={(e) =>
                  setFormData({ ...formData, platform: e.target.value })
                }
              >
                <option value="">Select Platform</option>
                <option value="web">🌐 Web</option>
                <option value="ios">📱 iOS</option>
                <option value="android">🤖 Android</option>
                <option value="flutter">🦋 Flutter</option>
                <option value="react-native">⚛️ React Native</option>
              </select>
              {errors.platform && (
                <p className="mt-1 text-sm text-red-500">{errors.platform}</p>
              )}
            </div>

            {/* Ad Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Ad Format <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(formatConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <div
                      key={key}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.format === key
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          format: key,
                          size: key !== "banner" ? "Full Screen" : "",
                        })
                      }
                    >
                      <div className="flex flex-col items-center text-center">
                        <Icon
                          className={`w-5 h-5 mb-2 ${
                            formData.format === key
                              ? "text-blue-600"
                              : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            formData.format === key
                              ? "text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          {config.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {errors.format && (
                <p className="mt-2 text-sm text-red-500">{errors.format}</p>
              )}
            </div>

            {/* Banner Sizes */}
            {formData.format === "banner" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ad Size <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {AD_SIZE_LIST.map((size) => (
                    <button
                      key={size.value}
                      type="button"
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        formData.size === size.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, size: size.value })
                      }
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
                {errors.size && (
                  <p className="mt-2 text-sm text-red-500">{errors.size}</p>
                )}
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Optional notes..."
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Auto Refresh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto-refresh
              </label>
              <select
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.autoRefresh}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    autoRefresh: parseInt(e.target.value),
                  })
                }
              >
                <option value="0">Disabled</option>
                <option value="30">Every 30 seconds</option>
                <option value="60">Every 60 seconds</option>
                <option value="90">Every 90 seconds</option>
                <option value="120">Every 2 minutes</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              {editingUnit ? (
                <>
                  <Check className="w-4 h-4" />
                  Update Ad Unit
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Ad Unit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdUnitModal;
