import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ApprovedRFCs from "./approvedRFC";
import SprintCreation from "./SprintCreation";
import RFCProgress from "./RFCProgress";
import IntegrationTasks from "./TaskIntegration";

const DashboardPIC = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [activeProject, setActiveProject] = useState("A.1");
  const [openSections, setOpenSections] = useState({
    myProjects: true,
    rfcImplementation: true,
    teamManagement: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleProjectClick = (projectId: string) => {
    setActiveProject(projectId);
    setCurrentView("project-detail");
  };

  const handleRFCViewChange = (view: string) => {
    setCurrentView(view);
  };

  // 🔹 Render dashboard utama
  const renderDashboard = () => (
    <main className="p-8 space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center pb-5 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">
          Multi-Project + RFC Management
        </h1>
        <span className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-1 rounded-md text-sm font-medium">
          Role: PIC
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { number: "2", label: "Active Projects" },
          { number: "1", label: "In Progress" },
          { number: "32", label: "Complete" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="text-center py-6">
              <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* RFC Sprint Creation */}
      <Card>
        <CardHeader>RFC Sprint Creation: RFC-123 User Authentication</CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-md">
            <h3 className="font-semibold text-green-800 mb-2">
              RFC-123 Approved - Ready for Sprint Creation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Stories */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Auto-Generated User Stories:</h4>
                <ul className="list-disc pl-4 text-sm text-gray-700 space-y-1">
                  <li>As user, I want secure 2FA login</li>
                  <li>As admin, I want password policy control</li>
                  <li>As developer, I want JWT integration</li>
                  <li>As security team, I want audit logs</li>
                </ul>
              </div>
              {/* Suggested Assignment */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Suggested Team Assignment:</h4>
                <ul className="list-disc pl-4 text-sm text-gray-700 space-y-1">
                  <li>Frontend: Rina (Security UI)</li>
                  <li>Backend: Andika (Auth API)</li>
                  <li>Security: Jarmika (2FA Integration)</li>
                  <li>Testing: Danu (Security Testing)</li>
                </ul>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setCurrentView('sprint-creation')}
              >
                Create Sprint from RFC
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Assignment & Conflicts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Resource Assignment */}
        <Card>
          <CardHeader>Quick Resource Assignment</CardHeader>
          <CardContent className="space-y-4">
            <select className="w-full border rounded-md p-2 text-sm">
              <option>A.1 - Frontend Component Development</option>
            </select>
            <div className="space-y-3">
              <div className="border p-3 rounded-md flex justify-between items-center">
                <span className="text-sm">Rina (Frontend)</span>
                <span className="text-red-600 text-xs">60% allocated - RFC impact</span>
              </div>
              <div className="border p-3 rounded-md flex justify-between items-center">
                <span className="text-sm">Jarmika (Backend)</span>
                <span className="text-green-600 text-xs">85% Available</span>
              </div>
            </div>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Check Conflicts & Assign</Button>
          </CardContent>
        </Card>

        {/* Active Conflicts */}
        <Card>
          <CardHeader>Active Conflicts + RFC Impact</CardHeader>
          <CardContent>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md text-sm text-amber-800">
              <p><strong>RFC-123 Implementation Impact</strong></p>
              <p className="mt-1">
                RFC Sprint akan compete dengan Project A.1 <br />
                Rina Allocation: A.1 (60%) + RFC-123 (40%) = 100% <br />
                Potential timeline impact detected. <br />
                Priority: RFC-123 is strategic initiative.
              </p>
              <Button className="mt-3 bg-amber-500 text-white hover:bg-amber-600">
                Coordinate with Ika
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );

  // 🔹 Render project detail
  const renderProjectDetail = () => (
    <main className="p-8">
      <button
        onClick={() => setCurrentView("dashboard")}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        ← Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold">Detail Project {activeProject}</h1>
      <p className="text-gray-600">Konten detail project bisa dipisah lagi nanti.</p>
    </main>
  );

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return renderDashboard();
      case "project-detail":
        return renderProjectDetail();
      case "approved-rfcs":
        return (
          <ApprovedRFCs
            onBack={() => setCurrentView('dashboard')}
            onViewChange={handleRFCViewChange}
          />
        );
      case "sprint-creation":
        return (
          <SprintCreation
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case "rfc-progress":
        return (
          <RFCProgress
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case "integration-tasks":
        return (
          <IntegrationTasks
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-white border-r border-gray-200 p-5 space-y-6">
        {/* Dashboard Link */}
        <div 
          className={`px-4 py-2 rounded-md text-sm cursor-pointer ${
            currentView === 'dashboard' 
              ? 'bg-blue-600 text-white' 
              : 'hover:bg-blue-50'
          }`}
          onClick={() => setCurrentView('dashboard')}
        >
          Dashboard Overview
        </div>

        {/* My Projects */}
        <div>
          <div 
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md mb-2"
            onClick={() => toggleSection('myProjects')}
          >
            <h3 className="text-xs font-semibold uppercase text-gray-500">
              My Projects
            </h3>
            <span className="text-gray-400 text-sm">
              {openSections.myProjects ? '−' : '+'}
            </span>
          </div>
          {openSections.myProjects && (
            <div className="space-y-2 pl-2">
              <div 
                className={`px-4 py-2 rounded-md text-sm cursor-pointer flex items-center ${
                  currentView === 'project-detail' && activeProject === 'A.1'
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-blue-50'
                }`}
                onClick={() => handleProjectClick('A.1')}
              >
                Project A.1
              </div>
              <div 
                className={`px-4 py-2 rounded-md text-sm cursor-pointer flex items-center ${
                  currentView === 'project-detail' && activeProject === 'B.1'
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-blue-50'
                }`}
                onClick={() => handleProjectClick('B.1')}
              >
                Project B.1
              </div>
            </div>
          )}
        </div>

        {/* RFC Implementation */}
        <div>
          <div 
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md mb-2"
            onClick={() => toggleSection('rfcImplementation')}
          >
            <h3 className="text-xs font-semibold uppercase text-gray-500">
              RFC Implementation
            </h3>
            <span className="text-gray-400 text-sm">
              {openSections.rfcImplementation ? '−' : '+'}
            </span>
          </div>
          {openSections.rfcImplementation && (
            <div className="space-y-2 pl-2">
              <div 
                className={`px-4 py-2 rounded-md text-sm cursor-pointer ${
                  currentView === 'approved-rfcs' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'
                }`}
                onClick={() => handleRFCViewChange('approved-rfcs')}
              >
                Approved RFCs
              </div>
              <div 
                className={`px-4 py-2 rounded-md text-sm cursor-pointer ${
                  currentView === 'sprint-creation' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'
                }`}
                onClick={() => handleRFCViewChange('sprint-creation')}
              >
                Sprint Creation
              </div>
              <div 
                className={`px-4 py-2 rounded-md text-sm cursor-pointer ${
                  currentView === 'rfc-progress' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'
                }`}
                onClick={() => handleRFCViewChange('rfc-progress')}
              >
                RFC Progress
              </div>
              <div 
                className={`px-4 py-2 rounded-md text-sm cursor-pointer ${
                  currentView === 'integration-tasks' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'
                }`}
                onClick={() => handleRFCViewChange('integration-tasks')}
              >
                Integration Tasks
              </div>
            </div>
          )}
        </div>

        {/* Team Management */}
        <div>
          <div 
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md mb-2"
            onClick={() => toggleSection('teamManagement')}
          >
            <h3 className="text-xs font-semibold uppercase text-gray-500">
              Team Management
            </h3>
            <span className="text-gray-400 text-sm">
              {openSections.teamManagement ? '−' : '+'}
            </span>
          </div>
          {openSections.teamManagement && (
            <div className="space-y-2 pl-2">
              <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
                Resource Assignment
              </div>
              <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
                Time Tracking
              </div>
              <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
                Task Management
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      {renderContent()}
    </div>
  );
};

export default DashboardPIC;
