import React, { useState } from 'react';
import { Copy, Check, Package, Terminal, AlertCircle, Info, CheckCircle, Download, ExternalLink, FileText } from 'lucide-react';

const FlutterPubDev = () => {
  const [copiedSection, setCopiedSection] = useState(null);

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-cyan-100 rounded-xl">
              <Package className="w-8 h-8 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pub.dev Dependency Setup</h1>
              <p className="text-gray-600 mt-1">Add YourPlatform Ads SDK to your Flutter project</p>
            </div>
          </div>
        </div>

        {/* SDK Info Card */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500 rounded-xl">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-cyan-900 mb-3">Package Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-3 border border-cyan-200">
                  <div className="text-xs text-cyan-600 font-medium mb-1">Latest Version</div>
                  <div className="text-lg font-bold text-cyan-900">2.1.0</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-cyan-200">
                  <div className="text-xs text-cyan-600 font-medium mb-1">Flutter SDK</div>
                  <div className="text-lg font-bold text-cyan-900">≥3.0.0</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-cyan-200">
                  <div className="text-xs text-cyan-600 font-medium mb-1">Dart SDK</div>
                  <div className="text-lg font-bold text-cyan-900">≥2.17.0</div>
                </div>
              </div>
              <a
                href="https://pub.dev/packages/yourplatform_ads"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                View on Pub.dev
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Step 1: Add Dependency */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                <span className="text-sm font-bold text-cyan-600">1</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Add to pubspec.yaml</h2>
                <p className="text-sm text-gray-600">Add the dependency to your project</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Open your <code className="px-2 py-0.5 bg-gray-100 rounded text-sm">pubspec.yaml</code> file and add the SDK under dependencies:
            </p>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                <code>{`dependencies:
  flutter:
    sdk: flutter
    
  # YourPlatform Ads SDK
  yourplatform_ads: ^2.1.0`}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(`dependencies:\n  flutter:\n    sdk: flutter\n    \n  # YourPlatform Ads SDK\n  yourplatform_ads: ^2.1.0`, 'pubspec')}
                className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  copiedSection === 'pubspec'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {copiedSection === 'pubspec' ? (
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

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 text-sm mb-1">Version Constraint</p>
                  <p className="text-sm text-blue-800">
                    Using <code className="px-1.5 py-0.5 bg-blue-100 rounded">^2.1.0</code> allows compatible updates automatically. 
                    For a specific version, use <code className="px-1.5 py-0.5 bg-blue-100 rounded">2.1.0</code> without the caret.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Install Dependencies */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                <span className="text-sm font-bold text-cyan-600">2</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Install Packages</h2>
                <p className="text-sm text-gray-600">Run flutter pub get to install</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Run this command in your terminal at the project root:
            </p>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                <code>{`flutter pub get`}</code>
              </pre>
              <button
                onClick={() => copyToClipboard('flutter pub get', 'pubget')}
                className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  copiedSection === 'pubget'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {copiedSection === 'pubget' ? (
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

            <div className="mt-4 space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-900 text-sm">Alternative Methods</span>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• <strong>VS Code:</strong> Save pubspec.yaml (auto-runs pub get)</p>
                  <p>• <strong>Android Studio:</strong> Click "Pub get" in the toolbar</p>
                  <p>• <strong>Command Palette:</strong> Flutter: Get Packages</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Import Package */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                <span className="text-sm font-bold text-cyan-600">3</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Import in Your Code</h2>
                <p className="text-sm text-gray-600">Add import statement to use the SDK</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Import the package in your Dart files where you want to use ads:
            </p>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                <code>{`import 'package:yourplatform_ads/yourplatform_ads.dart';`}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(`import 'package:yourplatform_ads/yourplatform_ads.dart';`, 'import')}
                className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  copiedSection === 'import'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {copiedSection === 'import' ? (
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

        {/* Platform-Specific Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                <span className="text-sm font-bold text-cyan-600">4</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Platform-Specific Setup</h2>
                <p className="text-sm text-gray-600">Configure Android and iOS settings</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {/* Android Configuration */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">🤖</span>
                  Android Configuration
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Update <code className="px-2 py-0.5 bg-gray-100 rounded text-sm">android/app/build.gradle</code>:
                    </p>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`android {
    compileSdkVersion 33
    
    defaultConfig {
        minSdkVersion 21  // Minimum required
        targetSdkVersion 33
    }
}`}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(`android {\n    compileSdkVersion 33\n    \n    defaultConfig {\n        minSdkVersion 21\n        targetSdkVersion 33\n    }\n}`, 'android-gradle')}
                        className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium transition-all ${
                          copiedSection === 'android-gradle'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                      >
                        {copiedSection === 'android-gradle' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Add to <code className="px-2 py-0.5 bg-gray-100 rounded text-sm">android/app/src/main/AndroidManifest.xml</code>:
                    </p>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`<manifest>
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    
    <application>
        <meta-data
            android:name="com.yourplatform.APP_ID"
            android:value="YOUR_APP_ID_HERE"/>
    </application>
</manifest>`}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(`<uses-permission android:name="android.permission.INTERNET"/>\n<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>\n\n<meta-data\n    android:name="com.yourplatform.APP_ID"\n    android:value="YOUR_APP_ID_HERE"/>`, 'android-manifest')}
                        className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium transition-all ${
                          copiedSection === 'android-manifest'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                      >
                        {copiedSection === 'android-manifest' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* iOS Configuration */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">📱</span>
                  iOS Configuration
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Update <code className="px-2 py-0.5 bg-gray-100 rounded text-sm">ios/Podfile</code>:
                    </p>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`platform :ios, '12.0'  # Minimum required`}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(`platform :ios, '12.0'`, 'ios-podfile')}
                        className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium transition-all ${
                          copiedSection === 'ios-podfile'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                      >
                        {copiedSection === 'ios-podfile' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Add to <code className="px-2 py-0.5 bg-gray-100 rounded text-sm">ios/Runner/Info.plist</code>:
                    </p>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                        <code>{`<key>YourPlatformAppId</key>
<string>YOUR_APP_ID_HERE</string>

<key>NSUserTrackingUsageDescription</key>
<string>This allows us to show personalized ads</string>`}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(`<key>YourPlatformAppId</key>\n<string>YOUR_APP_ID_HERE</string>\n\n<key>NSUserTrackingUsageDescription</key>\n<string>This allows us to show personalized ads</string>`, 'ios-plist')}
                        className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium transition-all ${
                          copiedSection === 'ios-plist'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                      >
                        {copiedSection === 'ios-plist' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-800">
                        <strong>iOS Only:</strong> Run <code className="px-1.5 py-0.5 bg-yellow-100 rounded">cd ios && pod install</code> after adding dependencies
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-gray-600" />
              Common Issues & Solutions
            </h2>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              <details className="group">
                <summary className="cursor-pointer p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Package not found error</span>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </div>
                </summary>
                <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200 text-sm">
                  <p className="mb-2 text-gray-700"><strong>Solutions:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Run <code className="px-1 py-0.5 bg-gray-100 rounded">flutter pub get</code></li>
                    <li>Check internet connection</li>
                    <li>Verify package name spelling in pubspec.yaml</li>
                    <li>Try <code className="px-1 py-0.5 bg-gray-100 rounded">flutter clean</code> then <code className="px-1 py-0.5 bg-gray-100 rounded">flutter pub get</code></li>
                  </ul>
                </div>
              </details>

              <details className="group">
                <summary className="cursor-pointer p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Version conflict errors</span>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </div>
                </summary>
                <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200 text-sm">
                  <p className="mb-2 text-gray-700"><strong>Solutions:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Update Flutter SDK: <code className="px-1 py-0.5 bg-gray-100 rounded">flutter upgrade</code></li>
                    <li>Check version constraints in pubspec.yaml</li>
                    <li>Run <code className="px-1 py-0.5 bg-gray-100 rounded">flutter pub upgrade</code></li>
                    <li>Check for conflicting dependencies</li>
                  </ul>
                </div>
              </details>

              <details className="group">
                <summary className="cursor-pointer p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">iOS build fails after installation</span>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </div>
                </summary>
                <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200 text-sm">
                  <p className="mb-2 text-gray-700"><strong>Solutions:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Run <code className="px-1 py-0.5 bg-gray-100 rounded">cd ios && pod install</code></li>
                    <li>Try <code className="px-1 py-0.5 bg-gray-100 rounded">pod repo update</code></li>
                    <li>Clean build: <code className="px-1 py-0.5 bg-gray-100 rounded">flutter clean</code></li>
                    <li>Check minimum iOS version in Podfile</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-500 rounded-full">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-900 mb-2">Dependency Setup Complete!</h3>
              <p className="text-green-800 mb-4">
                The SDK is now installed. Next, initialize it and implement ad widgets in your app.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/docs/flutter/setup-guide"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Back to Setup Guide
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="/docs/flutter/dart-examples"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-green-700 font-medium rounded-lg border-2 border-green-600 transition-colors"
                >
                  View Dart Examples
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlutterPubDev;
