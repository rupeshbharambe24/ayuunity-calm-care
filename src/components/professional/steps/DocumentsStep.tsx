import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Upload, File, X, Check } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentsStepProps {
  form: any;
  role: string;
  requiredDocs: { type: string; label: string }[];
}

export const DocumentsStep = ({ form, role, requiredDocs }: DocumentsStepProps) => {
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF, JPG, and PNG files are allowed');
      return;
    }

    setUploading(true);
    try {
      // In demo mode, create a fake file object
      const fakeFileId = `demo-file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const uploadedFile = {
        file_id: fakeFileId,
        type: docType,
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
      };

      setUploadedFiles((prev) => [...prev, uploadedFile]);

      // Update form
      const currentDocs = form.getValues('documents') || [];
      form.setValue('documents', [...currentDocs, uploadedFile]);

      toast.success('Document uploaded successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.file_id !== fileId));
    const currentDocs = form.getValues('documents') || [];
    form.setValue('documents', currentDocs.filter((d: any) => d.file_id !== fileId));
  };

  const isDocTypeUploaded = (docType: string) => {
    return uploadedFiles.some((f) => f.type === docType);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">{t('auth.documents', 'Documents')}</h2>
        <p className="text-muted-foreground">
          {t('auth.documentsSubtitle', 'Upload required verification documents (PDF, JPG, or PNG, max 10MB each)')}
        </p>
      </div>

      <div className="space-y-4">
        {requiredDocs.map((doc) => (
          <div key={doc.type} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-base font-medium">{doc.label}</Label>
              {isDocTypeUploaded(doc.type) && (
                <Check className="w-5 h-5 text-green-600" />
              )}
            </div>

            <div className="space-y-2">
              {uploadedFiles
                .filter((f) => f.type === doc.type)
                .map((file) => (
                  <div
                    key={file.file_id}
                    className="flex items-center justify-between p-3 bg-muted rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(file.file_id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

              <div>
                <input
                  type="file"
                  id={`upload-${doc.type}`}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, doc.type)}
                  disabled={uploading}
                />
                <label htmlFor={`upload-${doc.type}`}>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={uploading}
                    asChild
                  >
                    <div className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? 'Uploading...' : `Upload ${doc.label}`}
                    </div>
                  </Button>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FormField
        control={form.control}
        name="documents"
        render={() => (
          <FormItem>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
