import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';
import { ArrowLeft, ArrowRight, Save, Send, CheckCircle } from 'lucide-react';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2CreativeUpload from './steps/Step2CreativeUpload';
import Step3Targeting from './steps/Step3Targeting';
import Step4Review from './steps/Step4Review';

const CreateCampaignPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignData, setCampaignData] = useState({
    // Step 1
    campaignName: '',
    adType: '',
    campaignObjective: '',
    durationType: 'continuous',
    startDate: null,
    endDate: null,
    dailyBudget: '',
    noDailyLimit: false,

    // Step 2 - Banner Ads
    selectedBannerSizes: [],
    bannerCreatives: {},

    // Step 2 - Rewarded Ads
    rewardType: '',
    customRewardName: '',
    rewardedVideoFile: null,
    rewardedThumbnail: null,
    rewardedStaticImage: null,
    rewardedHeadline: '',
    rewardedDescription: '',
    rewardedCTA: '',
    rewardedClickURL: '',

    // Step 2 - Interstitial Ads
    interstitialType: 'static',
    selectedDeviceTypes: [],
    interstitialCreatives: {},
    interstitialHeadline: '',
    interstitialDescription: '',
    interstitialCTA: '',

    // Step 2 - URL Shortener
    longURL: '',
    customAlias: '',
    shortenerAdType: 'static',
    shortenerCreative: null,
    adDisplayDuration: '5',
    allowSkip: true,
    skipAfter: '3',
    shortenerClickURL: '',
    redirectDelay: 'after-timer',
    showCountdown: true,
    linkExpiration: null,
    maxClicks: '',
    passwordProtected: false,
    linkPassword: '',

    // Step 3
    geoTargeting: 'all',
    selectedCountries: [],
    ageGroups: [],
    gender: 'all',
    interests: [],
    selectedDays: [],
    allDay: true,
    timeFrom: null,
    timeTo: null,
    timezone: 'UTC',
    contentCategories: [],
    keywords: '',

    // Step 4
    policyCompliance: false,
    landingPageFunctional: false,
    creativeRights: false,
    adminApproval: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { title: 'Basic Info', icon: '1' },
    { title: 'Creative Upload', icon: '2' },
    { title: 'Targeting', icon: '3' },
    { title: 'Review', icon: '4' },
  ];

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!campaignData.campaignName) newErrors.campaignName = 'Campaign name is required';
      if (!campaignData.adType) newErrors.adType = 'Ad type is required';
      if (campaignData.durationType === 'scheduled') {
        if (!campaignData.startDate) newErrors.startDate = 'Start date is required';
        if (!campaignData.endDate) newErrors.endDate = 'End date is required';
      }
    } else if (step === 1) {
      if (campaignData.adType === 'Banner Ads') {
        if (campaignData.selectedBannerSizes.length === 0) {
          newErrors.selectedBannerSizes = 'Select at least one banner size';
        }
      } else if (campaignData.adType === 'Rewarded Ads') {
        if (!campaignData.rewardType) newErrors.rewardType = 'Reward type is required';
        if (!campaignData.rewardedHeadline) newErrors.rewardedHeadline = 'Headline is required';
        if (!campaignData.rewardedClickURL) newErrors.rewardedClickURL = 'Click URL is required';
      } else if (campaignData.adType === 'URL Shortener') {
        if (!campaignData.longURL) newErrors.longURL = 'Long URL is required';
      }
    } else if (step === 3) {
      if (!campaignData.policyCompliance) newErrors.policyCompliance = 'Policy compliance is required';
      if (!campaignData.landingPageFunctional) newErrors.landingPageFunctional = 'Landing page confirmation is required';
      if (!campaignData.creativeRights) newErrors.creativeRights = 'Creative rights confirmation is required';
      if (!campaignData.adminApproval) newErrors.adminApproval = 'Admin approval acknowledgment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSaveDraft = () => {
    localStorage.setItem('campaignDraft', JSON.stringify(campaignData));
    message.success('Campaign saved as draft');
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      console.log('Campaign submitted:', campaignData);
      setIsSubmitted(true);
      message.success('Campaign submitted for review!');
    }
  };

  const handleInputChange = (field, value) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Campaign Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-2">
            Your campaign "{campaignData.campaignName}" has been submitted for admin review.
          </p>
          <p className="text-gray-600 mb-8">
            You'll receive an email notification once it's approved.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-900">
              <strong>Status:</strong> Pending Approval
            </p>
            <p className="text-sm text-blue-900 mt-1">
              <strong>Expected Review Time:</strong> 24-48 hours
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              size="large"
              onClick={() => window.location.href = '/campaigns'}
              className="font-semibold"
            >
              View All Campaigns
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(0);
                setCampaignData({});
              }}
              className="bg-gradient-to-r from-purple-600 to-purple-700 border-0 font-semibold"
            >
              Create Another Campaign
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Campaigns
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Campaign</h1>
          <p className="text-gray-600">Follow the steps to create and launch your advertising campaign</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <Steps
            current={currentStep}
            items={steps.map((step, index) => ({
              title: step.title,
              icon: (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    currentStep === index
                      ? 'bg-purple-600 text-white'
                      : currentStep > index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > index ? '✓' : step.icon}
                </div>
              ),
            }))}
          />
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          {currentStep === 0 && (
            <Step1BasicInfo
              data={campaignData}
              errors={errors}
              onChange={handleInputChange}
            />
          )}
          {currentStep === 1 && (
            <Step2CreativeUpload
              data={campaignData}
              errors={errors}
              onChange={handleInputChange}
            />
          )}
          {currentStep === 2 && (
            <Step3Targeting
              data={campaignData}
              errors={errors}
              onChange={handleInputChange}
            />
          )}
          {currentStep === 3 && (
            <Step4Review
              data={campaignData}
              errors={errors}
              onChange={handleInputChange}
              onEdit={(step) => setCurrentStep(step)}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button
                size="large"
                icon={<ArrowLeft className="w-5 h-5" />}
                onClick={handleBack}
                className="font-semibold"
              >
                Back
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              size="large"
              icon={<Save className="w-5 h-5" />}
              onClick={handleSaveDraft}
              className="font-semibold"
            >
              Save as Draft
            </Button>

            {currentStep < 3 ? (
              <Button
                type="primary"
                size="large"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-purple-700 border-0 font-semibold"
              >
                Next: {steps[currentStep + 1].title}
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                icon={<Send className="w-5 h-5" />}
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-purple-700 border-0 font-semibold"
              >
                Submit for Review
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignPage;
