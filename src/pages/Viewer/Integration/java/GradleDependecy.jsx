import React, { useState } from 'react';
import { Copy, Check, AlertTriangle, Info, Package, FileText, Terminal, ExternalLink, CheckCircle, XCircle } from 'lucide-react';

const GradleDependency = () => {
  const [copiedSection, setCopiedSection] = useState(null);
  const [selectedBuildTool, setSelectedBuildTool] = useState('gradle');

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
            <div className="p-3 bg-purple-100 rounded-xl">
              <Package className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gradle Dependency Setup</h1>
              <p className="text-gray-600 mt-1">Configure your Android project to include our SDK</p>
            </div>
          </div>
        </div>

        {/* Build Tool Selector */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-3">Build Tool</label>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedBuildTool('gradle')}
              className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                selectedBuildTool === 'gradle'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Terminal className="w-5 h-5" />
                Gradle (Groovy)
              </div>
            </button>
            <button
              onClick={() => setSelectedBuildTool('kotlin-dsl')}
              className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                selectedBuildTool === 'kotlin-dsl'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Gradle (Kotlin DSL)
              </div>
            </button>
          </div>
        </div>

        {/* Version Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex gap-4">
            <div className="p-2 bg-blue-100 rounded-lg h-fit">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">Latest SDK Version</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-xs text-blue-600 font-medium mb-1">Current Version</div>
                  <div className="text-lg font-bold text-blue-900">3.2.1</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-xs text-blue-600 font-medium mb-1">Release Date</div>
                  <div className="text-lg font-bold text-blue-900">Nov 2025</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-xs text-blue-600 font-medium mb-1">Min SDK</div>
                  <div className="text-lg font-bold text-blue-900">API 21</div>
                </div>
              </div>
              <a href="#" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium mt-3">
                View Changelog
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Step 1: Project-level Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-sm font-bold text-purple-600">1</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Project-level Configuration</h2>
                <p className="text-sm text-gray-600">
                  {selectedBuildTool === 'gradle' ? 'build.gradle (Project)' : 'build.gradle.kts (Project)'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Add our Maven repository to your project-level build file to allow Gradle to find the SDK.
            </p>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                {selectedBuildTool === 'gradle' ? (
                  <code>{`// Top-level build file
buildscript {
    repositories {
        google()
        mavenCentral()
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        
        // Add YourPlatform Maven repository
        maven { 
            url 'https://sdk.yourplatform.com/android'
        }
    }
}`}</code>
                ) : (
                  <code>{`// Top-level build file
buildscript {
    repositories {
        google()
        mavenCentral()
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        
        // Add YourPlatform Maven repository
        maven {
            url = uri("https://sdk.yourplatform.com/android")
        }
    }
}`}</code>
                )}
              </pre>
              <button
                onClick={() => copyToClipboard(
                  selectedBuildTool === 'gradle'
                    ? `buildscript {\n    repositories {\n        google()\n        mavenCentral()\n    }\n}\n\nallprojects {\n    repositories {\n        google()\n        mavenCentral()\n        \n        maven { \n            url 'https://sdk.yourplatform.com/android'\n        }\n    }\n}`
                    : `buildscript {\n    repositories {\n        google()\n        mavenCentral()\n    }\n}\n\nallprojects {\n    repositories {\n        google()\n        mavenCentral()\n        \n        maven {\n            url = uri("https://sdk.yourplatform.com/android")\n        }\n    }\n}`,
                  'project'
                )}
                className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  copiedSection === 'project'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {copiedSection === 'project' ? (
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

            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900 text-sm mb-1">Note for Newer Gradle Versions</p>
                  <p className="text-sm text-yellow-800">
                    If you're using Gradle 7.0+, the <code className="px-1.5 py-0.5 bg-yellow-100 rounded">allprojects</code> block 
                    might be in your <code className="px-1.5 py-0.5 bg-yellow-100 rounded">settings.gradle</code> file instead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: App-level Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-sm font-bold text-purple-600">2</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">App-level Dependencies</h2>
                <p className="text-sm text-gray-600">
                  {selectedBuildTool === 'gradle' ? 'build.gradle (Module: app)' : 'build.gradle.kts (Module: app)'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Add the SDK and its required dependencies to your app module's build file.
            </p>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                {selectedBuildTool === 'gradle' ? (
                  <code>{`dependencies {
    // YourPlatform Ads SDK
    implementation 'com.yourplatform:ad-sdk:3.2.1'
    
    // Required: Google Play Services Ads Identifier
    implementation 'com.google.android.gms:play-services-ads-identifier:18.0.1'
    
    // Required: AndroidX AppCompat
    implementation 'androidx.appcompat:appcompat:1.6.1'
    
    // Optional: For enhanced features
    implementation 'androidx.lifecycle:lifecycle-process:2.6.2'
    implementation 'androidx.work:work-runtime:2.8.1'
}`}</code>
                ) : (
                  <code>{`dependencies {
    // YourPlatform Ads SDK
    implementation("com.yourplatform:ad-sdk:3.2.1")
    
    // Required: Google Play Services Ads Identifier
    implementation("com.google.android.gms:play-services-ads-identifier:18.0.1")
    
    // Required: AndroidX AppCompat
    implementation("androidx.appcompat:appcompat:1.6.1")
    
    // Optional: For enhanced features
    implementation("androidx.lifecycle:lifecycle-process:2.6.2")
    implementation("androidx.work:work-runtime:2.8.1")
}`}</code>
                )}
              </pre>
              <button
                onClick={() => copyToClipboard(
                  selectedBuildTool === 'gradle'
                    ? `dependencies {\n    implementation 'com.yourplatform:ad-sdk:3.2.1'\n    implementation 'com.google.android.gms:play-services-ads-identifier:18.0.1'\n    implementation 'androidx.appcompat:appcompat:1.6.1'\n    implementation 'androidx.lifecycle:lifecycle-process:2.6.2'\n    implementation 'androidx.work:work-runtime:2.8.1'\n}`
                    : `dependencies {\n    implementation("com.yourplatform:ad-sdk:3.2.1")\n    implementation("com.google.android.gms:play-services-ads-identifier:18.0.1")\n    implementation("androidx.appcompat:appcompat:1.6.1")\n    implementation("androidx.lifecycle:lifecycle-process:2.6.2")\n    implementation("androidx.work:work-runtime:2.8.1")\n}`,
                  'app'
                )}
                className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  copiedSection === 'app'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {copiedSection === 'app' ? (
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

            {/* Dependency Explanation */}
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">What each dependency does:</h3>
              
              <div className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">ad-sdk</p>
                  <p className="text-xs text-gray-600">Core SDK for displaying ads and tracking performance</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">play-services-ads-identifier</p>
                  <p className="text-xs text-gray-600">Required for advertising ID to enable personalized ads</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">androidx.appcompat</p>
                  <p className="text-xs text-gray-600">Provides backward-compatible support for UI components</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">lifecycle-process & work-runtime</p>
                  <p className="text-xs text-gray-600">Optional: Enables background ad caching and improved performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ProGuard Rules */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-sm font-bold text-purple-600">3</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">ProGuard Rules (Optional)</h2>
                <p className="text-sm text-gray-600">proguard-rules.pro</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              If you're using ProGuard or R8 for code obfuscation, add these rules to prevent issues.
            </p>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                <code>{`# YourPlatform Ads SDK
-keep class com.yourplatform.ads.** { *; }
-keepclassmembers class com.yourplatform.ads.** { *; }

# Google Play Services
-keep class com.google.android.gms.ads.identifier.** { *; }

# Prevent obfuscation of ad response models
-keepattributes Signature
-keepattributes *Annotation*`}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(
                  `-keep class com.yourplatform.ads.** { *; }\n-keepclassmembers class com.yourplatform.ads.** { *; }\n\n-keep class com.google.android.gms.ads.identifier.** { *; }\n\n-keepattributes Signature\n-keepattributes *Annotation*`,
                  'proguard'
                )}
                className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  copiedSection === 'proguard'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {copiedSection === 'proguard' ? (
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

        {/* Sync Project */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
          <div className="flex gap-4">
            <div className="p-3 bg-green-500 rounded-full h-fit">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-900 mb-2">Sync Your Project</h3>
              <p className="text-green-800 mb-4">
                After adding all dependencies, click <strong>"Sync Now"</strong> in Android Studio to download 
                the SDK and its dependencies. This may take a few minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                  <Terminal className="w-4 h-4" />
                  Sync Now
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-green-700 font-medium rounded-lg border-2 border-green-600 transition-colors">
                  Next: Configure Manifest
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-gray-600" />
            Common Issues
          </h3>
          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Dependency resolution failed</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </div>
              </summary>
              <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200 text-sm text-gray-700">
                <p className="mb-2"><strong>Solution:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Verify the Maven repository URL is correct</li>
                  <li>Check your internet connection</li>
                  <li>Try invalidating cache: File → Invalidate Caches / Restart</li>
                </ul>
              </div>
            </details>

            <details className="group">
              <summary className="cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Duplicate class errors</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </div>
              </summary>
              <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200 text-sm text-gray-700">
                <p className="mb-2"><strong>Solution:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Check for conflicting library versions</li>
                  <li>Use the same version of AndroidX libraries across your project</li>
                  <li>Add <code className="px-1 py-0.5 bg-gray-100 rounded">exclude</code> statements if needed</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradleDependency;
