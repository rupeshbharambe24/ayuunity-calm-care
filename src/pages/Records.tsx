import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, Image, FileCheck, Filter, Share2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Records() {
  const { t } = useTranslation();

  const records = [
    { id: 1, title: 'Blood Test Results - Complete Panel', type: 'lab', date: '2024-01-15', size: '2.3 MB' },
    { id: 2, title: 'Chest X-Ray Imaging', type: 'imaging', date: '2024-01-08', size: '4.8 MB' },
    { id: 3, title: 'Prescription - Dr. Smith', type: 'prescription', date: '2023-12-20', size: '156 KB' },
    { id: 4, title: 'Annual Health Checkup Report', type: 'other', date: '2023-12-01', size: '3.2 MB' },
  ];

  const typeIcons = {
    lab: FileCheck,
    imaging: Image,
    prescription: FileText,
    other: FileText,
  };

  const typeColors = {
    lab: 'bg-primary/10 text-primary',
    imaging: 'bg-accent/10 text-accent',
    prescription: 'bg-info/10 text-info',
    other: 'bg-muted text-muted-foreground',
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('records.title')}</h1>
          <p className="text-muted-foreground mt-1">
            Manage and share your health records securely
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          {t('records.upload')}
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder={t('common.search')}
              className="flex-1"
            />
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              {t('common.filter')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="border-dashed shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="font-medium">{t('records.dragDrop')}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Supports PDF, JPG, PNG up to 10MB
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Your Records ({records.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {records.map((record) => {
              const Icon = typeIcons[record.type as keyof typeof typeIcons];
              const colorClass = typeColors[record.type as keyof typeof typeColors];
              
              return (
                <div
                  key={record.id}
                  className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colorClass}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{record.title}</div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span>{record.date}</span>
                      <span>•</span>
                      <span>{record.size}</span>
                    </div>
                  </div>

                  <Badge variant="outline" className="hidden sm:inline-flex">
                    {t(`records.${record.type}`)}
                  </Badge>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" title="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Share">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
