import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface PendingTTEProps {
  onBack?: () => void;
}

interface PendingDocument {
  id: string;
  rfcNumber: string;
  title: string;
  submissionDate: string;
  priority: 'High' | 'Medium' | 'Low';
  requestedBy: string;
  description: string;
  status: 'Waiting for Signature' | 'Ready to Sign' | 'Signature Required';
}

const PendingTTE: React.FC<PendingTTEProps> = ({ onBack }) => {
  const [pendingDocs] = useState<PendingDocument[]>([
    {
      id: '1',
      rfcNumber: 'RFC-2025-123',
      title: 'User Authentication Enhancement',
      submissionDate: '2025-03-01',
      priority: 'High',
      requestedBy: 'Budi Santoso',
      description: 'Implementation of multi-factor authentication system to enhance security',
      status: 'Ready to Sign'
    },
    {
      id: '2',
      rfcNumber: 'RFC-2025-125',
      title: 'Database Performance Optimization',
      submissionDate: '2025-03-05',
      priority: 'Medium',
      requestedBy: 'Siti Nurhaliza',
      description: 'Optimization of database queries and indexing for better performance',
      status: 'Waiting for Signature'
    },
    {
      id: '3',
      rfcNumber: 'RFC-2025-126',
      title: 'Mobile App Security Update',
      submissionDate: '2025-03-08',
      priority: 'High',
      requestedBy: 'Ahmad Rahman',
      description: 'Security patches and encryption improvements for mobile application',
      status: 'Signature Required'
    }
  ]);

  const handleSign = (docId: string) => {
    alert(`Initiating digital signature for document ${docId}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready to Sign': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Waiting for Signature': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Signature Required': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
                {/* Back Button */}
          {onBack && (
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={onBack}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                ← Back to Dashboard
              </Button>
            </div>
          )}
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Pending TTE Documents</h1>
              <p className="text-gray-600">Documents waiting for your digital signature</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                {pendingDocs.length} Documents Pending
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {pendingDocs.filter(doc => doc.status === 'Ready to Sign').length}
              </div>
              <div className="text-sm text-gray-600">Ready to Sign</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-2xl font-bold text-amber-600 mb-1">
                {pendingDocs.filter(doc => doc.status === 'Waiting for Signature').length}
              </div>
              <div className="text-sm text-gray-600">Waiting for Signature</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {pendingDocs.filter(doc => doc.priority === 'High').length}
              </div>
              <div className="text-sm text-gray-600">High Priority</div>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <span>⏳ Documents Requiring Signature</span>
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export List
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingDocs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-lg font-medium mb-2">All caught up!</p>
                <p>No documents pending for signature</p>
              </div>
            ) : (
              pendingDocs.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">{doc.rfcNumber}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(doc.priority)}`}>
                          {doc.priority} Priority
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                      
                      <h4 className="text-base font-medium text-gray-800">{doc.title}</h4>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">{doc.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span>📅 Submitted: {new Date(doc.submissionDate).toLocaleDateString()}</span>
                        <span>👤 Requested by: {doc.requestedBy}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleSign(doc.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Sign Document
                      </Button>
                    </div>
                  </div>
                  
                  {doc.priority === 'High' && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center text-red-700 text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.179 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="font-medium">High Priority:</span> This document requires immediate attention for business-critical operations.
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Button variant="primary" className="flex-1">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Sign All Ready Documents
          </Button>
          <Button variant="outline" className="flex-1">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download All Documents
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PendingTTE;