import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";


const DashboardDirektur: React.FC = () => {
  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-white border-r border-gray-200 p-5">
        {/* Portfolio */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
            Portfolio
          </h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium">
              📊 Executive Overview
            </div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
              📈 Portfolio Analytics
            </div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
              📋 All Projects
            </div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
              👥 Resource Pool
            </div>
          </div>
        </div>

        {/* RFC Management */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
            RFC Management
          </h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
              📋 Pending Approvals
            </div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
              📅 Meeting Schedule
            </div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
              📊 RFC Analytics
            </div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
              🔄 RFC Pipeline
            </div>
          </div>
        </div>

        {/* Reports */}
        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
            Reports
          </h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
              📊 Weekly Reports
            </div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
              📈 Performance
            </div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">
              ⚠️ Risk Assessment
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-8 space-y-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center pb-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            Executive Portfolio + RFC Overview
          </h1>
          <span className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-1 rounded-md text-sm font-medium">
            Role: Direktur
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { number: "12", label: "Active Projects" },
            { number: "5", label: "Pending RFCs" },
            { number: "3", label: "Critical Conflicts" },
            { number: "92%", label: "Resource Utilization" },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="text-center py-6">
                <p className="text-3xl font-bold text-gray-900">{stat.number}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* RFC Pending Approvals */}
        <Card>
          <CardHeader>📋 RFC Pending Approvals (Meeting Required)</CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                id: "RFC-2025-123",
                title: "User Authentication Enhancement",
                submitter: "Client A",
                priority: "HIGH PRIORITY",
                priorityColor: "bg-amber-100 text-amber-700",
                need: "Enhanced security for user login process",
                impact: "4-6 weeks development",
              },
              {
                id: "RFC-2025-124",
                title: "API Rate Limiting",
                submitter: "Client B",
                priority: "MEDIUM PRIORITY",
                priorityColor: "bg-blue-100 text-blue-700",
                need: "Prevent API abuse and improve performance",
                impact: "2-3 weeks development",
              },
            ].map((rfc) => (
              <div
                key={rfc.id}
                className="border rounded-md p-4 bg-white shadow-sm"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  {rfc.id}: {rfc.title}
                </h3>
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Submitted by: {rfc.submitter}</span>
                  <span
                    className={`${rfc.priorityColor} px-2 py-0.5 rounded text-xs font-semibold`}
                  >
                    {rfc.priority}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-2">
                  Business Need: {rfc.need} <br />
                  Estimated Impact: {rfc.impact}
                </p>
                <Button size="sm">Schedule Review Meeting</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pokja Performance */}
          <Card>
            <CardHeader>📊 Pokja Performance + RFC Integration</CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Pokja A (Kapokja: Ika)",
                  projects: "A.1, A.2 + RFC-123 Sprint",
                  progress: "75%",
                  status: "2 MEDIUM",
                  color: "bg-amber-200 text-amber-700",
                },
                {
                  name: "Pokja B (Kapokja: Anang)",
                  projects: "B.1 + RFC Implementation",
                  progress: "55%",
                  status: "NO ISSUES",
                  color: "bg-green-100 text-green-700",
                },
                {
                  name: "Pokja C (Kapokja: Ika)",
                  projects: "C.1, C.2",
                  progress: "90%",
                  status: "1 HIGH",
                  color: "bg-red-100 text-red-700",
                },
              ].map((pokja, i) => (
                <div key={i} className="border rounded-md p-3">
                  <div className="font-semibold text-gray-900 mb-2">
                    {pokja.name}
                  </div>
                  <div className="h-2 bg-gray-100 rounded mb-2">
                    <div
                      className="h-2 bg-blue-500 rounded"
                      style={{ width: pokja.progress }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Projects: {pokja.projects}</span>
                    <span
                      className={`${pokja.color} px-2 py-0.5 rounded text-xs font-semibold`}
                    >
                      {pokja.status}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>⚠️ Critical Alerts & RFC Updates</CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  title: "RFC-123 Approved",
                  desc: "Ready for sprint creation by Danu",
                },
                {
                  title: "Resource Conflict",
                  desc: "Rina overallocation detected A.1 vs C.1",
                },
                {
                  title: "Meeting Required",
                  desc: "RFC-124 technical review scheduled",
                },
              ].map((alert, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {alert.title}
                    </p>
                    <p className="text-xs text-gray-600">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Performance */}
        <Card>
          <CardHeader>📈 Portfolio Performance + RFC Pipeline</CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-sm font-medium text-center">
              Combined Dashboard:
              <br />• Project Progress vs RFC Implementation
              <br />• Resource Utilization with RFC Sprints
              <br />• RFC Approval Timeline & Impact Analysis
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardDirektur;
