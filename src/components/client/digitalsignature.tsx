import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

interface DigitalSignatureModalProps {
  isOpen: boolean;
  rfcData?: any; // ganti sesuai tipe data RFC kamu
  onClose: () => void;
  onSignatureComplete: () => void;
}

const DigitalSignatureModal: React.FC<DigitalSignatureModalProps> = ({
  isOpen,
  rfcData,
  onClose,
  onSignatureComplete,
}) => {
  const [passkey, setPasskey] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setPasskey("");
      setError("");
      setStep(1);
      setIsVerifying(false);
    }
  }, [isOpen]);

  const handlePasskeySubmit = () => {
    if (!passkey) {
      setError("Please enter your passkey");
      return;
    }

    if (passkey.length < 6) {
      setError("Passkey must be at least 6 characters");
      return;
    }

    setError("");
    setIsVerifying(true);
    setStep(2);

    // Simulasi verifikasi
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);

      // Complete signature after 2 seconds
      setTimeout(() => {
        onSignatureComplete();
        // Reset akan dilakukan oleh useEffect karena isOpen akan jadi false
      }, 2000);
    }, 3000);
  };

  const handleClose = () => {
    // Reset state before closing
    setPasskey("");
    setError("");
    setStep(1);
    setIsVerifying(false);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step === 1 && !isVerifying) {
      handlePasskeySubmit();
    }
  };

  // Early return if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">Digital Signature Required</h2>
            {rfcData && (
              <p className="text-sm text-gray-600 mt-2">
                RFC: {rfcData.title} ({rfcData.id})
              </p>
            )}
          </div>

          {/* Step 1: Passkey Input */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                Enter your digital signature passkey to sign this document
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Digital Signature Passkey
                </label>
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your passkey..."
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isVerifying}
                />
                {error && (
                  <p className="text-red-600 text-xs mt-1">{error}</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleClose}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handlePasskeySubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isVerifying || !passkey}
                >
                Sign Document
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Verifying */}
          {step === 2 && (
            <div className="text-center space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600"></div>
                  <span className="text-amber-800 font-medium">Verifying digital signature...</span>
                </div>
                <p className="text-amber-700 text-xs mt-2">
                  Please wait while we validate your credentials
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-4xl mb-2"></div>
                <p className="text-green-800 font-medium">Signature Complete!</p>
                <p className="text-green-700 text-sm mt-1">
                  Document has been digitally signed successfully
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalSignatureModal;