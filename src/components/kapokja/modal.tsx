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
    department: string;
    application: string;
    category: string;
    reason: string;
    impactLevel: string;
  };
  onApproveSuccess?: (rfcId: string) => void;
}

export const RFCActionModal: React.FC<RFCActionModalProps> = ({
  isOpen,
  onClose,
  action,
  rfcData,
  onApproveSuccess
}) => {
  const [modificationReason, setModificationReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('RFC Approved:', rfcData);
      alert(`RFC ${rfcData?.id} has been approved successfully!\n\nPlease assign this RFC to a PIC.`);
      
      // Callback to update status and switch tab
      if (onApproveSuccess && rfcData) {
        onApproveSuccess(rfcData.id);
      }
      
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  const handleReject = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('RFC Rejected:', rfcData);
      alert(`RFC ${rfcData?.id} has been rejected.`);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  const handleRequestModification = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!modificationReason.trim()) {
      alert('Please provide a reason for the modification request.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Modification Requested:', {
        rfcData,
        reason: modificationReason
      });
      alert(`Modification request sent for RFC ${rfcData?.id}`);
      setIsSubmitting(false);
      setModificationReason("");
      onClose();
    }, 500);
  };

  if (!isOpen || !action) return null;

  const getModalConfig = () => {
    switch (action) {
      case 'approve':
        return {
          title: 'Approve RFC',
          color: 'bg-green-50 border-green-200',
          message: 'Are you sure you want to approve this RFC? After approval, you will need to assign it to a PIC.',
          buttonText: 'Yes, Approve',
          buttonColor: 'primary',
        };
      case 'reject':
        return {
          title: 'Reject RFC',
          color: 'bg-red-50 border-red-200',
          message: 'Are you sure you want to reject this RFC?',
          buttonText: 'Yes, Reject',
          buttonColor: 'danger',
        };
      case 'request':
        return {
          title: 'Request Modifications',
          color: 'bg-amber-50 border-amber-200',
          message: 'Please provide the reason for requesting modifications:',
          buttonText: 'Send Request',
          buttonColor: 'warning',
        };
      default:
        return {
          title: 'RFC Action',
          color: 'bg-gray-50 border-gray-200',
          message: '',
          buttonText: 'Confirm',
          buttonColor: 'primary',
        };
    }
  };

  const config = getModalConfig();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        {/* Header */}
        <div className={`${config.color} px-6 py-4 border-b flex items-center justify-between rounded-t-lg`}>
          <h2 className="text-lg font-semibold text-gray-900">{config.title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        {/* RFC Info */}
        {rfcData && (
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="font-medium text-gray-900 mb-2">{rfcData.id}: {rfcData.title}</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
              <div>
                <span className="text-gray-500">Unit:</span>
                <span className="ml-2 text-gray-900">
                  {rfcData.department === 'kepegawaian' ? 'Bagian Kepegawaian' : 
                   rfcData.department === 'perencanaan' ? 'Bagian Perencanaan' : 
                   'Bagian Keuangan'}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Aplikasi:</span>
                <span className="ml-2 text-gray-900">{rfcData.application.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-gray-500">Kategori:</span>
                <span className="ml-2 text-gray-900">
                  {rfcData.category === 'fitur_baru' ? 'Fitur Baru' : 
                   rfcData.category === 'integrasi' ? 'Integrasi' : 
                   rfcData.category === 'perbaikan_bug' ? 'Perbaikan Bug' : 
                   rfcData.category}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Impact:</span>
                <span className="ml-2 text-gray-900">
                  {rfcData.impactLevel === 'tinggi' ? 'High' : 
                   rfcData.impactLevel === 'sedang' ? 'Medium' : 
                   'Low'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {action === 'request' ? (
            <form onSubmit={handleRequestModification}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {config.message}
                </label>
                <textarea
                  value={modificationReason}
                  onChange={(e) => setModificationReason(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Explain what needs to be modified and why..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  variant={config.buttonColor as any} 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : config.buttonText}
                </Button>
              </div>
            </form>
          ) : (
            <>
              <p className="text-gray-700 mb-6">{config.message}</p>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  variant={config.buttonColor as any}
                  onClick={action === 'approve' ? handleApprove : handleReject}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : config.buttonText}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};