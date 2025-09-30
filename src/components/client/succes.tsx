// components/success.tsx
import React from "react";
import { Button } from "components/ui/button";


interface SuccessPopupProps {
  isOpen: boolean;
  rfcId: string;
  rfcTitle: string;
  priority: string;
  onClose: () => void;
  onSubmitAnother: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  isOpen,
  rfcId,
  rfcTitle,
  priority,
  onClose,
  onSubmitAnother
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center space-y-4">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">✅</span>
          </div>

          {/* Success Message */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              RFC Submitted Successfully!
            </h3>
            <p className="text-gray-600 mb-4">
              Your Request for Change has been submitted and is now under review.
            </p>
          </div>

          {/* RFC Details */}
          <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">RFC ID:</span>
              <span className="text-blue-600 font-mono">{rfcId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Title:</span>
              <span className="text-gray-900 text-right max-w-48 truncate">
                {rfcTitle}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Priority:</span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  priority.includes("High")
                    ? "bg-red-100 text-red-700"
                    : priority.includes("Medium")
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {priority}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Status:</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                📄 Under Review
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">📋 Next Steps:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Initial review within 2-3 business days</li>
              <li>• You'll receive email notifications for updates</li>
              <li>• Check "My RFCs" section for status tracking</li>
              <li>• Meeting may be scheduled if needed</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Back to Dashboard
            </Button>
            <Button variant="primary" onClick={onSubmitAnother} className="flex-1">
              Submit Another RFC
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
