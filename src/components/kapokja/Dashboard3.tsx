import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import NewMeeting from "./meeting";
import { RFCActionModal } from "./modal";

const DashboardKapokja: React.FC = () => {
  const [showNewMeeting, setShowNewMeeting] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    action: 'approve' | 'reject' | 'request' | null;
    rfcData?: { id: string; title: string; description: string };
  }>({
    isOpen: false,
    action: null
  });

  const handleRFCAction = (action: 'approve' | 'reject' | 'request', rfcData: { id: string; title: string; description: string }) => {
    setModalState({
      isOpen: true,
      action,
      rfcData
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      action: null
    });
  };

  if (showNewMeeting) {
    return <NewMeeting onBack={() => setShowNewMeeting(false)} />;
  }

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-white border-r border-gray-200 p-5 space-y-6">
        {/* My Pokjas */}
        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">My Pokjas</h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium">📌 Pokja A</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📌 Pokja C</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📌 Cross-Pokja View</div>
          </div>
        </div>

        {/* RFC Technical Review */}
        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">RFC Technical Review</h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📋 Pending Approvals</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">⚙️ Technical Assessment</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📊 Impact Analysis</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">✅ Approved RFCs</div>
          </div>
        </div>

        {/* Projects */}
        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">Projects</h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📌 Project A.1</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📌 Project A.2</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📌 Project C.1</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📌 Project C.2</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-8 space-y-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center pb-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">
            Multi-Pokja Management + RFC Review
          </h1>
          <span className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-1 rounded-md text-sm font-medium">
            Role: Kapokja
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { number: "6", label: "Total Projects" },
            { number: "3", label: "Pending RFC Reviews" },
            { number: "2", label: "Active Conflicts" },
            { number: "78%", label: "Resource Efficiency" },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="text-center py-6">
                <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* RFC Technical Review */}
        <Card>
          <CardHeader>📋 RFC Technical Review & Approval</CardHeader>
          <CardContent className="space-y-4">
            {/* RFC 1 */}
            <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">🔒 RFC-2025-123: User Authentication Enhancement</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Technical Impact Assessment:</h4>
                  <ul className="list-disc pl-4 text-gray-700 space-y-1">
                    <li>Architecture Impact: Medium</li>
                    <li>Security Requirements: High</li>
                    <li>Database Changes: Required</li>
                    <li>Integration Complexity: Low</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Resource Requirements:</h4>
                  <ul className="list-disc pl-4 text-gray-700 space-y-1">
                    <li>Development Team: Pokja A & C</li>
                    <li>Timeline: 4-6 weeks</li>
                    <li>Skills: Security, Frontend</li>
                    <li>Testing: Extensive</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button 
                  variant="primary" 
                  onClick={() => handleRFCAction('approve', { 
                    id: 'RFC-2025-123', 
                    title: 'User Authentication Enhancement', 
                    description: 'Security enhancement for user authentication system with OAuth 2.0 integration' 
                  })}
                >
                  ✅ Approve with Conditions
                </Button>
                <Button 
                  variant="warning" 
                  onClick={() => handleRFCAction('request', { 
                    id: 'RFC-2025-123', 
                    title: 'User Authentication Enhancement', 
                    description: 'Security enhancement for user authentication system with OAuth 2.0 integration' 
                  })}
                >
                  ⚠️ Request Modifications
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleRFCAction('reject', { 
                    id: 'RFC-2025-123', 
                    title: 'User Authentication Enhancement', 
                    description: 'Security enhancement for user authentication system with OAuth 2.0 integration' 
                  })}
                >
                  ❌ Reject
                </Button>
              </div>
            </div>


            {/* RFC 3 - New one for variety */}
            <div className="border border-green-200 bg-green-50 p-4 rounded-md">
              <h3 className="font-semibold text-green-800 mb-2">🔒 RFC-2025-125: Database Migration Strategy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Technical Impact Assessment:</h4>
                  <ul className="list-disc pl-4 text-gray-700 space-y-1">
                    <li>Architecture Impact: High</li>
                    <li>Data Migration: Critical</li>
                    <li>Downtime Required: 2-4 hours</li>
                    <li>Rollback Complexity: High</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Resource Requirements:</h4>
                  <ul className="list-disc pl-4 text-gray-700 space-y-1">
                    <li>Development Team: Cross-Pokja</li>
                    <li>Timeline: 6-8 weeks</li>
                    <li>Skills: Database, DevOps</li>
                    <li>Testing: Comprehensive</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button variant="primary" onClick={() => setShowNewMeeting(true)}>
                  📅 Schedule Meeting
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Allocation & Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resource Allocation */}
          <Card>
            <CardHeader>📊 Resource Allocation Matrix</CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { name: "Rina", role: "Frontend Developer", usage: 95, status: "Conflict", color: "bg-red-500" },
                { name: "Ardica", role: "Backend Developer", usage: 80, status: "Warning", color: "bg-amber-400" },
                { name: "Danu", role: "PIC + Developer", usage: 65, status: "OK", color: "bg-green-500" },
                { name: "Sarah", role: "UI/UX Designer", usage: 45, status: "Available", color: "bg-blue-500" },
                { name: "Budi", role: "DevOps Engineer", usage: 85, status: "Warning", color: "bg-amber-400" },
              ].map((dev, i) => (
                <div key={i} className="border p-3 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{dev.name}</span>
                    <span className="text-xs text-gray-500">{dev.role}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className={`${dev.color} h-2 rounded`} style={{ width: `${dev.usage}%` }}></div>
                  </div>
                  <p className="text-xs mt-1 text-gray-600">{dev.usage}% ({dev.status})</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* RFC Impact */}
          <Card>
            <CardHeader>⚠️ RFC Impact on Current Projects</CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="bg-red-50 border border-red-200 p-3 rounded-md text-red-700">
                <p className="font-semibold">🚨 Critical Resource Impact: RFC-123</p>
                <p className="mt-1">Rina (Frontend) 95% allocated → Potential delay for A.1 & C.1</p>
                <p className="mt-1 font-medium">Recommendation: Defer RFC or reallocate resources</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-md text-amber-700">
                <p className="font-semibold">⚠️ Cross-Pokja Dependencies</p>
                <p className="mt-1">RFC-125 implementation impacts both Pokja A & C → Need coordination</p>
                <p className="mt-1 font-medium">Action: Schedule cross-pokja alignment meeting</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-md text-blue-700">
                <p className="font-semibold">📈 Optimization Opportunity</p>
                <p className="mt-1">Sarah (UI/UX) only 45% allocated → Available for RFC-123 frontend work</p>
                <p className="mt-1 font-medium">Suggestion: Reallocate Sarah to support Rina</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* RFC Action Modal */}
      <RFCActionModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        action={modalState.action}
        rfcData={modalState.rfcData}
      />
    </div>
  );
};

export default DashboardKapokja;