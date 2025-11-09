import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Contrast, Download, Trash2 } from 'lucide-react';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 animate-slide-up max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings.title')}</h1>
        <p className="text-muted-foreground mt-1">
          Manage your preferences and account settings
        </p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="appearance">{t('settings.appearance')}</TabsTrigger>
          <TabsTrigger value="language">{t('settings.language')}</TabsTrigger>
          <TabsTrigger value="security">{t('settings.security')}</TabsTrigger>
          <TabsTrigger value="privacy">{t('settings.privacy')}</TabsTrigger>
          <TabsTrigger value="profile">{t('settings.profile')}</TabsTrigger>
        </TabsList>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>{t('settings.theme')}</CardTitle>
              <CardDescription>
                Choose your preferred color theme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={theme} onValueChange={(v) => setTheme(v as any)}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Sun className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="light" className="cursor-pointer">
                          {t('settings.light')}
                        </Label>
                        <div className="text-sm text-muted-foreground">
                          Bright and clean interface
                        </div>
                      </div>
                    </div>
                    <RadioGroupItem value="light" id="light" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Moon className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="dark" className="cursor-pointer">
                          {t('settings.dark')}
                        </Label>
                        <div className="text-sm text-muted-foreground">
                          Easy on the eyes in low light
                        </div>
                      </div>
                    </div>
                    <RadioGroupItem value="dark" id="dark" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Contrast className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="high-contrast" className="cursor-pointer">
                          {t('settings.highContrast')}
                        </Label>
                        <div className="text-sm text-muted-foreground">
                          Maximum readability (WCAG AAA)
                        </div>
                      </div>
                    </div>
                    <RadioGroupItem value="high-contrast" id="high-contrast" />
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>
                Customize for your comfort
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings.reduceMotion')}</Label>
                  <div className="text-sm text-muted-foreground">
                    Minimize animations and transitions
                  </div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings.textSize')}</Label>
                  <div className="text-sm text-muted-foreground">
                    Increase font size for better readability
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language */}
        <TabsContent value="language">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>{t('settings.language')}</CardTitle>
              <CardDescription>
                Select your preferred language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={i18n.language} onValueChange={(v) => i18n.changeLanguage(v)}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <Label htmlFor="en" className="cursor-pointer">English</Label>
                    <RadioGroupItem value="en" id="en" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <Label htmlFor="hi" className="cursor-pointer">हिंदी (Hindi)</Label>
                    <RadioGroupItem value="hi" id="hi" />
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>{t('settings.security')}</CardTitle>
              <CardDescription>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <div className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </div>
                </div>
                <Button variant="outline">Enable</Button>
              </div>

              <div className="rounded-lg border p-4">
                <Label className="mb-3 block">Active Sessions</Label>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Chrome on Windows</div>
                      <div className="text-muted-foreground">Active now • Mumbai, India</div>
                    </div>
                    <Button variant="ghost" size="sm">Revoke</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>{t('settings.privacy')}</CardTitle>
              <CardDescription>
                Control your data and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Share usage data</Label>
                  <div className="text-sm text-muted-foreground">
                    Help improve AyuUnity
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download My Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                This action cannot be undone
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile */}
        <TabsContent value="profile">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>{t('settings.profile')}</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Profile editing interface would go here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
