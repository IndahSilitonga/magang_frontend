import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IntegrationTasksProps {
  onBack: () => void;
}

const IntegrationTasks: React.FC<IntegrationTasksProps> = ({ onBack }) => {
  const [activeView, setActiveView] = useState("overview");
  const [selectedIntegration, setSelectedIntegration] = useState("INT-001");
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample integration tasks data
  const integrationData = {
    "INT-001": {
      title: "RFC-123 & Project A.1 Integration",
      description: "Integrate User Authentication system with Frontend Components",
      status: "In Progress",
      priority: "High",
      startDate: "2024-02-15",
      deadline: "2024-02-28",
      progress: 70,
      coordinator: "Andika",
      stakeholders: ["Rina", "Jarmika", "Team A.1"],
      dependencies: [
        { task: "JWT Token Implementation", status: "Completed", owner: "Jarmika" },
        { task: "Auth UI Components", status: "In Progress", owner: "Rina" },
        { task: "API Integration Points", status: "Pending", owner: "Team A.1" }
      ],
      crossTeamTasks: [
        {
          id: "CT-001",
          title: "Define Authentication Endpoints",
          team: "Backend Team",
          assignee: "Jarmika",
          status: "Completed",
          priority: "High"
        },
        {
          id: "CT-002", 
          title: "Implement Auth State Management",
          team: "Frontend Team",
          assignee: "Rina",
          status: "In Progress",
          priority: "High"
        },
        {
          id: "CT-003",
          title: "Update Component Library",
          team: "Project A.1",
          assignee: "Team A.1",
          status: "Pending",
          priority: "Medium"
        }
      ],
      blockers: [
        {
          id: "BLK-001",
          description: "Waiting for security review approval",
          severity: "Medium",
          owner: "Security Team",
          eta: "2024-02-20"
        }
      ]
    },
    "INT-002": {
      title: "RFC-124 & Payment Module Integration", 
      description: "Integrate Payment Gateway with existing checkout system",
      status: "Planning",
      priority: "Medium",
      startDate: "2024-03-01",
      deadline: "2024-03-20",
      progress: 25,
      coordinator: "Sarah",
      stakeholders: ["Budi", "Lina", "Commerce Team"],
      dependencies: [
        { task: "Payment API Setup", status: "In Progress", owner: "Sarah" },
        { task: "Checkout Flow Updates", status: "Pending", owner: "Commerce Team" },
        { task: "Transaction Database Schema", status: "Pending", owner: "Budi" }
      ],
      crossTeamTasks: [
        {
          id: "CT-004",
          title: "Payment Gateway Configuration",
          team: "Backend Team", 
          assignee: "Sarah",
          status: "In Progress",
          priority: "High"
        },
        {
          id: "CT-005",
          title: "Update Checkout UI",
          team: "Commerce Team",
          assignee: "Commerce Team",
          status: "Not Started",
          priority: "Medium"
        }
      ],
      blockers: [
        {
          id: "BLK-002",
          description: "Third-party API documentation incomplete",
          severity: "High",
          owner: "External Vendor",
          eta: "2024-02-25"
        }
      ]
    }
  };

  const currentIntegration = integrationData[selectedIntegration as keyof typeof integrationData];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "text-green-600 bg-green-50 border-green-200";
      case "In Progress": return "text-blue-600 bg-blue-50 border-blue-200";
      case "Pending": 
      case "Not Started": return "text-gray-600 bg-gray-50 border-gray-200";
      case "Planning": return "text-amber-600 bg-amber-50 border-amber-200";
      case "Blocked": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-50 border-red-200";
      case "Medium": return "text-amber-600 bg-amber-50 border-amber-200";
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "text-red-600 bg-red-50";
      case "Medium": return "text-amber-600 bg-amber-50";
      case "Low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Integration Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Active Integrations", value: "2", icon: "🔗", color: "blue" },
          { title: "Cross-team Tasks", value: "5", icon: "👥", color: "green" },
          { title: "Pending Dependencies", value: "4", icon: "⏳", color: "amber" },
          { title: "Critical Blockers", value: "1", icon: "🚫", color: "red" }
        ].map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="text-center py-6">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Integrations */}
      <Card>
        <CardHeader>🔗 Active Integration Projects</CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(integrationData).map(([key, integration]) => (
              <div key={key} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{integration.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{integration.description}</p>
                    <p className="text-gray-500 text-xs mt-2">Coordinator: {integration.coordinator} • Deadline: {integration.deadline}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(integration.priority)}`}>
                      {integration.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(integration.status)}`}>
                      {integration.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{integration.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${integration.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>👥 {integration.stakeholders.length} teams</span>
                    <span>📋 {integration.crossTeamTasks.length} cross-team tasks</span>
                    <span>🚫 {integration.blockers.length} blockers</span>
                  </div>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => {
                      setSelectedIntegration(key);
                      setActiveView("details");
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Cross-team Activities */}
      <Card>
        <CardHeader>📈 Recent Cross-team Activities</CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "1 hour ago", activity: "CT-002: Auth State Management updated by Rina", type: "success", integration: "INT-001" },
              { time: "3 hours ago", activity: "BLK-002: Payment Gateway API documentation delay reported", type: "warning", integration: "INT-002" },
              { time: "5 hours ago", activity: "CT-001: Authentication Endpoints completed by Jarmika", type: "success", integration: "INT-001" },
              { time: "1 day ago", activity: "INT-002: Payment Gateway Integration planning session scheduled", type: "info", integration: "INT-002" },
              { time: "2 days ago", activity: "Cross-team dependency CT-003 assigned to Team A.1", type: "info", integration: "INT-001" }
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                <span className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                }`}></span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.activity}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <span className="text-xs text-blue-600">#{activity.integration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDetails = () => (
    <div className="space-y-6">
      {/* Integration Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">{selectedIntegration}: {currentIntegration.title}</h2>
              <p className="text-gray-600 mt-1">{currentIntegration.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Coordinator: {currentIntegration.coordinator} • 
                Start: {currentIntegration.startDate} • 
                Deadline: {currentIntegration.deadline}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm border ${getPriorityColor(currentIntegration.priority)}`}>
                {currentIntegration.priority} Priority
              </span>
              <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(currentIntegration.status)}`}>
                {currentIntegration.status}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress and Stakeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>📊 Integration Progress</CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Overall Progress</span>
              <span className="text-xl font-bold text-blue-600">{currentIntegration.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${currentIntegration.progress}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 bg-green-50 rounded-md">
                <p className="text-xl font-bold text-green-600">
                  {currentIntegration.dependencies.filter(d => d.status === "Completed").length}
                </p>
                <p className="text-xs text-green-700">Completed</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-md">
                <p className="text-xl font-bold text-blue-600">
                  {currentIntegration.dependencies.filter(d => d.status === "In Progress").length}
                </p>
                <p className="text-xs text-blue-700">In Progress</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-md">
                <p className="text-xl font-bold text-gray-600">
                  {currentIntegration.dependencies.filter(d => d.status === "Pending").length}
                </p>
                <p className="text-xs text-gray-700">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>👥 Stakeholders & Teams</CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-gray-700">Integration Coordinator</h4>
              <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-md">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {currentIntegration.coordinator.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{currentIntegration.coordinator}</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-gray-700">Involved Teams</h4>
              <div className="space-y-2">
                {currentIntegration.stakeholders.map((stakeholder, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md">
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                      {stakeholder.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm">{stakeholder}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <Button variant="primary" size="sm" className="w-full">📞 Schedule Coordination Meeting</Button>
              <Button variant="outline" size="sm" className="w-full">📧 Send Status Update</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cross-team Tasks */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <span>👥 Cross-team Tasks</span>
            <div className="flex space-x-2">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="all">All Status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
              </select>
              <Button variant="primary" size="sm">➕ Add Task</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentIntegration.crossTeamTasks
              .filter(task => filterStatus === "all" || task.status === filterStatus)
              .map((task, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{task.id}: {task.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">Team: {task.team} • Assignee: {task.assignee}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">💬 Comment</Button>
                  <Button variant="outline" size="sm">🔄 Update Status</Button>
                  <Button variant="outline" size="sm">👤 Reassign</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dependencies & Blockers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>🔗 Dependencies</CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentIntegration.dependencies.map((dep, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium text-sm">{dep.task}</p>
                    <p className="text-xs text-gray-600">Owner: {dep.owner}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(dep.status)}`}>
                    {dep.status}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="primary" size="sm" className="w-full mt-4">➕ Add Dependency</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>🚫 Active Blockers</CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentIntegration.blockers.map((blocker, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${getSeverityColor(blocker.severity)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      blocker.severity === 'High' ? 'bg-red-100 text-red-800' :
                      blocker.severity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {blocker.severity} Severity
                    </span>
                    <span className="text-xs text-gray-500">#{blocker.id}</span>
                  </div>
                  <p className="text-sm text-gray-900 mb-2">{blocker.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-600">
                    <span>Owner: {blocker.owner}</span>
                    <span>ETA: {blocker.eta}</span>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button variant="danger" size="sm">🚨 Escalate</Button>
                    <Button variant="outline" size="sm">📝 Update</Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="warning" size="sm" className="w-full mt-4">⚠️ Report New Blocker</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <main className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 font-medium"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Integration Task Management</h1>
          <p className="text-gray-600">Coordinate cross-team efforts and track integration progress</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline">📊 Export Report</Button>
          <Button variant="primary">🔗 Create Integration</Button>
        </div>
      </div>

      {/* View Toggle */}
      {activeView === "details" && (
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveView("overview")}
                >
                  ← Back to Overview
                </Button>
                <select 
                  value={selectedIntegration}
                  onChange={(e) => setSelectedIntegration(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm"
                >
                  {Object.entries(integrationData).map(([key, integration]) => (
                    <option key={key} value={key}>
                      {key} - {integration.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-2">
                <Button variant="warning" size="sm">⚠️ Report Issue</Button>
                <Button variant="success" size="sm">✅ Mark Complete</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content */}
      {activeView === "overview" ? renderOverview() : renderDetails()}
    </main>
  );
};

export default IntegrationTasks;