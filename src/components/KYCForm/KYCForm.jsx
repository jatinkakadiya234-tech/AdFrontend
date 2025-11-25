import React, { useState } from 'react';
import {
    Building2,
    Globe,
    CreditCard,
    Layout,
    CheckCircle,
    ArrowLeft,
    ArrowRight,
    Check,
    Info
} from 'lucide-react';
import Step1CompanyDetails from './Steps/Step1CompanyDetails';
import Step2PlatformDetails from './Steps/Step2PlatformDetails';
import Step3BankingDetails from './Steps/Step3BankingDetails';
import Step4AdPreferences from './Steps/Step4AdPreferences';
import Step5ReviewSubmit from './Steps/Step5ReviewSubmit';
import ProgressIndicator from './ProgressIndicator';

const KYCForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Company Details
        companyName: '',
        registrationNumber: '',
        taxId: '',
        incorporationDate: '',
        registrationDoc: null,
        companyAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        authorizedPersonName: '',
        authorizedPersonDesignation: '',

        // Step 2: Platform Details
        websiteUrl: '',
        websiteCategory: '',
        websiteDescription: '',
        monthlyVisitors: '',
        audienceLocation: [],
        websiteLanguage: '',
        websiteScreenshot: null,
        mobileAppName: '',
        mobileAppUrl: '',
        mobileAppUsers: '',
        facebookUrl: '',
        instagramUrl: '',
        twitterUrl: '',
        youtubeUrl: '',
        ownsWebsite: false,
        monetizationRights: false,
        noCopyright: false,

        // Step 3: Banking Details
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        branchAddress: '',
        bankStatement: null,
        minPayoutThreshold: '',
        paymentFrequency: '',

        // Step 4: Ad Preferences
        adTypes: [],
        bannerSizes: [],
        rewardedPlatform: '',
        interstitialPlatform: '',
        dailyLinks: '',
        urlUseCase: '',
        audienceAgeGroup: '',
        audienceInterests: [],

        // Step 5: Review
        declaration1: false,
        declaration2: false,
        declaration3: false,
        digitalSignature: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const steps = [
        { number: 1, label: 'Company', icon: Building2 },
        { number: 2, label: 'Platform', icon: Globe },
        { number: 3, label: 'Banking', icon: CreditCard },
        { number: 4, label: 'Ad Preferences', icon: Layout },
        { number: 5, label: 'Review', icon: CheckCircle }
    ];

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.companyName) newErrors.companyName = 'Company name is required';
            if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required';
            if (!formData.taxId) newErrors.taxId = 'Tax ID is required';
            if (!formData.incorporationDate) newErrors.incorporationDate = 'Date of incorporation is required';
            if (!formData.registrationDoc) newErrors.registrationDoc = 'Registration document is required';
            if (!formData.companyAddress) newErrors.companyAddress = 'Company address is required';
            if (!formData.city) newErrors.city = 'City is required';
            if (!formData.state) newErrors.state = 'State is required';
            if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
            if (!formData.country) newErrors.country = 'Country is required';
            if (!formData.authorizedPersonName) newErrors.authorizedPersonName = 'Authorized person name is required';
            if (!formData.authorizedPersonDesignation) newErrors.authorizedPersonDesignation = 'Designation is required';
        } else if (step === 2) {
            if (!formData.websiteUrl) {
                newErrors.websiteUrl = 'Website URL is required';
            } else if (!/^https?:\/\/.+/.test(formData.websiteUrl)) {
                newErrors.websiteUrl = 'Please enter a valid URL';
            }
            if (!formData.websiteCategory) newErrors.websiteCategory = 'Website category is required';
            if (!formData.websiteDescription) {
                newErrors.websiteDescription = 'Website description is required';
            } else if (formData.websiteDescription.length < 200) {
                newErrors.websiteDescription = 'Description must be at least 200 characters';
            }
            if (!formData.monthlyVisitors) newErrors.monthlyVisitors = 'Monthly visitors is required';
            if (formData.audienceLocation.length === 0) newErrors.audienceLocation = 'Select at least one country';
            if (!formData.websiteLanguage) newErrors.websiteLanguage = 'Website language is required';
            if (!formData.websiteScreenshot) newErrors.websiteScreenshot = 'Website screenshot is required';
            if (!formData.ownsWebsite) newErrors.ownsWebsite = 'You must confirm website ownership';
            if (!formData.monetizationRights) newErrors.monetizationRights = 'You must confirm monetization rights';
            if (!formData.noCopyright) newErrors.noCopyright = 'You must confirm no copyright violations';
        } else if (step === 3) {
            if (!formData.bankName) newErrors.bankName = 'Bank name is required';
            if (!formData.accountHolderName) newErrors.accountHolderName = 'Account holder name is required';
            if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
            if (!formData.ifscCode) newErrors.ifscCode = 'IFSC/SWIFT code is required';
            if (!formData.branchAddress) newErrors.branchAddress = 'Branch address is required';
            if (!formData.bankStatement) newErrors.bankStatement = 'Bank statement is required';
            if (!formData.minPayoutThreshold) newErrors.minPayoutThreshold = 'Minimum payout threshold is required';
            if (!formData.paymentFrequency) newErrors.paymentFrequency = 'Payment frequency is required';
        } else if (step === 4) {
            if (formData.adTypes.length === 0) newErrors.adTypes = 'Select at least one ad type';
            if (formData.adTypes.includes('Banner Ads') && formData.bannerSizes.length === 0) {
                newErrors.bannerSizes = 'Select at least one banner size';
            }
            if (formData.adTypes.includes('Rewarded Ads') && !formData.rewardedPlatform) {
                newErrors.rewardedPlatform = 'Select platform type';
            }
            if (formData.adTypes.includes('Interstitial Ads') && !formData.interstitialPlatform) {
                newErrors.interstitialPlatform = 'Select platform type';
            }
            if (formData.adTypes.includes('URL Shortener') && !formData.dailyLinks) {
                newErrors.dailyLinks = 'Select estimated daily links';
            }
            if (formData.adTypes.includes('URL Shortener') && !formData.urlUseCase) {
                newErrors.urlUseCase = 'Select primary use case';
            }
        } else if (step === 5) {
            if (!formData.declaration1) newErrors.declaration1 = 'This declaration is required';
            if (!formData.declaration2) newErrors.declaration2 = 'This declaration is required';
            if (!formData.declaration3) newErrors.declaration3 = 'This declaration is required';
            if (!formData.digitalSignature) newErrors.digitalSignature = 'Digital signature is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 5) {
                setCurrentStep(currentStep + 1);
                window.scrollTo(0, 0);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = () => {
        if (validateStep(5)) {
            setIsSubmitted(true);
            console.log('Form submitted:', formData);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleFileUpload = (field, file) => {
        if (file) {
            handleInputChange(field, file);
        }
    };

    const handleMultiSelect = (field, value) => {
        const currentValues = formData[field] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        handleInputChange(field, newValues);
    };

    const editStep = (step) => {
        setCurrentStep(step);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 p-5">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="text-center p-16">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-5">
                            <Check className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Application Submitted Successfully!
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Your publisher application has been submitted for review. Our team will review your application within 2-5 business days.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg text-left mb-8 mx-auto max-w-2xl">
                            <div className="flex gap-3">
                                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-blue-900 font-semibold mb-2">What happens next?</p>
                                    <ul className="text-blue-800 text-sm space-y-1">
                                        <li>• Our team will verify your documents</li>
                                        <li>• We'll check your website compliance</li>
                                        <li>• You'll receive an email notification once reviewed</li>
                                        <li>• Application Reference ID: <strong>APP{Date.now().toString().slice(-8)}</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                        >
                            Submit Another Application
                        </button> */}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-150 via-gray-100 to-gray-200 p-5">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Progress Bar */}
                <div className="h-1.5 bg-gray-200">
                    <div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300"
                        style={{ width: `${(currentStep / 5) * 100}%` }}
                    />
                </div>

                {/* Step Indicator */}
                <ProgressIndicator steps={steps} currentStep={currentStep} />

                {/* Form Content */}
                <div className="p-10">
                    {currentStep === 1 && (
                        <Step1CompanyDetails
                            formData={formData}
                            errors={errors}
                            onChange={handleInputChange}
                            onFileUpload={handleFileUpload}
                        />
                    )}
                    {currentStep === 2 && (
                        <Step2PlatformDetails
                            formData={formData}
                            errors={errors}
                            onChange={handleInputChange}
                            onFileUpload={handleFileUpload}
                            onMultiSelect={handleMultiSelect}
                        />
                    )}
                    {currentStep === 3 && (
                        <Step3BankingDetails
                            formData={formData}
                            errors={errors}
                            onChange={handleInputChange}
                            onFileUpload={handleFileUpload}
                        />
                    )}
                    {currentStep === 4 && (
                        <Step4AdPreferences
                            formData={formData}
                            errors={errors}
                            onChange={handleInputChange}
                            onMultiSelect={handleMultiSelect}
                        />
                    )}
                    {currentStep === 5 && (
                        <Step5ReviewSubmit
                            formData={formData}
                            errors={errors}
                            onChange={handleInputChange}
                            onEdit={editStep}
                        />
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center px-10 py-8 bg-gray-50 border-t border-gray-200">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${currentStep === 1
                                ? 'invisible'
                                : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                    {currentStep < 5 ? (
                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                        >
                            Next Step
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                        >
                            Submit Application
                            <CheckCircle className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KYCForm;