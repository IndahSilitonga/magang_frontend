import React, { useRef, useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";

// Main Dashboard Component
const DashboardDeveloper = () => {
  const [selectedProject, setSelectedProject] = useState("projectA");
  const [timer, setTimer] = useState("02:34:15");
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const handleTimerAction = (action) => {
    if (action === "pause") {
      setIsTimerRunning(false);
    } else if (action === "stop") {
      setIsTimerRunning(false);
      setTimer("00:00:00");
    }
  };

  const menuSections = [
    {
      title: "MY WORK",
      items: [
        { key: "projectA", label: "🅰️ Project A.1 (60%)", active: selectedProject === "projectA" },
        { key: "projectC", label: "🟦 Project C.1 (35%)", active: false },
        { key: "rfc", label: "🟨 RFC-123 Sprint (TBD)", active: false },
        { key: "summary", label: "📊 Workload Summary", active: false },
      ]
    },
    {
      title: "TASKS",
      items: [
        { key: "priority", label: "📋 Priority Queue" },
        { key: "timetracking", label: "⏱️ Time Tracking" },
        { key: "completed", label: "✅ Completed Tasks" },
      ]
    },
    {
      title: "COMMUNICATION",
      items: [
        { key: "chat", label: "💬 Team Chat" },
        { key: "alerts", label: "⚠️ Conflict Alerts" },
        { key: "schedule", label: "📅 Schedule" },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-4 overflow-y-auto">
        {menuSections.map((section, index) => (
          <div key={section.title} className={index < menuSections.length - 1 ? "mb-6" : ""}>
            <h2 className="text-xs font-semibold text-gray-500 mb-2">{section.title}</h2>
            <div className="space-y-1">
              {section.items.map((item) => (
                <div
                  key={item.key}
                  className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                    item.key === selectedProject
                      ? "bg-blue-600 text-white"
                      : item.active
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-50 text-gray-700"
                  }`}
                  onClick={() => setSelectedProject(item.key)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </aside>

      {/* Main Content - Always Workload Summary */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">My Task Queue + RFC Work</h1>
          <div className="bg-yellow-100 border border-yellow-300 rounded-full px-4 py-2 text-sm">
            <span className="font-medium">Role: Developer </span>
          </div>
        </div>

        {/* Main Content - Workload Summary */}
        <div className="space-y-6">
          {/* Alert Banner */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-red-600 text-lg">🚨</span>
              <div>
                <h3 className="text-red-800 font-semibold">NEW: RFC Assignment + Existing Workload</h3>
                <p className="text-red-700 text-sm mt-1">Current: A.1 (60%) + C.1 (35%) = 95%</p>
                <p className="text-red-700 text-sm">Incoming: RFC-123 Sprint Assignment (Strategic Priority)</p>
                <p className="text-red-800 font-medium mt-1">Need priority discussion dengan PIC/Kapolda</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="text-center py-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">95%</div>
                <div className="text-sm text-gray-600">Current Allocation</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center py-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">15</div>
                <div className="text-sm text-gray-600">Active Tasks</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center py-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">1</div>
                <div className="text-sm text-gray-600">RFC Sprint Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center py-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">32h</div>
                <div className="text-sm text-gray-600">Logged This Week</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Priority Task Queue */}
            <div className="col-span-2">
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <span>🎯</span>
                  <span>Priority Task Queue (First-Assign + RFC Rules)</span>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Task 1 */}
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-blue-800">⭐ A.1 - Frontend Components</h4>
                        <p className="text-sm text-blue-700">First-assign priority | Due: March 15</p>
                      </div>
                      <Button variant="blue" size="sm">Start Timer</Button>
                    </div>
                  </div>

                  {/* Task 2 */}
                  <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">⭐ C.1 - User Interface</h4>
                        <p className="text-sm text-gray-700">Second priority | Due: March 15</p>
                      </div>
                      <Button variant="outline" size="sm">Queue</Button>
                    </div>
                  </div>

                  {/* Task 3 */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-yellow-800">📋 RFC-123 - 2FA Security UI</h4>
                        <p className="text-sm text-yellow-700">Strategic RFC | Pending assignment discussion</p>
                      </div>
                      <Button variant="warning" size="sm">Discuss Priority</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Time Tracking */}
            <div>
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>Time Tracking</span>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm font-medium text-green-800">Currently Working: A.1 Frontend</span>
                    </div>
                    <div className="text-3xl font-bold text-green-700 mb-4">02:34:15</div>
                    <div className="flex gap-2">
                      <Button variant="danger" size="sm" onClick={() => handleTimerAction("pause")}>
                        Pause
                      </Button>
                      <Button variant="success" size="sm" onClick={() => handleTimerAction("stop")}>
                        Stop & Log
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-800 mb-3">Today's Log:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>• A.1 Frontend: 2h 34m (ongoing)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• C.1 UI Design: 1h 15m</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• RFC Research: 30m</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Break: 30m</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Weekly Schedule */}
          <Card>
            <CardHeader className="flex items-center gap-2">
              <span>📊</span>
              <span>Weekly Schedule & RFC Integration Planning</span>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-4">Enhanced Schedule View:</p>
                <ul className="text-left text-sm text-gray-700 space-y-1">
                  <li>• Monday-Friday: A.1 vs C.1 time distribution</li>
                  <li>• RFC-123 Sprint timeline integration</li>
                  <li>• Conflict periods highlighted dengan mitigation options</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardDeveloper;