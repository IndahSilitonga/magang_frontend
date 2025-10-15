import React, { useState, useRef } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  Pause, 
  FileText,
  ChevronDown,
  ChevronUp,
  Paperclip,
  FileX
} from "lucide-react";

import SuccessPopup from "./succes";
import DigitalSignatureModal from "./digitalsignature";
import CreateRFC from "./newRFC";
import PendingTTE from "./PendingTTE";
import SignedDocuments from "./SignDocument";
import RFCDetailView from "./DetailRFC";

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
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b bg-blue shadow-md flex-shrink-0">
          <h2 className="text-lg font-semibold">Create New RFC</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
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
      ]
    }
  ]);

  const submitSectionRef = useRef<HTMLDivElement>(null);
  const myRfcSectionRef = useRef<HTMLDivElement>(null);

  const getFilteredRFCs = () => {
    let filtered = rfcList;

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

    if (filterPriority !== "all") {
      filtered = filtered.filter(rfc => rfc.priority.includes(filterPriority));
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case "priority":
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

  const getRFCStatus = (rfc: RFC) => {
    const completedSteps = rfc.timeline.filter(t => t.completed).length;
    const totalSteps = rfc.timeline.length;
    const progress = (completedSteps / totalSteps) * 100;
    
    if (progress === 100) return { label: "Completed", color: "green", progress };
    if (progress === 0) return { label: "Not Started", color: "gray", progress };
    if (rfc.needsSignature && !rfc.signed) return { label: "Needs Signature", color: "amber", progress };
    return { label: "In Progress", color: "blue", progress };
  };

  const getPriorityColor = (priority: string) => {
    if (priority.includes("High")) return "red";
    if (priority.includes("Medium")) return "yellow";
    return "green";
  };

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
      ]
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
    // Auto-hide any expanded details when popup closes
    setExpandedRFC(null);
  };

  const handleSubmitAnother = (): void => {
    setIsPopupOpen(false);
    setSubmittedRFC({ id: "", title: "", priority: "" });
    setIsCreateRFCModalOpen(true);
    // Auto-hide any expanded details
    setExpandedRFC(null);
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

    // Auto-hide details after signing
    setExpandedRFC(null);
    setIsSignatureModalOpen(false);
    setSelectedRfcForSigning(null);
  };

  const handleSidebarClick = (menu: MenuType): void => {
    setActiveMenu(menu);
    // Auto-hide any expanded details when navigating
    setExpandedRFC(null);

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
    rejected: 0,
    highPriority: rfcList.filter((rfc) => rfc.priority.includes("High")).length,
  };

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { number: stats.total.toString(), label: "Total RFCs", color: "blue" },
          { number: stats.inProgress.toString(), label: "In Progress", color: "yellow" },
          { number: stats.completed.toString(), label: "Completed", color: "green" },     
        ].map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="text-center py-6">
              <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div ref={myRfcSectionRef} className="scroll-mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <span>My RFC Status & Progress</span>
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
                <FileX className="w-16 h-16 mx-auto mb-4 text-gray-400" />
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

                      <div className="flex flex-wrap gap-2 text-xs">
                        {rfc.timeline.slice(0, 5).map((step, stepIndex) => (
                          <span
                            key={stepIndex}
                            className={`px-3 py-1 rounded-full font-medium flex items-center gap-1 ${
                              step.completed
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : step.status === "TTE Required" && rfc.needsSignature
                                ? "bg-amber-100 text-amber-700 border border-amber-200"
                                : "bg-gray-100 text-gray-600 border border-gray-200"
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : step.status === "TTE Required" && rfc.needsSignature ? (
                              <Clock className="w-3 h-3" />
                            ) : (
                              <Pause className="w-3 h-3" />
                            )}
                            {step.status}
                          </span>
                        ))}
                        {rfc.timeline.length > 5 && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full font-medium">
                            +{rfc.timeline.length - 5} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setExpandedRFC(isExpanded ? null : rfc.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                Hide Details
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                View Details
                              </>
                            )}
                          </button>
                          
                          {rfc.attachments.length > 0 && (
                            <span className="text-gray-500 text-sm flex items-center gap-1">
                              <Paperclip className="w-4 h-4" />
                              {rfc.attachments.length} attachment{rfc.attachments.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <RFCDetailView 
                        rfc={rfc} 
                        onDigitalSignature={handleDigitalSignature}
                      />
                    )}

                    {rfc.needsSignature && !rfc.signed && (
                      <div className="bg-amber-50 border-t border-amber-200 p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-amber-700 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">Pending Digital Signature</span> - 
                            This RFC requires approval from Direktur before implementation can proceed
                          </p>
                          {!isExpanded && (
                            <Button
                              variant="primary"
                              onClick={() => handleDigitalSignature(rfc)}
                              className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2"
                            >
                              Sign Now
                            </Button>
                          )}
                        </div>
                      </div>
                    )}

                    {rfc.signed && (
                      <div className="bg-green-50 border-t border-green-200 p-4">
                        <p className="text-sm text-green-700 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="font-medium">Document signed successfully</span> - 
                          Implementation can now proceed
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-gray-50">
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
              Dashboard
            </div>
            <div
              className={`px-4 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                activeMenu === "pending-tte" ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-700"
              }`}
              onClick={() => handleSidebarClick("pending-tte")}
            >
              Pending TTE 
            </div>
            <div
              className={`px-4 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                activeMenu === "signed-docs" ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-700"
              }`}
              onClick={() => handleSidebarClick("signed-docs")}
            >
              Signed Documents
            </div>
          </div>
        </div>
      </aside>

      <main className="p-8 space-y-6">
        <div className="flex justify-between items-center pb-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">RFC Management Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              {stats.pendingTTE > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {stats.pendingTTE}
                </span>
              )}
            </div>
            <span className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-1 rounded-md text-sm font-medium">
              Role: Client
            </span>
          </div>
        </div>

        {renderCurrentPage()}
      </main>

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