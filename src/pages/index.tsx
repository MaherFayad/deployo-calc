"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Add this type definition at the top of the file, after imports
type Inputs = {
  dataScientists: number;
  mlEngineers: number;
  devopsEngineers: number;
  projectManagers: number;
  avgDsAnnualSalary: number;
  avgMlAnnualSalary: number;
  avgDevopsAnnualSalary: number;
  avgPmAnnualSalary: number;
  experimentsPerMonth: number;
  experimentTrackingHours: number;
  modelIterations: number;
  dataPreparationHours: number;
  deploymentsPerMonth: number;
  currentDeploymentTime: number;
  deploymentFailureRate: number;
  rollbackTime: number;
  monthlyComputeCosts: number;
  monthlyStorageCosts: number;
  monthlyServingCosts: number;
  gpuUtilization: number;
  monitoringHoursPerWeek: number;
  incidentsPerMonth: number;
  mttr: number;
  driftDetectionDelay: number;
  currentModelAccuracy: number;
  expectedAccuracyGain: number;
  inferenceLatencyMs: number;
  dataQualityIssues: number;
  complianceHoursPerMonth: number;
  auditPreparationDays: number;
  securityIncidentsYear: number;
  modelDocumentationHours: number;
  revenuePerModel: number;
  customerChurn: number;
  customerSatisfaction: number;
  marketSharePercent: number;
  platformSubscription: number;
  implementationCost: number;
  trainingCost: number;
};

// Add these icon components at the top of the file after imports
const RoiIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const SavingsIcon = () => (
  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PaybackIcon = () => (
  <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Add this helper function after the imports
const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

export default function ROICalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    // Team Structure
    dataScientists: 5,
    mlEngineers: 3,
    devopsEngineers: 2,
    projectManagers: 1,
    avgDsAnnualSalary: 150000,
    avgMlAnnualSalary: 160000,
    avgDevopsAnnualSalary: 140000,
    avgPmAnnualSalary: 130000,

    // Current Development
    experimentsPerMonth: 50,
    experimentTrackingHours: 15,
    modelIterations: 10,
    dataPreparationHours: 20,

    // Deployment Process
    deploymentsPerMonth: 2,
    currentDeploymentTime: 2.5,
    deploymentFailureRate: 25,
    rollbackTime: 8,

    // Infrastructure
    monthlyComputeCosts: 15000,
    monthlyStorageCosts: 5000,
    monthlyServingCosts: 10000,
    gpuUtilization: 40,

    // Monitoring & Maintenance
    monitoringHoursPerWeek: 20,
    incidentsPerMonth: 5,
    mttr: 4,
    driftDetectionDelay: 48,

    // Model Performance
    currentModelAccuracy: 85,
    expectedAccuracyGain: 5,
    inferenceLatencyMs: 200,
    dataQualityIssues: 10,

    // Compliance & Risk
    complianceHoursPerMonth: 40,
    auditPreparationDays: 10,
    securityIncidentsYear: 2,
    modelDocumentationHours: 15,

    // Business Impact
    revenuePerModel: 500000,
    customerChurn: 5,
    customerSatisfaction: 85,
    marketSharePercent: 12,

    // Platform Investment
    platformSubscription: 5000,
    implementationCost: 50000,
    trainingCost: 10000,
  });

  const handleSliderChange = (key: keyof Inputs, value: number) => {
    setInputs({ ...inputs, [key]: value });
  };

  const handleInputChange = (key: keyof Inputs, value: string | number) => {
    setInputs({ ...inputs, [key]: Number(value) });
  };

  const calculateComplexROI = () => {
    // Hourly rates
    const hourlyRates = {
      ds: inputs.avgDsAnnualSalary / 2080,
      ml: inputs.avgMlAnnualSalary / 2080,
      devops: inputs.avgDevopsAnnualSalary / 2080,
      pm: inputs.avgPmAnnualSalary / 2080,
    };

    // Development Efficiency
    const experimentationSavings =
      inputs.experimentsPerMonth *
      inputs.experimentTrackingHours *
      0.6 * 
      12 *
      hourlyRates.ds *
      inputs.dataScientists;

    const dataPreparationSavings =
      inputs.dataPreparationHours *
      inputs.deploymentsPerMonth *
      12 *
      hourlyRates.ds *
      inputs.dataScientists *
      0.4;

    // Deployment Efficiency
    const deploymentSavings =
      inputs.currentDeploymentTime *
      160 *
      inputs.deploymentsPerMonth *
      12 *
      (hourlyRates.ml * inputs.mlEngineers + hourlyRates.devops * inputs.devopsEngineers) *
      0.7;

    const failureReductionSavings =
      inputs.deploymentFailureRate *
      0.6 *
      inputs.deploymentsPerMonth *
      12 *
      inputs.rollbackTime *
      (hourlyRates.ml + hourlyRates.devops) *
      (inputs.mlEngineers + inputs.devopsEngineers);

    // Infrastructure Optimization
    const infrastructureSavings =
      ((inputs.monthlyComputeCosts + inputs.monthlyStorageCosts + inputs.monthlyServingCosts) *
        ((100 - inputs.gpuUtilization) / 100) *
        0.4) *
      12;

    // Monitoring & Maintenance
    const monitoringSavings =
      inputs.monitoringHoursPerWeek *
      52 *
      (hourlyRates.ml * inputs.mlEngineers + hourlyRates.devops * inputs.devopsEngineers) *
      0.5;

    const incidentResolutionSavings =
      inputs.incidentsPerMonth *
      12 *
      inputs.mttr *
      (hourlyRates.ml + hourlyRates.devops) *
      (inputs.mlEngineers + inputs.devopsEngineers) *
      0.6;

    // Performance Benefits
    const accuracyBenefit =
      (inputs.expectedAccuracyGain / 100) * inputs.revenuePerModel * inputs.deploymentsPerMonth * 12;

    const latencyBenefit = (inputs.inferenceLatencyMs * 0.3) * (inputs.revenuePerModel * 0.05);

    // Compliance & Risk Benefits
    const complianceSavings =
      inputs.complianceHoursPerMonth *
      12 *
      hourlyRates.ml *
      inputs.mlEngineers *
      0.4;

    const auditSavings =
      inputs.auditPreparationDays *
      8 *
      (hourlyRates.ml + hourlyRates.pm) *
      (inputs.mlEngineers + inputs.projectManagers) *
      0.5;

    // Business Impact
    const timeToMarketBenefit =
      inputs.currentDeploymentTime * 0.7 * (inputs.revenuePerModel * 0.1) * inputs.deploymentsPerMonth * 12;

    const customerRetentionBenefit =
      inputs.customerChurn * 0.2 * inputs.revenuePerModel * 0.1;

    const totalBenefits =
      experimentationSavings +
      dataPreparationSavings +
      deploymentSavings +
      failureReductionSavings +
      infrastructureSavings +
      monitoringSavings +
      incidentResolutionSavings +
      accuracyBenefit +
      latencyBenefit +
      complianceSavings +
      auditSavings +
      timeToMarketBenefit +
      customerRetentionBenefit;

    const annualInvestment = inputs.platformSubscription * 12 + inputs.implementationCost + inputs.trainingCost;

    const roi = ((totalBenefits - annualInvestment) / annualInvestment) * 100;
    const paybackPeriod = annualInvestment / (totalBenefits / 12);

    return {
      roi: roi.toFixed(0),
      annualSavings: totalBenefits.toFixed(0),
      paybackMonths: paybackPeriod.toFixed(1),
      developmentSavings: (experimentationSavings + dataPreparationSavings).toFixed(0),
      deploymentSavings: (deploymentSavings + failureReductionSavings).toFixed(0),
      infrastructureSavings: infrastructureSavings.toFixed(0),
      operationalSavings: (monitoringSavings + incidentResolutionSavings).toFixed(0),
      performanceBenefits: (accuracyBenefit + latencyBenefit).toFixed(0),
      complianceSavings: (complianceSavings + auditSavings).toFixed(0),
      businessImpact: (timeToMarketBenefit + customerRetentionBenefit).toFixed(0),
    };
  };

  const results = calculateComplexROI();

  // Prepare data for the chart (example: monthly savings)
  const monthlySavings = Number(results.annualSavings) / 12;
  const monthlyData = Array.from({ length: 12 }, (_, i) => Math.round(monthlySavings * (i + 1)));

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Cumulative Savings ($)",
        data: monthlyData,
        borderColor: "#ffffff",
        backgroundColor: "rgba(255,255,255,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#FFFFFF",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { 
          color: "#FFFFFF",
          font: {
            size: 12,
          },
        },
        grid: { 
          color: "rgba(255,255,255,0.1)",
          drawBorder: false,
        },
      },
      y: {
        ticks: { 
          color: "#FFFFFF",
          font: {
            size: 12,
          },
          callback: function(tickValue: number | string, index: number, ticks: any[]) {
            return `$${Number(tickValue).toLocaleString()}`;
          },
        },
        grid: { 
          color: "rgba(255,255,255,0.1)",
          drawBorder: false,
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
      line: {
        borderWidth: 3,
      },
    },
  };

  const renderControl = (label: string, key: keyof Inputs, min: number, max: number, step: number = 1) => (
    <div className="space-y-2">
      <Label className="text-white font-regular">{label}</Label>
      <Input
        type="number"
        value={inputs[key]}
        onChange={(e) => handleInputChange(key, e.target.value)}
        className="dark:bg-gray-800 dark:border-gray-700"
      />
      <Slider
        value={[inputs[key]]}
        onValueChange={(val) => handleSliderChange(key, val[0])}
        min={min}
        max={max}
        step={step}
        className="text-purple-500 [&>[data-orientation=horizontal]]:bg-purple-500"
      />
    </div>
  );

  return (
    <div className="w-full min-h-screen dark:bg-gray-900 p-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Input Side */}
        <Card className="dark:bg-gray-800 dark:text-white p-6 border-0 gap-6">
          <CardContent className="space-y-8 gap-6">
            <div>
              <h3 className="text-2xl sm:text-2xl font-semibold text-gray-200 mb-4 sm:mb-4 ">Team Structure</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 font-regular">
                {renderControl("Data Scientists", "dataScientists", 0, 50)}
                {renderControl("ML Engineers", "mlEngineers", 0, 50)}
                {renderControl("DevOps Engineers", "devopsEngineers", 0, 50)}
                {renderControl("Project Managers", "projectManagers", 0, 20)}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-200 mb-4">Deployment Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 font-regular">
                {renderControl("Deployments per Month", "deploymentsPerMonth", 0, 20)}
                {renderControl("Deployment Time (months)", "currentDeploymentTime", 0, 12, 0.1)}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-200 mb-4">Infrastructure</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 font-regular">
                {renderControl("Monthly Compute Costs ($)", "monthlyComputeCosts", 0, 200000, 1000)}
                {renderControl("GPU Utilization (%)", "gpuUtilization", 0, 100, 1)}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-200 mb-4">Platform Investment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-regular">
                {renderControl("Platform Subscription ($/month)", "platformSubscription", 0, 20000, 100)}
                {renderControl("Implementation Cost ($)", "implementationCost", 0, 200000, 1000)}
                {renderControl("Training Cost ($)", "trainingCost", 0, 50000, 1000)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Side */}
        <Card className="dark:bg-gray-800 dark:text-white p-6 space-y-6 border-0">
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-3 sm:grid-cols-1 2xl:grid-cols-3 [max-width:1800px]:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm flex items-start space-x-4">
                  <RoiIcon />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-300 font-medium">ROI</p>
                    <p className="text-3xl font-bold text-gray-400">{results.roi}%</p>
                  </div>
                </div>
                <div className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm flex items-start space-x-4">
                  <SavingsIcon />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-300 font-medium">Annual Savings</p>
                    <p className="text-3xl font-bold text-gray-400">${formatNumber(Number(results.annualSavings))}</p>
                  </div>
                </div>
                <div className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm flex items-start space-x-4">
                  <PaybackIcon />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-300 font-medium">Payback Period</p>
                    <p className="text-3xl font-bold text-gray-400">{results.paybackMonths} mon.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xlg:grid-cols-4 xl:grid-cols-3 gap-6 mt-6">
              {[
                { title: "Development Savings", value: results.developmentSavings },
                { title: "Deployment Savings", value: results.deploymentSavings },
                { title: "Infrastructure Savings", value: results.infrastructureSavings },
                { title: "Operational Savings", value: results.operationalSavings },
                { title: "Performance Benefits", value: results.performanceBenefits },
                { title: "Compliance Savings", value: results.complianceSavings },
                { title: "Business Impact", value: results.businessImpact },
              ].map(({ title, value }) => (
                <div key={title} className="p-6 rounded-lg backdrop-blur-sm transition-colors">
                  <h4 className="font-medium text-gray-300 truncate whitespace-nowrap">{title}</h4>
                  <p className="text-2xl font-bold text-white">${formatNumber(value)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm flex-grow">
              <h3 className="font-semibold mb-6 text-gray-200">Cumulative Savings Trend</h3>
              <div className="w-full h-full min-h-[300px]">
                <Line data={data} options={options} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
