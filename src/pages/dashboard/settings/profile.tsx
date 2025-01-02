import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useSettings } from '@/contexts/SettingsContext';

interface ProfileFormData {
  businessName: string;
  displayName: string;
  website: string;
  description: string;
  brandColor: string;
}

const ProfileSettings = () => {
  const { settings, updateSettings, saveSettings } = useSettings();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      businessName: settings.businessName,
      displayName: settings.displayName,
      website: settings.website,
      description: settings.description || '',
      brandColor: settings.brandColor,
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateSettings(data);
      await saveSettings();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your business profile and preferences
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Legal Business Name</Label>
                  <Input
                    id="businessName"
                    {...register('businessName', { required: 'Business name is required' })}
                  />
                  {errors.businessName && (
                    <p className="text-sm text-destructive">{errors.businessName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    {...register('displayName', { required: 'Display name is required' })}
                  />
                  {errors.displayName && (
                    <p className="text-sm text-destructive">{errors.displayName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    {...register('website')}
                    placeholder="https://"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandColor">Brand Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="brandColor"
                      type="color"
                      {...register('brandColor')}
                      className="w-12 h-12 p-1"
                    />
                    <Input
                      type="text"
                      {...register('brandColor')}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Input
                    id="description"
                    {...register('description')}
                    placeholder="Brief description of your business"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfileSettings; 