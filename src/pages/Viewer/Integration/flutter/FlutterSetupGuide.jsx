import React, { useState } from 'react';
import { CheckCircle, Copy, Download, Play, AlertCircle, BookOpen, Code, Terminal, Smartphone, Check, ChevronRight, ExternalLink, Clock, FileText, Settings, Package, Zap } from 'lucide-react';

const FlutterSetupGuide = () => {
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
      description: 'Ensure you have Flutter development environment ready',
      icon: BookOpen
    },
    {
      id: 2,
      title: 'Add Pub.dev Dependency',
      description: 'Add SDK package to pubspec.yaml',
      icon: Package,
      link: '/docs/flutter/pubdev-setup'
    },
    {
      id: 3,
      title: 'Platform Configuration',
      description: 'Configure Android and iOS platforms',
      icon: Settings
    },
    {
      id: 4,
      title: 'Initialize SDK',
      description: 'Set up the SDK in your Flutter app',
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
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Flutter SDK Quick Start</h1>
                <p className="text-gray-600 mt-1">Get your Flutter app monetized in minutes</p>
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
              <span className="text-sm font-semibold text-cyan-600">
                {completedSteps.length} / {steps.length} steps completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
              />
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
              {completedSteps.length === steps.length ? 'Setup complete! 🎉' : 'Continue setup below...'}
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500 rounded-lg shadow">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-cyan-700 font-medium">SDK Version</p>
                <p className="text-sm font-bold text-cyan-900">v2.1.0</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg shadow">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-700 font-medium">Flutter Version</p>
                <p className="text-sm font-bold text-blue-900">3.0+</p>
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

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg shadow">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-green-700 font-medium">Difficulty</p>
                <p className="text-sm font-bold text-green-900">Easy</p>
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
                        { icon: '🦋', text: 'Flutter 3.0 or higher' },
                        { icon: '🎯', text: 'Dart 2.17 or higher' },
                        { icon: '🤖', text: 'Android Studio / VS Code' },
                        { icon: '📱', text: 'iOS/Android device or emulator' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-sm font-medium text-gray-700">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
                      <p className="text-sm text-cyan-800 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Run <code className="px-1.5 py-0.5 bg-cyan-100 rounded">flutter doctor</code> to verify your setup</span>
                      </p>
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

          {/* Step 2: Add Dependency */}
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
                      <h3 className="text-xl font-semibold text-gray-900">Add Pub.dev Dependency</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Add the SDK package to your pubspec.yaml file</p>
                    
                    <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-cyan-500 rounded-lg">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-cyan-900 mb-1">Detailed Pub.dev Setup</h4>
                          <p className="text-sm text-cyan-800 mb-3">
                            Complete guide for adding dependency, configuration, and troubleshooting
                          </p>
                          <a
                            href="/docs/flutter/pubdev-setup"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            View Pub.dev Guide
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

          {/* Step 3: Platform Configuration */}
          <div className={`bg-white rounded-xl border-2 ${completedSteps.includes(3) ? 'border-green-500' : 'border-gray-200'} overflow-hidden shadow-sm hover:shadow-md transition-all`}>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${completedSteps.includes(3) ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Settings className={`w-6 h-6 ${completedSteps.includes(3) ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                        STEP 3
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">Platform Configuration</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Configure Android and iOS native settings</p>
                    
                    <div className="space-y-3">
                      {/* Android Config */}
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">🤖</span>
                          <h4 className="font-semibold text-green-900">Android Configuration</h4>
                        </div>
                        <div className="text-sm text-green-800 space-y-1">
                          <p>• Add App ID to <code className="px-1 py-0.5 bg-green-100 rounded">AndroidManifest.xml</code></p>
                          <p>• Min SDK version: 21 (Android 5.0)</p>
                          <p>• Add required permissions</p>
                        </div>
                      </div>

                      {/* iOS Config */}
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">📱</span>
                          <h4 className="font-semibold text-blue-900">iOS Configuration</h4>
                        </div>
                        <div className="text-sm text-blue-800 space-y-1">
                          <p>• Add App ID to <code className="px-1 py-0.5 bg-blue-100 rounded">Info.plist</code></p>
                          <p>• Min iOS version: 12.0</p>
                          <p>• Update Podfile if needed</p>
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
                    <p className="text-gray-600 text-sm mb-4">Set up the SDK in your Flutter app</p>
                    
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`import 'package:yourplatform_ads/yourplatform_ads.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize YourPlatform Ads SDK
  await YourPlatformAds.initialize(
    appId: 'YOUR_APP_ID_HERE',
    testMode: true, // Set to false in production
  );
  
  runApp(MyApp());
}`}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(`import 'package:yourplatform_ads/yourplatform_ads.dart';\n\nvoid main() async {\n  WidgetsFlutterBinding.ensureInitialized();\n  \n  await YourPlatformAds.initialize(\n    appId: 'YOUR_APP_ID_HERE',\n    testMode: true,\n  );\n  \n  runApp(MyApp());\n}`, 'init')}
                        className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          copiedStep === 'init'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                      >
                        {copiedStep === 'init' ? (
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

                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-800">
                          <strong>Important:</strong> Replace <code className="px-1.5 py-0.5 bg-yellow-100 rounded">YOUR_APP_ID_HERE</code> with your actual App ID from the dashboard
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
                        { icon: '▶️', title: 'Run your app', desc: 'flutter run on device or emulator' },
                        { icon: '📋', title: 'Check console', desc: 'Look for "YourPlatformAds initialized successfully"' },
                        { icon: '✅', title: 'Verify Dashboard', desc: 'Your app appears within 2-3 minutes' }
                      ].map((step, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
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
                            Once verified, implement ad widgets in your Flutter app
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <a
                              href="/docs/flutter/dart-examples"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                              View Dart Examples
                              <ChevronRight className="w-4 h-4" />
                            </a>
                            <a
                              href="/docs/flutter/advanced"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-green-700 text-sm font-medium rounded-lg border-2 border-green-600 transition-colors"
                            >
                              Advanced Config
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
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
                  Excellent! Your Flutter SDK is configured. Now add ad widgets to start monetizing.
                </p>
              </div>
              <a
                href="/docs/flutter/dart-examples"
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                View Ad Widgets
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/docs/flutter/pubdev-setup"
            className="p-4 bg-white border-2 border-gray-200 hover:border-cyan-300 rounded-xl hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-cyan-600 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900">Pub.dev Setup</h4>
            </div>
            <p className="text-sm text-gray-600">Detailed dependency configuration</p>
          </a>

          <a
            href="/docs/flutter/dart-examples"
            className="p-4 bg-white border-2 border-gray-200 hover:border-blue-300 rounded-xl hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Code className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900">Dart Examples</h4>
            </div>
            <p className="text-sm text-gray-600">Ad widget implementation examples</p>
          </a>

          <a
            href="/docs/flutter/advanced"
            className="p-4 bg-white border-2 border-gray-200 hover:border-purple-300 rounded-xl hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900">Advanced Config</h4>
            </div>
            <p className="text-sm text-gray-600">Customization and optimization</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FlutterSetupGuide;
