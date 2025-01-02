import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useSettings } from '@/contexts/SettingsContext';

interface AddressFormData {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const AddressSettings = () => {
  const { settings, updateSettings, saveSettings } = useSettings();
  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormData>({
    defaultValues: settings.address || {
      street: '',
      unit: '',
      city: '',
      state: 'CA',
      zipCode: '',
      country: 'US'
    }
  });

  const onSubmit = async (data: AddressFormData) => {
    try {
      await updateSettings({ address: data });
      await saveSettings();
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Address Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your business address information
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Business Address</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    {...register('street', { required: 'Street address is required' })}
                  />
                  {errors.street && (
                    <p className="text-sm text-destructive">{errors.street.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit/Suite/Floor (Optional)</Label>
                  <Input
                    id="unit"
                    {...register('unit')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register('city', { required: 'City is required' })}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    {...register('state', { required: 'State is required' })}
                  />
                  {errors.state && (
                    <p className="text-sm text-destructive">{errors.state.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    {...register('zipCode', { required: 'ZIP code is required' })}
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-destructive">{errors.zipCode.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    {...register('country', { required: 'Country is required' })}
                  />
                  {errors.country && (
                    <p className="text-sm text-destructive">{errors.country.message}</p>
                  )}
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

export default AddressSettings; 