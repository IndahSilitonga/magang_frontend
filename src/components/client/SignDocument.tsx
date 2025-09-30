import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface SignedDocument {
  id: string;
  rfcId: string;
  title: string;
  signedDate: string;
  signedBy: string;
  documentType: string;
  priority: string;
  status: string;
  implementationStatus: string;
  fileSize: string;
}

interface SignedDocumentsProps {
  onBack: () => void;
}

const SignedDocuments: React.FC<SignedDocumentsProps> = ({ onBack }) => {
  // Sample signed documents data
  const [signedDocuments] = useState<SignedDocument[]>([
    {
      id: "DOC-2025-001",
      rfcId: "RFC-2025-123",
      title: "User Authentication Enhancement",
      signedDate: "2025-03-08",
      signedBy: "John Doe",
      documentType: "Technical Specification",
      priority: "High - Business Critical",
      status: "Signed & Approved",
      implementationStatus: "In Progress",
      fileSize: "2.3 MB"
    },
    {
      id: "DOC-2025-002",
      rfcId: "RFC-2025-122",
      title: "Database Migration Strategy",
      signedDate: "2025-03-05",
      signedBy: "John Doe",
      documentType: "Implementation Plan",
      priority: "High - Business Critical",
      status: "Signed & Approved",
      implementationStatus: "Completed",
      fileSize: "1.8 MB"
    },
    {
      id: "DOC-2025-003",
      rfcId: "RFC-2025-121",
      title: "API Security Enhancement",
      signedDate: "2025-03-01",
      signedBy: "John Doe",
      documentType: "Security Protocol",
      priority: "Medium",
      status: "Signed & Approved",
      implementationStatus: "Completed",
      fileSize: "3.1 MB"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter documents based on search and status
  const filteredDocuments = signedDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.rfcId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || doc.implementationStatus.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (doc: SignedDocument) => {
    // Simulate download functionality
    console.log(`Downloading document: ${doc.title}`);
    alert(`Downloading ${doc.title} (${doc.fileSize})`);
  };

  const handleViewDetails = (doc: SignedDocument) => {
    // Simulate view details functionality
    console.log(`Viewing details for: ${doc.title}`);
    alert(`Viewing details for ${doc.title}`);
  };

  const getImplementationStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    if (priority.includes('High')) return 'bg-red-100 text-red-800';
    if (priority.includes('Medium')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Signed Documents</h1>
              <p className="text-gray-600">Manage and view all digitally signed RFC documents</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Signed Documents</p>
            <p className="text-2xl font-bold text-gray-900">{signedDocuments.length}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Documents
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by title or RFC ID..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="w-full md:w-48">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Implementation Status
                </label>
                <select
                  id="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in progress">In Progress</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {signedDocuments.filter(doc => doc.implementationStatus === 'Completed').length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {signedDocuments.filter(doc => doc.implementationStatus === 'In Progress').length}
                </p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {signedDocuments.filter(doc => doc.implementationStatus === 'Pending').length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No signed documents found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria.' 
                    : 'Signed documents will appear here once RFCs are digitally signed.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {doc.rfcId}: {doc.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Document ID: {doc.id} • {doc.documentType}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(doc.priority)}`}>
                        {doc.priority}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getImplementationStatusColor(doc.implementationStatus)}`}>
                        {doc.implementationStatus}
                      </span>
                    </div>
                  </div>

                  {/* Document Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-3 border-t border-b">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Signed Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(doc.signedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Signed By</p>
                      <p className="text-sm font-medium text-gray-900">{doc.signedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">File Size</p>
                      <p className="text-sm font-medium text-gray-900">{doc.fileSize}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <p className="text-sm font-medium text-green-600 flex items-center space-x-1">
                        <span>✅</span>
                        <span>{doc.status}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>🔒</span>
                      <span>Digitally signed and verified</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(doc)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleDownload(doc)}
                        className="flex items-center space-x-1"
                      >
                        <span>📥</span>
                        <span>Download</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Footer Info */}
        <Card>
          <CardContent className="bg-blue-50">
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-xl">ℹ️</span>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">About Signed Documents</h4>
                <p className="text-sm text-blue-700">
                  All documents shown here have been digitally signed using secure cryptographic methods. 
                  Digital signatures ensure document integrity and authenticity. Downloaded documents will include 
                  signature verification details and timestamps.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignedDocuments;