import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SprintTask {
  id: string;
  task: string;
  assignee?: string;
  estimate: string;
  priority: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  allocation: string;
  status: string;
}

interface SprintCreationProps {
  onBack: () => void;
}

const SprintCreation: React.FC<SprintCreationProps> = ({ onBack }) => {
  const [sprintName, setSprintName] = useState("");
  const [startDate, setStartDate] = useState("2024-09-10");
  const [duration, setDuration] = useState("2 weeks");
  const [sprintGoal, setSprintGoal] = useState("");

  const availableDevelopers = [
    { name: "Rina", role: "Frontend", allocation: "60%", status: "Available" },
    { name: "Andika", role: "Backend", allocation: "80%", status: "Available" },
    { name: "Jarmika", role: "Security", allocation: "90%", status: "Available" },
    { name: "Danu", role: "Testing", allocation: "70%", status: "Available" },
    { name: "Sarah", role: "DevOps", allocation: "50%", status: "Available" }
  ];

  const [selectedDeveloper, setSelectedDeveloper] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [taskForm, setTaskForm] = useState({
    task: "",
    estimate: "",
    priority: "Medium"
  });
  const [tasks, setTasks] = useState<SprintTask[]>([]);

  const handleAddToTeam = () => {
    if (!selectedDeveloper) {
      alert("Pilih developer terlebih dahulu!");
      return;
    }

    const dev = availableDevelopers.find((d) => d.name === selectedDeveloper);
    if (!dev) return;

    if (teamMembers.find((m) => m.name === dev.name)) {
      alert("Developer ini sudah ditambahkan!");
      return;
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: dev.name,
      role: dev.role,
      allocation: dev.allocation,
      status: dev.status
    };
    setTeamMembers((prev) => [...prev, newMember]);
    setSelectedDeveloper("");
  };

  const handleRemoveFromTeam = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddTask = () => {
    if (!taskForm.task || !taskForm.estimate) {
      alert("Lengkapi semua field task!");
      return;
    }

    const newTask: SprintTask = {
      id: Date.now().toString(),
      task: taskForm.task,
      estimate: taskForm.estimate,
      priority: taskForm.priority
    };
    setTasks((prev) => [...prev, newTask]);
    setTaskForm({ task: "", estimate: "", priority: "Medium" });
  };

  const handleRemoveTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateSprint = () => {
    if (!sprintName || !startDate || !sprintGoal) {
      alert("Lengkapi data sprint terlebih dahulu!");
      return;
    }

    if (teamMembers.length === 0) {
      alert("Tambahkan minimal satu anggota tim!");
      return;
    }

    if (tasks.length === 0) {
      alert("Tambahkan minimal satu task!");
      return;
    }

    console.log("Sprint created:", {
      sprintName,
      startDate,
      duration,
      sprintGoal,
      teamMembers,
      tasks
    });

    alert(`Sprint "${sprintName}" berhasil dibuat dengan ${tasks.length} task.`);
    onBack();
  };

  return (
    <main className="p-8 space-y-6">
      <Card className="border-l-4">
        <CardHeader>
          <div className="bg-green-50 border border-green-200 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              Create Sprint from RFC-123: User Authentication
            </h2>
            <p className="text-green-700">
              This RFC is ready for sprint creation. You can assign team and define tasks below.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Sprint configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sprint detail */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Sprint Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sprint Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    value={sprintName}
                    onChange={(e) => setSprintName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option>2 weeks</option>
                      <option>3 weeks</option>
                      <option>4 weeks</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sprint Goal</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-2 text-sm h-20"
                    value={sprintGoal}
                    onChange={(e) => setSprintGoal(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Team assignment */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Team Assignment</h3>

              <div className="flex space-x-3 mb-4">
                <select
                  value={selectedDeveloper}
                  onChange={(e) => setSelectedDeveloper(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="">Select Developer</option>
                  {availableDevelopers.map((dev, i) => (
                    <option key={i} value={dev.name}>
                      {dev.name} ({dev.role})
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  onClick={handleAddToTeam}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add to Team
                </Button>
              </div>

              {teamMembers.length > 0 ? (
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex justify-between items-center p-3 border border-gray-200 rounded-md"
                    >
                      <div>
                        <span className="font-medium">{member.name}</span>
                        <span className="text-gray-600 text-sm ml-2">({member.role})</span>
                      </div>
                      <button
                        className="text-red-600 text-xs hover:underline"
                        onClick={() => handleRemoveFromTeam(member.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No team members added yet.</p>
              )}
            </div>
          </div>

          {/* Task Management */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Add Sprint Tasks</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <input
                value={taskForm.task}
                onChange={(e) => setTaskForm({ ...taskForm, task: e.target.value })}
                placeholder="Task name"
                className="border px-3 py-2 rounded-md text-sm"
              />
              <input
                value={taskForm.estimate}
                onChange={(e) => setTaskForm({ ...taskForm, estimate: e.target.value })}
                placeholder="Estimate (e.g., 2 days)"
                className="border px-3 py-2 rounded-md text-sm"
              />
              <select
                value={taskForm.priority}
                onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                className="border px-3 py-2 rounded-md text-sm"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <Button
              onClick={handleAddTask}
              type="button"
              className="bg-blue-600 text-white hover:bg-blue-700 mb-4"
            >
              Add Task
            </Button>

            {tasks.length > 0 ? (
              <ul className="space-y-2">
                {tasks.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center bg-gray-50 border rounded-md p-3"
                  >
                    <div>
                      <p className="font-medium text-sm">{t.task}</p>
                      <p className="text-xs text-gray-600">{t.estimate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                          t.priority
                        )}`}
                      >
                        {t.priority}
                      </span>
                      <button
                        className="text-red-600 text-xs hover:underline"
                        onClick={() => handleRemoveTask(t.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No tasks added yet.</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <Button
              className="bg-blue-600 text-white hover:bg-green-700"
              onClick={handleCreateSprint}
            >
              Create Sprint
            </Button>
            <Button
              className="bg-gray-600 text-white hover:bg-gray-700"
              onClick={onBack}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default SprintCreation;
