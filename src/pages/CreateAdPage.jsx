import { useState } from 'react';
import { 
  Upload, Monitor, Smartphone, Tablet, Globe, 
  Code, Database, Coffee, Zap, Apple,
  Image, Video, Play, Eye, Rocket, Loader,
  Target, Settings, Layers, CheckCircle, AlertCircle,
  Code2
} from 'lucide-react';
import { SiFlutter, SiPhp, SiReact } from 'react-icons/si';
import Apihelper from '../service/Apihelper';

const CreateAdPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    width: '',
    height: '',
    mediaType: 'image',
    clickUrl: '',
    targetDevices: ['web'],
    targetPlatforms: ['html']
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      if (file.type.startsWith('video/')) {
        setFormData({...formData, mediaType: 'video'});
      } else if (file.type === 'image/gif') {
        setFormData({...formData, mediaType: 'gif'});
      } else {
        setFormData({...formData, mediaType: 'image'});
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!selectedFile) {
      setError('Please select a media file');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('width', formData.width);
      formDataToSend.append('height', formData.height);
      formDataToSend.append('mediaType', formData.mediaType);
      formDataToSend.append('clickUrl', formData.clickUrl);
      formDataToSend.append('targetDevices', JSON.stringify(formData.targetDevices));
      formDataToSend.append('targetPlatforms', JSON.stringify(formData.targetPlatforms));
      formDataToSend.append('file', selectedFile);

      await Apihelper.CreateAd(formDataToSend);
      setSuccess('Campaign created successfully and is now live!');
      
      setFormData({
        title: '',
        width: '',
        height: '',
        mediaType: 'image',
        clickUrl: '',
        targetDevices: ['web'],
        targetPlatforms: ['html']
      });
      setSelectedFile(null);
      setPreviewUrl('');
      setCurrentStep(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  const handleDeviceChange = (device) => {
    const updatedDevices = formData.targetDevices.includes(device)
      ? formData.targetDevices.filter(d => d !== device)
      : [...formData.targetDevices, device];
    setFormData({...formData, targetDevices: updatedDevices});
  };

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
    { id: 1, title: 'Campaign Details', icon: Code },
    { id: 2, title: 'Creative Assets', icon: Layers },
    { id: 3, title: 'Targeting & Distribution', icon: Target },
    { id: 4, title: 'Review & Launch', icon: Rocket }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Campaign Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create high-performance advertising campaigns with advanced targeting and multi-platform distribution
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden md:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-8 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Main Form */}
          <div className="xl:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20">
              {/* Status Messages */}
              {error && (
                <div className="mx-8 mt-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start">
                  <AlertCircle className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">Campaign Creation Failed</h4>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}
              
              {success && (
                <div className="mx-8 mt-8 p-6 bg-green-50 border border-green-200 rounded-2xl flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Campaign Launched Successfully</h4>
                    <p className="text-green-700">{success}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-8 space-y-10">
                {/* Campaign Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Code className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Campaign Information</h2>
                      <p className="text-gray-600">Define your campaign's core details and objectives</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">Campaign Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50"
                        placeholder="Enter compelling campaign title"
                        required
                      />
                      <p className="text-xs text-gray-500">Choose a descriptive name for internal tracking</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">Destination URL</label>
                      <input
                        type="url"
                        value={formData.clickUrl}
                        onChange={(e) => setFormData({...formData, clickUrl: e.target.value})}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50"
                        placeholder="https://your-landing-page.com"
                        required
                      />
                      <p className="text-xs text-gray-500">Where users will be directed when they click</p>
                    </div>
                  </div>
                </div>

                {/* Creative Assets */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Layers className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Creative Assets</h2>
                      <p className="text-gray-600">Upload and configure your advertising media</p>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-800">Media Upload</label>
                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        required
                      />
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all group-hover:scale-[1.02]">
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                            <Upload className="w-8 h-8 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xl font-semibold text-gray-700 mb-2">
                              {selectedFile ? selectedFile.name : 'Upload Creative Asset'}
                            </p>
                            <p className="text-gray-500">
                              Drag & drop or click to browse • JPG, PNG, GIF, MP4, WebM • Max 50MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Asset Specifications */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-800">Width (pixels)</label>
                        <input
                          type="number"
                          value={formData.width}
                          onChange={(e) => setFormData({...formData, width: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50"
                          placeholder="300"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-800">Height (pixels)</label>
                        <input
                          type="number"
                          value={formData.height}
                          onChange={(e) => setFormData({...formData, height: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50"
                          placeholder="250"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-800">Asset Type</label>
                        <select
                          value={formData.mediaType}
                          onChange={(e) => setFormData({...formData, mediaType: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50"
                        >
                          <option value="image">Static Image</option>
                          <option value="video">Video Content</option>
                          <option value="gif">Animated GIF</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Targeting Configuration */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Targeting & Distribution</h2>
                      <p className="text-gray-600">Configure device targeting and platform integration</p>
                    </div>
                  </div>
                  
                  {/* Device Targeting */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Device Targeting</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {deviceOptions.map(device => {
                        const Icon = device.icon;
                        const isSelected = formData.targetDevices.includes(device.key);
                        return (
                          <button
                            key={device.key}
                            type="button"
                            onClick={() => handleDeviceChange(device.key)}
                            className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <Icon className={`w-8 h-8 mx-auto mb-3 ${
                              isSelected ? 'text-blue-600' : 'text-gray-400'
                            }`} />
                            <h4 className={`font-semibold mb-1 ${
                              isSelected ? 'text-blue-900' : 'text-gray-700'
                            }`}>
                              {device.label}
                            </h4>
                            <p className={`text-sm ${
                              isSelected ? 'text-blue-700' : 'text-gray-500'
                            }`}>
                              {device.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Platform Integration */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Platform Integration</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {platformOptions.map(platform => {
                        const Icon = platform.icon;
                        const isSelected = formData.targetPlatforms.includes(platform.key);
                        return (
                          <button
                            key={platform.key}
                            type="button"
                            onClick={() => handlePlatformChange(platform.key)}
                            className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${
                              isSelected ? 'text-blue-600' : 'text-gray-400'
                            }`} />
                            <h4 className={`font-medium text-sm mb-1 ${
                              isSelected ? 'text-blue-900' : 'text-gray-700'
                            }`}>
                              {platform.label}
                            </h4>
                            <p className={`text-xs ${
                              isSelected ? 'text-blue-700' : 'text-gray-500'
                            }`}>
                              {platform.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Launch Campaign */}
                <div className="pt-8 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg text-lg"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <Loader className="w-6 h-6 mr-3 animate-spin" />
                        Launching Campaign...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Rocket className="w-6 h-6 mr-3" />
                        Launch Campaign
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview & Analytics Panel */}
          <div className="xl:col-span-2 space-y-6">
            {/* Live Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 sticky top-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Live Preview</h3>
                  <p className="text-gray-600 text-sm">Real-time campaign visualization</p>
                </div>
              </div>
              
              {previewUrl ? (
                <div className="space-y-6">
                  <div className="border-2 border-gray-200 rounded-2xl p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                    {formData.mediaType === 'video' ? (
                      <video 
                        src={previewUrl} 
                        className="w-full h-48 rounded-xl object-cover shadow-sm"
                        controls
                      />
                    ) : (
                      <img 
                        src={previewUrl} 
                        alt="Campaign Preview"
                        className="w-full h-48 rounded-xl object-cover shadow-sm"
                      />
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Campaign Title</span>
                        <span className="font-semibold text-gray-900">{formData.title || 'Untitled Campaign'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Dimensions</span>
                        <span className="font-semibold text-gray-900">{formData.width || '0'} × {formData.height || '0'}px</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Asset Type</span>
                        <div className="flex items-center space-x-2">
                          {formData.mediaType === 'video' && <Video className="w-4 h-4 text-purple-600" />}
                          {formData.mediaType === 'image' && <Image className="w-4 h-4 text-blue-600" />}
                          {formData.mediaType === 'gif' && <Play className="w-4 h-4 text-green-600" />}
                          <span className="font-semibold text-gray-900 capitalize">{formData.mediaType}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Target Devices</span>
                        <span className="font-semibold text-gray-900">{formData.targetDevices.length} selected</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Platforms</span>
                        <span className="font-semibold text-gray-900">{formData.targetPlatforms.length} integrated</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="font-semibold text-gray-700 mb-2">No Asset Selected</h4>
                  <p className="text-gray-500 text-sm">Upload a creative asset to see the preview</p>
                </div>
              )}
            </div>

            {/* Campaign Insights */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Campaign Insights</h3>
                  <p className="text-gray-600 text-sm">Optimization recommendations</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Multi-Platform Ready</h4>
                  <p className="text-blue-800 text-sm">Your campaign will generate optimized code for all selected platforms automatically.</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Performance Tracking</h4>
                  <p className="text-green-800 text-sm">Built-in analytics will track impressions, clicks, and conversion metrics.</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Responsive Design</h4>
                  <p className="text-purple-800 text-sm">Automatically adapts to different screen sizes and device orientations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdPage;