
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface ServiceFormData {
  name: string;
  description: string;
  category: string;
  base_price: number;
  duration_minutes: number;
}

interface ProviderService {
  id: string;
  name: string;
  description: string;
  category: string;
  base_price: number;
  duration_minutes: number;
  is_active: boolean;
}

const ServiceManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [services, setServices] = useState<ProviderService[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<ProviderService | null>(null);

  const form = useForm<ServiceFormData>({
    defaultValues: {
      name: '',
      description: '',
      category: '',
      base_price: 0,
      duration_minutes: 60,
    },
  });

  const serviceCategories = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'painting', label: 'Painting' },
    { value: 'ac_repair', label: 'AC Repair' },
    { value: 'pest_control', label: 'Pest Control' },
    { value: 'appliance_repair', label: 'Appliance Repair' },
    { value: 'home_maintenance', label: 'Home Maintenance' },
  ];

  useEffect(() => {
    if (user) {
      fetchServices();
    }
  }, [user]);

  const fetchServices = async () => {
    try {
      // First get the service provider ID
      const { data: providerData } = await supabase
        .from('service_providers')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (providerData) {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('provider_id', providerData.id);

        if (error) {
          console.error('Error fetching services:', error);
        } else {
          setServices(data || []);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ServiceFormData) => {
    try {
      // Get service provider ID
      const { data: providerData } = await supabase
        .from('service_providers')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (!providerData) {
        toast({
          title: "Error",
          description: "Service provider profile not found. Please complete your profile first.",
          variant: "destructive",
        });
        return;
      }

      const serviceData = {
        ...data,
        provider_id: providerData.id,
        is_active: true,
      };

      let error;
      if (editingService) {
        const { error: updateError } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('services')
          .insert([serviceData]);
        error = insertError;
      }

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save service. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: editingService ? "Service updated successfully!" : "Service added successfully!",
        });
        form.reset();
        setShowForm(false);
        setEditingService(null);
        fetchServices();
      }
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (service: ProviderService) => {
    setEditingService(service);
    form.reset({
      name: service.name,
      description: service.description,
      category: service.category,
      base_price: service.base_price,
      duration_minutes: service.duration_minutes,
    });
    setShowForm(true);
  };

  const handleDelete = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete service.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Service deleted successfully!",
        });
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Services</h2>
        <Button
          onClick={() => {
            setEditingService(null);
            form.reset();
            setShowForm(!showForm);
          }}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingService ? 'Edit Service' : 'Add New Service'}</CardTitle>
            <CardDescription>
              {editingService ? 'Update your service details' : 'Add a new service to offer to customers'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Service name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Bathroom Plumbing Repair" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Describe what this service includes..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  rules={{ required: "Please select a category" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="base_price"
                    rules={{ 
                      required: "Price is required",
                      min: { value: 1, message: "Price must be greater than 0" }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="299"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration_minutes"
                    rules={{ 
                      required: "Duration is required",
                      min: { value: 15, message: "Duration must be at least 15 minutes" }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="60"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                    {editingService ? 'Update Service' : 'Add Service'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingService(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
                <Badge variant={service.is_active ? "default" : "secondary"}>
                  {service.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className="text-sm font-medium capitalize">
                    {service.category.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="text-lg font-bold text-green-600">₹{service.base_price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="text-sm">{service.duration_minutes} mins</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No services added yet</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Service
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
