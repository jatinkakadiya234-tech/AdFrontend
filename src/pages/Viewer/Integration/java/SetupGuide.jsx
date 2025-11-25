import React, { useState } from 'react';
import { CheckCircle, Copy, Download, Play, AlertCircle, BookOpen, Code, Terminal, Smartphone, Check, ChevronRight, ExternalLink, Clock, FileText, Settings, Package, Zap } from 'lucide-react';

const SetupGuide = () => {
  const [copiedStep, setCopiedStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);

  const copyToClipboard = (text, step) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const toggleStep = (step) => {
    setCompletedSteps(prev =>
      prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]
    );
  };

  const steps = [
    {
      id: 1,
      title: 'Prerequisites',
      description: 'Ensure you have the required development environment',
      icon: BookOpen
    },
    {
      id: 2,
      title: 'Add Gradle Dependencies',
      description: 'Configure your project dependencies',
      icon: Package,
      link: '/docs/gradle-dependency'
    },
    {
      id: 3,
      title: 'Update AndroidManifest.xml',
      description: 'Add required permissions and configurations',
      icon: FileText,
      link: '/docs/android-manifest'
    },
    {
      id: 4,
      title: 'Initialize SDK',
      description: 'Set up the SDK in your Application class',
      icon: Play
    },
    {
      id: 5,
      title: 'Test Integration',
      description: 'Verify your setup is working correctly',
      icon: Smartphone
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Quick Start Guide</h1>
                <p className="text-gray-600 mt-1">Get your Android SDK up and running in minutes</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Estimated time</div>
              <div className="flex items-center gap-1 text-gray-700 font-medium">
                <Clock className="w-4 h-4" />
                <span>5-10 minutes</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">Setup Progress</span>
              <span className="text-sm font-semibold text-blue-600">
                {completedSteps.length} / {steps.length} steps completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
              />
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              {completedSteps.length === steps.length ? 'Setup complete! 🎉' : 'Continue setup below...'}
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg shadow">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-700 font-medium">SDK Version</p>
                <p className="text-sm font-bold text-blue-900">v3.2.1</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg shadow">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-green-700 font-medium">Min SDK</p>
                <p className="text-sm font-bold text-green-900">API 21 (5.0)</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg shadow">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-purple-700 font-medium">Setup Time</p>
                <p className="text-sm font-bold text-purple-900">~5 minutes</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg shadow">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-orange-700 font-medium">Difficulty</p>
                <p className="text-sm font-bold text-orange-900">Beginner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Steps */}
        <div className="space-y-5">
          {/* Step 1: Prerequisites */}
          <div className={`bg-white rounded-xl border-2 ${completedSteps.includes(1) ? 'border-green-500 shadow-green-100' : 'border-gray-200'} overflow-hidden shadow-sm hover:shadow-md transition-all`}>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${completedSteps.includes(1) ? 'bg-green-100' : 'bg-gray-100'} transition-colors`}>
                    <BookOpen className={`w-6 h-6 ${completedSteps.includes(1) ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                        STEP 1
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">Prerequisites</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Ensure you have the required development environment</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { icon: '💻', text: 'Android Studio 4.0+' },
                        { icon: '📱', text: 'Android SDK API 21+' },
                        { icon: '⚙️', text: 'Gradle 7.0+' },
                        { icon: '☕', text: 'Java 8+ / Kotlin 1.5+' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-sm font-medium text-gray-700">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleStep(1)}
                  className={`ml-4 px-4 py-2 rounded-lg font-medium transition-all ${
                    completedSteps.includes(1)
                      ? 'bg-green-100 text-green-700 border-2 border-green-500 shadow-sm'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {completedSteps.includes(1) ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Done
                    </span>
                  ) : (
                    'Mark Complete'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Gradle Dependencies */}
          <div className={`bg-white rounded-xl border-2 ${completedSteps.includes(2) ? 'border-green-500' : 'border-gray-200'} overflow-hidden shadow-sm hover:shadow-md transition-all`}>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${completedSteps.includes(2) ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Package className={`w-6 h-6 ${completedSteps.includes(2) ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                        STEP 2
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">Add Gradle Dependencies</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Configure your project dependencies in build.gradle files</p>
                    
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-purple-900 mb-1">Detailed Gradle Setup</h4>
                          <p className="text-sm text-purple-800 mb-3">
                            Complete guide with project-level and app-level configurations, including ProGuard rules
                          </p>
                          <a
                            href="/docs/gradle-dependency"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            View Gradle Guide
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleStep(2)}
                  className={`ml-4 px-4 py-2 rounded-lg font-medium transition-all ${
                    completedSteps.includes(2)
                      ? 'bg-green-100 text-green-700 border-2 border-green-500'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {completedSteps.includes(2) ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Done
                    </span>
                  ) : (
                    'Mark Complete'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: AndroidManifest */}
          <div className={`bg-white rounded-xl border-2 ${completedSteps.includes(3) ? 'border-green-500' : 'border-gray-200'} overflow-hidden shadow-sm hover:shadow-md transition-all`}>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${completedSteps.includes(3) ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <FileText className={`w-6 h-6 ${completedSteps.includes(3) ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                        STEP 3
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">Update AndroidManifest.xml</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Add required permissions and App ID metadata</p>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <Terminal className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-900 mb-1">Manifest Configuration</h4>
                          <p className="text-sm text-green-800 mb-3">
                            Complete guide for permissions, App ID, and optional configurations
                          </p>
                          <a
                            href="/docs/android-manifest"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            View Manifest Guide
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleStep(3)}
                  className={`ml-4 px-4 py-2 rounded-lg font-medium transition-all ${
                    completedSteps.includes(3)
                      ? 'bg-green-100 text-green-700 border-2 border-green-500'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {completedSteps.includes(3) ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Done
                    </span>
                  ) : (
                    'Mark Complete'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Step 4: Initialize SDK */}
          <div className={`bg-white rounded-xl border-2 ${completedSteps.includes(4) ? 'border-green-500' : 'border-gray-200'} overflow-hidden shadow-sm hover:shadow-md transition-all`}>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${completedSteps.includes(4) ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Play className={`w-6 h-6 ${completedSteps.includes(4) ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                        STEP 4
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">Initialize SDK</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Set up the SDK in your Application class</p>
                    
                    <div className="space-y-3">
                      {/* Java Code */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">Java</span>
                            MyApplication.java
                          </label>
                        </div>
                        <div className="relative">
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                            <code>{`public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        
        // Initialize YourPlatform SDK
        YourPlatformAds.initialize(this, "YOUR_APP_ID");
        
        // Optional: Enable test mode
        YourPlatformAds.setTestMode(BuildConfig.DEBUG);
    }
}`}</code>
                          </pre>
                          <button
                            onClick={() => copyToClipboard(`public class MyApplication extends Application {\n    @Override\n    public void onCreate() {\n        super.onCreate();\n        \n        // Initialize YourPlatform SDK\n        YourPlatformAds.initialize(this, "YOUR_APP_ID");\n        \n        // Optional: Enable test mode\n        YourPlatformAds.setTestMode(BuildConfig.DEBUG);\n    }\n}`, 'init-java')}
                            className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              copiedStep === 'init-java'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            }`}
                          >
                            {copiedStep === 'init-java' ? (
                              <span className="flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Copied
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Copy className="w-3 h-3" />
                                Copy
                              </span>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Kotlin Code */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">Kotlin</span>
                            MyApplication.kt
                          </label>
                        </div>
                        <div className="relative">
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                            <code>{`class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        // Initialize YourPlatform SDK
        YourPlatformAds.initialize(this, "YOUR_APP_ID")
        
        // Optional: Enable test mode
        YourPlatformAds.setTestMode(BuildConfig.DEBUG)
    }
}`}</code>
                          </pre>
                          <button
                            onClick={() => copyToClipboard(`class MyApplication : Application() {\n    override fun onCreate() {\n        super.onCreate()\n        \n        // Initialize YourPlatform SDK\n        YourPlatformAds.initialize(this, "YOUR_APP_ID")\n        \n        // Optional: Enable test mode\n        YourPlatformAds.setTestMode(BuildConfig.DEBUG)\n    }\n}`, 'init-kotlin')}
                            className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              copiedStep === 'init-kotlin'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            }`}
                          >
                            {copiedStep === 'init-kotlin' ? (
                              <span className="flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Copied
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Copy className="w-3 h-3" />
                                Copy
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-800">
                          <strong>Don't forget:</strong> Register your Application class in AndroidManifest.xml using the{' '}
                          <code className="px-1.5 py-0.5 bg-yellow-100 rounded">android:name</code> attribute.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleStep(4)}
                  className={`ml-4 px-4 py-2 rounded-lg font-medium transition-all ${
                    completedSteps.includes(4)
                      ? 'bg-green-100 text-green-700 border-2 border-green-500'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {completedSteps.includes(4) ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Done
                    </span>
                  ) : (
                    'Mark Complete'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Step 5: Test Integration */}
          <div className={`bg-white rounded-xl border-2 ${completedSteps.includes(5) ? 'border-green-500' : 'border-gray-200'} overflow-hidden shadow-sm hover:shadow-md transition-all`}>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${completedSteps.includes(5) ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Smartphone className={`w-6 h-6 ${completedSteps.includes(5) ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                        STEP 5
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">Test Integration</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Verify your setup is working correctly</p>
                    
                    <div className="space-y-3">
                      {[
                        { icon: '▶️', title: 'Run your app', desc: 'Build and run on device or emulator' },
                        { icon: '📋', title: 'Check Logcat', desc: 'Look for "YourPlatformAds initialized successfully"' },
                        { icon: '✅', title: 'Verify Dashboard', desc: 'Your app appears within 2-3 minutes' }
                      ].map((step, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">{step.icon}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{step.title}</p>
                            <p className="text-xs text-gray-600">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                      <div className="flex gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-900 text-sm mb-1">Ready for Next Steps!</p>
                          <p className="text-sm text-green-800 mb-3">
                            Once verified, proceed to implement ad units (Banner, Interstitial, Rewarded)
                          </p>
                          <a
                            href="/docs/advanced"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            View Implementation Guide
                            <ChevronRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleStep(5)}
                  className={`ml-4 px-4 py-2 rounded-lg font-medium transition-all ${
                    completedSteps.includes(5)
                      ? 'bg-green-100 text-green-700 border-2 border-green-500'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {completedSteps.includes(5) ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Done
                    </span>
                  ) : (
                    'Mark Complete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Banner */}
        {completedSteps.length === steps.length && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 via-green-100 to-emerald-50 border-2 border-green-300 rounded-xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-green-900 mb-1">
                  🎉 Setup Complete!
                </h3>
                <p className="text-green-800">
                  Excellent work! Your Android SDK is configured and ready. Now implement ad units to start monetizing.
                </p>
              </div>
              <a
                href="/docs/advanced"
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                Start Implementing Ads
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/docs/gradle-dependency"
            className="p-4 bg-white border-2 border-gray-200 hover:border-purple-300 rounded-xl hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900">Gradle Setup</h4>
            </div>
            <p className="text-sm text-gray-600">Detailed dependency configuration</p>
          </a>

          <a
            href="/docs/android-manifest"
            className="p-4 bg-white border-2 border-gray-200 hover:border-green-300 rounded-xl hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900">Manifest Config</h4>
            </div>
            <p className="text-sm text-gray-600">Permissions and metadata setup</p>
          </a>

          <a
            href="/docs/advanced"
            className="p-4 bg-white border-2 border-gray-200 hover:border-blue-300 rounded-xl hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Code className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900">Ad Implementation</h4>
            </div>
            <p className="text-sm text-gray-600">Banner, Interstitial, Rewarded ads</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SetupGuide;
