import React, { useState } from "react";
import { Button } from "../ui/button";

interface CreateRFCProps {
  onBack?: () => void;
  onSubmit?: (rfcData: any) => void;
}

interface FormData {
  rfcNumber: string;
  submissionDate: string;
  applicant: string;
  department: string;
  application: string;
  title: string;
  category: string;
  reason: string;
  detailDescription: string;
  impactLevel: string;
  impactDescription: string;
  attachments: File[];
}

const NewRFC: React.FC<CreateRFCProps> = ({ onBack, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    rfcNumber: "001/RFC/PSID/XII/2025",
    submissionDate: "19/12/2025",
    applicant: "Budi Santoso",
    department: "kepegawaian",
    application: "simpeg",
    title: "Contoh: Penambahan Fitur Export Data ke Excel",
    category: "",
    reason: "",
    detailDescription: "",
    impactLevel: "",
    impactDescription: "",
    attachments: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...fileArray],
      }));
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Judul perubahan wajib diisi";
    }

    if (!formData.category) {
      newErrors.category = "Kategori wajib dipilih";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Alasan perubahan wajib diisi";
    }

    if (!formData.detailDescription.trim()) {
      newErrors.detailDescription = "Deskripsi detail wajib diisi";
    }

    if (!formData.impactLevel) {
      newErrors.impactLevel = "Level dampak wajib dipilih";
    }

    if (!formData.impactDescription.trim()) {
      newErrors.impactDescription = "Deskripsi dampak wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert("Draft berhasil disimpan!");
  };

  const handleSubmitForReview = async () => {
    if (!validateForm()) {
      alert("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const rfcData = {
      ...formData,
      id: `RFC-2025-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      status: "submitted",
      submittedAt: new Date().toISOString(),
    };

    setIsSubmitting(false);

    if (onSubmit) {
      onSubmit(rfcData);
    }

    alert("RFC berhasil disubmit untuk review!");
  };

  return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              RFC Information
            </h3>
            <p className="text-sm text-gray-500">
              Lengkapi detail pengajuan perubahan sesuai kebutuhan.
            </p>

            {/* RFC Info Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RFC Number *
                </label>
                <input
                  type="text"
                  value={formData.rfcNumber}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Auto-generated oleh sistem
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Pengajuan *
                </label>
                <input
                  type="text"
                  value={formData.submissionDate}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit/Departemen *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="kepegawaian">Bagian Kepegawaian</option>
                  <option value="keuangan">Bagian Keuangan</option>
                  <option value="perencanaan">Bagian Perencanaan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aplikasi *
                </label>
                <select
                  value={formData.application}
                  onChange={(e) =>
                    handleInputChange("application", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="simpeg">
                    SIMPEG - Sistem Informasi Manajemen Kepegawaian
                  </option>
                  <option value="siskeu">
                    SISKEU - Sistem Informasi Keuangan
                  </option>
                  <option value="simrenbang">
                    SIMRENBANG - Sistem Informasi Perencanaan dan Anggaran
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Request Overview */}
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Request Overview
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Jelaskan detail perubahan yang diajukan secara lengkap.
            </p>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Perubahan *{" "}
                <span className="text-gray-400">(max 100 characters)</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                maxLength={100}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Contoh: Penambahan fitur export data ke Excel..."
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                ({formData.title.length}/100) karakter
              </p>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Kategori *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: "fitur_baru", label: "Fitur Baru" },
                  { value: "perbaikan_bug", label: "Perbaikan Bug" },
                  { value: "perubahan_ui", label: "Perubahan UI" },
                  { value: "integrasi", label: "Integrasi" },
                ].map((category) => (
                  <label
                    key={category.value}
                    className={`flex items-center p-3 border rounded-md cursor-pointer hover:bg-blue-50 ${
                      formData.category === category.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={formData.category === category.value}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className="mr-2"
                    />
                    <span className="text-sm font-medium">
                      {category.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Reason */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alasan Perubahan *
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                rows={4}
                placeholder="Jelaskan mengapa perubahan ini diperlukan..."
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.reason ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.reason && (
                <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
              )}
            </div>

            {/* Detail */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Detail Perubahan *
              </label>
              <textarea
                value={formData.detailDescription}
                onChange={(e) =>
                  handleInputChange("detailDescription", e.target.value)
                }
                rows={5}
                placeholder="- Apa yang ingin diubah?&#10;- Bagaimana seharusnya bekerja?&#10;- Siapa yang terpengaruh?"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.detailDescription ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.detailDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.detailDescription}
                </p>
              )}
            </div>

            {/* Impact */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dampak Jika Tidak Dilakukan *
              </label>
              <select
                value={formData.impactLevel}
                onChange={(e) =>
                  handleInputChange("impactLevel", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-3 ${
                  errors.impactLevel ? "border-red-300" : "border-gray-300"
                }`}
              >
                <option value="">-- Pilih Level Dampak --</option>
                <option value="tinggi">Tinggi - Operasional terganggu</option>
                <option value="sedang">Sedang - Efisiensi berkurang</option>
                <option value="rendah">Rendah - Nice to have</option>
              </select>

              <textarea
                value={formData.impactDescription}
                onChange={(e) =>
                  handleInputChange("impactDescription", e.target.value)
                }
                rows={4}
                placeholder="Jelaskan detail dampak jika perubahan ini tidak dilakukan..."
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.impactDescription
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
              />
              {(errors.impactLevel || errors.impactDescription) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.impactLevel || errors.impactDescription}
                </p>
              )}
            </div>

            {/* Attachment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dokumen Pendukung{" "}
                <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.png,.docx"
                onChange={handleFileUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200"
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 text-red-500 hover:bg-red-100 rounded"
                        title="Remove file"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {isSaving ? "Saving..." : "Save as Draft"}
              </Button>
              <Button
                onClick={handleSubmitForReview}
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
              >
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
            </div>
          </div>
        </div>
  );
};

export default NewRFC;
