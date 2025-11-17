<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { Upload, Code, Eye, Settings } from 'lucide-react';
=======
import { useState, useRef } from 'react';
import { 
  Upload, Monitor, Smartphone, Tablet, Globe, 
  Code, Database, Coffee, Zap, Apple,
  Image as ImageIcon, Video, Play, Eye, Rocket, Loader,
  Target, Settings, Layers, CheckCircle, AlertCircle,
  Code2, Check, X, Download, Trash2, FileImage,
  ArrowRight, ArrowLeft, Sparkles, Shield, Zap as Lightning,
  Palette, Layout, Smartphone as Mobile,
  BarChart3, Users, TrendingUp, Globe as Earth
} from 'lucide-react';
import { SiFlutter, SiPhp, SiReact } from 'react-icons/si';
>>>>>>> 5d3e0ec966b588f496d942c7d5d5fd3329222c8e
import Apihelper from '../service/Apihelper';

const CreateAdPage = () => {
  // Standard ad sizes - All required
  const AD_SIZES = [
    // Desktop Sizes
    { id: 'desktop_728x90', width: 728, height: 90, name: 'Leaderboard', category: 'Desktop', required: true, aspect: '8:1' },
    { id: 'desktop_970x250', width: 970, height: 250, name: 'Billboard', category: 'Desktop', required: true, aspect: '3.9:1' },
    { id: 'desktop_300x250', width: 300, height: 250, name: 'Medium Rectangle', category: 'Desktop', required: true, aspect: '6:5' },
    { id: 'desktop_300x600', width: 300, height: 600, name: 'Half Page', category: 'Desktop', required: true, aspect: '1:2' },
    // Mobile Sizes
    { id: 'mobile_320x50', width: 320, height: 50, name: 'Mobile Banner', category: 'Mobile', required: true, aspect: '6.4:1' },
    { id: 'mobile_320x100', width: 320, height: 100, name: 'Large Mobile Banner', category: 'Mobile', required: true, aspect: '3.2:1' },
    { id: 'mobile_300x250', width: 300, height: 250, name: 'Mobile Rectangle', category: 'Mobile', required: true, aspect: '6:5' }
  ];

  const [formData, setFormData] = useState({
    title: '',
    clickUrl: '',
<<<<<<< HEAD
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await Apihelper.GetCategories();
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


=======
    targetDevices: ['web', 'mobile'],
    targetPlatforms: ['html']
  });
  
  const [adImages, setAdImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRefs = useRef({});
  const dropZoneRef = useRef(null);
>>>>>>> 5d3e0ec966b588f496d942c7d5d5fd3329222c8e

  // Enhanced drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dropZoneRef.current?.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, sizeId) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(sizeId, files[0]);
    }
  };

  // Validate image dimensions
  const validateImageDimensions = (file, expectedWidth, expectedHeight) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        if (img.width === expectedWidth && img.height === expectedHeight) {
          resolve(true);
        } else {
          reject(`Dimensions must be exactly ${expectedWidth}×${expectedHeight}px. Your image is ${img.width}×${img.height}px`);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject('Failed to load image');
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // Handle file upload for specific ad size
  const handleFileUpload = async (sizeId, file) => {
    if (!file) return;

    const adSize = AD_SIZES.find(s => s.id === sizeId);
    if (!adSize) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setImageErrors(prev => ({
        ...prev,
        [sizeId]: 'Please upload a valid image file (JPG, PNG, GIF, WebP)'
      }));
      return;
    }

    // Validate file size (5MB max per image)
    if (file.size > 5 * 1024 * 1024) {
      setImageErrors(prev => ({
        ...prev,
        [sizeId]: 'Image size must be less than 5MB'
      }));
      return;
    }

    try {
      // Validate dimensions
      await validateImageDimensions(file, adSize.width, adSize.height);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      
      // Store the file and preview
      setAdImages(prev => ({
        ...prev,
        [sizeId]: { 
          file, 
          preview: previewUrl, 
          size: adSize,
          uploadedAt: new Date().toISOString()
        }
      }));
      
      // Clear any previous errors
      setImageErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[sizeId];
        return newErrors;
      });
      
    } catch (error) {
      setImageErrors(prev => ({
        ...prev,
        [sizeId]: error
      }));
    }
  };

  // Remove uploaded image
  const removeImage = (sizeId) => {
    if (adImages[sizeId]?.preview) {
      URL.revokeObjectURL(adImages[sizeId].preview);
    }
    setAdImages(prev => {
      const newImages = { ...prev };
      delete newImages[sizeId];
      return newImages;
    });
    setImageErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[sizeId];
      return newErrors;
    });
  };

  // Check if all required images are uploaded
  const allImagesUploaded = () => {
    return AD_SIZES.every(size => adImages[size.id]);
  };

  // Get upload progress
  const getUploadProgress = () => {
    const uploaded = Object.keys(adImages).length;
    const total = AD_SIZES.length;
    return { uploaded, total, percentage: Math.round((uploaded / total) * 100) };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate campaign title
    if (!formData.title.trim()) {
      setError('Please enter a campaign title');
      setCurrentStep(1);
      return;
    }

<<<<<<< HEAD
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('width', formData.width);
      formDataToSend.append('height', formData.height);
      formDataToSend.append('mediaType', formData.mediaType);
      formDataToSend.append('clickUrl', formData.clickUrl);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('file', selectedFile);

      const response = await Apihelper.CreateAd(formDataToSend);
      setSuccess('Campaign created successfully!');
=======
    // Validate destination URL
    if (!formData.clickUrl.trim()) {
      setError('Please enter a destination URL');
      setCurrentStep(1);
      return;
    }

    // Validate URL format
    try {
      new URL(formData.clickUrl);
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
      setCurrentStep(1);
      return;
    }

    // Validate all images are uploaded
    if (!allImagesUploaded()) {
      const missing = AD_SIZES.filter(size => !adImages[size.id]).map(s => s.name).join(', ');
      setError(`Please upload all required ad sizes. Missing: ${missing}`);
      setCurrentStep(2);
      return;
    }

    setLoading(true);

    try {
      // Create separate ad for each size
      const uploadPromises = AD_SIZES.map(async (adSize) => {
        const imageData = adImages[adSize.id];
        if (!imageData) return null;

        const formDataToSend = new FormData();
        formDataToSend.append('title', `${formData.title} - ${adSize.name}`);
        formDataToSend.append('width', adSize.width.toString());
        formDataToSend.append('height', adSize.height.toString());
        formDataToSend.append('mediaType', 'image');
        formDataToSend.append('clickUrl', formData.clickUrl);
        formDataToSend.append('targetDevices', JSON.stringify(formData.targetDevices));
        formDataToSend.append('targetPlatforms', JSON.stringify(formData.targetPlatforms));
        formDataToSend.append('file', imageData.file);

        return Apihelper.CreateAd(formDataToSend);
      });

      await Promise.all(uploadPromises);
>>>>>>> 5d3e0ec966b588f496d942c7d5d5fd3329222c8e
      
      setSuccess(`🎉 Campaign created successfully! All ${AD_SIZES.length} ad sizes are now live.`);
      
      // Cleanup preview URLs
      Object.values(adImages).forEach(img => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
      
      // Reset form
      setFormData({
        title: '',
        clickUrl: '',
<<<<<<< HEAD
        category: ''
      });
      setSelectedFile(null);
      setPreviewUrl('');

=======
        targetDevices: ['web', 'mobile'],
        targetPlatforms: ['html']
      });
      setAdImages({});
      setImageErrors({});
      setCurrentStep(1);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
>>>>>>> 5d3e0ec966b588f496d942c7d5d5fd3329222c8e
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create campaign. Please try again.');
      console.error('Campaign creation error:', err);
    } finally {
      setLoading(false);
    }
  };


<<<<<<< HEAD

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700">{error}</p>
=======
  const handlePlatformChange = (platform) => {
    const updatedPlatforms = formData.targetPlatforms.includes(platform)
      ? formData.targetPlatforms.filter(p => p !== platform)
      : [...formData.targetPlatforms, platform];
    setFormData({...formData, targetPlatforms: updatedPlatforms});
  };

  const deviceOptions = [
    { key: 'web', label: 'Desktop', icon: Monitor, desc: 'Optimize for desktop browsers' },
    { key: 'mobile', label: 'Mobile', icon: Smartphone, desc: 'Target mobile devices' },
    { key: 'tablet', label: 'Tablet', icon: Tablet, desc: 'Reach tablet users' }
  ];

  const platformOptions = [
    { key: 'html', label: 'HTML/CSS', icon: Globe, desc: 'Standard web integration' },
    { key: 'react', label: 'React', icon: SiReact, desc: 'React component format' },
    { key: 'php', label: 'PHP', icon: SiPhp, desc: 'Server-side integration' },
    { key: 'java', label: 'Java', icon: Coffee, desc: 'Enterprise applications' },
    { key: 'flutter', label: 'Flutter', icon: SiFlutter, desc: 'Cross-platform mobile' },
    { key: 'swift', label: 'Swift', icon: Apple, desc: 'iOS native apps' }
  ];

  const steps = [
    { id: 1, title: 'Campaign Details', icon: Code, desc: 'Basic information' },
    { id: 2, title: 'Upload Creatives', icon: Layers, desc: 'All ad sizes' },
    { id: 3, title: 'Targeting', icon: Target, desc: 'Platform & devices' },
    { id: 4, title: 'Review & Launch', icon: Rocket, desc: 'Final check' }
  ];

  // Group ad sizes by category
  const desktopSizes = AD_SIZES.filter(s => s.category === 'Desktop');
  const mobileSizes = AD_SIZES.filter(s => s.category === 'Mobile');

  // Enhanced file upload component
  const FileUploadArea = ({ size, hasImage, hasError, onFileSelect, onRemove }) => {
    const Icon = size.category === 'Desktop' ? Monitor : Mobile;
    
    return (
      <div className={`group relative border-2 rounded-2xl p-6 transition-all duration-300 transform hover:scale-[1.02] ${
        hasImage 
          ? 'border-emerald-500 bg-gradient-to-br from-emerald-50/80 to-green-50/60 shadow-lg shadow-emerald-100' 
          : hasError 
            ? 'border-red-400 bg-gradient-to-br from-red-50/80 to-orange-50/60 shadow-lg shadow-red-100'
            : 'border-gray-200/80 bg-gradient-to-br from-white to-gray-50/80 hover:border-blue-300 shadow-md hover:shadow-xl hover:shadow-blue-50'
      }`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${
              hasImage ? 'bg-emerald-100 text-emerald-600' : 
              hasError ? 'bg-red-100 text-red-600' : 
              'bg-blue-100 text-blue-600'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">{size.name}</h4>
              <p className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                {size.width} × {size.height}px
              </p>
              <p className="text-xs text-gray-500 mt-1">Aspect: {size.aspect}</p>
            </div>
          </div>
          
          {hasImage && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Uploaded</span>
              </div>
              <button
                type="button"
                onClick={onRemove}
                className="p-2 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          )}
        </div>

        {/* Upload Area */}
        {!hasImage ? (
          <div
            ref={dropZoneRef}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, size.id)}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragging 
                ? 'border-blue-400 bg-blue-50/50 scale-105' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
            }`}
            onClick={() => fileInputRefs.current[size.id]?.click()}
          >
            <input
              ref={el => fileInputRefs.current[size.id] = el}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFileSelect(size.id, file);
              }}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Upload className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {isDragging ? 'Drop your image here' : 'Click to upload'}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Drag & drop or click to browse
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span>JPG, PNG, GIF</span>
                  <span>•</span>
                  <span>Max 5MB</span>
                  <span>•</span>
                  <span>Exact dimensions</span>
                </div>
              </div>
            </div>

            {/* Drag overlay */}
            {isDragging && (
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl border-2 border-blue-400 border-dashed flex items-center justify-center">
                <div className="text-center">
                  <Upload className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-blue-700 font-semibold">Drop to upload</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Image Preview */
          <div className="relative group">
            <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white">
              <img
                src={adImages[size.id].preview}
                alt={size.name}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Hover actions */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[size.id]?.click()}
                    className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={onRemove}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {hasError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-pulse">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800 mb-1">Upload Error</p>
                <p className="text-sm text-red-700">{hasError}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Dynamic Preview Component based on current step
  const DynamicPreview = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Campaign Overview
              </h4>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Ad Sizes Required</span>
                    <span className="font-bold text-blue-600">{AD_SIZES.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <Monitor className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">Desktop</p>
                    <p className="text-lg font-bold text-gray-900">{desktopSizes.length}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <Mobile className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">Mobile</p>
                    <p className="text-lg font-bold text-gray-900">{mobileSizes.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <h4 className="font-bold text-purple-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Coverage Impact
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Desktop Reach</span>
                  <span className="font-semibold text-purple-700">95%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Mobile Reach</span>
                  <span className="font-semibold text-purple-700">98%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Coverage</span>
                  <span className="font-semibold text-purple-700">99%</span>
                </div>
              </div>
            </div> */}

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 ">
              <h4 className="font-bold text-green-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Quick Tips
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Use high-quality, brand-consistent images</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ensure text is readable on all screen sizes</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Test your landing page URL before launching</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-blue-900">Upload Progress</h4>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {getUploadProgress().percentage}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-1000 ease-out rounded-full relative overflow-hidden"
                  style={{ width: `${getUploadProgress().percentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
              
              <div className="flex justify-between mt-3 text-sm text-gray-600">
                <span className="flex items-center">
                  {getUploadProgress().uploaded > 0 && <CheckCircle className="w-4 h-4 mr-1 text-emerald-600" />}
                  {getUploadProgress().uploaded} Uploaded
                </span>
                <span>{getUploadProgress().total - getUploadProgress().uploaded} Remaining</span>
              </div>
            </div>

            {Object.keys(adImages).length > 0 && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <h4 className="font-bold text-gray-900 text-lg">Uploaded Creatives</h4>
                {Object.entries(adImages).map(([sizeId, imageData]) => (
                  <div key={sizeId} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold text-gray-800">{imageData.size.name}</p>
                        <p className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded-md">
                          {imageData.size.width}×{imageData.size.height}
                        </p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <img 
                      src={imageData.preview} 
                      alt={imageData.size.name}
                      className="w-full h-auto rounded-xl border border-gray-100"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h4 className="font-bold text-green-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Targeting Summary
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Selected Devices</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.targetDevices.map(device => {
                      const deviceInfo = deviceOptions.find(d => d.key === device);
                      return (
                        <div key={device} className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          <deviceInfo.icon className="w-3 h-3" />
                          <span>{deviceInfo.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Platform Integration</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.targetPlatforms.map(platform => {
                      const platformInfo = platformOptions.find(p => p.key === platform);
                      return (
                        <div key={platform} className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          <platformInfo.icon className="w-3 h-3" />
                          <span>{platformInfo.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
              <h4 className="font-bold text-orange-900 mb-4 flex items-center">
                <Rocket className="w-5 h-5 mr-2" />
                Ready to Launch!
              </h4>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Campaign Title</span>
                    <span className="font-bold text-gray-900 text-sm text-right">{formData.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Ad Sizes</span>
                    <span className="font-bold text-gray-900">{AD_SIZES.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Target Devices</span>
                    <span className="font-bold text-gray-900">{formData.targetDevices.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Platforms</span>
                    <span className="font-bold text-gray-900">{formData.targetPlatforms.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-20 animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4 tracking-tight">
            Create Ad Campaign
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Build high-performance advertising campaigns with complete multi-device coverage
          </p>
        </div>

        {/* Enhanced Progress Steps */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Steps */}
            <div className="flex justify-between relative">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center justify-center w-14 h-14 rounded-2xl border-2 transition-all duration-300 shadow-lg ${
                      currentStep >= step.id 
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-600 text-white scale-110 shadow-blue-500/25' 
                        : currentStep === step.id - 1
                        ? 'bg-white border-blue-400 text-blue-600 shadow-md hover:scale-105 cursor-pointer'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    <step.icon className="w-6 h-6" />
                  </button>
                  
                  <div className="mt-3 text-center">
                    <p className={`text-sm font-bold transition-all duration-300 ${
                      currentStep >= step.id 
                        ? 'text-blue-600' 
                        : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 hidden sm:block">{step.desc}</p>
                  </div>

                  {/* Step Number */}
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-white text-blue-600 shadow-lg' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Main Form */}
          <div className="xl:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Status Messages */}
              {error && (
                <div className="m-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl flex items-start animate-fadeIn">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 mb-2 text-lg">Campaign Creation Failed</h4>
                    <p className="text-red-700">{error}</p>
                  </div>
>>>>>>> 5d3e0ec966b588f496d942c7d5d5fd3329222c8e
                </div>
              )}
              
              {success && (
<<<<<<< HEAD
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-700">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campaign Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Code className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Campaign Information</h2>
                      <p className="text-sm text-gray-600">Define your campaign's core details and objectives</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter compelling campaign title"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Choose a descriptive name for internal tracking</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Destination URL</label>
                      <input
                        type="url"
                        value={formData.clickUrl}
                        onChange={(e) => setFormData({...formData, clickUrl: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://your-landing-page.com"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Where users will be directed when they click</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Choose the most relevant category for your ad</p>
                  </div>
                </div>

                {/* Creative Assets */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Upload className="w-6 h-6 text-purple-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Creative Assets</h2>
                      <p className="text-sm text-gray-600">Upload and configure your advertising media</p>
=======
                <div className="m-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl flex items-start animate-fadeIn">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-2 text-lg">🎉 Campaign Launched Successfully!</h4>
                    <p className="text-green-700">{success}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-8 space-y-12">
                {/* Step 1: Campaign Information */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-lg">
                        <Code className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                          Campaign Information
                        </h2>
                        <p className="text-gray-600 text-lg">Define your campaign's core details and objectives</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-4">
                        <label className="block text-lg font-semibold text-gray-800 flex items-center">
                          Campaign Title
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 text-lg placeholder-gray-400"
                            placeholder="e.g., Summer Sale 2024 - Global Campaign"
                            required
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            {formData.title && (
                              <CheckCircle className="w-6 h-6 text-emerald-500 animate-bounce" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                          Choose a descriptive name for internal tracking and reporting
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <label className="block text-lg font-semibold text-gray-800 flex items-center">
                          Destination URL
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            value={formData.clickUrl}
                            onChange={(e) => setFormData({...formData, clickUrl: e.target.value})}
                            className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 text-lg placeholder-gray-400"
                            placeholder="https://your-landing-page.com/offer"
                            required
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            {formData.clickUrl && (
                              <CheckCircle className="w-6 h-6 text-emerald-500 animate-bounce" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Lightning className="w-4 h-4 mr-2 text-blue-500" />
                          Where users will be directed when they click your ads
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-8 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => {
                          if (formData.title && formData.clickUrl) {
                            setCurrentStep(2);
                            setError('');
                          } else {
                            setError('Please fill in all required fields');
                          }
                        }}
                        className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
                      >
                        <span>Next: Upload Creatives</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Upload Ad Creatives */}
                {currentStep === 2 && (
                  <div className="space-y-10 animate-fadeIn">
                    <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center shadow-lg">
                        <Layers className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
                          Upload Ad Creatives
                        </h2>
                        <p className="text-gray-600 text-lg">Upload images for all required ad sizes (exact dimensions required)</p>
                      </div>
                    </div>

                    {/* Desktop Ad Sizes */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                        <Monitor className="w-8 h-8 text-blue-600" />
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Desktop Ad Sizes</h3>
                          <p className="text-gray-600">
                            {desktopSizes.filter(s => adImages[s.id]).length}/{desktopSizes.length} uploaded
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6">
                        {desktopSizes.map((adSize) => (
                          <FileUploadArea
                            key={adSize.id}
                            size={adSize}
                            hasImage={!!adImages[adSize.id]}
                            hasError={!!imageErrors[adSize.id]}
                            onFileSelect={handleFileUpload}
                            onRemove={() => removeImage(adSize.id)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Mobile Ad Sizes */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4 mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                        <Mobile className="w-8 h-8 text-purple-600" />
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Mobile Ad Sizes</h3>
                          <p className="text-gray-600">
                            {mobileSizes.filter(s => adImages[s.id]).length}/{mobileSizes.length} uploaded
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mobileSizes.map((adSize) => (
                          <FileUploadArea
                            key={adSize.id}
                            size={adSize}
                            hasImage={!!adImages[adSize.id]}
                            hasError={!!imageErrors[adSize.id]}
                            onFileSelect={handleFileUpload}
                            onRemove={() => removeImage(adSize.id)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-8 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="group px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                      >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (allImagesUploaded()) {
                            setCurrentStep(3);
                            setError('');
                          } else {
                            setError('Please upload all required ad sizes before continuing');
                          }
                        }}
                        className={`group px-10 py-4 font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 ${
                          allImagesUploaded()
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <span>Next: Targeting</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
>>>>>>> 5d3e0ec966b588f496d942c7d5d5fd3329222c8e
                    </div>
                  </div>
                )}

<<<<<<< HEAD
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Media Upload</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        required
                      />
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          {selectedFile ? selectedFile.name : 'Upload Creative Asset'}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Drag & drop or click to browse • JPG, PNG, GIF, MP4, WebM • Max 50MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Width (pixels)</label>
                      <input
                        type="number"
                        value={formData.width}
                        onChange={(e) => setFormData({...formData, width: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Height (pixels)</label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({...formData, height: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type</label>
                      <select
                        value={formData.mediaType}
                        onChange={(e) => setFormData({...formData, mediaType: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="gif">GIF</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Creating...' : 'Create Campaign'}
                  </button>
                </div>
=======
                {/* Step 3: Targeting Configuration */}
                {currentStep === 3 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-lg">
                        <Target className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-green-900 bg-clip-text text-transparent">
                          Targeting & Distribution
                        </h2>
                        <p className="text-gray-600 text-lg">Configure device targeting and platform integration</p>
                      </div>
                    </div>
                    
                    {/* Device Targeting */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Layout className="w-6 h-6 mr-3 text-blue-600" />
                        Device Targeting
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {deviceOptions.map(device => {
                          const Icon = device.icon;
                          const isSelected = formData.targetDevices.includes(device.key);
                          return (
                            <button
                              key={device.key}
                              type="button"
                              onClick={() => handleDeviceChange(device.key)}
                              className={`p-8 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 group ${
                                isSelected
                                  ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl shadow-green-100'
                                  : 'border-gray-200 bg-white hover:border-gray-300 shadow-lg hover:shadow-xl'
                              }`}
                            >
                              <div className="text-center">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                                  isSelected
                                    ? 'bg-green-100 text-green-600 scale-110'
                                    : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600'
                                }`}>
                                  <Icon className="w-8 h-8" />
                                </div>
                                <h4 className={`font-bold text-lg mb-2 ${
                                  isSelected ? 'text-green-900' : 'text-gray-700'
                                }`}>
                                  {device.label}
                                </h4>
                                <p className={`text-sm ${
                                  isSelected ? 'text-green-700' : 'text-gray-500'
                                }`}>
                                  {device.desc}
                                </p>
                                {isSelected && (
                                  <div className="mt-4 flex items-center justify-center space-x-1 text-green-600">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="text-sm font-semibold">Selected</span>
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Platform Integration */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Palette className="w-6 h-6 mr-3 text-purple-600" />
                        Platform Integration
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {platformOptions.map(platform => {
                          const Icon = platform.icon;
                          const isSelected = formData.targetPlatforms.includes(platform.key);
                          return (
                            <button
                              key={platform.key}
                              type="button"
                              onClick={() => handlePlatformChange(platform.key)}
                              className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 group ${
                                isSelected
                                  ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl shadow-green-100'
                                  : 'border-gray-200 bg-white hover:border-gray-300 shadow-lg hover:shadow-xl'
                              }`}
                            >
                              <div className="text-center">
                                <Icon className={`w-10 h-10 mx-auto mb-3 transition-all duration-300 ${
                                  isSelected
                                    ? 'text-green-600 scale-110'
                                    : 'text-gray-400 group-hover:text-blue-600'
                                }`} />
                                <h4 className={`font-semibold text-base mb-2 ${
                                  isSelected ? 'text-green-900' : 'text-gray-700'
                                }`}>
                                  {platform.label}
                                </h4>
                                <p className={`text-xs ${
                                  isSelected ? 'text-green-700' : 'text-gray-500'
                                }`}>
                                  {platform.desc}
                                </p>
                                {isSelected && (
                                  <div className="mt-3 flex items-center justify-center space-x-1 text-green-600">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-xs font-semibold">Enabled</span>
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-8 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="group px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                      >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
                      >
                        <span>Review Campaign</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Launch */}
                {currentStep === 4 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center shadow-lg">
                        <Rocket className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-orange-900 bg-clip-text text-transparent">
                          Review & Launch Campaign
                        </h2>
                        <p className="text-gray-600 text-lg">Final review before launching your campaign</p>
                      </div>
                    </div>

                    {/* Campaign Summary */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200 shadow-lg">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Shield className="w-6 h-6 mr-3 text-blue-600" />
                        Campaign Summary
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                          <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <Code className="w-4 h-4 mr-2" />
                            Campaign Title
                          </p>
                          <p className="font-bold text-gray-900 text-lg">{formData.title}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                          <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <Globe className="w-4 h-4 mr-2" />
                            Destination URL
                          </p>
                          <p className="font-bold text-gray-900 text-lg truncate">{formData.clickUrl}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                          <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <Layers className="w-4 h-4 mr-2" />
                            Total Ad Sizes
                          </p>
                          <p className="font-bold text-gray-900 text-lg">{AD_SIZES.length} sizes</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                          <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2" />
                            Target Devices
                          </p>
                          <p className="font-bold text-gray-900 text-lg">{formData.targetDevices.length} devices</p>
                        </div>
                      </div>
                    </div>

                    {/* Ad Previews */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900">Ad Creatives Preview</h3>
                      
                      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
                        <h4 className="font-semibold text-gray-800 mb-6 flex items-center text-xl">
                          <Monitor className="w-6 h-6 mr-3 text-blue-600" />
                          Desktop Ads
                        </h4>
                        <div className="grid grid-cols-2 gap-6">
                          {desktopSizes.map(size => (
                            <div key={size.id} className="border-2 border-gray-100 rounded-2xl p-4 bg-gradient-to-br from-gray-50 to-white hover:shadow-lg transition-all duration-300">
                              <p className="text-sm font-semibold text-gray-700 mb-3">{size.name} ({size.width}×{size.height})</p>
                              {adImages[size.id] && (
                                <img 
                                  src={adImages[size.id].preview} 
                                  alt={size.name}
                                  className="w-full h-auto rounded-xl border border-gray-200 shadow-md"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
                        <h4 className="font-semibold text-gray-800 mb-6 flex items-center text-xl">
                          <Mobile className="w-6 h-6 mr-3 text-purple-600" />
                          Mobile Ads
                        </h4>
                        <div className="grid grid-cols-3 gap-6">
                          {mobileSizes.map(size => (
                            <div key={size.id} className="border-2 border-gray-100 rounded-2xl p-4 bg-gradient-to-br from-gray-50 to-white hover:shadow-lg transition-all duration-300">
                              <p className="text-xs font-semibold text-gray-700 mb-3">{size.name}</p>
                              {adImages[size.id] && (
                                <img 
                                  src={adImages[size.id].preview} 
                                  alt={size.name}
                                  className="w-full h-auto rounded-xl border border-gray-200 shadow-md"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-8 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="group px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                      >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="group px-12 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl text-lg flex items-center space-x-3"
                      >
                        {loading ? (
                          <>
                            <Loader className="w-6 h-6 animate-spin" />
                            <span>Launching Campaign...</span>
                          </>
                        ) : (
                          <>
                            <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                            <span>Launch Campaign</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
>>>>>>> 5d3e0ec966b588f496d942c7d5d5fd3329222c8e
              </form>
            </div>
          </div>

<<<<<<< HEAD
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Preview */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                  <p className="text-sm text-gray-600">Real-time campaign visualization</p>
                </div>
              </div>
              
              {previewUrl ? (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    {formData.mediaType === 'video' ? (
                      <video 
                        src={previewUrl} 
                        className="w-full h-32 rounded object-cover"
                        controls
                      />
                    ) : (
                      <img 
                        src={previewUrl} 
                        alt="Preview"
                        className="w-full h-32 rounded object-cover"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="text-gray-400 mb-2">📷</div>
                  <h4 className="font-medium text-gray-700 mb-1">No Asset Selected</h4>
                  <p className="text-gray-500 text-sm">Upload a creative asset to see the preview</p>
                </div>
              )}
            </div>

            {/* Campaign Insights */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="w-5 h-5 text-orange-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Campaign Insights</h3>
                  <p className="text-sm text-gray-600">Optimization recommendations</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-medium text-blue-900 text-sm mb-1">Multi-Platform Ready</h4>
                  <p className="text-blue-800 text-xs">Your campaign will generate optimized code for all selected platforms automatically.</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-medium text-green-900 text-sm mb-1">Performance Tracking</h4>
                  <p className="text-green-800 text-xs">Built-in analytics will track impressions, clicks, and conversion metrics.</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <h4 className="font-medium text-purple-900 text-sm mb-1">Responsive Design</h4>
                  <p className="text-purple-800 text-xs">Automatically adapts to different screen sizes and device orientations.</p>
                </div>
              </div>
=======
          {/* Enhanced Preview Panel */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 sticky top-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                  <Eye className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Campaign Preview</h3>
                  <p className="text-gray-600">Real-time insights and progress</p>
                </div>
              </div>
              
              <DynamicPreview />
>>>>>>> 5d3e0ec966b588f496d942c7d5d5fd3329222c8e
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default CreateAdPage;