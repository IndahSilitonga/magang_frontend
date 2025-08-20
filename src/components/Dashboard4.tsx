import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const DashboardClient: React.FC = () => {
  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-white border-r border-gray-200 p-5 space-y-6">
        {/* RFC Management */}
        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">RFC Management</h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium">📝 Submit New RFC</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📂 My RFCs</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📊 RFC Status</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📈 Progress Tracking</div>
          </div>
        </div>

        {/* Digital Signature */}
        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">Digital Signature</h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">⏳ Pending TTE</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">✅ Signed Documents</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📜 Certificate Management</div>
          </div>
        </div>

        {/* Communication */}
        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">Communication</h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">🔔 Notifications</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📅 Meeting Schedule</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">💬 Discussion Thread</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-8 space-y-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center pb-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">RFC Management Dashboard</h1>
          <span className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-1 rounded-md text-sm font-medium">
            Role: Client
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { number: "8", label: "Total RFCs Submitted" },
            { number: "3", label: "In Progress" },
            { number: "1", label: "Pending TTE" },
            { number: "4", label: "Completed" },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="text-center py-6">
                <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit New RFC */}
        <Card>
          <CardHeader>📝 Submit New RFC</CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="RFC Title (e.g., Enhanced Analytics Dashboard)"
              className="w-full border rounded-md p-2 text-sm"
            />
            <select className="w-full border rounded-md p-2 text-sm">
              <option>High - Business Critical</option>
              <option>Medium - Important</option>
              <option>Low - Optional</option>
            </select>
            <textarea
              placeholder="Business Need Description..."
              className="w-full border rounded-md p-2 text-sm"
              rows={3}
            ></textarea>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="date" className="w-full border rounded-md p-2 text-sm" />
              <input type="number" placeholder="Budget Estimate (e.g., 50000)" className="w-full border rounded-md p-2 text-sm" />
            </div>
            <Button className="bg-blue-600 text-white">Submit RFC for Review</Button>
          </CardContent>
        </Card>

        {/* My RFC Status & Progress */}
        <Card>
          <CardHeader>📂 My RFC Status & Progress</CardHeader>
          <CardContent className="space-y-6">
            {/* RFC-123 */}
            <div className="border rounded-md p-4 space-y-3">
              <p className="font-medium">RFC-2025-123: User Authentication Enhancement</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 rounded">📄 Submitted – Mar 1</span>
                <span className="px-2 py-1 bg-blue-100 rounded">📅 Meeting – Mar 5</span>
                <span className="px-2 py-1 bg-green-100 rounded">✅ Approved – Mar 8</span>
                <span className="px-2 py-1 bg-amber-100 rounded">⏳ TTE Required</span>
                <span className="px-2 py-1 bg-gray-200 rounded">🚀 Implementation Waiting</span>
              </div>
              <Button className="bg-amber-500 text-white">Complete Digital Signature</Button>
            </div>

            {/* RFC-124 */}
            <div className="border rounded-md p-4 space-y-3">
              <p className="font-medium">RFC-2025-124: API Rate Limiting Implementation</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 rounded">📄 Submitted – Mar 10</span>
                <span className="px-2 py-1 bg-blue-100 rounded">📅 Meeting – Mar 15</span>
                <span className="px-2 py-1 bg-yellow-100 rounded">🕒 Review Pending</span>
                <span className="px-2 py-1 bg-amber-100 rounded">⏳ TTE Pending</span>
                <span className="px-2 py-1 bg-gray-200 rounded">🚀 Implementation Pending</span>
              </div>
              <p className="text-xs text-red-500 mt-2">⚠️ Meeting scheduled for March 15 with Direktur</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardClient;
