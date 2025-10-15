import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { 
  AlertTriangle, 
  Target, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Calendar, 
  Bell,
  Play,
  Pause,
  Square,
  ListTodo,
  BarChart3,
  Users,
  TrendingUp,
  FileText,
  Timer
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  project: string;
  priority: "high" | "medium" | "low";
  status: "in-progress" | "pending" | "waiting-discussion";
  dueDate: string;
  assignedBy: string;
  estimatedHours: number;
  timeSpent: number;
  description: string;
  isRFC?: boolean;
}

const DashboardDeveloper = () => {
  const [selectedView, setSelectedView] = useState("my-tasks");
  const [activeTimer, setActiveTimer] = useState<string | null>("TASK-001");
  const [timerSeconds, setTimerSeconds] = useState(9255); // 2:34:15
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Sample tasks assigned by PIC
  const [tasks] = useState<Task[]>([
    {
      id: "TASK-001",
      title: "Frontend Components Development",
      project: "Project A.1",
      priority: "high",
      status: "in-progress",
      dueDate: "2025-03-15",
      assignedBy: "John Smith (PIC)",
      estimatedHours: 40,
      timeSpent: 24,
      description: "Develop reusable frontend components for the main dashboard",
      isRFC: false
    },
    {
      id: "TASK-002",
      title: "User Interface Redesign",
      project: "Project C.1",
      priority: "medium",
      status: "pending",
      dueDate: "2025-03-20",
      assignedBy: "Sarah Johnson (PIC)",
      estimatedHours: 30,
      timeSpent: 10.5,
      description: "Redesign user interface based on new mockups",
      isRFC: false
    },
    {
      id: "RFC-123",
      title: "Multi-Factor Authentication UI Implementation",
      project: "RFC-2025-123",
      priority: "high",
      status: "waiting-discussion",
      dueDate: "2025-04-01",
      assignedBy: "Tech Lead (RFC Assignment)",
      estimatedHours: 60,
      timeSpent: 2,
      description: "Implement 2FA security enhancement frontend",
      isRFC: true
    }
  ]);

  const [timeLog] = useState([
    { task: "Frontend Components", duration: "2h 34m", status: "ongoing" },
    { task: "User Interface Design", duration: "1h 15m", status: "completed" },
    { task: "RFC Research & Planning", duration: "30m", status: "completed" },
    { task: "Team Meeting", duration: "45m", status: "completed" }
  ]);

  // New assignments notification
  const [newAssignments] = useState([
    {
      id: "RFC-123",
      title: "Multi-Factor Authentication UI Implementation",
      assignedBy: "Tech Lead",
      assignedAt: "2 hours ago",
      priority: "high",
      isNew: true
    }
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && activeTimer) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, activeTimer]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimerAction = (action: "pause" | "stop" | "start", taskId?: string) => {
    if (action === "pause") {
      setIsTimerRunning(false);
    } else if (action === "stop") {
      setIsTimerRunning(false);
      setActiveTimer(null);
      setTimerSeconds(0);
    } else if (action === "start" && taskId) {
      setActiveTimer(taskId);
      setIsTimerRunning(true);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "red";
      case "medium": return "yellow";
      case "low": return "blue";
      default: return "gray";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress": return "blue";
      case "pending": return "gray";
      case "waiting-discussion": return "amber";
      default: return "gray";
    }
  };

  const currentWorkload = tasks.reduce((acc, task) => {
    const progress = (task.timeSpent / task.estimatedHours) * 100;
    return acc + Math.min(progress, 100);
  }, 0);

  const menuSections = [
    {
      title: "MY WORK",
      items: [
        { key: "my-tasks", label: "My Assigned Tasks", icon: <ListTodo className="w-4 h-4" /> },
        { key: "workload", label: "Workload Summary", icon: <BarChart3 className="w-4 h-4" /> },
        { key: "time-tracking", label: "Time Tracking", icon: <Timer className="w-4 h-4" /> },
      ]
    },
    {
      title: "COLLABORATION",
      items: [
        { key: "team-chat", label: "Team Chat", icon: <MessageSquare className="w-4 h-4" /> },
        { key: "schedule", label: "My Schedule", icon: <Calendar className="w-4 h-4" /> },
        { key: "alerts", label: "Conflict Alerts", icon: <Bell className="w-4 h-4" /> },
      ]
    }
  ];

  const inProgressTasks = tasks.filter(t => t.status === "in-progress");
  const pendingTasks = tasks.filter(t => t.status === "pending");
  const discussionTasks = tasks.filter(t => t.status === "waiting-discussion");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-5 overflow-y-auto">
        {menuSections.map((section, index) => (
          <div key={section.title} className={index < menuSections.length - 1 ? "mb-6" : ""}>
            <h2 className="text-xs font-semibold text-gray-500 mb-2">{section.title}</h2>
            <div className="space-y-1">
              {section.items.map((item) => (
                <div
                  key={item.key}
                  className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-colors flex items-center gap-2 ${
                    item.key === selectedView
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-50 text-gray-700"
                  }`}
                  onClick={() => setSelectedView(item.key)}
                >
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Developer Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">View and manage tasks assigned by PIC</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              {(discussionTasks.length + newAssignments.length) > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {discussionTasks.length + newAssignments.length}
                </span>
              )}
            </div>
            <span className="bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded-md text-sm font-medium">
              Role: Developer
            </span>
          </div>
        </div>

      
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{tasks.length}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
              <div className="text-xs text-gray-500 mt-1">Assigned by PIC</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{inProgressTasks.length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
              <div className="text-xs text-gray-500 mt-1">Active work</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-amber-600 mb-2">{discussionTasks.length}</div>
              <div className="text-sm text-gray-600">Done</div>
              <div className="text-xs text-gray-500 mt-1">RFC assignments</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-green-600 mb-2">32h</div>
              <div className="text-sm text-gray-600">This Week</div>
              <div className="text-xs text-gray-500 mt-1">Time logged</div>
            </CardContent>
          </Card>
        </div>

          {/* Alert Banner for RFC Assignment */}
        {discussionTasks.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-amber-900 font-semibold mb-1">New RFC Assignment Requires Discussion</h3>
                <p className="text-amber-800 text-sm mb-2">
                  Current workload: {Math.round(currentWorkload / tasks.length)}% average capacity
                </p>
                <p className="text-amber-800 text-sm mb-3">
                  RFC-123 Sprint has been assigned but needs priority discussion with PIC/Tech Lead to manage workload conflicts.
                </p>
                <Button variant="warning" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                  Request Priority Meeting
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* New Assignment Notifications */}
        {newAssignments.length > 0 && (
          <div className="space-y-3 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              New Task Assignments
            </h2>
            {newAssignments.map((assignment) => (
              <div key={assignment.id} className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium bg-${getPriorityColor(assignment.priority)}-100 text-${getPriorityColor(assignment.priority)}-800`}>
                        {assignment.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Assigned by <span className="font-medium">{assignment.assignedBy}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {assignment.assignedAt}
                      </span>
                    </div>
                    <div className="mt-3 bg-blue-100 border border-blue-200 rounded p-3">
                      <p className="text-sm text-blue-900 font-medium mb-1">📋 Assignment Details</p>
                      <p className="text-sm text-blue-800">
                        You have been assigned to work on <span className="font-semibold">{assignment.id}</span>. 
                        This is a strategic RFC project requiring your frontend expertise. Please review the requirements and assess timeline feasibility.
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col gap-2">
                    <Button 
                      variant="primary" 
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      Acknowledge
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks List */}
          <div className="lg:col-span-2 space-y-4">
            {/* In Progress Tasks */}
            {inProgressTasks.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center gap-2 border-b">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Currently Working On</span>
                  <span className="ml-auto bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {inProgressTasks.length}
                  </span>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  {inProgressTasks.map((task) => (
                    <div key={task.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{task.title}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium bg-${getPriorityColor(task.priority)}-100 text-${getPriorityColor(task.priority)}-800`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {task.assignedBy}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Due: {task.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress: {task.timeSpent}h / {task.estimatedHours}h</span>
                          <span>{Math.round((task.timeSpent / task.estimatedHours) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min((task.timeSpent / task.estimatedHours) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {activeTimer === task.id && isTimerRunning ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleTimerAction("pause")}
                            className="flex items-center gap-1"
                          >
                            <Pause className="w-3 h-3" />
                            Pause Timer
                          </Button>
                        ) : (
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => handleTimerAction("start", task.id)}
                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Play className="w-3 h-3" />
                            Start Timer
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center gap-2 border-b">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold">Pending Tasks</span>
                  <span className="ml-auto bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                    {pendingTasks.length}
                  </span>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{task.title}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium bg-${getPriorityColor(task.priority)}-100 text-${getPriorityColor(task.priority)}-800`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {task.assignedBy}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Due: {task.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress: {task.timeSpent}h / {task.estimatedHours}h</span>
                          <span>{Math.round((task.timeSpent / task.estimatedHours) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-400 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min((task.timeSpent / task.estimatedHours) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTimerAction("start", task.id)}
                        className="flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        Start Work
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* RFC Tasks Needing Discussion */}
            {discussionTasks.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center gap-2 border-b">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold">RFC Assignments - Needs Discussion</span>
                  <span className="ml-auto bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                    {discussionTasks.length}
                  </span>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  {discussionTasks.map((task) => (
                    <div key={task.id} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{task.title}</h4>
                            <span className="px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">
                              RFC Assignment
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {task.assignedBy}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Due: {task.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-amber-100 border border-amber-300 rounded p-3 mb-3">
                        <p className="text-xs text-amber-900 font-medium mb-1">⚠️ Priority Conflict Detected</p>
                        <p className="text-xs text-amber-800">
                          This RFC assignment may conflict with existing workload. Please discuss priority with PIC before starting.
                        </p>
                      </div>
                      <Button 
                        variant="warning" 
                        size="sm"
                        className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        <MessageSquare className="w-3 h-3" />
                        Request Discussion
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar - Active Timer & Time Log */}
          <div className="space-y-4">
            {/* Active Timer */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 border-b">
                <Timer className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Active Timer</span>
              </CardHeader>
              <CardContent className="pt-4">
                {activeTimer ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                      <span className="text-sm font-medium text-gray-700">
                        {isTimerRunning ? 'Working on' : 'Paused'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium mb-4">
                      {tasks.find(t => t.id === activeTimer)?.title}
                    </p>
                    <div className="text-4xl font-bold text-green-700 mb-4 text-center">
                      {formatTime(timerSeconds)}
                    </div>
                    <div className="flex gap-2">
                      {isTimerRunning ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleTimerAction("pause")}
                          className="flex-1 flex items-center justify-center gap-1"
                        >
                          <Pause className="w-4 h-4" />
                          Pause
                        </Button>
                      ) : (
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={() => setIsTimerRunning(true)}
                          className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700"
                        >
                          <Play className="w-4 h-4" />
                          Resume
                        </Button>
                      )}
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleTimerAction("stop")}
                        className="flex-1 flex items-center justify-center gap-1"
                      >
                        <Square className="w-4 h-4" />
                        Stop & Log
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm">No active timer</p>
                    <p className="text-xs mt-1">Start a task to begin tracking</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Today's Time Log */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 border-b">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Today's Log</span>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {timeLog.map((log, idx) => (
                    <div key={idx} className="flex justify-between items-start text-sm">
                      <div className="flex items-start gap-2 flex-1">
                        {log.status === "ongoing" ? (
                          <Clock className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={log.status === "ongoing" ? "font-medium text-gray-900" : "text-gray-600"}>
                          {log.task}
                        </span>
                      </div>
                      <span className={`text-xs ${log.status === "ongoing" ? "text-green-600 font-medium" : "text-gray-500"}`}>
                        {log.duration}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">Total Today</span>
                    <span className="text-lg font-bold text-blue-600">5h 4m</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Summary */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 border-b">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="font-semibold">This Week</span>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hours Logged</span>
                    <span className="font-semibold text-gray-900">32h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tasks Completed</span>
                    <span className="font-semibold text-gray-900">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Hours/Day</span>
                    <span className="font-semibold text-gray-900">6.4h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardDeveloper;