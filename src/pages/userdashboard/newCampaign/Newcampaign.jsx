import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiPlus,
  FiCopy,
  FiBarChart2,
  FiChevronRight,
  FiImage,
  FiLink,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import "react-tabs/style/react-tabs.css";
import { ReviewStep } from "./ReviewStep";
import { CustomizationStep } from "./CustomizationStep";
import { CampaignRulesStep } from "./CampaignRulesStep";
import { RewardSettingsStep } from "./RewardSettingsStep";
import { BasicInfoStep } from "./BasicInfoStep";
import { StepNavigation } from "./StepNavigation";

export const NewCampaign = ({ isOpen, onClose, onCreate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignData, setCampaignData] = useState({
    name: "",
    targetUrl: "",
    status: "draft",
    rewardType: "percentage",
    rewardAmount: 10,
    rewardTrigger: "signup",
    customReward: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    hasEndDate: false,
    referralLimit: {
      total: "",
      perReferrer: "",
      perReferred: "",
    },
    visibility: "public",
    approvalType: "auto",
    customBanner: "",
    customHeadline: "Refer friends, earn rewards!",
    utmParams: {
      source: "referral",
      medium: "social",
      campaign: "",
    },
    linkFormat: "query",
    customSlug: "",
  });


  const INITIAL_CAMPAIGN_DATA = {
  name: "",
  targetUrl: "",
  status: "draft",
  rewardType: "percentage",
  rewardAmount: 10,
  rewardTrigger: "signup",
  customReward: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: "",
  hasEndDate: false,
  referralLimit: {
    total: "",
    perReferrer: "",
    perReferred: "",
  },
  visibility: "public",
  approvalType: "auto",
  customBanner: "",
  customHeadline: "Refer friends, earn rewards!",
  utmParams: {
    source: "referral",
    medium: "social",
    campaign: "",
  },
  linkFormat: "query",
  customSlug: "",
};


  // Generate referral code and campaign slug on component mount
  useEffect(() => {
    if (isOpen) {
      generateReferralCode();
      generateCampaignSlug();
    }else{
        setCampaignData(INITIAL_CAMPAIGN_DATA);
        setCurrentStep(0);
    }
  }, [isOpen]);

  const generateReferralCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCampaignData((prev) => ({ ...prev, referralCode: result }));
  };

  const generateCampaignSlug = () => {
    const slug = campaignData.name
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 30);
    setCampaignData((prev) => ({ ...prev, customSlug: slug }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentStep < steps.length - 1) {
      nextStep();
      return;
    }

    if (!campaignData.name.trim()) {
      toast.error("Campaign name is required");
      setCurrentStep(0);
      return;
    }
    if (!campaignData.targetUrl.trim() || !isValidUrl(campaignData.targetUrl)) {
      toast.error("Valid target URL is required");
      setCurrentStep(0);
      return;
    }

    const referralLink =
      campaignData.linkFormat === "query"
        ? `https://yourdomain.com?ref=${campaignData.referralCode}`
        : `https://yourdomain.com/campaign/${
            campaignData.customSlug || "ref"
          }/${campaignData.referralCode}`;

    const utmLink = appendUtmParams(
      campaignData.targetUrl,
      campaignData.utmParams.source,
      campaignData.utmParams.medium,
      campaignData.utmParams.campaign || campaignData.name.replace(/\s+/g, "_")
    );

    const newCampaign = {
      id: Date.now(),
      name: campaignData.name,
      status: campaignData.status,
      targetUrl: utmLink,
      clicks: 0,
      conversions: 0,
      roi: 0,
      reward: {
        type: campaignData.rewardType,
        amount: campaignData.rewardAmount,
        custom: campaignData.customReward,
        trigger: campaignData.rewardTrigger,
      },
      duration: {
        start: campaignData.startDate,
        end: campaignData.hasEndDate ? campaignData.endDate : null,
      },
      limits: {
        total: campaignData.referralLimit.total || null,
        perReferrer: campaignData.referralLimit.perReferrer || null,
        perReferred: campaignData.referralLimit.perReferred || null,
      },
      visibility: campaignData.visibility,
      approvalType: campaignData.approvalType,
      customContent: {
        banner: campaignData.customBanner,
        headline: campaignData.customHeadline,
      },
      referralCode: campaignData.referralCode,
      referralLink: referralLink,
      linkFormat: campaignData.linkFormat,
      createdAt: new Date().toISOString(),
    };

    onCreate(newCampaign);
    onClose();
    toast.success("Campaign created successfully!");
  };

  const copyReferralLink = () => {
    const link =
      campaignData.linkFormat === "query"
        ? `${campaignData.targetUrl}?ref=${campaignData.referralCode}`
        : `${campaignData.targetUrl}/campaign/${
            campaignData.customSlug || "ref"
          }/${campaignData.referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied!");
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const appendUtmParams = (url, source, medium, campaign) => {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set("utm_source", source);
      urlObj.searchParams.set("utm_medium", medium);
      urlObj.searchParams.set("utm_campaign", campaign);
      return urlObj.toString();
    } catch (e) {
      return url;
    }
  };

  const calculateEarnings = () => {
    if (campaignData.rewardType === "percentage") {
      return `$${(100 * campaignData.rewardAmount).toFixed(
        2
      )} per $100 in sales`;
    } else if (campaignData.rewardType === "fixed") {
      return `$${campaignData.rewardAmount} per referral`;
    } else {
      return campaignData.customReward || "Custom reward";
    }
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const steps = [
    { name: "Basic Info", icon: <FiBarChart2 /> },
    { name: "Reward Settings", icon: <FiPlus /> },
    { name: "Campaign Rules", icon: <FiLink /> },
    { name: "Customization", icon: <FiImage /> },
    { name: "Review", icon: <FiCopy /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="relative bg-white dark:bg-slate-800 h-fit max-h-[80vh] overflow-auto rounded-lg shadow-xl w-[90%] md:w-full md:max-w-4xl"
          >
            <div className="p-4">
              <div className="sticky top-0 bg-slate-800 border-b-2 mb-2 border-primary pt-2 z-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg uppercase font-semibold text-slate-800 dark:text-slate-200">
                    Create New Campaign
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-slate-400 font-extrabold text-4xl hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    ×
                  </button>
                </div>

                {/* Stepper */}
                <div className="mb-6 overflow-auto">
                  <nav className="flex items-center">
                    <ol className="flex items-center flex-wrap md:space-x-4">
                      {steps.map((step, index) => (
                        <li key={step.name} className="flex items-center">
                          <button
                            onClick={() => setCurrentStep(index)}
                            className={`flex items-center py-1 px-3 rounded-full text-sm font-medium ${
                              currentStep === index
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                                : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                            }`}
                          >
                            <span className="mr-2">{step.icon}</span>
                            {step.name}
                          </button>
                          {index < steps.length - 1 && (
                            <FiChevronRight className="h-4 w-4 text-slate-400" />
                          )}
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Step 1: Basic Info */}
                  {currentStep === 0 && (
                    <BasicInfoStep
                      campaignData={campaignData}
                      setCampaignData={setCampaignData}
                    />
                  )}

                  {/* Step 2: Reward Settings */}
                  {currentStep === 1 && (
                    <RewardSettingsStep
                      campaignData={campaignData}
                      setCampaignData={setCampaignData}
                      calculateEarnings={calculateEarnings}
                    />
                  )}

                  {/* Step 3: Campaign Rules */}
                  {currentStep === 2 && (
                    <CampaignRulesStep
                      campaignData={campaignData}
                      setCampaignData={setCampaignData}
                    />
                  )}

                  {/* Step 4: Customization */}
                  {currentStep === 3 && (
                    <CustomizationStep
                      campaignData={campaignData}
                      setCampaignData={setCampaignData}
                    />
                  )}

                  {/* Step 5: Review */}
                  {currentStep === 4 && (
                    <ReviewStep
                      campaignData={campaignData}
                      copyReferralLink={copyReferralLink}
                      calculateEarnings={calculateEarnings}
                    />
                  )}
                </div>

                <StepNavigation
                  currentStep={currentStep}
                  steps={steps}
                  prevStep={prevStep}
                  nextStep={nextStep}
                  handleSubmit={handleSubmit}
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
