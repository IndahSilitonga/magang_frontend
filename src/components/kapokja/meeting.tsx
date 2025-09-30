import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface NewMeetingProps {
  onBack: () => void;
}

const NewMeeting: React.FC<NewMeetingProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "technical-review",
    pokja: "",
    date: "",
    time: "",
    duration: "60",
    location: "online",
    customLocation: "",
    agenda: "",
    participants: [] as string[],
    rfcReference: "",
    priority: "medium",
    description: ""
  });

  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const availableParticipants = [
    { id: "rina", name: "Rina", role: "Frontend Developer", pokja: "A" },
    { id: "ardica", name: "Ardica", role: "Backend Developer", pokja: "A" },
    { id: "danu", name: "Danu", role: "PIC + Developer", pokja: "C" },
    { id: "sarah", name: "Sarah", role: "UI/UX Designer", pokja: "A" },
    { id: "budi", name: "Budi", role: "DevOps Engineer", pokja: "C" },
    { id: "lisa", name: "Lisa", role: "QA Tester", pokja: "A" },
    { id: "ahmad", name: "Ahmad", role: "System Analyst", pokja: "C" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleParticipant = (participantId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId) 
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Meeting data:", { ...formData, participants: selectedParticipants });
    alert("Meeting created successfully!");
    onBack();
  };

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      {/* Sidebar - Same as Dashboard */}
      <aside className="bg-white border-r border-gray-200 p-5 space-y-6">
        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">My Pokjas</h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium">📌 Pokja A</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📌 Pokja C</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📌 Cross-Pokja View</div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">RFC Technical Review</h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📋 Pending Approvals</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">⚙️ Technical Assessment</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">📊 Impact Analysis</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">✅ Approved RFCs</div>
          </div>
        </div>

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
      <main className="p-8 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center pb-5 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onBack} size="sm">
              ← Back
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Create New Meeting</h1>
          </div>
          <span className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-1 rounded-md text-sm font-medium">
            Role: Kapokja
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>📝 Basic Information</CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meeting Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., RFC-2025-123 Technical Review"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meeting Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="technical-review">📋 Technical Review</option>
                    <option value="project-planning">📊 Project Planning</option>
                    <option value="resource-allocation">👥 Resource Allocation</option>
                    <option value="cross-pokja-coordination">🔄 Cross-Pokja Coordination</option>
                    <option value="rfc-approval">✅ RFC Approval</option>
                    <option value="status-update">📈 Status Update</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Pokja *
                  </label>
                  <select
                    name="pokja"
                    value={formData.pokja}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Pokja</option>
                    <option value="pokja-a">📌 Pokja A</option>
                    <option value="pokja-c">📌 Pokja C</option>
                    <option value="cross-pokja">📌 Cross-Pokja</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">🟢 Low Priority</option>
                    <option value="medium">🟡 Medium Priority</option>
                    <option value="high">🔴 High Priority</option>
                    <option value="critical">⚠️ Critical</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RFC Reference (optional)
                </label>
                <input
                  type="text"
                  name="rfcReference"
                  value={formData.rfcReference}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., RFC-2025-123"
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>📅 Schedule & Location</CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Location *
                </label>
                <div className="flex flex-wrap gap-4 mb-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value="online"
                      checked={formData.location === "online"}
                      onChange={handleInputChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm">💻 Online Meeting</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value="office"
                      checked={formData.location === "office"}
                      onChange={handleInputChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm">🏢 Office Meeting Room</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value="custom"
                      checked={formData.location === "custom"}
                      onChange={handleInputChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm">📍 Custom Location</span>
                  </label>
                </div>
                {formData.location === "custom" && (
                  <input
                    type="text"
                    name="customLocation"
                    value={formData.customLocation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter custom location"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Participants */}
          <Card>
            <CardHeader>👥 Meeting Participants</CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Select team members to invite:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedParticipants.includes(participant.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleParticipant(participant.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedParticipants.includes(participant.id)}
                        onChange={() => toggleParticipant(participant.id)}
                        className="mt-1 text-blue-600"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{participant.name}</p>
                        <p className="text-sm text-gray-600">{participant.role}</p>
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          Pokja {participant.pokja}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Agenda */}
          <Card>
            <CardHeader>📋 Meeting Agenda & Notes</CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meeting Agenda *
                  </label>
                  <textarea
                    name="agenda"
                    value={formData.agenda}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the main topics and agenda items for this meeting..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any additional context, preparation requirements, or important notes..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Button variant="outline" type="button" onClick={onBack}>
              Cancel
            </Button>
            <div className="flex space-x-3">
              <Button variant="ghost" type="button">
                Save as Draft
              </Button>
              <Button variant="primary" type="submit">
                Create Meeting
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewMeeting;