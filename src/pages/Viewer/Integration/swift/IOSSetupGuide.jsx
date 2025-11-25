import React, { useState } from 'react';
import { CheckCircle, Copy, Download, Play, AlertCircle, BookOpen, Code, Terminal, Smartphone, Check, ChevronRight, ExternalLink, Clock, FileText, Settings, Package, Zap } from 'lucide-react';

const IOSSetupGuide = () => {
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
      description: 'Ensure you have iOS development environment ready',
      icon: BookOpen
    },
    {
      id: 2,
      title: 'Install via CocoaPods',
      description: 'Add SDK to your Podfile',
      icon: Package,
      link: '/docs/ios/cocoapods-setup'
    },
    {
      id: 3,
      title: 'Configure Info.plist',
      description: 'Add required configurations and permissions',
      icon: Settings
    },
    {
      id: 4,
      title: 'Initialize SDK',
      description: 'Set up the SDK in AppDelegate',
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
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">iOS SDK Quick Start</h1>
                <p className="text-gray-600 mt-1">Integrate ads into your iOS app in minutes</p>
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
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
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
                <p className="text-sm font-bold text-blue-900">v4.2.1</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg shadow">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-purple-700 font-medium">Min iOS</p>
                <p className="text-sm font-bold text-purple-900">12.0+</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500 rounded-lg shadow">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-indigo-700 font-medium">Setup Time</p>
                <p className="text-sm font-bold text-indigo-900">~5 minutes</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg shadow">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-green-700 font-medium">Languages</p>
                <p className="text-sm font-bold text-green-900">Swift / Obj-C</p>
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
                        { icon: '🍎', text: 'Xcode 13.0 or higher' },
                        { icon: '📱', text: 'iOS 12.0+ deployment target' },
                        { icon: '☕', text: 'CocoaPods 1.10.0+' },
                        { icon: '🔧', text: 'Swift 5.0+ / Objective-C' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-sm font-medium text-gray-700">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Verify CocoaPods installation: <code className="px-1.5 py-0.5 bg-blue-100 rounded">pod --version</code></span>
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

          {/* Step 2: Install via CocoaPods */}
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
                      <h3 className="text-xl font-semibold text-gray-900">Install via CocoaPods</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Add the SDK to your Podfile and install</p>
                    
                    <div className="relative mb-3">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`# Podfile
platform :ios, '12.0'

target 'YourApp' do
  use_frameworks!
  
  # YourPlatform Ads SDK
  pod 'YourPlatformAds', '~> 4.2'
end`}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(`pod 'YourPlatformAds', '~> 4.2'`, 'podfile')}
                        className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          copiedStep === 'podfile'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                      >
                        {copiedStep === 'podfile' ? (
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

                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`# Run in terminal
cd /path/to/your/project
pod install`}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard('pod install', 'pod-install')}
                        className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          copiedStep === 'pod-install'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                      >
                        {copiedStep === 'pod-install' ? (
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

                    <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-purple-900 mb-1">Detailed CocoaPods Setup</h4>
                          <p className="text-sm text-purple-800 mb-3">
                            Complete guide with troubleshooting and SPM alternative
                          </p>
                          <a
                            href="/docs/ios/cocoapods-setup"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            View Installation Guide
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

          {/* Step 3: Configure Info.plist */}
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
                      <h3 className="text-xl font-semibold text-gray-900">Configure Info.plist</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Add required keys and App ID</p>
                    
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`<!-- Add to Info.plist -->
<key>YourPlatformAppId</key>
<string>YOUR_APP_ID_HERE</string>

<!-- Required for iOS 14+ ATT -->
<key>NSUserTrackingUsageDescription</key>
<string>This allows us to show personalized ads</string>

<!-- Optional: SKAdNetwork IDs -->
<key>SKAdNetworkItems</key>
<array>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>cstr6suwn9.skadnetwork</string>
    </dict>
</array>`}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(`<key>YourPlatformAppId</key>\n<string>YOUR_APP_ID_HERE</string>\n\n<key>NSUserTrackingUsageDescription</key>\n<string>This allows us to show personalized ads</string>`, 'infoplist')}
                        className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          copiedStep === 'infoplist'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                      >
                        {copiedStep === 'infoplist' ? (
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
                    <p className="text-gray-600 text-sm mb-4">Set up the SDK in your AppDelegate</p>
                    
                    <div className="space-y-3">
                      {/* Swift Code */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">Swift</span>
                            AppDelegate.swift
                          </label>
                        </div>
                        <div className="relative">
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                            <code>{`import UIKit
import YourPlatformAds

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication,
                    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // Initialize YourPlatform Ads SDK
        YourPlatformAds.initialize(withAppId: "YOUR_APP_ID")
        
        // Optional: Enable test mode
        #if DEBUG
        YourPlatformAds.shared.testMode = true
        #endif
        
        return true
    }
}`}</code>
                          </pre>
                          <button
                            onClick={() => copyToClipboard(`import YourPlatformAds\n\nYourPlatformAds.initialize(withAppId: "YOUR_APP_ID")\n\n#if DEBUG\nYourPlatformAds.shared.testMode = true\n#endif`, 'init-swift')}
                            className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              copiedStep === 'init-swift'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            }`}
                          >
                            {copiedStep === 'init-swift' ? (
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

                      {/* Objective-C Code */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Objective-C</span>
                            AppDelegate.m
                          </label>
                        </div>
                        <div className="relative">
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                            <code>{`#import "AppDelegate.h"
#import <YourPlatformAds/YourPlatformAds.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application 
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    // Initialize YourPlatform Ads SDK
    [YourPlatformAds initializeWithAppId:@"YOUR_APP_ID"];
    
    // Optional: Enable test mode
    #ifdef DEBUG
    [YourPlatformAds sharedInstance].testMode = YES;
    #endif
    
    return YES;
}

@end`}</code>
                          </pre>
                          <button
                            onClick={() => copyToClipboard(`#import <YourPlatformAds/YourPlatformAds.h>\n\n[YourPlatformAds initializeWithAppId:@"YOUR_APP_ID"];\n\n#ifdef DEBUG\n[YourPlatformAds sharedInstance].testMode = YES;\n#endif`, 'init-objc')}
                            className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              copiedStep === 'init-objc'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            }`}
                          >
                            {copiedStep === 'init-objc' ? (
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
                        { icon: '▶️', title: 'Run your app', desc: 'Build and run on simulator or device' },
                        { icon: '📋', title: 'Check console', desc: 'Look for "YourPlatformAds initialized successfully"' },
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
                            Once verified, implement ad views in your view controllers
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <a
                              href="/docs/ios/implementation-examples"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                              View Implementation Examples
                              <ChevronRight className="w-4 h-4" />
                            </a>
                            <a
                              href="/docs/ios/delegate-methods"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-green-700 text-sm font-medium rounded-lg border-2 border-green-600 transition-colors"
                            >
                              Delegate Methods
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
                  Excellent! Your iOS SDK is configured. Now implement ad views to start monetizing.
                </p>
              </div>
              <a
                href="/docs/ios/implementation-examples"
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
            href="/docs/ios/cocoapods-setup"
            className="p-4 bg-white border-2 border-gray-200 hover:border-purple-300 rounded-xl hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900">CocoaPods Setup</h4>
            </div>
            <p className="text-sm text-gray-600">Detailed installation guide</p>
          </a>

          <a
            href="/docs/ios/implementation-examples"
            className="p-4 bg-white border-2 border-gray-200 hover:border-blue-300 rounded-xl hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Code className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900">Implementation Examples</h4>
            </div>
            <p className="text-sm text-gray-600">Banner, Interstitial, Rewarded ads</p>
          </a>

          <a
            href="/docs/ios/advanced"
            className="p-4 bg-white border-2 border-gray-200 hover:border-indigo-300 rounded-xl hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900">Advanced Config</h4>
            </div>
            <p className="text-sm text-gray-600">Customization and optimization</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default IOSSetupGuide;
