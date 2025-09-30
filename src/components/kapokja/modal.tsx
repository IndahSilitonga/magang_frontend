import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface RFCActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'approve' | 'reject' | 'request' | null;
  rfcData?: {
    id: string;
    title: string;
    description: string;
  };
}

export const RFCActionModal: React.FC<RFCActionModalProps> = ({
  isOpen,
  onClose,
  action,
  rfcData
}) => {
  const [formData, setFormData] = useState({
    comments: "",
    conditions: "",
    reason: "",
    modifications: "",
    assignee: "",
    priority: "medium",
    deadline: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${action} action submitted:`, formData);
    
    // Simulate API call
    setTimeout(() => {
      alert(`RFC ${action} submitted successfully!`);
      onClose();
      setFormData({
        comments: "",
        conditions: "",
        reason: "",
        modifications: "",
        assignee: "",
        priority: "medium",
        deadline: ""
      });
    }, 500);
  };

  if (!isOpen || !action) return null;

  const getModalConfig = () => {
    switch (action) {
      case 'approve':
        return {
          title: '✅ Approve RFC',
          color: 'bg-green-50 border-green-200',
          buttonColor: 'success',
        };
      case 'reject':
        return {
          title: '❌ Reject RFC',
          color: 'bg-red-50 border-red-200',
          buttonColor: 'danger',
        
        };
      case 'request':
        return {
          title: '⚠️ Request Modifications',
          color: 'bg-amber-50 border-amber-200',
          buttonColor: 'warning',
          
        };
      default:
        return {
          title: 'RFC Action',
          icon: '📋',
          color: 'bg-gray-50 border-gray-200',
          buttonColor: 'primary',
          description: ''
        };
    }
  };

  const config = getModalConfig();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`${config.color} px-6 py-4 border-b flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{config.icon}</span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{config.title}</h2>
              <p className="text-sm text-gray-600">{config.description}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </Button>
        </div>

        {/* RFC Info */}
        {rfcData && (
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="font-medium text-gray-900 mb-1">RFC Details</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">{rfcData.id}:</span> {rfcData.title}
            </p>
            <p className="text-sm text-gray-500 mt-1">{rfcData.description}</p>
          </div>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {action === 'approve' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approval Comments
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Add any comments about the approval..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approval Conditions (Optional)
                </label>
                <textarea
                  name="conditions"
                  value={formData.conditions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="List any conditions or requirements for this approval..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  e.g., "Pending security review completion", "Requires load testing"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned to
                  </label>
                  <select
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select assignee</option>
                    <option value="rina">Rina - Frontend Developer</option>
                    <option value="ardica">Ardica - Backend Developer</option>
                    <option value="danu">Danu - PIC + Developer</option>
                    <option value="pokja-a">Pokja A Team</option>
                    <option value="pokja-c">Pokja C Team</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Implementation Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          )}

          {action === 'reject' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason *
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Provide detailed reasoning for rejection..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Concerns
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Detail technical issues, conflicts, or concerns..."
                />
              </div>

              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <h4 className="font-medium text-red-800 mb-2">⚠️ Rejection Impact</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• RFC will be marked as rejected</li>
                  <li>• Submitter will be notified</li>
                  <li>• Implementation will be blocked</li>
                  <li>• RFC can be resubmitted after addressing issues</li>
                </ul>
              </div>
            </div>
          )}

          {action === 'request' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requested Modifications *
                </label>
                <textarea
                  name="modifications"
                  value={formData.modifications}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Detail what changes are needed before approval..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Provide context or suggestions for the requested changes..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="low">🟢 Low Priority</option>
                    <option value="medium">🟡 Medium Priority</option>
                    <option value="high">🔴 High Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Response Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <h4 className="font-medium text-amber-800 mb-2">📝 Next Steps</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• RFC submitter will receive modification request</li>
                  <li>• RFC status will be "Pending Modifications"</li>
                  <li>• Updated RFC will need re-review</li>
                  <li>• Implementation is paused until modifications are made</li>
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-6">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <div className="flex space-x-3">
              <Button variant="ghost" type="button">
                Save as Draft
              </Button>
              <Button variant={config.buttonColor as any} type="submit">
                {action === 'approve' && 'Approve RFC'}
                {action === 'reject' && 'Reject RFC'}
                {action === 'request' && 'Request Modifications'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};