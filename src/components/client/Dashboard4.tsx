import React, { useState, useRef } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";

import SuccessPopup from "./succes";
import DigitalSignatureModal from "./digitalsignature";
import CreateRFC from "./newRFC";
import PendingTTE from "./PendingTTE";
import SignedDocuments from "./SignDocument";

interface TimelineStep {
  status: string;
  date: string;
  completed: boolean;
  assignedTo?: string;
  estimatedDuration?: string;
  notes?: string;
}

interface RFC {
  id: string;
  title: string;
  description: string;
  priority: "High - Business Critical" | "Medium - Important" | "Low - Nice to Have";
  category: string;
  requestor: string;
  department: string;
  estimatedCost: string;
  expectedCompletion: string;
  businessJustification: string;
  technicalComplexity: "Low" | "Medium" | "High";
  riskLevel: "Low" | "Medium" | "High";
  needsSignature: boolean;
  signed: boolean;
  timeline: TimelineStep[];
  attachments: string[];
  stakeholders: string[];
  lastUpdated: string;
  comments: Array<{
    id: string;
    author: string;
    message: string;
    timestamp: string;
    type: "comment" | "status_change" | "approval";
  }>;
}

interface SubmittedRFCData {
  id: string;
  title: string;
  priority: string;
}

interface FormData {
  title: string;
  priority: string;
  description: string;
  deadline: string;
  budget: string;
}

interface Stats {
  total: number;
  inProgress: number;
  pendingTTE: number;
  completed: number;
  rejected: number;
  highPriority: number;
}

type PageType = "dashboard" | "pending-tte" | "signed-docs" | "cert-mgmt" | "meetings" | "discussions";
type MenuType = "submit" | "my-rfcs" | "pending-tte" | "signed-docs" | "cert-mgmt" | "meetings" | "discussions";

// Modal untuk CreateRFC
const CreateRFCModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rfcData: any) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-blue shadow-md">
          <h2 className="text-lg font-semibold">Create New RFC</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Isi form */}
        <div className="p-6">
          <CreateRFC
            onBack={onClose}
            onSubmit={(data) => {
              onSubmit(data);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

const DashboardClient: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [activeMenu, setActiveMenu] = useState<MenuType>("submit");
  const [expandedRFC, setExpandedRFC] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");

  // Popup & Modal state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [isCreateRFCModalOpen, setIsCreateRFCModalOpen] = useState(false);

  const [selectedRfcForSigning, setSelectedRfcForSigning] = useState<RFC | null>(null);
  const [submittedRFC, setSubmittedRFC] = useState<SubmittedRFCData>({
    id: "",
    title: "",
    priority: "",
  });

  const [formData, setFormData] = useState<FormData>({
    title: "",
    priority: "High - Business Critical",
    description: "",
    deadline: "",
    budget: "",
  });

  const [rfcList, setRfcList] = useState<RFC[]>([
    {
      id: "RFC-2025-123",
      title: "User Authentication Enhancement",
      description: "Implement multi-factor authentication and improve password policies to enhance security across all user-facing applications.",
      priority: "High - Business Critical",
      category: "Security",
      requestor: "John Smith",
      department: "IT Security",
      estimatedCost: "$45,000",
      expectedCompletion: "2025-05-15",
      businessJustification: "Critical security enhancement required due to recent security audits and compliance requirements. Will reduce security risks by 85%.",
      technicalComplexity: "High",
      riskLevel: "Medium",
      needsSignature: true,
      signed: false,
      lastUpdated: "2025-03-08",
      attachments: ["security_audit_report.pdf", "technical_specifications.docx"],
      stakeholders: ["IT Security Team", "Development Team", "QA Team", "Legal Department"],
      timeline: [
        { 
          status: "Submitted", 
          date: "2025-03-01", 
          completed: true, 
          assignedTo: "System",
          notes: "Initial submission completed"
        },
        { 
          status: "Initial Review", 
          date: "2025-03-03", 
          completed: true, 
          assignedTo: "Technical Committee",
          estimatedDuration: "2 days",
          notes: "Passed technical feasibility review"
        },
        { 
          status: "Stakeholder Meeting", 
          date: "2025-03-05", 
          completed: true, 
          assignedTo: "Project Manager",
          notes: "All stakeholders approved the proposal"
        },
        { 
          status: "Budget Approval", 
          date: "2025-03-08", 
          completed: true, 
          assignedTo: "Finance Department",
          notes: "Budget of $45,000 approved"
        },
        { 
          status: "TTE Required", 
          date: "", 
          completed: false, 
          assignedTo: "Direktur",
          estimatedDuration: "3-5 days",
          notes: "Awaiting digital signature from Direktur"
        },
        { 
          status: "Implementation Planning", 
          date: "", 
          completed: false, 
          assignedTo: "Development Team",
          estimatedDuration: "1 week"
        },
        { 
          status: "Development", 
          date: "", 
          completed: false, 
          assignedTo: "Development Team",
          estimatedDuration: "6 weeks"
        },
        { 
          status: "Testing & QA", 
          date: "", 
          completed: false, 
          assignedTo: "QA Team",
          estimatedDuration: "2 weeks"
        },
        { 
          status: "Deployment", 
          date: "", 
          completed: false, 
          assignedTo: "DevOps Team",
          estimatedDuration: "1 week"
        }
      ],
      comments: [
        {
          id: "1",
          author: "Technical Committee",
          message: "Technical specifications look solid. Recommend proceeding with implementation.",
          timestamp: "2025-03-03 14:30",
          type: "approval"
        },
        {
          id: "2",
          author: "Finance Department",
          message: "Budget approved. Please ensure cost tracking throughout the project.",
          timestamp: "2025-03-08 09:15",
          type: "approval"
        },
        {
          id: "3",
          author: "Security Team Lead",
          message: "This is critical for our Q2 compliance requirements. Priority should remain high.",
          timestamp: "2025-03-08 16:45",
          type: "comment"
        }
      ]
    },
    {
      id: "RFC-2025-124",
      title: "API Rate Limiting Implementation",
      description: "Implement comprehensive rate limiting across all public APIs to prevent abuse and ensure service stability.",
      priority: "Medium - Important",
      category: "Infrastructure",
      requestor: "Sarah Johnson",
      department: "Platform Engineering",
      estimatedCost: "$28,000",
      expectedCompletion: "2025-04-30",
      businessJustification: "Essential for preventing API abuse and maintaining service quality. Will improve system stability by 40%.",
      technicalComplexity: "Medium",
      riskLevel: "Low",
      needsSignature: false,
      signed: false,
      lastUpdated: "2025-03-15",
      attachments: ["api_analysis.xlsx", "rate_limiting_strategy.pdf"],
      stakeholders: ["Platform Team", "API Users", "Monitoring Team"],
      timeline: [
        { 
          status: "Submitted", 
          date: "2025-03-10", 
          completed: true, 
          assignedTo: "System",
          notes: "Submitted for review"
        },
        { 
          status: "Technical Review", 
          date: "2025-03-12", 
          completed: true, 
          assignedTo: "Architecture Team",
          estimatedDuration: "2 days",
          notes: "Architecture approved with minor modifications"
        },
        { 
          status: "Stakeholder Meeting", 
          date: "2025-03-15", 
          completed: true, 
          assignedTo: "Project Manager",
          notes: "Meeting scheduled and completed. All parties agreed."
        },
        { 
          status: "Implementation Planning", 
          date: "", 
          completed: false, 
          assignedTo: "Platform Team",
          estimatedDuration: "1 week",
          notes: "Waiting for final approval to start planning"
        },
        { 
          status: "Development", 
          date: "", 
          completed: false, 
          assignedTo: "Development Team",
          estimatedDuration: "4 weeks"
        },
        { 
          status: "Testing", 
          date: "", 
          completed: false, 
          assignedTo: "QA Team",
          estimatedDuration: "1 week"
        }
      ],
      comments: [
        {
          id: "1",
          author: "Architecture Team",
          message: "Recommend using Redis for rate limiting storage. More efficient than database approach.",
          timestamp: "2025-03-12 11:20",
          type: "comment"
        },
        {
          id: "2",
          author: "Platform Team Lead",
          message: "Agreed on Redis approach. Will update technical specifications accordingly.",
          timestamp: "2025-03-12 14:10",
          type: "comment"
        }
      ]
    },
    {
      id: "RFC-2025-125",
      title: "Customer Portal Mobile App",
      description: "Develop a mobile application for customer portal to improve user experience and accessibility.",
      priority: "Low - Nice to Have",
      category: "Product Enhancement",
      requestor: "Mike Chen",
      department: "Product Management",
      estimatedCost: "$75,000",
      expectedCompletion: "2025-07-31",
      businessJustification: "Improve customer satisfaction and engagement through mobile accessibility. Expected 25% increase in customer engagement.",
      technicalComplexity: "High",
      riskLevel: "Medium",
      needsSignature: false,
      signed: false,
      lastUpdated: "2025-02-28",
      attachments: ["market_research.pdf", "ux_mockups.figma"],
      stakeholders: ["Product Team", "UX/UI Team", "Mobile Development", "Customer Success"],
      timeline: [
        { 
          status: "Submitted", 
          date: "2025-02-28", 
          completed: true, 
          assignedTo: "System"
        },
        { 
          status: "Market Research", 
          date: "", 
          completed: false, 
          assignedTo: "Product Team",
          estimatedDuration: "2 weeks",
          notes: "Analyzing customer demand and competitor analysis"
        }
      ],
      comments: [
        {
          id: "1",
          author: "Product Manager",
          message: "Need to validate customer demand before proceeding with development.",
          timestamp: "2025-02-28 10:30",
          type: "comment"
        }
      ]
    }
  ]);

  const submitSectionRef = useRef<HTMLDivElement>(null);
  const myRfcSectionRef = useRef<HTMLDivElement>(null);

  // Get filtered and sorted RFC list
  const getFilteredRFCs = () => {
    let filtered = rfcList;

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(rfc => {
        const completedSteps = rfc.timeline.filter(t => t.completed).length;
        const totalSteps = rfc.timeline.length;
        
        switch (filterStatus) {
          case "pending":
            return completedSteps < totalSteps && completedSteps > 0;
          case "completed":
            return completedSteps === totalSteps;
          case "not_started":
            return completedSteps === 0;
          case "needs_signature":
            return rfc.needsSignature && !rfc.signed;
          default:
            return true;
        }
      });
    }

    // Filter by priority
    if (filterPriority !== "all") {
      filtered = filtered.filter(rfc => rfc.priority.includes(filterPriority));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case "priority":
          const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };
          const aPriority = a.priority.includes("High") ? 3 : a.priority.includes("Medium") ? 2 : 1;
          const bPriority = b.priority.includes("High") ? 3 : b.priority.includes("Medium") ? 2 : 1;
          return bPriority - aPriority;
        case "status":
          const aProgress = (a.timeline.filter(t => t.completed).length / a.timeline.length) * 100;
          const bProgress = (b.timeline.filter(t => t.completed).length / b.timeline.length) * 100;
          return bProgress - aProgress;
        default:
          return 0;
      }
    });

    return filtered;
  };

  // Get RFC status
  const getRFCStatus = (rfc: RFC) => {
    const completedSteps = rfc.timeline.filter(t => t.completed).length;
    const totalSteps = rfc.timeline.length;
    const progress = (completedSteps / totalSteps) * 100;
    
    if (progress === 100) return { label: "Completed", color: "green", progress };
    if (progress === 0) return { label: "Not Started", color: "gray", progress };
    if (rfc.needsSignature && !rfc.signed) return { label: "Needs Signature", color: "amber", progress };
    return { label: "In Progress", color: "blue", progress };
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    if (priority.includes("High")) return "red";
    if (priority.includes("Medium")) return "yellow";
    return "green";
  };

  // Get risk color
  const getRiskColor = (risk: string) => {
    if (risk === "High") return "red";
    if (risk === "Medium") return "yellow";
    return "green";
  };

  // Handlers
  const handleRFCSubmit = (rfcData: any): void => {
    const newRfc: RFC = {
      id: rfcData.id,
      title: rfcData.title,
      description: rfcData.description || "No description provided",
      priority: rfcData.impactLevel || "Medium - Important",
      category: rfcData.category || "General",
      requestor: "Current User",
      department: rfcData.department || "Unknown",
      estimatedCost: rfcData.budget || "TBD",
      expectedCompletion: rfcData.deadline || "TBD",
      businessJustification: rfcData.businessJustification || "No justification provided",
      technicalComplexity: "Medium",
      riskLevel: "Low",
      needsSignature: false,
      signed: false,
      lastUpdated: new Date().toISOString().split('T')[0],
      attachments: [],
      stakeholders: [],
      timeline: [
        { 
          status: "Submitted", 
          date: new Date().toISOString().split('T')[0], 
          completed: true,
          assignedTo: "System",
          notes: "RFC submitted successfully"
        },
        { 
          status: "Initial Review", 
          date: "", 
          completed: false,
          assignedTo: "Review Committee",
          estimatedDuration: "2-3 days"
        },
        { 
          status: "Stakeholder Meeting", 
          date: "", 
          completed: false,
          assignedTo: "Project Manager",
          estimatedDuration: "1 week"
        },
        { 
          status: "Implementation Planning", 
          date: "", 
          completed: false,
          assignedTo: "Development Team",
          estimatedDuration: "1 week"
        }
      ],
      comments: []
    };

    setRfcList((prev) => [newRfc, ...prev]);
    setSubmittedRFC({
      id: rfcData.id,
      title: rfcData.title,
      priority: rfcData.impactLevel || "Medium",
    });

    setIsPopupOpen(true);
  };

  const handleClosePopup = (): void => {
    setIsPopupOpen(false);
    setSubmittedRFC({ id: "", title: "", priority: "" });
  };

  const handleSubmitAnother = (): void => {
    setIsPopupOpen(false);
    setSubmittedRFC({ id: "", title: "", priority: "" });
    setIsCreateRFCModalOpen(true);
  };

  const handleDigitalSignature = (rfc: RFC): void => {
    setSelectedRfcForSigning(rfc);
    setIsSignatureModalOpen(true);
  };

  const handleSignatureComplete = (): void => {
    if (!selectedRfcForSigning) return;

    setRfcList((prevList) =>
      prevList.map((rfc) =>
        rfc.id === selectedRfcForSigning.id
          ? {
              ...rfc,
              signed: true,
              needsSignature: false,
              timeline: rfc.timeline.map((t) =>
                t.status === "TTE Required"
                  ? { ...t, completed: true, date: new Date().toISOString().split('T')[0], notes: "Digitally signed by Direktur" }
                  : t.status === "Implementation Planning"
                  ? { ...t, assignedTo: "Development Team" }
                  : t
              ),
            }
          : rfc
      )
    );

    setIsSignatureModalOpen(false);
    setSelectedRfcForSigning(null);
  };

  const handleSidebarClick = (menu: MenuType): void => {
    setActiveMenu(menu);

    switch (menu) {
      case "submit":
        setCurrentPage("dashboard");
        setTimeout(() => {
          submitSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        break;

      case "my-rfcs":
        setCurrentPage("dashboard");
        setTimeout(() => {
          myRfcSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        break;

      case "pending-tte":
        setCurrentPage("pending-tte");
        break;

      case "signed-docs":
        setCurrentPage("signed-docs");
        break;

      default:
        setCurrentPage("dashboard");
        break;
    }
  };

  const stats: Stats = {
    total: rfcList.length,
    inProgress: rfcList.filter(
      (rfc) => rfc.timeline.some((t) => t.completed) && !rfc.timeline.every((step) => step.completed)
    ).length,
    pendingTTE: rfcList.filter((rfc) => rfc.needsSignature && !rfc.signed).length,
    completed: rfcList.filter((rfc) => rfc.timeline.every((t) => t.completed)).length,
    rejected: 0, // You can add rejected RFCs logic
    highPriority: rfcList.filter((rfc) => rfc.priority.includes("High")).length,
  };

  // Render pages
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "pending-tte":
        return <PendingTTE onBack={() => setCurrentPage("dashboard")} />;
      case "signed-docs":
        return <SignedDocuments onBack={() => setCurrentPage("dashboard")} />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {[
          { number: stats.total.toString(), label: "Total RFCs", icon: "📊", color: "blue" },
          { number: stats.inProgress.toString(), label: "In Progress", icon: "⚡", color: "yellow" },
          { number: stats.pendingTTE.toString(), label: "Pending TTE", icon: "⏳", color: "amber" },
          { number: stats.completed.toString(), label: "Completed", icon: "✅", color: "green" },
          { number: stats.rejected.toString(), label: "Rejected", icon: "❌", color: "red" },
          { number: stats.highPriority.toString(), label: "High Priority", icon: "🔥", color: "red" },
        ].map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="text-center py-6">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced My RFC Status */}
      <div ref={myRfcSectionRef} className="scroll-mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <span>📂 My RFC Status & Progress</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {getFilteredRFCs().length} of {stats.total}
              </span>
            </div>
            <Button
              variant="primary"
              onClick={() => setIsCreateRFCModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              Create New RFC
            </Button>
          </CardHeader>
          
          {/* Filters and Sorting */}
          <div className="px-6 pb-4 border-b">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Status:</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="not_started">Not Started</option>
                  <option value="needs_signature">Needs Signature</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Priority:</label>
                <select 
                  value={filterPriority} 
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">All Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="date">Last Updated</option>
                  <option value="priority">Priority</option>
                  <option value="status">Progress</option>
                </select>
              </div>
            </div>
          </div>

          <CardContent className="space-y-6">
            {getFilteredRFCs().length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-lg font-medium mb-2">No RFCs found</p>
                <p>Try adjusting your filters or create a new RFC!</p>
              </div>
            ) : (
              getFilteredRFCs().map((rfc) => {
                const status = getRFCStatus(rfc);
                const isExpanded = expandedRFC === rfc.id;
                
                return (
                  <div
                    key={rfc.id}
                    className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    {/* RFC Header */}
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-semibold text-lg text-gray-900">
                              {rfc.id}: {rfc.title}
                            </p>
                            <span className={`inline-block px-2 py-1 bg-${getPriorityColor(rfc.priority)}-100 text-${getPriorityColor(rfc.priority)}-800 text-xs font-medium rounded-full`}>
                              {rfc.priority.split(' - ')[0]}
                            </span>
                            <span className={`inline-block px-2 py-1 bg-${status.color}-100 text-${status.color}-800 text-xs font-medium rounded-full`}>
                              {status.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{rfc.description}</p>
                          
                          {/* Key Info Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500 block">Category</span>
                              <span className="font-medium">{rfc.category}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Estimated Cost</span>
                              <span className="font-medium">{rfc.estimatedCost}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Expected Completion</span>
                              <span className="font-medium">{rfc.expectedCompletion}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Last Updated</span>
                              <span className="font-medium">{rfc.lastUpdated}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right ml-4">
                          <div className="mb-2">
                            <div className="text-sm text-gray-500">Progress</div>
                            <div className="text-xl font-bold text-gray-900">{Math.round(status.progress)}%</div>
                          </div>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`bg-${status.color}-500 h-2 rounded-full transition-all`} 
                              style={{ width: `${status.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Summary */}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {rfc.timeline.slice(0, 5).map((step, stepIndex) => (
                          <span
                            key={stepIndex}
                            className={`px-3 py-1 rounded-full font-medium ${
                              step.completed
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : step.status === "TTE Required" && rfc.needsSignature
                                ? "bg-amber-100 text-amber-700 border border-amber-200"
                                : "bg-gray-100 text-gray-600 border border-gray-200"
                            }`}
                          >
                            {step.completed ? "✅" : step.status === "TTE Required" && rfc.needsSignature ? "⏳" : "⏸️"}{" "}
                            {step.status} {step.date && `— ${step.date}`}
                          </span>
                        ))}
                        {rfc.timeline.length > 5 && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full font-medium">
                            +{rfc.timeline.length - 5} more
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setExpandedRFC(isExpanded ? null : rfc.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                          >
                            {isExpanded ? "🔼 Hide Details" : "🔽 View Details"}
                          </button>
                          
                          {rfc.attachments.length > 0 && (
                            <span className="text-gray-500 text-sm flex items-center gap-1">
                              📎 {rfc.attachments.length} attachment{rfc.attachments.length > 1 ? 's' : ''}
                            </span>
                          )}
                          
                          {rfc.comments.length > 0 && (
                            <span className="text-gray-500 text-sm flex items-center gap-1">
                              💬 {rfc.comments.length} comment{rfc.comments.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>

                        {rfc.needsSignature && !rfc.signed && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleDigitalSignature(rfc)}
                            className="bg-amber-500 hover:bg-amber-600 text-white"
                          >
                            🔏 Sign Now
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t bg-gray-50">
                        <div className="p-6 space-y-6">
                          {/* Detailed Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">📋 Project Details</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Requestor:</span>
                                    <span className="font-medium">{rfc.requestor}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Department:</span>
                                    <span className="font-medium">{rfc.department}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Technical Complexity:</span>
                                    <span className={`font-medium px-2 py-1 rounded text-xs bg-${getRiskColor(rfc.technicalComplexity)}-100 text-${getRiskColor(rfc.technicalComplexity)}-800`}>
                                      {rfc.technicalComplexity}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Risk Level:</span>
                                    <span className={`font-medium px-2 py-1 rounded text-xs bg-${getRiskColor(rfc.riskLevel)}-100 text-${getRiskColor(rfc.riskLevel)}-800`}>
                                      {rfc.riskLevel}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">💼 Business Justification</h4>
                                <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                                  {rfc.businessJustification}
                                </p>
                              </div>

                              {rfc.stakeholders.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">👥 Stakeholders</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {rfc.stakeholders.map((stakeholder, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                      >
                                        {stakeholder}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="space-y-4">
                              {/* Detailed Timeline */}
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">🔄 Detailed Timeline</h4>
                                <div className="space-y-3">
                                  {rfc.timeline.map((step, stepIndex) => (
                                    <div
                                      key={stepIndex}
                                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                                        step.completed
                                          ? "bg-green-50 border-green-200"
                                          : stepIndex === rfc.timeline.findIndex(s => !s.completed)
                                          ? "bg-blue-50 border-blue-200"
                                          : "bg-gray-50 border-gray-200"
                                      }`}
                                    >
                                      <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                          step.completed
                                            ? "bg-green-500 text-white"
                                            : stepIndex === rfc.timeline.findIndex(s => !s.completed)
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-300 text-gray-600"
                                        }`}
                                      >
                                        {step.completed ? "✓" : stepIndex + 1}
                                      </div>
                                      
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                          <h5 className="font-medium text-sm text-gray-900">
                                            {step.status}
                                          </h5>
                                          {step.date && (
                                            <span className="text-xs text-gray-500">{step.date}</span>
                                          )}
                                        </div>
                                        
                                        {step.assignedTo && (
                                          <p className="text-xs text-gray-600 mb-1">
                                            👤 Assigned to: <span className="font-medium">{step.assignedTo}</span>
                                          </p>
                                        )}
                                        
                                        {step.estimatedDuration && !step.completed && (
                                          <p className="text-xs text-blue-600 mb-1">
                                            ⏱️ Estimated: <span className="font-medium">{step.estimatedDuration}</span>
                                          </p>
                                        )}
                                        
                                        {step.notes && (
                                          <p className="text-xs text-gray-700 italic">{step.notes}</p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Attachments */}
                              {rfc.attachments.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">📎 Attachments</h4>
                                  <div className="space-y-2">
                                    {rfc.attachments.map((attachment, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center gap-2 p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer"
                                      >
                                        <span className="text-blue-500">📄</span>
                                        <span className="text-sm text-gray-700 flex-1">{attachment}</span>
                                        <button className="text-blue-600 hover:text-blue-800 text-xs">
                                          Download
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Comments Section */}
                          {rfc.comments.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">💬 Comments & Updates</h4>
                              <div className="space-y-3 max-h-64 overflow-y-auto">
                                {rfc.comments.map((comment) => (
                                  <div
                                    key={comment.id}
                                    className={`p-3 rounded-lg border-l-4 ${
                                      comment.type === "approval"
                                        ? "bg-green-50 border-l-green-400"
                                        : comment.type === "status_change"
                                        ? "bg-blue-50 border-l-blue-400"
                                        : "bg-gray-50 border-l-gray-400"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-medium text-sm text-gray-900">
                                        {comment.author}
                                      </span>
                                      <div className="flex items-center gap-2">
                                        {comment.type === "approval" && (
                                          <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                                            ✅ Approved
                                          </span>
                                        )}
                                        <span className="text-xs text-gray-500">
                                          {comment.timestamp}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-700">{comment.message}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Action Buttons for Expanded View */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex gap-3">
                              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                📧 Contact Assignee
                              </button>
                              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                📝 Add Comment
                              </button>
                              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                📊 Export Details
                              </button>
                            </div>

                            {rfc.needsSignature && !rfc.signed && (
                              <Button
                                variant="primary"
                                onClick={() => handleDigitalSignature(rfc)}
                                className="bg-amber-500 hover:bg-amber-600 text-white"
                              >
                                🔏 Digital Signature Required
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Action Alerts */}
                    {rfc.needsSignature && !rfc.signed && (
                      <div className="bg-amber-50 border-t border-amber-200 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-amber-800 mb-1">
                              🔏 Digital Signature Required
                            </p>
                            <p className="text-xs text-amber-600">
                              Your digital signature is required to proceed with implementation
                            </p>
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleDigitalSignature(rfc)}
                            className="bg-amber-500 hover:bg-amber-600 text-white"
                          >
                            Sign Now
                          </Button>
                        </div>
                      </div>
                    )}

                    {rfc.signed && (
                      <div className="bg-green-50 border-t border-green-200 p-4">
                        <p className="text-sm text-green-700 flex items-center gap-2">
                          ✅ <span className="font-medium">Document signed successfully</span> - 
                          Implementation can now proceed
                        </p>
                      </div>
                    )}

                    {rfc.id === "RFC-2025-124" && !rfc.signed && (
                      <div className="bg-blue-50 border-t border-blue-200 p-3">
                        <p className="text-sm text-blue-700 flex items-center gap-2">
                          📅 <span className="font-medium">Upcoming:</span> Meeting scheduled for March 15 with Direktur
                        </p>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-white border-r border-gray-200 p-5 space-y-6">
        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">RFC Management</h3>
          <div className="space-y-2">
            <div
              className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
                activeMenu === "submit" ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-700"
              }`}
              onClick={() => handleSidebarClick("submit")}
            >
              📝 Dashboard
            </div>
            <div
              className={`px-4 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                activeMenu === "pending-tte" ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-700"
              }`}
              onClick={() => handleSidebarClick("pending-tte")}
            >
              ⏳ Pending TTE ({stats.pendingTTE})
            </div>
            <div
              className={`px-4 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                activeMenu === "signed-docs" ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-700"
              }`}
              onClick={() => handleSidebarClick("signed-docs")}
            >
              ✅ Signed Documents
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-8 space-y-6">
        <div className="flex justify-between items-center pb-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">RFC Management Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {stats.pendingTTE}
              </span>
            </div>
            <span className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-1 rounded-md text-sm font-medium">
              Role: Client
            </span>
          </div>
        </div>

        {renderCurrentPage()}
      </main>

      {/* Popups & Modals */}
      <SuccessPopup
        isOpen={isPopupOpen}
        rfcId={submittedRFC.id}
        rfcTitle={submittedRFC.title}
        priority={submittedRFC.priority}
        onClose={handleClosePopup}
        onSubmitAnother={handleSubmitAnother}
      />

      <DigitalSignatureModal
        isOpen={isSignatureModalOpen}
        rfcData={selectedRfcForSigning}
        onClose={() => setIsSignatureModalOpen(false)}
        onSignatureComplete={handleSignatureComplete}
      />

      <CreateRFCModal
        isOpen={isCreateRFCModalOpen}
        onClose={() => setIsCreateRFCModalOpen(false)}
        onSubmit={handleRFCSubmit}
      />
    </div>
  );
};

export default DashboardClient;