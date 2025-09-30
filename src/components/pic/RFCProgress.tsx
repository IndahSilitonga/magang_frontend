import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RFCProgressProps {
  onBack: () => void;
}

const RFCProgress: React.FC<RFCProgressProps> = ({ onBack }) => {
  const [selectedRFC, setSelectedRFC] = useState("RFC-123");
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for RFC progress
  const rfcData = {
    "RFC-123": {
      title: "User Authentication System",
      status: "In Progress",
      progress: 65,
      sprint: "Sprint 2",
      startDate: "2024-01-15",
      expectedEnd: "2024-02-28",
      lead: "Andika",
      team: ["Rina", "Andika", "Jarmika", "Danu"],
      userStories: [
        { id: "US-001", title: "Secure 2FA login", status: "Completed", assignee: "Rina", progress: 100 },
        { id: "US-002", title: "Password policy control", status: "In Progress", assignee: "Andika", progress: 80 },
        { id: "US-003", title: "JWT integration", status: "In Progress", assignee: "Jarmika", progress: 60 },
        { id: "US-004", title: "Security audit logs", status: "Todo", assignee: "Danu", progress: 0 },
      ],
      milestones: [
        { name: "Core Authentication", date: "2024-01-30", status: "Completed" },
        { name: "2FA Implementation", date: "2024-02-10", status: "Completed" },
        { name: "JWT Integration", date: "2024-02-20", status: "In Progress" },
        { name: "Security Testing", date: "2024-02-28", status: "Pending" },
      ],
      risks: [
        { level: "Medium", description: "Potential delay in JWT integration due to external library updates", impact: "Timeline" },
        { level: "Low", description: "Resource conflict with Project A.1", impact: "Resource" },
      ]
    },
    "RFC-124": {
      title: "Payment Gateway Integration",
      status: "Planning",
      progress: 25,
      sprint: "Sprint 1",
      startDate: "2024-02-01",
      expectedEnd: "2024-03-15",
      lead: "Sarah",
      team: ["Sarah", "Budi", "Lina"],
      userStories: [
        { id: "US-005", title: "Payment API integration", status: "In Progress", assignee: "Sarah", progress: 40 },
        { id: "US-006", title: "Transaction logging", status: "Todo", assignee: "Budi", progress: 0 },
        { id: "US-007", title: "Payment validation", status: "Todo", assignee: "Lina", progress: 0 },
      ],
      milestones: [
        { name: "API Setup", date: "2024-02-10", status: "In Progress" },
        { name: "Payment Flow", date: "2024-02-25", status: "Pending" },
        { name: "Testing & Validation", date: "2024-03-15", status: "Pending" },
      ],
      risks: [
        { level: "High", description: "Third-party payment gateway API changes", impact: "Technical" },
      ]
    }
  };

  const currentRFC = rfcData[selectedRFC as keyof typeof rfcData];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "text-green-600 bg-green-50 border-green-200";
      case "In Progress": return "text-blue-600 bg-blue-50 border-blue-200";
      case "Todo": return "text-gray-600 bg-gray-50 border-gray-200";
      case "Planning": return "text-amber-600 bg-amber-50 border-amber-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "High": return "text-red-600 bg-red-50 border-red-200";
      case "Medium": return "text-amber-600 bg-amber-50 border-amber-200";
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Progress Summary */}
      <Card>
        <CardHeader>📊 Progress Summary</CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Overall Progress</span>
            <span className="text-lg font-bold text-blue-600">{currentRFC.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${currentRFC.progress}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-green-50 rounded-md">
              <p className="text-2xl font-bold text-green-600">
                {currentRFC.userStories.filter(us => us.status === "Completed").length}
              </p>
              <p className="text-sm text-green-700">Completed</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-md">
              <p className="text-2xl font-bold text-blue-600">
                {currentRFC.userStories.filter(us => us.status === "In Progress").length}
              </p>
              <p className="text-sm text-blue-700">In Progress</p>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Start Date:</span>
              <span className="font-medium">{currentRFC.startDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Expected End:</span>
              <span className="font-medium">{currentRFC.expectedEnd}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Current Sprint:</span>
              <span className="font-medium">{currentRFC.sprint}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team & Resources */}
      <Card>
        <CardHeader>👥 Team & Resources</CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Sprint Lead</h4>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {currentRFC.lead.charAt(0).toUpperCase()}
              </div>
              <span>{currentRFC.lead}</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Team Members</h4>
            <div className="grid grid-cols-2 gap-2">
              {currentRFC.team.map((member, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                    {member.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">{member}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <Button variant="outline" size="sm" className="w-full">
              🔄 Reassign Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUserStories = () => (
    <Card>
      <CardHeader>📝 User Stories Progress</CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentRFC.userStories.map((story, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{story.id}: {story.title}</h4>
                  <p className="text-sm text-gray-600">Assignee: {story.assignee}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(story.status)}`}>
                  {story.status}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${story.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-600">{story.progress}%</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex space-x-3">
          <Button variant="primary" size="sm">➕ Add User Story</Button>
          <Button variant="outline" size="sm">📊 Export Progress Report</Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderMilestones = () => (
    <Card>
      <CardHeader>🎯 Milestones & Timeline</CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentRFC.milestones.map((milestone, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 border rounded-md">
              <div className={`w-4 h-4 rounded-full ${
                milestone.status === 'Completed' ? 'bg-green-500' : 
                milestone.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-300'
              }`}></div>
              
              <div className="flex-1">
                <h4 className="font-medium">{milestone.name}</h4>
                <p className="text-sm text-gray-600">Target: {milestone.date}</p>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(milestone.status)}`}>
                {milestone.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex space-x-3">
          <Button variant="primary" size="sm">📅 Update Timeline</Button>
          <Button variant="outline" size="sm">🔄 Sync with Sprint Board</Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderRisks = () => (
    <Card>
      <CardHeader>⚠️ Risks & Issues</CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentRFC.risks.map((risk, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs border font-medium ${getRiskColor(risk.level)}`}>
                  {risk.level} Risk
                </span>
                <span className="text-xs text-gray-500">Impact: {risk.impact}</span>
              </div>
              <p className="text-sm text-gray-700">{risk.description}</p>
              
              <div className="mt-3 flex space-x-2">
                <Button variant="outline" size="sm">🔧 Mitigate</Button>
                <Button variant="ghost" size="sm">📋 Create Action Item</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button variant="warning" size="sm">⚠️ Report New Risk</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <main className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-900">RFC Progress Tracking</h1>
          <p className="text-gray-600">Monitor implementation progress and team performance</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline">📊 Generate Report</Button>
          <Button variant="primary">🔄 Sync Status</Button>
        </div>
      </div>

      {/* RFC Selector */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center space-x-4">
            <label className="font-medium text-sm">Select RFC:</label>
            <select 
              value={selectedRFC}
              onChange={(e) => setSelectedRFC(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(rfcData).map(([key, rfc]) => (
                <option key={key} value={key}>
                  {key} - {rfc.title}
                </option>
              ))}
            </select>
            
            <div className="flex items-center space-x-2 ml-auto">
              <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(currentRFC.status)}`}>
                {currentRFC.status}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RFC Details Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{selectedRFC}: {currentRFC.title}</h2>
              <p className="text-sm text-gray-600">Led by {currentRFC.lead} • {currentRFC.team.length} team members</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{currentRFC.progress}%</p>
              <p className="text-sm text-gray-600">Complete</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'stories', label: '📝 User Stories', icon: '📝' },
            { id: 'milestones', label: '🎯 Milestones', icon: '🎯' },
            { id: 'risks', label: '⚠️ Risks', icon: '⚠️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'stories' && renderUserStories()}
        {activeTab === 'milestones' && renderMilestones()}
        {activeTab === 'risks' && renderRisks()}
      </div>
    </main>
  );
};

export default RFCProgress;