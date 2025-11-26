import React, { useState } from 'react';
import {
  Card,
  Input,
  Select,
  Button,
  Upload,
  message,
  Tag,
  Divider,
  Avatar,
  Modal,
  Space,
  Tooltip,
  Form,
} from 'antd';
import {
  User,
  Mail,
  Phone,
  Globe,
  Clock,
  Languages,
  Calendar,
  Shield,
  Camera,
  Save,
  Copy,
  CheckCircle,
  AlertCircle,
  Trash2,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const { Option } = Select;

const ProfileSettingsPage = () => {
  const [profileImage, setProfileImage] = useState(
    'https://ui-avatars.com/api/?name=John+Smith&size=200&background=8b5cf6&color=fff'
  );
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm] = Form.useForm();

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    country: 'US',
    timezone: 'America/New_York',
    language: 'en',
  });

  // Account Info (Read-only)
  const accountInfo = {
    publisherId: 'ABC123456',
    memberSince: 'January 15, 2025',
    accountStatus: 'Active',
  };

  // Countries
  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  ];

  // Timezones
  const timezones = [
    { value: 'America/New_York', label: '(GMT-5:00) Eastern Time' },
    { value: 'America/Chicago', label: '(GMT-6:00) Central Time' },
    { value: 'America/Denver', label: '(GMT-7:00) Mountain Time' },
    { value: 'America/Los_Angeles', label: '(GMT-8:00) Pacific Time' },
    { value: 'Europe/London', label: '(GMT+0:00) London' },
    { value: 'Europe/Paris', label: '(GMT+1:00) Paris' },
    { value: 'Asia/Dubai', label: '(GMT+4:00) Dubai' },
    { value: 'Asia/Kolkata', label: '(GMT+5:30) India' },
    { value: 'Asia/Shanghai', label: '(GMT+8:00) Shanghai' },
    { value: 'Asia/Tokyo', label: '(GMT+9:00) Tokyo' },
  ];

  // Languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  ];

  // Handle Image Upload
  const handleImageUpload = ({ file }) => {
    if (file.size > 2 * 1024 * 1024) {
      message.error('File size must be less than 2MB');
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target.result);
      message.success('Profile picture updated successfully');
    };
    reader.readAsDataURL(file);
    return false;
  };

  // Handle Remove Photo
  const handleRemovePhoto = () => {
    Modal.confirm({
      title: 'Remove Profile Picture',
      content: 'Are you sure you want to remove your profile picture?',
      okText: 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setProfileImage('https://ui-avatars.com/api/?name=John+Smith&size=200&background=cccccc&color=666');
        message.success('Profile picture removed successfully');
      },
    });
  };

  // Handle Copy Publisher ID
  const handleCopyPublisherId = () => {
    navigator.clipboard.writeText(accountInfo.publisherId);
    message.success('Publisher ID copied to clipboard');
  };

  // Handle Email Verification
  const handleResendEmailVerification = () => {
    message.info('Verification email sent to ' + formData.email);
  };

  // Handle Phone Verification
  const handleVerifyPhone = () => {
    message.info('Verification code sent to ' + formData.phone);
  };

  // Handle Form Input Change
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle Save Changes
  const handleSaveChanges = () => {
    message.success('Profile updated successfully');
  };

  // Handle Change Password
  const handleChangePassword = () => {
    passwordForm.validateFields().then((values) => {
      if (values.newPassword !== values.confirmPassword) {
        message.error('New password and confirm password do not match');
        return;
      }
      message.success('Password changed successfully');
      setIsPasswordModalOpen(false);
      passwordForm.resetFields();
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600 text-lg">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Picture & Account Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Picture Section */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar size={140} src={profileImage} className="border-4 border-purple-100 shadow-lg" />
                  <Upload
                    accept="image/jpeg,image/png"
                    showUploadList={false}
                    beforeUpload={handleImageUpload}
                  >
                    <div className="absolute bottom-2 right-2 w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  </Upload>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{formData.fullName}</h3>
                <p className="text-sm text-gray-500 mb-4">{formData.email}</p>

                <div className="w-full space-y-3">
                  <Upload
                    accept="image/jpeg,image/png"
                    showUploadList={false}
                    beforeUpload={handleImageUpload}
                  >
                    <Button icon={<Camera className="w-4 h-4" />} className="w-full" size="large">
                      Change Photo
                    </Button>
                  </Upload>
                  <Button
                    icon={<Trash2 className="w-4 h-4" />}
                    danger
                    onClick={handleRemovePhoto}
                    className="w-full"
                    size="large"
                  >
                    Remove Photo
                  </Button>
                </div>

                <Divider />

                <div className="w-full text-left space-y-2">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Upload Guidelines</p>
                  <p className="text-sm text-gray-600">• JPG or PNG format</p>
                  <p className="text-sm text-gray-600">• Maximum size: 2MB</p>
                  <p className="text-sm text-gray-600">• Recommended: 400x400px</p>
                </div>
              </div>
            </Card>

            {/* Account Information Section */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Account Info</h2>
              </div>

              <div className="space-y-4">
                {/* Publisher ID */}
                <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Publisher ID</p>
                      <p className="text-sm font-mono font-bold text-gray-900">{accountInfo.publisherId}</p>
                    </div>
                    <Tooltip title="Copy ID">
                      <Button
                        icon={<Copy className="w-4 h-4" />}
                        onClick={handleCopyPublisherId}
                        type="text"
                        size="small"
                      />
                    </Tooltip>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="text-sm font-semibold text-gray-900">{accountInfo.memberSince}</p>
                  </div>
                </div>

                {/* Account Status */}
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Status</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">{accountInfo.accountStatus}</p>
                      <Tag color="success" icon={<FaCheckCircle />} className="text-xs">
                        Verified
                      </Tag>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Personal Details & Security */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Details Section */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Personal Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    size="large"
                    placeholder="Enter your full name"
                    prefix={<User className="w-4 h-4 text-gray-400" />}
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="rounded-lg"
                  />
                </div>

                {/* Email Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    size="large"
                    type="email"
                    placeholder="Enter your email"
                    prefix={<Mail className="w-4 h-4 text-gray-400" />}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="rounded-lg"
                    suffix={
                      isEmailVerified ? (
                        <Tag color="success" icon={<FaCheckCircle />} className="mr-0">
                          Verified
                        </Tag>
                      ) : (
                        <Tag color="error" icon={<FaTimesCircle />} className="mr-0">
                          Unverified
                        </Tag>
                      )
                    }
                  />
                  {!isEmailVerified && (
                    <Button
                      type="link"
                      size="small"
                      className="px-0 mt-2 text-purple-600"
                      onClick={handleResendEmailVerification}
                    >
                      Resend Verification Email
                    </Button>
                  )}
                </div>

                {/* Phone Number */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    size="large"
                    placeholder="Enter your phone number"
                    prefix={<Phone className="w-4 h-4 text-gray-400" />}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="rounded-lg"
                    suffix={
                      isPhoneVerified ? (
                        <Tag color="success" icon={<FaCheckCircle />} className="mr-0">
                          Verified
                        </Tag>
                      ) : (
                        <Tag color="warning" icon={<AlertCircle className="w-3 h-3" />} className="mr-0">
                          Unverified
                        </Tag>
                      )
                    }
                  />
                  {!isPhoneVerified && (
                    <Button
                      type="link"
                      size="small"
                      className="px-0 mt-2 text-purple-600"
                      onClick={handleVerifyPhone}
                    >
                      Verify Phone Number
                    </Button>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <Select
                    size="large"
                    value={formData.country}
                    onChange={(value) => handleInputChange('country', value)}
                    className="w-full"
                    suffixIcon={<Globe className="w-4 h-4" />}
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {countries.map((country) => (
                      <Option key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
                  <Select
                    size="large"
                    value={formData.timezone}
                    onChange={(value) => handleInputChange('timezone', value)}
                    className="w-full"
                    suffixIcon={<Clock className="w-4 h-4" />}
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {timezones.map((tz) => (
                      <Option key={tz.value} value={tz.value}>
                        {tz.label}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Language */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Language</label>
                  <Select
                    size="large"
                    value={formData.language}
                    onChange={(value) => handleInputChange('language', value)}
                    className="w-full"
                    suffixIcon={<Languages className="w-4 h-4" />}
                  >
                    {languages.map((lang) => (
                      <Option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            </Card>

            {/* Security Section */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Security</h2>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Password</p>
                  <p className="text-sm text-gray-600">Last changed: 30 days ago</p>
                </div>
                <Button
                  icon={<Lock className="w-4 h-4" />}
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Change Password
                </Button>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
              <Button size="large" className="px-8">
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<Save className="w-4 h-4" />}
                onClick={handleSaveChanges}
                className="bg-purple-600 hover:bg-purple-700 px-8"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-600" />
            <span className="text-xl font-bold">Change Password</span>
          </div>
        }
        open={isPasswordModalOpen}
        onCancel={() => {
          setIsPasswordModalOpen(false);
          passwordForm.resetFields();
        }}
        footer={null}
        width={500}
      >
        <Form form={passwordForm} layout="vertical" className="mt-6">
          {/* Current Password */}
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password
              size="large"
              placeholder="Enter current password"
              prefix={<Lock className="w-4 h-4 text-gray-400" />}
              iconRender={(visible) =>
                visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />
              }
            />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter new password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter new password"
              prefix={<Lock className="w-4 h-4 text-gray-400" />}
              iconRender={(visible) =>
                visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />
              }
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm new password' }]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm new password"
              prefix={<Lock className="w-4 h-4 text-gray-400" />}
              iconRender={(visible) =>
                visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />
              }
            />
          </Form.Item>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 font-semibold mb-2">Password Requirements:</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Include uppercase and lowercase letters</li>
              <li>• Include at least one number</li>
              <li>• Include at least one special character</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              size="large"
              onClick={() => {
                setIsPasswordModalOpen(false);
                passwordForm.resetFields();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleChangePassword}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              icon={<Save className="w-4 h-4" />}
            >
              Update Password
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileSettingsPage;



// import React, { useState } from 'react';
// import {
//   Card,
//   Input,
//   Select,
//   Button,
//   Upload,
//   message,
//   Tag,
//   Divider,
//   Avatar,
//   Modal,
//   Space,
//   Tooltip,
//   Form,
//   Row,
//   Col,
// } from 'antd';
// import {
//   User,
//   Mail,
//   Phone,
//   Globe,
//   Clock,
//   Languages,
//   Calendar,
//   Shield,
//   Camera,
//   Save,
//   Copy,
//   CheckCircle,
//   AlertCircle,
//   Trash2,
//   Lock,
//   Eye,
//   EyeOff,
//   Edit3,
// } from 'lucide-react';
// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// const { Option } = Select;

// const ProfileSettingsPage = () => {
//   const [profileImage, setProfileImage] = useState(
//     'https://ui-avatars.com/api/?name=John+Smith&size=200&background=6366f1&color=fff'
//   );
//   const [isEmailVerified, setIsEmailVerified] = useState(true);
//   const [isPhoneVerified, setIsPhoneVerified] = useState(false);
//   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [passwordForm] = Form.useForm();

//   // Form State
//   const [formData, setFormData] = useState({
//     fullName: 'John Smith',
//     email: 'john.smith@example.com',
//     phone: '+1 (555) 123-4567',
//     country: 'US',
//     timezone: 'America/New_York',
//     language: 'en',
//   });

//   // Account Info (Read-only)
//   const accountInfo = {
//     publisherId: 'PUB123456',
//     memberSince: 'January 15, 2025',
//     accountStatus: 'Active',
//     lastLogin: '2 hours ago',
//   };

//   // Countries
//   const countries = [
//     { code: 'US', name: 'United States', flag: '🇺🇸' },
//     { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
//     { code: 'CA', name: 'Canada', flag: '🇨🇦' },
//     { code: 'AU', name: 'Australia', flag: '🇦🇺' },
//     { code: 'DE', name: 'Germany', flag: '🇩🇪' },
//     { code: 'FR', name: 'France', flag: '🇫🇷' },
//     { code: 'ES', name: 'Spain', flag: '🇪🇸' },
//     { code: 'IT', name: 'Italy', flag: '🇮🇹' },
//     { code: 'IN', name: 'India', flag: '🇮🇳' },
//     { code: 'JP', name: 'Japan', flag: '🇯🇵' },
//   ];

//   // Timezones
//   const timezones = [
//     { value: 'America/New_York', label: '(GMT-5:00) Eastern Time' },
//     { value: 'America/Chicago', label: '(GMT-6:00) Central Time' },
//     { value: 'America/Denver', label: '(GMT-7:00) Mountain Time' },
//     { value: 'America/Los_Angeles', label: '(GMT-8:00) Pacific Time' },
//     { value: 'Europe/London', label: '(GMT+0:00) London' },
//     { value: 'Europe/Paris', label: '(GMT+1:00) Paris' },
//     { value: 'Asia/Dubai', label: '(GMT+4:00) Dubai' },
//     { value: 'Asia/Kolkata', label: '(GMT+5:30) India' },
//     { value: 'Asia/Shanghai', label: '(GMT+8:00) Shanghai' },
//     { value: 'Asia/Tokyo', label: '(GMT+9:00) Tokyo' },
//   ];

//   // Languages
//   const languages = [
//     { code: 'en', name: 'English', flag: '🇬🇧' },
//     { code: 'es', name: 'Spanish', flag: '🇪🇸' },
//     { code: 'fr', name: 'French', flag: '🇫🇷' },
//     { code: 'de', name: 'German', flag: '🇩🇪' },
//     { code: 'it', name: 'Italian', flag: '🇮🇹' },
//     { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
//     { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
//     { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
//     { code: 'ko', name: 'Korean', flag: '🇰🇷' },
//   ];

//   // Handle Image Upload
//   const handleImageUpload = ({ file }) => {
//     if (file.size > 2 * 1024 * 1024) {
//       message.error('File size must be less than 2MB');
//       return false;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setProfileImage(e.target.result);
//       message.success('Profile picture updated successfully');
//     };
//     reader.readAsDataURL(file);
//     return false;
//   };

//   // Handle Remove Photo
//   const handleRemovePhoto = () => {
//     Modal.confirm({
//       title: 'Remove Profile Picture',
//       content: 'Are you sure you want to remove your profile picture?',
//       okText: 'Remove',
//       okType: 'danger',
//       cancelText: 'Cancel',
//       onOk: () => {
//         setProfileImage('https://ui-avatars.com/api/?name=John+Smith&size=200&background=cccccc&color=666');
//         message.success('Profile picture removed successfully');
//       },
//     });
//   };

//   // Handle Copy Publisher ID
//   const handleCopyPublisherId = () => {
//     navigator.clipboard.writeText(accountInfo.publisherId);
//     message.success('Publisher ID copied to clipboard');
//   };

//   // Handle Email Verification
//   const handleResendEmailVerification = () => {
//     message.info('Verification email sent to ' + formData.email);
//   };

//   // Handle Phone Verification
//   const handleVerifyPhone = () => {
//     message.info('Verification code sent to ' + formData.phone);
//   };

//   // Handle Form Input Change
//   const handleInputChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   // Handle Save Changes
//   const handleSaveChanges = () => {
//     message.success('Profile updated successfully');
//     setIsEditing(false);
//   };

//   // Handle Cancel Edit
//   const handleCancelEdit = () => {
//     setFormData({
//       fullName: 'John Smith',
//       email: 'john.smith@example.com',
//       phone: '+1 (555) 123-4567',
//       country: 'US',
//       timezone: 'America/New_York',
//       language: 'en',
//     });
//     setIsEditing(false);
//     message.info('Changes discarded');
//   };

//   // Handle Change Password
//   const handleChangePassword = (values) => {
//     console.log('Password change values:', values);
//     message.success('Password changed successfully');
//     setIsPasswordModalOpen(false);
//     passwordForm.resetFields();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 lg:p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//             Profile Settings
//           </h1>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             Manage your account information, security settings, and preferences
//           </p>
//         </div>

//         <Row gutter={[24, 24]}>
//           {/* Left Column - Profile & Account Info */}
//           <Col xs={24} lg={8}>
//             <Space direction="vertical" className="w-full" size={24}>
//               {/* Profile Card */}
//               <Card 
//                 className="shadow-lg border-0 rounded-2xl bg-white"
//                 bodyStyle={{ padding: '32px' }}
//               >
//                 <div className="text-center">
//                   <div className="relative inline-block mb-6">
//                     <Avatar 
//                       size={140} 
//                       src={profileImage} 
//                       className="border-4 border-white shadow-xl"
//                     />
//                     <Upload
//                       accept="image/jpeg,image/png"
//                       showUploadList={false}
//                       beforeUpload={handleImageUpload}
//                     >
//                       <div className="absolute bottom-2 right-2 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 hover:scale-110">
//                         <Camera className="w-4 h-4 text-white" />
//                       </div>
//                     </Upload>
//                   </div>
                  
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{formData.fullName}</h3>
//                   <p className="text-gray-500 mb-1">{formData.email}</p>
//                   <Tag color="green" className="mb-6">
//                     {accountInfo.accountStatus}
//                   </Tag>

//                   <Space direction="vertical" className="w-full" size={12}>
//                     <Upload
//                       accept="image/jpeg,image/png"
//                       showUploadList={false}
//                       beforeUpload={handleImageUpload}
//                     >
//                       <Button 
//                         icon={<Camera className="w-4 h-4" />} 
//                         className="w-full h-12 rounded-xl"
//                         size="large"
//                       >
//                         Change Photo
//                       </Button>
//                     </Upload>
//                     <Button
//                       icon={<Trash2 className="w-4 h-4" />}
//                       danger
//                       onClick={handleRemovePhoto}
//                       className="w-full h-12 rounded-xl"
//                       size="large"
//                     >
//                       Remove Photo
//                     </Button>
//                   </Space>
//                 </div>
//               </Card>

//               {/* Account Info Card */}
//               <Card 
//                 className="shadow-lg border-0 rounded-2xl bg-white"
//                 bodyStyle={{ padding: '32px' }}
//               >
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
//                     <Shield className="w-6 h-6 text-emerald-600" />
//                   </div>
//                   <div>
//                     <h2 className="text-lg font-bold text-gray-900">Account Info</h2>
//                     <p className="text-sm text-gray-500">Your account details</p>
//                   </div>
//                 </div>

//                 <Space direction="vertical" className="w-full" size={16}>
//                   {/* Publisher ID */}
//                   <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-xs text-gray-500 mb-1">Publisher ID</p>
//                         <p className="text-sm font-mono font-bold text-gray-900">{accountInfo.publisherId}</p>
//                       </div>
//                       <Tooltip title="Copy ID">
//                         <Button
//                           icon={<Copy className="w-4 h-4" />}
//                           onClick={handleCopyPublisherId}
//                           type="text"
//                           size="small"
//                           className="text-gray-400 hover:text-gray-600"
//                         />
//                       </Tooltip>
//                     </div>
//                   </div>

//                   {/* Member Since */}
//                   <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
//                     <Calendar className="w-5 h-5 text-blue-600" />
//                     <div>
//                       <p className="text-xs text-gray-500">Member Since</p>
//                       <p className="text-sm font-semibold text-gray-900">{accountInfo.memberSince}</p>
//                     </div>
//                   </div>

//                   {/* Last Login */}
//                   <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
//                     <Clock className="w-5 h-5 text-purple-600" />
//                     <div>
//                       <p className="text-xs text-gray-500">Last Login</p>
//                       <p className="text-sm font-semibold text-gray-900">{accountInfo.lastLogin}</p>
//                     </div>
//                   </div>
//                 </Space>
//               </Card>
//             </Space>
//           </Col>

//           {/* Right Column - Forms & Security */}
//           <Col xs={24} lg={16}>
//             <Space direction="vertical" className="w-full" size={24}>
//               {/* Personal Details Card */}
//               <Card 
//                 className="shadow-lg border-0 rounded-2xl bg-white"
//                 bodyStyle={{ padding: '32px' }}
//               >
//                 <div className="flex items-center justify-between mb-8">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                       <User className="w-6 h-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-900">Personal Details</h2>
//                       <p className="text-sm text-gray-500">Update your personal information</p>
//                     </div>
//                   </div>
//                   <Button
//                     icon={<Edit3 className="w-4 h-4" />}
//                     onClick={() => setIsEditing(!isEditing)}
//                     type={isEditing ? "default" : "primary"}
//                     className={isEditing ? "" : "bg-indigo-600 hover:bg-indigo-700"}
//                   >
//                     {isEditing ? 'Editing...' : 'Edit Profile'}
//                   </Button>
//                 </div>

//                 <Row gutter={[24, 24]}>
//                   {/* Full Name */}
//                   <Col xs={24} md={12}>
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-700">
//                         Full Name
//                       </label>
//                       <Input
//                         size="large"
//                         placeholder="Enter your full name"
//                         prefix={<User className="w-4 h-4 text-gray-400" />}
//                         value={formData.fullName}
//                         onChange={(e) => handleInputChange('fullName', e.target.value)}
//                         disabled={!isEditing}
//                         className="rounded-xl h-12"
//                       />
//                     </div>
//                   </Col>

//                   {/* Email */}
//                   <Col xs={24} md={12}>
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-700">
//                         Email Address
//                       </label>
//                       <Input
//                         size="large"
//                         type="email"
//                         placeholder="Enter your email"
//                         prefix={<Mail className="w-4 h-4 text-gray-400" />}
//                         value={formData.email}
//                         onChange={(e) => handleInputChange('email', e.target.value)}
//                         disabled={!isEditing}
//                         className="rounded-xl h-12"
//                         suffix={
//                           isEmailVerified ? (
//                             <Tag color="green" icon={<FaCheckCircle />} className="ml-2">
//                               Verified
//                             </Tag>
//                           ) : (
//                             <Tag color="red" icon={<FaTimesCircle />} className="ml-2">
//                               Unverified
//                             </Tag>
//                           )
//                         }
//                       />
//                       {!isEmailVerified && isEditing && (
//                         <Button
//                           type="link"
//                           size="small"
//                           className="px-0 text-indigo-600 text-xs"
//                           onClick={handleResendEmailVerification}
//                         >
//                           Resend Verification Email
//                         </Button>
//                       )}
//                     </div>
//                   </Col>

//                   {/* Phone */}
//                   <Col xs={24} md={12}>
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-700">
//                         Phone Number
//                       </label>
//                       <Input
//                         size="large"
//                         placeholder="Enter your phone number"
//                         prefix={<Phone className="w-4 h-4 text-gray-400" />}
//                         value={formData.phone}
//                         onChange={(e) => handleInputChange('phone', e.target.value)}
//                         disabled={!isEditing}
//                         className="rounded-xl h-12"
//                         suffix={
//                           isPhoneVerified ? (
//                             <Tag color="green" icon={<FaCheckCircle />} className="ml-2">
//                               Verified
//                             </Tag>
//                           ) : (
//                             <Tag color="orange" icon={<AlertCircle className="w-3 h-3" />} className="ml-2">
//                               Unverified
//                             </Tag>
//                           )
//                         }
//                       />
//                       {!isPhoneVerified && isEditing && (
//                         <Button
//                           type="link"
//                           size="small"
//                           className="px-0 text-indigo-600 text-xs"
//                           onClick={handleVerifyPhone}
//                         >
//                           Verify Phone Number
//                         </Button>
//                       )}
//                     </div>
//                   </Col>

//                   {/* Country */}
//                   <Col xs={24} md={12}>
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-700">
//                         Country
//                       </label>
//                       <Select
//                         size="large"
//                         value={formData.country}
//                         onChange={(value) => handleInputChange('country', value)}
//                         disabled={!isEditing}
//                         className="w-full rounded-xl h-12"
//                         showSearch
//                       >
//                         {countries.map((country) => (
//                           <Option key={country.code} value={country.code}>
//                             <span className="flex items-center gap-2">
//                               <span className="text-lg">{country.flag}</span>
//                               {country.name}
//                             </span>
//                           </Option>
//                         ))}
//                       </Select>
//                     </div>
//                   </Col>

//                   {/* Timezone */}
//                   <Col xs={24} md={12}>
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-700">
//                         Timezone
//                       </label>
//                       <Select
//                         size="large"
//                         value={formData.timezone}
//                         onChange={(value) => handleInputChange('timezone', value)}
//                         disabled={!isEditing}
//                         className="w-full rounded-xl h-12"
//                       >
//                         {timezones.map((tz) => (
//                           <Option key={tz.value} value={tz.value}>
//                             {tz.label}
//                           </Option>
//                         ))}
//                       </Select>
//                     </div>
//                   </Col>

//                   {/* Language */}
//                   <Col xs={24} md={12}>
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-700">
//                         Language
//                       </label>
//                       <Select
//                         size="large"
//                         value={formData.language}
//                         onChange={(value) => handleInputChange('language', value)}
//                         disabled={!isEditing}
//                         className="w-full rounded-xl h-12"
//                       >
//                         {languages.map((lang) => (
//                           <Option key={lang.code} value={lang.code}>
//                             <span className="flex items-center gap-2">
//                               <span className="text-lg">{lang.flag}</span>
//                               {lang.name}
//                             </span>
//                           </Option>
//                         ))}
//                       </Select>
//                     </div>
//                   </Col>
//                 </Row>

//                 {/* Action Buttons */}
//                 {isEditing && (
//                   <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
//                     <Button 
//                       size="large" 
//                       onClick={handleCancelEdit}
//                       className="px-8 rounded-xl h-12"
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       type="primary"
//                       size="large"
//                       icon={<Save className="w-4 h-4" />}
//                       onClick={handleSaveChanges}
//                       className="bg-indigo-600 hover:bg-indigo-700 px-8 rounded-xl h-12"
//                     >
//                       Save Changes
//                     </Button>
//                   </div>
//                 )}
//               </Card>

//               {/* Security Card */}
//               <Card 
//                 className="shadow-lg border-0 rounded-2xl bg-white"
//                 bodyStyle={{ padding: '32px' }}
//               >
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
//                     <Lock className="w-6 h-6 text-red-600" />
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-900">Security</h2>
//                     <p className="text-sm text-gray-500">Manage your account security</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Password Section */}
//                   <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
//                     <div className="flex items-center gap-3 mb-4">
//                       <Lock className="w-5 h-5 text-gray-600" />
//                       <h3 className="font-semibold text-gray-900">Password</h3>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-4">Last changed: 30 days ago</p>
//                     <Button
//                       icon={<Lock className="w-4 h-4" />}
//                       onClick={() => setIsPasswordModalOpen(true)}
//                       className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12"
//                     >
//                       Change Password
//                     </Button>
//                   </div>

//                   {/* Two-Factor Authentication */}
//                   <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
//                     <div className="flex items-center gap-3 mb-4">
//                       <Shield className="w-5 h-5 text-blue-600" />
//                       <h3 className="font-semibold text-gray-900">2FA</h3>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-4">Add extra security to your account</p>
//                     <Button
//                       type="default"
//                       className="w-full rounded-xl h-12 border-blue-200 text-blue-600 hover:text-blue-700"
//                     >
//                       Enable 2FA
//                     </Button>
//                   </div>
//                 </div>
//               </Card>
//             </Space>
//           </Col>
//         </Row>
//       </div>

//       {/* Change Password Modal */}
//       <Modal
//         title={
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
//               <Lock className="w-5 h-5 text-indigo-600" />
//             </div>
//             <div>
//               <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
//               <p className="text-sm text-gray-500">Secure your account with a new password</p>
//             </div>
//           </div>
//         }
//         open={isPasswordModalOpen}
//         onCancel={() => {
//           setIsPasswordModalOpen(false);
//           passwordForm.resetFields();
//         }}
//         footer={null}
//         width={520}
//         className="rounded-2xl"
//       >
//         <Form 
//           form={passwordForm} 
//           layout="vertical" 
//           onFinish={handleChangePassword}
//           className="mt-6"
//         >
//           <Row gutter={[16, 16]}>
//             <Col span={24}>
//               <Form.Item
//                 label="Current Password"
//                 name="currentPassword"
//                 rules={[{ required: true, message: 'Please enter your current password' }]}
//               >
//                 <Input.Password
//                   size="large"
//                   placeholder="Enter current password"
//                   prefix={<Lock className="w-4 h-4 text-gray-400" />}
//                   iconRender={(visible) =>
//                     visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />
//                   }
//                   className="rounded-xl h-12"
//                 />
//               </Form.Item>
//             </Col>

//             <Col span={24}>
//               <Form.Item
//                 label="New Password"
//                 name="newPassword"
//                 rules={[
//                   { required: true, message: 'Please enter new password' },
//                   { min: 8, message: 'Password must be at least 8 characters' },
//                 ]}
//               >
//                 <Input.Password
//                   size="large"
//                   placeholder="Enter new password"
//                   prefix={<Lock className="w-4 h-4 text-gray-400" />}
//                   iconRender={(visible) =>
//                     visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />
//                   }
//                   className="rounded-xl h-12"
//                 />
//               </Form.Item>
//             </Col>

//             <Col span={24}>
//               <Form.Item
//                 label="Confirm New Password"
//                 name="confirmPassword"
//                 dependencies={['newPassword']}
//                 rules={[
//                   { required: true, message: 'Please confirm new password' },
//                   ({ getFieldValue }) => ({
//                     validator(_, value) {
//                       if (!value || getFieldValue('newPassword') === value) {
//                         return Promise.resolve();
//                       }
//                       return Promise.reject(new Error('The two passwords do not match'));
//                     },
//                   }),
//                 ]}
//               >
//                 <Input.Password
//                   size="large"
//                   placeholder="Confirm new password"
//                   prefix={<Lock className="w-4 h-4 text-gray-400" />}
//                   iconRender={(visible) =>
//                     visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />
//                   }
//                   className="rounded-xl h-12"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
//             <p className="text-sm font-semibold text-blue-900 mb-3">Password Requirements:</p>
//             <Row gutter={[8, 8]}>
//               <Col span={12}>
//                 <div className="flex items-center gap-2 text-sm text-blue-700">
//                   <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//                   At least 8 characters
//                 </div>
//               </Col>
//               <Col span={12}>
//                 <div className="flex items-center gap-2 text-sm text-blue-700">
//                   <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//                   Uppercase & lowercase
//                 </div>
//               </Col>
//               <Col span={12}>
//                 <div className="flex items-center gap-2 text-sm text-blue-700">
//                   <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//                   At least one number
//                 </div>
//               </Col>
//               <Col span={12}>
//                 <div className="flex items-center gap-2 text-sm text-blue-700">
//                   <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//                   Special character
//                 </div>
//               </Col>
//             </Row>
//           </div>

//           <div className="flex gap-3">
//             <Button
//               size="large"
//               onClick={() => {
//                 setIsPasswordModalOpen(false);
//                 passwordForm.resetFields();
//               }}
//               className="flex-1 rounded-xl h-12"
//             >
//               Cancel
//             </Button>
//             <Button
//               type="primary"
//               size="large"
//               htmlType="submit"
//               className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl h-12"
//               icon={<Save className="w-4 h-4" />}
//             >
//               Update Password
//             </Button>
//           </div>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ProfileSettingsPage;