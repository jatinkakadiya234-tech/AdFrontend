// import { useState, useEffect } from 'react';
// import { 
//   Eye, 
//   MousePointer, 
//   TrendingUp, 
//   DollarSign, 
//   RefreshCw, 
//   Calendar,
//   Users,
//   Smartphone,
//   Monitor,
//   BarChart3,
//   Zap,
//   Target,
//   Clock,
//   ArrowUp,
//   ArrowDown,
//   MoreVertical,
//   Download,
//   Filter
// } from 'lucide-react';
// import Apihelper from '../../../service/Apihelper';

// const AnalyticsPage = () => {
//   const [analytics, setAnalytics] = useState({});
//   const [topAds, setTopAds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [timeRange, setTimeRange] = useState('7');
//   const [user, setUser] = useState(null);
//   const [activeMetric, setActiveMetric] = useState('impressions');

//   // Mock data for demonstration
//   const mockAnalytics = {
//     totalImpressions: 124587,
//     totalClicks: 8923,
//     overallCTR: 7.16,
//     totalAds: 24,
//     webImpressions: 78452,
//     mobileImpressions: 46135,
//     avgImpressions: 5191,
//     performanceTrend: 12.5,
//     engagementRate: 4.2,
//     activeCampaigns: 18,
//     conversions: 2341,
//     revenue: 12540,
//     bounceRate: 32.1
//   };

//   const mockTopAds = [
//     { id: 1, title: 'Summer Sale 2024', category: 'E-commerce', impressions: 24567, clicks: 1987, ctr: 8.1, status: 'active' },
//     { id: 2, title: 'Mobile App Launch', category: 'Technology', impressions: 18765, clicks: 1543, ctr: 8.2, status: 'active' },
//     { id: 3, title: 'Winter Collection', category: 'Fashion', impressions: 16543, clicks: 1234, ctr: 7.5, status: 'active' },
//     { id: 4, title: 'Financial Services', category: 'Finance', impressions: 14234, clicks: 987, ctr: 6.9, status: 'active' },
//     { id: 5, title: 'Travel Deals', category: 'Travel', impressions: 11876, clicks: 765, ctr: 6.4, status: 'active' }
//   ];

//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//     fetchAnalytics();
    
//     // Auto-refresh every 60 seconds
//     const interval = setInterval(() => {
//       refreshData();
//     }, 60000);
    
//     return () => clearInterval(interval);
//   }, [timeRange]);

//   const fetchAnalytics = async () => {
//     try {
//       setLoading(true);
//       // Use mock data for demonstration
//       setTimeout(() => {
//         setAnalytics(mockAnalytics);
//         setTopAds(mockTopAds);
//         setLoading(false);
//       }, 1000);
      
//       // Uncomment for real API calls
//       /*
//       if (user?.role === 'advertiser') {
//         const detailedRes = await Apihelper.GetDetailedAnalytics({ days: timeRange });
//         setAnalytics(detailedRes.data.analytics);
//         setTopAds(detailedRes.data.analytics.topAds);
//       } else {
//         const [summaryRes, topAdsRes] = await Promise.all([
//           Apihelper.GetImpressionSummary(),
//           Apihelper.GetTopAds({ limit: 5 })
//         ]);
//         setAnalytics(summaryRes.data.summary);
//         setTopAds(topAdsRes.data.ads);
//       }
//       */
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//       // Fallback to mock data
//       setAnalytics(mockAnalytics);
//       setTopAds(mockTopAds);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refreshData = async () => {
//     setRefreshing(true);
//     await fetchAnalytics();
//     setTimeout(() => setRefreshing(false), 500);
//   };

//   const StatCard = ({ title, value, change, icon: Icon, color, format }) => {
//     const formattedValue = format === 'currency' ? `$${value?.toLocaleString()}` : 
//                           format === 'percent' ? `${value}%` : value?.toLocaleString();
    
//     return (
//       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
//         <div className="flex items-center justify-between mb-4">
//           <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-sm`}>
//             <Icon className="w-6 h-6 text-white" />
//           </div>
//           <div className="text-right">
//             <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//               change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//             }`}>
//               {change >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
//               {Math.abs(change)}%
//             </div>
//           </div>
//         </div>
//         <h3 className="text-2xl font-bold text-gray-900 mb-2">{formattedValue}</h3>
//         <p className="text-gray-600 text-sm">{title}</p>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading analytics dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//             <div className="mb-6 lg:mb-0">
//               <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3">
//                 Analytics Dashboard
//               </h1>
//               <p className="text-gray-600 text-lg max-w-2xl">
//                 Real-time insights and performance metrics for your advertising campaigns
//               </p>
//             </div>
            
//             <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
//               <div className="flex space-x-3">
//                 <button
//                   onClick={refreshData}
//                   disabled={refreshing}
//                   className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 font-medium"
//                 >
//                   <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
//                   <span>Refresh</span>
//                 </button>
                
//                 <button className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-50 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 font-medium">
//                   <Download className="w-4 h-4" />
//                   <span>Export</span>
//                 </button>
//               </div>
              
//               <select 
//                 value={timeRange}
//                 onChange={(e) => setTimeRange(e.target.value)}
//                 className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 shadow-sm hover:shadow-md transition-all duration-200 font-medium"
//               >
//                 <option value="7">Last 7 days</option>
//                 <option value="30">Last 30 days</option>
//                 <option value="90">Last 3 months</option>
//                 <option value="365">Last year</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Key Metrics */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard 
//             title="Total Impressions" 
//             value={analytics.totalImpressions} 
//             change={12.5}
//             icon={Eye}
//             color="from-blue-500 to-blue-600"
//           />
          
//           <StatCard 
//             title="Total Clicks" 
//             value={analytics.totalClicks} 
//             change={8.3}
//             icon={MousePointer}
//             color="from-green-500 to-green-600"
//           />
          
//           <StatCard 
//             title="Overall CTR" 
//             value={analytics.overallCTR} 
//             change={2.1}
//             icon={TrendingUp}
//             color="from-purple-500 to-purple-600"
//             format="percent"
//           />
          
//           <StatCard 
//             title="Active Campaigns" 
//             value={analytics.totalAds} 
//             change={5.7}
//             icon={Target}
//             color="from-orange-500 to-orange-600"
//           />
//         </div>

//         {/* Performance Overview & Top Ads */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
//           {/* Performance Metrics */}
//           <div className="xl:col-span-2">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-gray-900 flex items-center">
//                   <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
//                   Performance Overview
//                 </h2>
//                 <div className="flex space-x-2">
//                   {['impressions', 'clicks', 'revenue'].map(metric => (
//                     <button
//                       key={metric}
//                       onClick={() => setActiveMetric(metric)}
//                       className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
//                         activeMetric === metric
//                           ? 'bg-blue-600 text-white shadow-sm'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       {metric.charAt(0).toUpperCase() + metric.slice(1)}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Metric Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm font-medium text-blue-900">Engagement Rate</span>
//                     <TrendingUp className="w-4 h-4 text-blue-600" />
//                   </div>
//                   <p className="text-2xl font-bold text-blue-900">{analytics.engagementRate || 4.2}%</p>
//                   <div className="flex items-center mt-1">
//                     <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
//                     <span className="text-xs text-green-600 font-medium">+2.1% from last period</span>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm font-medium text-green-900">Conversions</span>
//                     <Zap className="w-4 h-4 text-green-600" />
//                   </div>
//                   <p className="text-2xl font-bold text-green-900">{analytics.conversions || 2341}</p>
//                   <div className="flex items-center mt-1">
//                     <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
//                     <span className="text-xs text-green-600 font-medium">+15.3% from last period</span>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm font-medium text-purple-900">Revenue</span>
//                     <DollarSign className="w-4 h-4 text-purple-600" />
//                   </div>
//                   <p className="text-2xl font-bold text-purple-900">${(analytics.revenue || 12540).toLocaleString()}</p>
//                   <div className="flex items-center mt-1">
//                     <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
//                     <span className="text-xs text-green-600 font-medium">+8.7% from last period</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Device Performance */}
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Performance</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-blue-100 rounded-lg">
//                         <Monitor className="w-5 h-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-900">Desktop</p>
//                         <p className="text-sm text-gray-600">Web browsers</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xl font-bold text-gray-900">{(analytics.webImpressions || 0).toLocaleString()}</p>
//                       <p className="text-sm text-blue-600 font-medium">58.4%</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-green-100 rounded-lg">
//                         <Smartphone className="w-5 h-5 text-green-600" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-900">Mobile</p>
//                         <p className="text-sm text-gray-600">Phones & tablets</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xl font-bold text-gray-900">{(analytics.mobileImpressions || 0).toLocaleString()}</p>
//                       <p className="text-sm text-green-600 font-medium">41.6%</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Top Performing Ads */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-gray-900 flex items-center">
//                 <TrendingUp className="w-6 h-6 mr-2 text-purple-600" />
//                 Top Performing Ads
//               </h2>
//               <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
//                 <MoreVertical className="w-5 h-5" />
//               </button>
//             </div>

//             {topAds.length === 0 ? (
//               <div className="text-center py-8">
//                 <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-600 mb-2">No performance data available</p>
//                 <p className="text-gray-500 text-sm">Start creating campaigns to see analytics</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {topAds.map((ad, index) => (
//                   <div key={ad.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
//                     <div className="flex items-center space-x-4 flex-1 min-w-0">
//                       <div className={`flex items-center justify-center w-8 h-8 rounded-lg text-white font-bold text-sm ${
//                         index === 0 ? 'bg-yellow-500' :
//                         index === 1 ? 'bg-gray-500' :
//                         index === 2 ? 'bg-orange-500' : 'bg-blue-500'
//                       }`}>
//                         {index + 1}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="font-semibold text-gray-900 truncate">{ad.title}</p>
//                         <div className="flex items-center space-x-2 mt-1">
//                           <span className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded-full">{ad.category}</span>
//                           <span className={`text-xs px-2 py-1 rounded-full ${
//                             ad.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                           }`}>
//                             {ad.status}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-bold text-gray-900">{ad.impressions.toLocaleString()}</p>
//                       <p className="text-sm text-green-600 font-medium">{ad.ctr}% CTR</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             <button className="w-full mt-6 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 border border-gray-300 transition-colors duration-200 font-medium flex items-center justify-center space-x-2">
//               <span>View All Campaigns</span>
//               <ArrowUp className="w-4 h-4 transform rotate-90" />
//             </button>
//           </div>
//         </div>

//         {/* Additional Metrics */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <Clock className="w-5 h-5 mr-2 text-blue-600" />
//               Performance Trends
//             </h3>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
//                 <span className="text-sm font-medium text-gray-700">Avg. Session Duration</span>
//                 <span className="font-bold text-blue-600">2m 34s</span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
//                 <span className="text-sm font-medium text-gray-700">Bounce Rate</span>
//                 <span className="font-bold text-green-600">{analytics.bounceRate || 32.1}%</span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
//                 <span className="text-sm font-medium text-gray-700">Pages per Session</span>
//                 <span className="font-bold text-purple-600">3.2</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <Users className="w-5 h-5 mr-2 text-green-600" />
//               Audience Overview
//             </h3>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">New Visitors</span>
//                 <span className="font-semibold text-gray-900">42%</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Returning Visitors</span>
//                 <span className="font-semibold text-gray-900">58%</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Geographic Reach</span>
//                 <span className="font-semibold text-gray-900">18 countries</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <Target className="w-5 h-5 mr-2 text-orange-600" />
//               Campaign Health
//             </h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-600">Active Campaigns</span>
//                 <span className="font-semibold text-gray-900">{analytics.activeCampaigns || 18}</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-600">Paused Campaigns</span>
//                 <span className="font-semibold text-gray-900">3</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-600">Completed Campaigns</span>
//                 <span className="font-semibold text-gray-900">12</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsPage;



// ReportsOverview.jsx
import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  DollarSign,
  BarChart3,
  Zap,
  ArrowUp,
  ArrowDown,
  Calendar,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  PieChart,
  Filter,
  ChevronRight,
  Target,
  Activity
} from 'lucide-react';

const ReportsOverview = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7');
  const [user, setUser] = useState(null);
  const [overviewData, setOverviewData] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchOverviewData();
  }, [dateRange]);

  const fetchOverviewData = async () => {
    try {
      setLoading(true);
      // Mock data for viewer role
      setTimeout(() => {
        setOverviewData({
          // This period data
          impressions: 125640,
          clicks: 4598,
          ctr: 3.66,
          earnings: 1856.23,
          
          // Previous period comparison
          prevImpressions: 98765,
          prevClicks: 3450,
          prevEarnings: 1345.67,
          
          // Ad unit performance
          adUnits: [
            {
              id: 1,
              name: 'Homepage Banner',
              type: 'Display - 728x90',
              impressions: 45600,
              clicks: 1890,
              ctr: 4.14,
              earnings: 684.32,
              status: 'active',
              lastUpdated: 'Today'
            },
            {
              id: 2,
              name: 'Sidebar Widget',
              type: 'Display - 300x250',
              impressions: 38900,
              clicks: 1156,
              ctr: 2.97,
              earnings: 583.50,
              status: 'active',
              lastUpdated: 'Today'
            },
            {
              id: 3,
              name: 'Footer Ad',
              type: 'Display - 970x90',
              impressions: 28450,
              clicks: 888,
              ctr: 3.12,
              earnings: 427.50,
              status: 'active',
              lastUpdated: 'Today'
            },
            {
              id: 4,
              name: 'In-Article Ad',
              type: 'Native',
              impressions: 12690,
              clicks: 664,
              ctr: 5.23,
              earnings: 190.91,
              status: 'active',
              lastUpdated: '2 hours ago'
            }
          ],
          
          // Performance summary
          bestPerformingUnit: 'In-Article Ad',
          bestPerformingUnitCTR: 5.23,
          lowestPerformingUnit: 'Sidebar Widget',
          lowestPerformingUnitCTR: 2.97,
          
          // Revenue metrics
          cpm: 14.75,
          cpc: 0.40,
          rph: 105.66, // Revenue per hour (approximation)
          
          // Top performing hours
          peakHour: '12-1 PM',
          peakHourImpressions: 8900,
          
          // Platform breakdown
          platformBreakdown: [
            { platform: 'Web Desktop', impressions: 75000, percentage: 59.7 },
            { platform: 'Mobile Web', impressions: 42000, percentage: 33.4 },
            { platform: 'App', impressions: 8640, percentage: 6.9 }
          ],
          
          // Issues/Alerts
          alerts: [
            { type: 'warning', message: 'Sidebar Widget CTR below average. Consider layout optimization.' },
            { type: 'success', message: 'Native ads performing 43% better than expected!' }
          ]
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching overview data:', error);
      setLoading(false);
    }
  };

  const calculateChange = (current, previous) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const impressionChange = calculateChange(overviewData.impressions, overviewData.prevImpressions);
  const clickChange = calculateChange(overviewData.clicks, overviewData.prevClicks);
  const earningChange = calculateChange(overviewData.earnings, overviewData.prevEarnings);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading reports overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/10 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
              Reports Overview
            </h1>
            <p className="text-gray-600 text-lg">
              Quick summary of your ad unit performance and earnings
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all font-medium text-gray-700"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
            
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm hover:shadow-md transition-all font-medium">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Main KPIs - Period Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Impressions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                impressionChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {impressionChange >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {Math.abs(impressionChange)}%
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{overviewData.impressions?.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm font-medium">Total Impressions</p>
            <p className="text-xs text-gray-500 mt-1">vs {overviewData.prevImpressions?.toLocaleString()} previously</p>
          </div>

          {/* Clicks */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                <MousePointer className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                clickChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {clickChange >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {Math.abs(clickChange)}%
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{overviewData.clicks?.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm font-medium">Total Clicks</p>
            <p className="text-xs text-gray-500 mt-1">vs {overviewData.prevClicks?.toLocaleString()} previously</p>
          </div>

          {/* CTR */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                Key Metric
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{overviewData.ctr}%</h3>
            <p className="text-gray-600 text-sm font-medium">Click-Through Rate</p>
            <p className="text-xs text-gray-500 mt-1">Industry avg: 2.8%</p>
          </div>

          {/* Earnings */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                earningChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {earningChange >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {Math.abs(earningChange)}%
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">${overviewData.earnings?.toFixed(2)}</h3>
            <p className="text-gray-600 text-sm font-medium">Total Earnings</p>
            <p className="text-xs text-gray-500 mt-1">vs ${overviewData.prevEarnings?.toFixed(2)} previously</p>
          </div>
        </div>

        {/* Alerts / Performance Insights */}
        {overviewData.alerts && overviewData.alerts.length > 0 && (
          <div className="space-y-3">
            {overviewData.alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  alert.type === 'warning'
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-green-50 border-green-200'
                }`}
              >
                {alert.type === 'warning' ? (
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                )}
                <p className={`text-sm font-medium ${
                  alert.type === 'warning' ? 'text-amber-900' : 'text-green-900'
                }`}>
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Key Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">CPM (Cost per 1K)</span>
                <span className="font-bold text-gray-900">${overviewData.cpm?.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">CPC (Cost per Click)</span>
                <span className="font-bold text-gray-900">${overviewData.cpc?.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Revenue/Hour</span>
                <span className="font-bold text-gray-900">${overviewData.rph?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Performance
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">Best Performer</p>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-bold text-gray-900">{overviewData.bestPerformingUnit}</p>
                  <p className="text-sm text-green-700 font-semibold">{overviewData.bestPerformingUnitCTR}% CTR</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">Needs Optimization</p>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="font-bold text-gray-900">{overviewData.lowestPerformingUnit}</p>
                  <p className="text-sm text-orange-700 font-semibold">{overviewData.lowestPerformingUnitCTR}% CTR</p>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Traffic Source
            </h3>
            <div className="space-y-3">
              {overviewData.platformBreakdown?.map((platform, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{platform.platform}</span>
                    <span className="text-sm font-bold text-gray-900">{platform.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-green-500' : 'bg-purple-500'
                      }`}
                      style={{ width: `${platform.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ad Units Performance Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              Your Ad Units Performance
            </h3>
            <button className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ad Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Impressions</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Clicks</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">CTR</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Earnings</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {overviewData.adUnits?.map((unit, idx) => (
                  <tr key={unit.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                          idx === 0 ? 'bg-blue-500' :
                          idx === 1 ? 'bg-green-500' :
                          idx === 2 ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`}>
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{unit.name}</p>
                          <p className="text-xs text-gray-500">{unit.lastUpdated}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{unit.type}</td>
                    <td className="px-6 py-4 text-right text-gray-900 font-semibold">{unit.impressions?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-gray-900 font-semibold">{unit.clicks?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                        {unit.ctr}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900 font-bold">${unit.earnings?.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        {unit.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Cards for Detailed Reports */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/reports/performance" className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold mb-2">Performance Reports</h3>
            <p className="text-sm opacity-90">
              Detailed analytics with date ranges, trends, and scheduled email delivery
            </p>
          </a>

          <a href="/reports/comparison" className="group bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                <PieChart className="w-6 h-6" />
              </div>
              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold mb-2">Comparison Reports</h3>
            <p className="text-sm opacity-90">
              Compare ad units, time periods, and platforms side-by-side
            </p>
          </a>

          <a href="/reports/custom" className="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold mb-2">Custom Reports</h3>
            <p className="text-sm opacity-90">
              Build custom reports with your preferred metrics and dimensions
            </p>
          </a>
        </div>

      </div>
    </div>
  );
};

export default ReportsOverview;
