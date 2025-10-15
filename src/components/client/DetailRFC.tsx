import React from "react";
import { Button } from "../ui/button";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download,
  AlertCircle,
  Check
} from "lucide-react";

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

interface RFCDetailViewProps {
  rfc: RFC;
  onDigitalSignature?: (rfc: RFC) => void;
}

const RFCDetailView: React.FC<RFCDetailViewProps> = ({ rfc, onDigitalSignature }) => {
  const getRiskColor = (risk: string) => {
    if (risk === "High") return "red";
    if (risk === "Medium") return "yellow";
    return "green";
  };

  return (
    <div className="border-t bg-gray-50">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Project Details */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Project Details</h4>
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
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{rfc.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Cost:</span>
                  <span className="font-medium">{rfc.estimatedCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Completion:</span>
                  <span className="font-medium">{rfc.expectedCompletion}</span>
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
              <h4 className="font-semibold text-gray-900 mb-2">Business Justification</h4>
              <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                {rfc.businessJustification}
              </p>
            </div>

            {rfc.stakeholders.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Stakeholders</h4>
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

          {/* Right Column - Timeline & Attachments */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Detailed Timeline</h4>
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
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed
                          ? "bg-green-500 text-white"
                          : stepIndex === rfc.timeline.findIndex(s => !s.completed)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {step.completed ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold">{stepIndex + 1}</span>
                      )}
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
                          Assigned to: <span className="font-medium">{step.assignedTo}</span>
                        </p>
                      )}
                      
                      {step.estimatedDuration && !step.completed && (
                        <p className="text-xs text-blue-600 mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Estimated: <span className="font-medium">{step.estimatedDuration}</span>
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

            {rfc.attachments.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Attachments</h4>
                <div className="space-y-2">
                  {rfc.attachments.map((attachment, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 flex-1">{attachment}</span>
                      <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Digital Signature Button */}
        {rfc.needsSignature && !rfc.signed && onDigitalSignature && (
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex-1 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-700 font-medium mb-1">
                  Digital Signature Required
                </p>
                <p className="text-xs text-gray-600">
                  This RFC requires approval from Direktur before implementation can proceed
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => onDigitalSignature(rfc)}
              className="bg-amber-500 hover:bg-amber-600 text-white ml-4 flex-shrink-0"
            >
              Sign Document
            </Button>
          </div>
        )}

        {/* Signed Status */}
        {rfc.signed && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4">
            <p className="text-sm text-green-700 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>
                <span className="font-medium">Document signed successfully</span> - 
                Implementation can now proceed
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RFCDetailView;