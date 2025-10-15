import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import NewMeeting from "./meeting";
import { RFCActionModal } from "./modal";

type RFCStatus = 'pending' | 'waiting_assignment' | 'assigned' | 'in_progress' | 'completed';

interface RFC {
  id: string;
  title: string;
  description: string;
  department: string;
  application: string;
  category: string;
  reason: string;
  impactLevel: string;
  status: RFCStatus;
  assignedPIC?: string;
  submittedDate: string;
}

const DashboardKapokja: React.FC = () => {
  const [showNewMeeting, setShowNewMeeting] = useState(false);
  const [activeTab, setActiveTab] = useState<RFCStatus>('pending');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    action: 'approve' | 'reject' | 'request' | null;
    rfcData?: RFC;
  }>({
    isOpen: false,
    action: null
  });

  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedRFC, setSelectedRFC] = useState<RFC | null>(null);
  const [assignmentData, setAssignmentData] = useState({
    pic: '',
    timeline: '',
    priority: 'medium',
    notes: ''
  });

  // Sample RFC data with different statuses
  const [rfcList, setRfcList] = useState<RFC[]>([
    {
      id: 'RFC-2025-123',
      title: 'User Authentication Enhancement',
      description: 'Security enhancement for user authentication system with OAuth 2.0 integration',
      department: 'kepegawaian',
      application: 'simpeg',
      category: 'fitur_baru',
      reason: 'Meningkatkan keamanan sistem autentikasi dengan OAuth 2.0 untuk mencegah unauthorized access dan meningkatkan user experience.',
      impactLevel: 'tinggi',
      status: 'pending',
      submittedDate: '19/12/2025'
    },
    {
      id: 'RFC-2025-125',
      title: 'Database Migration Strategy',
      description: 'Migrasi database untuk meningkatkan performa dan skalabilitas sistem',
      department: 'perencanaan',
      application: 'simrenbang',
      category: 'integrasi',
      reason: 'Migrasi database untuk meningkatkan performa dan skalabilitas sistem. Database lama sudah tidak mampu menangani volume data yang terus meningkat.',
      impactLevel: 'sedang',
      status: 'pending',
      submittedDate: '20/12/2025'
    },
    {
      id: 'RFC-2025-120',
      title: 'Report Export Feature',
      description: 'Add export to Excel functionality',
      department: 'keuangan',
      application: 'siskeu',
      category: 'fitur_baru',
      reason: 'User membutuhkan fitur export untuk analisis data lebih lanjut',
      impactLevel: 'rendah',
      status: 'waiting_assignment',
      submittedDate: '18/12/2025'
    },
    {
      id: 'RFC-2025-118',
      title: 'API Integration Enhancement',
      description: 'Improve API response time',
      department: 'kepegawaian',
      application: 'simpeg',
      category: 'perbaikan_bug',
      reason: 'API response time terlalu lambat',
      impactLevel: 'sedang',
      status: 'assigned',
      assignedPIC: 'Danu',
      submittedDate: '15/12/2025'
    }
  ]);

  const handleRFCAction = (action: 'approve' | 'reject' | 'request', rfcData: RFC) => {
    setModalState({
      isOpen: true,
      action,
      rfcData
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      action: null
    });
  };

  const handleApproveSuccess = (rfcId: string) => {
    // Update RFC status to waiting_assignment
    setRfcList(prev => prev.map(rfc => 
      rfc.id === rfcId ? { ...rfc, status: 'waiting_assignment' as RFCStatus } : rfc
    ));
    // Switch to waiting_assignment tab
    setActiveTab('waiting_assignment');
  };

  const openAssignModal = (rfc: RFC) => {
    setSelectedRFC(rfc);
    setAssignModalOpen(true);
  };

  const closeAssignModal = () => {
    setAssignModalOpen(false);
    setSelectedRFC(null);
    setAssignmentData({
      pic: '',
      timeline: '',
      priority: 'medium',
      notes: ''
    });
  };

  const handleAssignToPIC = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assignmentData.pic) {
      alert('Please select a PIC');
      return;
    }

    // Update RFC with assignment
    setRfcList(prev => prev.map(rfc => 
      rfc.id === selectedRFC?.id 
        ? { ...rfc, status: 'assigned' as RFCStatus, assignedPIC: assignmentData.pic } 
        : rfc
    ));

    alert(`RFC ${selectedRFC?.id} has been assigned to ${assignmentData.pic}`);
    closeAssignModal();
    setActiveTab('assigned');
  };

  const getFilteredRFCs = () => {
    return rfcList.filter(rfc => rfc.status === activeTab);
  };

  const getRFCCountByStatus = (status: RFCStatus) => {
    return rfcList.filter(rfc => rfc.status === status).length;
  };

  if (showNewMeeting) {
    return <NewMeeting onBack={() => setShowNewMeeting(false)} />;
  }

  const filteredRFCs = getFilteredRFCs();

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-white border-r border-gray-200 p-5 space-y-6">
        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">My Pokjas</h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium">Pokja A</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">Pokja C</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">Cross-Pokja View</div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">RFC Management</h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">All RFCs</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">My Assignments</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">Reports</div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">Projects</h3>
          <div className="space-y-2">
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">Project A.1</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">Project A.2</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">Project C.1</div>
            <div className="px-4 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer">Project C.2</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-8 space-y-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center pb-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">
            RFC Management Dashboard
          </h1>
          <span className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-1 rounded-md text-sm font-medium">
            Role: Kapokja
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveTab('pending')}
          >
            <CardContent className="text-center py-6">
              <p className="text-2xl font-bold text-blue-600">{getRFCCountByStatus('pending')}</p>
              <p className="text-gray-500 text-sm">Pending Review</p>
            </CardContent>
          </Card>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveTab('waiting_assignment')}
          >
            <CardContent className="text-center py-6">
              <p className="text-2xl font-bold text-amber-600">{getRFCCountByStatus('waiting_assignment')}</p>
              <p className="text-gray-500 text-sm">waiting Assignment</p>
            </CardContent>
          </Card>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveTab('assigned')}
          >
            <CardContent className="text-center py-6">
              <p className="text-2xl font-bold text-purple-600">{getRFCCountByStatus('assigned')}</p>
              <p className="text-gray-500 text-sm">Assigned to PIC</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          {[
            { key: 'pending', label: 'Pending Review' },
            { key: 'waiting_assignment', label: 'waiting Assignment' },
            { key: 'assigned', label: 'Assigned' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as RFCStatus)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({getRFCCountByStatus(tab.key as RFCStatus)})
            </button>
          ))}
        </div>

        {/* RFC List */}
        <Card>
          <CardHeader>
            {activeTab === 'pending' && 'RFCs Pending Review'}
            {activeTab === 'waiting_assignment' && 'RFCs waiting PIC Assignment'}
            {activeTab === 'assigned' && 'RFCs Assigned to PIC'}
            {activeTab === 'in_progress' && 'RFCs In Progress'}
            {activeTab === 'completed' && 'Completed RFCs'}
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredRFCs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No RFCs in this category</p>
              </div>
            ) : (
              filteredRFCs.map(rfc => (
                <div key={rfc.id} className="border border-gray-300 bg-white p-4 rounded-md">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      {rfc.id}: {rfc.title}
                    </h3>
                    <div className="flex gap-2 text-xs mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
                        {rfc.category === 'fitur_baru' ? 'Fitur Baru' : 
                         rfc.category === 'integrasi' ? 'Integrasi' : 
                         rfc.category === 'perbaikan_bug' ? 'Perbaikan Bug' : 
                         rfc.category}
                      </span>
                      <span className={`px-2 py-1 rounded font-medium ${
                        rfc.impactLevel === 'tinggi' ? 'bg-red-100 text-red-700' :
                        rfc.impactLevel === 'sedang' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {rfc.impactLevel === 'tinggi' ? 'High' : 
                         rfc.impactLevel === 'sedang' ? 'Medium' : 'Low'} Impact
                      </span>
                      {rfc.assignedPIC && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-medium">
                          PIC: {rfc.assignedPIC}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mb-4">
                    <div className="flex">
                      <span className="text-gray-500 w-24">Unit:</span>
                      <span className="text-gray-900 font-medium">
                        {rfc.department === 'kepegawaian' ? 'Bagian Kepegawaian' : 
                         rfc.department === 'perencanaan' ? 'Bagian Perencanaan' : 
                         'Bagian Keuangan'}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-24">Tanggal:</span>
                      <span className="text-gray-900">{rfc.submittedDate}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-24">Aplikasi:</span>
                      <span className="text-gray-900 font-medium">{rfc.application.toUpperCase()}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-24">Kategori:</span>
                      <span className="text-gray-900">
                        {rfc.category === 'fitur_baru' ? 'Fitur Baru' : 
                         rfc.category === 'integrasi' ? 'Integrasi' : 
                         rfc.category === 'perbaikan_bug' ? 'Perbaikan Bug' : 
                         rfc.category}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Alasan Perubahan:</p>
                    <p className="text-sm text-gray-600">{rfc.reason}</p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    {activeTab === 'pending' && (
                      <>
                        <Button 
                          variant="primary" 
                          onClick={() => handleRFCAction('approve', rfc)}
                          className="px-4 py-2"
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="warning" 
                          onClick={() => handleRFCAction('request', rfc)}
                          className="px-4 py-2"
                        >
                          Request Changes
                        </Button>
                        <Button 
                          variant="danger" 
                          onClick={() => handleRFCAction('reject', rfc)}
                          className="px-4 py-2"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    
                    {activeTab === 'waiting_assignment' && (
                      <Button 
                        variant="primary" 
                        onClick={() => openAssignModal(rfc)}
                        className="px-4 py-2"
                      >
                        Assign to PIC
                      </Button>
                    )}

                    {(activeTab === 'assigned' || activeTab === 'in_progress') && (
                      <Button 
                        variant="outline" 
                        className="px-4 py-2"
                      >
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </main>

      {/* RFC Action Modal */}
      <RFCActionModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        action={modalState.action}
        rfcData={modalState.rfcData}
        onApproveSuccess={handleApproveSuccess}
      />

      {/* Assignment Modal */}
      {assignModalOpen && selectedRFC && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="bg-blue-50 border-blue-200 px-6 py-4 border-b flex items-center justify-between rounded-t-lg">
              <h2 className="text-lg font-semibold text-gray-900">Assign RFC to PIC</h2>
              <button 
                onClick={closeAssignModal} 
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="font-medium text-gray-900 mb-2">
                {selectedRFC.id}: {selectedRFC.title}
              </h3>
              <p className="text-sm text-gray-600">{selectedRFC.description}</p>
            </div>

            <form onSubmit={handleAssignToPIC} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select PIC *
                  </label>
                  <select
                    value={assignmentData.pic}
                    onChange={(e) => setAssignmentData({...assignmentData, pic: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">-- Select PIC --</option>
                    <option value="Danu">Danu</option>
                    <option value="Rina">Rina</option>
                    <option value="Ardica">Ardica</option>
                    <option value="Sarah">Sarah</option>
                    <option value="Budi">Budi</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={assignmentData.priority}
                      onChange={(e) => setAssignmentData({...assignmentData, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Timeline
                    </label>
                    <input
                      type="text"
                      value={assignmentData.timeline}
                      onChange={(e) => setAssignmentData({...assignmentData, timeline: e.target.value})}
                      placeholder="e.g., 2 weeks"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes for PIC
                  </label>
                  <textarea
                    value={assignmentData.notes}
                    onChange={(e) => setAssignmentData({...assignmentData, notes: e.target.value})}
                    rows={4}
                    placeholder="Add any special instructions or context..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                <Button variant="outline" type="button" onClick={closeAssignModal}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Assign to PIC
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardKapokja;