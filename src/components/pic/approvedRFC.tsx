import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RFC {
  id: string;
  title: string;
  status: string;
  approvedDate: string | null;
  description: string;
  priority: string;
  estimatedEffort: string;
  assignedTeam: string;
  userStories: string[];
  technicalRequirements: string[];
}

interface ApprovedRFCsProps {
  onBack: () => void;
  onViewChange: (view: string) => void;
}

const ApprovedRFCs: React.FC<ApprovedRFCsProps> = ({ onBack, onViewChange }) => {
  const approvedRFCs: RFC[] = [
    {
      id: 'RFC-123',
      title: 'User Authentication System',
      status: 'Ready for Sprint',
      approvedDate: '2024-09-01',
      description: 'Implementation of secure user authentication with 2FA support',
      priority: 'High',
      estimatedEffort: '6-8 weeks',
      assignedTeam: 'Security Team + Backend Team A',
      userStories: [
        'As user, I want secure 2FA login',
        'As admin, I want password policy control',
        'As developer, I want JWT integration',
        'As security team, I want audit logs'
      ],
      technicalRequirements: [
        'JWT token implementation',
        '2FA integration (TOTP)',
        'Password policy enforcement',
        'Audit logging system'
      ]
    },
    {
      id: 'RFC-124',
      title: 'API Rate Limiting',
      status: 'Approved',
      approvedDate: '2024-08-28',
      description: 'Implement rate limiting across all API endpoints',
      priority: 'Medium',
      estimatedEffort: '3-4 weeks',
      assignedTeam: 'Backend Team B + DevOps',
      userStories: [
        'As API consumer, I want fair usage limits',
        'As admin, I want configurable rate limits',
        'As developer, I want rate limit headers',
        'As ops, I want monitoring dashboards'
      ],
      technicalRequirements: [
        'Redis-based rate limiting',
        'Configurable limits per endpoint',
        'Rate limit headers in responses',
        'Monitoring and alerting'
      ]
    },
    {
      id: 'RFC-125',
      title: 'Microservices Logging',
      status: 'In Review',
      approvedDate: null,
      description: 'Centralized logging solution for microservices architecture',
      priority: 'Medium',
      estimatedEffort: '4-5 weeks',
      assignedTeam: 'DevOps + Backend Teams',
      userStories: [
        'As developer, I want centralized logs',
        'As ops, I want log correlation',
        'As support, I want searchable logs',
        'As security, I want audit trails'
      ],
      technicalRequirements: [
        'ELK stack implementation',
        'Log correlation IDs',
        'Structured logging format',
        'Log retention policies'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready for Sprint': return 'bg-green-100 text-green-800 border-green-200';
      case 'Approved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="p-8 space-y-6">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex justify-between items-center pb-5 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">
          ✅ Approved RFCs
        </h1>
        <div className="flex space-x-3">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">Filter RFCs</Button>
          <Button className="bg-green-600 text-white hover:bg-green-700">New RFC</Button>
        </div>
      </div>

      {/* RFC Cards */}
      <div className="space-y-6">
        {approvedRFCs.map((rfc) => (
          <Card key={rfc.id} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {rfc.id}: {rfc.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{rfc.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-md text-sm font-medium border ${getStatusColor(rfc.status)}`}>
                    {rfc.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(rfc.priority)}`}>
                    {rfc.priority} Priority
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Basic Info */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">📋 Basic Information</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><strong>Approved:</strong> {rfc.approvedDate || 'Pending'}</li>
                    <li><strong>Estimated Effort:</strong> {rfc.estimatedEffort}</li>
                    <li><strong>Assigned Team:</strong> {rfc.assignedTeam}</li>
                  </ul>
                </div>

                {/* User Stories */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">👥 User Stories</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {rfc.userStories.map((story, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-1">•</span>
                        <span>{story}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Requirements */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">🔧 Technical Requirements</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {rfc.technicalRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
                {rfc.status === 'Ready for Sprint' ? (
                  <>
                    <Button 
                      className="bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => onViewChange('sprint-creation')}
                    >
                      Create Sprint
                    </Button>
                    <Button className="bg-gray-600 text-white hover:bg-gray-700">View Details</Button>
                  </>
                ) : rfc.status === 'Approved' ? (
                  <>
                    <Button className="bg-amber-600 text-white hover:bg-amber-700">Prepare for Sprint</Button>
                    <Button className="bg-gray-600 text-white hover:bg-gray-700">View Details</Button>
                  </>
                ) : (
                  <>
                    <Button className="bg-gray-400 text-white cursor-not-allowed" disabled>Pending Review</Button>
                    <Button className="bg-gray-600 text-white hover:bg-gray-700">View Details</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default ApprovedRFCs;