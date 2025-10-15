import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RFC {
  id: string;
  rfcNumber: string;
  title: string;
  status: string;
  approvedDate: string | null;
  submissionDate: string;
  applicant: string;
  department: string;
  application: string;
  category: string;
  reason: string;
  priority: string;
  estimatedEffort: string;
  assignedTeam: string;
  attachments: any[];
}

interface ApprovedRFCsProps {
  onBack: () => void;
  onViewChange: (view: string) => void;
}

const ApprovedRFCs: React.FC<ApprovedRFCsProps> = ({ onBack, onViewChange }) => {
  const approvedRFCs: RFC[] = [
    {
      id: 'RFC-2025-001',
      rfcNumber: '001/RFC/PSID/XII/2025',
      title: 'Penambahan Fitur Export Data Kepegawaian ke Format Excel',
      status: 'Ready for Sprint',
      approvedDate: '2025-01-15',
      submissionDate: '19/12/2024',
      applicant: 'Budi Santoso',
      department: 'kepegawaian',
      application: 'simpeg',
      category: 'fitur_baru',
      reason: 'Saat ini proses pelaporan data kepegawaian bulanan memerlukan waktu 3-4 jam karena harus copy-paste manual dari sistem ke Excel. Fitur export otomatis akan menghemat waktu dan mengurangi kesalahan human error dalam pelaporan.',
      priority: 'High',
      estimatedEffort: '2-3 minggu',
      assignedTeam: 'Tim Backend + Tim Frontend',
      attachments: []
    },
  ]

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

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      'fitur_baru': 'Fitur Baru',
      'perbaikan_bug': 'Perbaikan Bug',
      'perubahan_ui': 'Perubahan UI',
      'integrasi': 'Integrasi'
    };
    return categories[category] || category;
  };

  const getImpactLevelLabel = (level: string) => {
    const levels: Record<string, string> = {
      'tinggi': 'Tinggi - Operasional terganggu',
      'sedang': 'Sedang - Efisiensi berkurang',
      'rendah': 'Rendah - Nice to have'
    };
    return levels[level] || level;
  };

  const getDepartmentLabel = (dept: string) => {
    const departments: Record<string, string> = {
      'kepegawaian': 'Bagian Kepegawaian',
      'keuangan': 'Bagian Keuangan',
      'perencanaan': 'Bagian Perencanaan'
    };
    return departments[dept] || dept;
  };

  const getApplicationLabel = (app: string) => {
    const applications: Record<string, string> = {
      'simpeg': 'SIMPEG - Sistem Informasi Manajemen Kepegawaian',
      'siskeu': 'SISKEU - Sistem Informasi Keuangan',
      'simrenbang': 'SIMRENBANG - Sistem Informasi Perencanaan dan Anggaran'
    };
    return applications[app] || app;
  };

  return (
    <main className="p-8 space-y-6 bg-gray-50 min-h-screen">

      {/* RFC Cards */}
      <div className="space-y-6">
        {approvedRFCs.map((rfc) => (
          <Card key={rfc.id} className="border-l-4">
            <CardHeader className="bg-white-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      {rfc.rfcNumber}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {getCategoryLabel(rfc.category)}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {rfc.title}
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Diajukan: {rfc.submissionDate}</span>
                    <span>{getDepartmentLabel(rfc.department)}</span>
                  </div>
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
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Informasi Dasar */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-gray-900 border-b pb-2">
                    Informasi Dasar
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Aplikasi:</span>
                      <p className="text-gray-600">{getApplicationLabel(rfc.application)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Tanggal Disetujui:</span>
                      <p className="text-gray-600">{rfc.approvedDate || 'Pending'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Estimasi Pengerjaan:</span>
                      <p className="text-gray-600">{rfc.estimatedEffort}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Tim yang Ditugaskan:</span>
                      <p className="text-gray-600">{rfc.assignedTeam}</p>
                    </div>
                  </div>
                </div>

                {/* Alasan & Dampak */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-gray-900 border-b pb-2">
                    Alasan & Dampak
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Alasan Perubahan:</span>
                      <p className="text-gray-600">{rfc.reason}</p>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                {rfc.status === 'Ready for Sprint' ? (
                  <>
                    <Button 
                      className="bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => onViewChange('sprint-creation')}
                    >
                      Buat Sprint
                    </Button>
                  </>
                ) : rfc.status === 'Approved' ? (
                  <>
                    <Button className="bg-amber-600 text-white hover:bg-amber-700">
                      Persiapan Sprint
                    </Button>
                    <Button className="bg-gray-600 text-white hover:bg-gray-700">
                      Lihat Detail
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="bg-gray-400 text-white cursor-not-allowed" disabled>
                      Menunggu Review
                    </Button>
                    <Button className="bg-gray-600 text-white hover:bg-gray-700">
                      Lihat Detail
                    </Button>
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