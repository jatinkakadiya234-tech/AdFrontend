import React, { useState } from 'react';
import { Copy, Check, AlertCircle, Shield, Wifi, Globe, MapPin, Camera, FileText, Info } from 'lucide-react';

const AndroidManifest = () => {
  const [copiedSection, setCopiedSection] = useState(null);

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const permissions = [
    {
      name: 'INTERNET',
      required: true,
      icon: Wifi,
      description: 'Required to fetch ads from the server',
      code: '<uses-permission android:name="android.permission.INTERNET" />'
    },
    {
      name: 'ACCESS_NETWORK_STATE',
      required: true,
      icon: Globe,
      description: 'Check network connectivity before loading ads',
      code: '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />'
    },
    {
      name: 'AD_ID',
      required: false,
      icon: Shield,
      description: 'Access advertising ID for personalized ads (recommended)',
      code: '<uses-permission android:name="com.google.android.gms.permission.AD_ID" />'
    },
    {
      name: 'ACCESS_COARSE_LOCATION',
      required: false,
      icon: MapPin,
      description: 'Improve ad targeting based on location',
      code: '<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AndroidManifest.xml Configuration</h1>
              <p className="text-gray-600 mt-1">Add required permissions and metadata to your manifest file</p>
            </div>
          </div>
        </div>

        {/* Complete Manifest Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Complete Manifest Configuration</h2>
            <p className="text-sm text-gray-600 mt-1">Copy this entire block into your AndroidManifest.xml</p>
          </div>

          <div className="p-6">
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700 max-h-96">
                <code>{`<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.yourcompany.yourapp">

    <!-- Required Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <!-- Optional: For personalized ads -->
    <uses-permission android:name="com.google.android.gms.permission.AD_ID" />
    
    <!-- Optional: For location-based ad targeting -->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <application
        android:name=".MyApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.YourApp"
        tools:targetApi="31">

        <!-- YourPlatform App ID -->
        <meta-data
            android:name="com.yourplatform.APP_ID"
            android:value="YOUR_APP_ID_HERE" />

        <!-- Optional: Test mode (remove in production) -->
        <meta-data
            android:name="com.yourplatform.TEST_MODE"
            android:value="true" />
        
        <!-- Your Activities -->
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>`}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(
                  `<?xml version="1.0" encoding="utf-8"?>\n<manifest xmlns:android="http://schemas.android.com/apk/res/android"\n    xmlns:tools="http://schemas.android.com/tools"\n    package="com.yourcompany.yourapp">\n\n    <uses-permission android:name="android.permission.INTERNET" />\n    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />\n    <uses-permission android:name="com.google.android.gms.permission.AD_ID" />\n    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />\n\n    <application>\n        <meta-data\n            android:name="com.yourplatform.APP_ID"\n            android:value="YOUR_APP_ID_HERE" />\n    </application>\n</manifest>`,
                  'complete'
                )}
                className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  copiedSection === 'complete'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {copiedSection === 'complete' ? (
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

            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900 text-sm mb-1">Important: Replace YOUR_APP_ID_HERE</p>
                  <p className="text-sm text-red-800">
                    Get your App ID from the dashboard: <strong>Settings → App Management → Your App</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Permissions Explained</h2>
            <p className="text-sm text-gray-600 mt-1">Understanding what each permission does</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              {permissions.map((permission, index) => {
                const Icon = permission.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      permission.required
                        ? 'bg-red-50 border-red-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        permission.required ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          permission.required ? 'text-red-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{permission.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            permission.required
                              ? 'bg-red-200 text-red-800'
                              : 'bg-blue-200 text-blue-800'
                          }`}>
                            {permission.required ? 'Required' : 'Optional'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{permission.description}</p>
                        <div className="relative">
                          <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                            <code>{permission.code}</code>
                          </pre>
                          <button
                            onClick={() => copyToClipboard(permission.code, `perm-${index}`)}
                            className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium transition-all ${
                              copiedSection === `perm-${index}`
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            }`}
                          >
                            {copiedSection === `perm-${index}` ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* App ID Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">App ID Metadata</h2>
            <p className="text-sm text-gray-600 mt-1">Configure your unique application identifier</p>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Your App ID uniquely identifies your application in our system. You can find it in your dashboard.
            </p>

            <div className="relative mb-4">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                <code>{`<meta-data
    android:name="com.yourplatform.APP_ID"
    android:value="ca-app-pub-1234567890123456" />`}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(
                  `<meta-data\n    android:name="com.yourplatform.APP_ID"\n    android:value="ca-app-pub-1234567890123456" />`,
                  'appid'
                )}
                className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  copiedSection === 'appid'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {copiedSection === 'appid' ? (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Finding Your App ID
                </h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Log in to your dashboard</li>
                  <li>Go to App Management</li>
                  <li>Select your app</li>
                  <li>Copy the App ID</li>
                </ol>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Test Mode
                </h4>
                <p className="text-sm text-yellow-800 mb-2">
                  During development, enable test mode:
                </p>
                <code className="text-xs bg-yellow-100 px-2 py-1 rounded block">
                  android:value="true"
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
          <h3 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Verification Checklist
          </h3>
          <div className="space-y-2">
            {[
              'Internet permission added',
              'Network state permission added',
              'App ID metadata configured with your actual ID',
              'Test mode enabled (for development)',
              'All permissions placed inside <manifest> tag',
              'Metadata placed inside <application> tag'
            ].map((item, index) => (
              <label key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-50 transition-colors">
                <input type="checkbox" className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500" />
                <span className="text-sm text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AndroidManifest;
