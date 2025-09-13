'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Service {
  _id: string;
  icon: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  detail: string;
  features: Array<{
    title: string;
    description: string;
  }>;
}

export default function EditService() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    slug: '',
    image: '',
    description: '',
    detail: '',
    features: [{ title: '', description: '' }],
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/signin');
      return;
    }
    
    if (session.user?.role !== 'admin') {
      router.push('/');
      return;
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchService = async () => {
      const serviceId = window.location.pathname.split('/')[3];
      try {
        const response = await fetch(`/api/admin/services/${serviceId}`);
        if (response.ok) {
          const data = await response.json();
          setService(data.service);
          setFormData({
            icon: data.service.icon,
            title: data.service.title,
            slug: data.service.slug,
            image: data.service.image,
            description: data.service.description,
            detail: data.service.detail,
            features: data.service.features,
          });
        }
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    if (session?.user?.role === 'admin') {
      fetchService();
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      features: newFeatures,
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { title: '', description: '' }],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          image: data.url,
        }));
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceId = window.location.pathname.split('/')[3];
      const response = await fetch(`/api/admin/services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/services');
      } else {
        alert('Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading service...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Service</h1>
            <p className="text-gray-600">Update service information</p>
          </div>
          <Link href="/admin/services" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
            Back to Services
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon (Iconify class)
                </label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., solar:notebook-bookmark-linear"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., edtech-apps"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detail
              </label>
              <textarea
                name="detail"
                value={formData.detail}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Features
                </label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  Add Feature
                </button>
              </div>
              
              {formData.features.map((feature, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Feature Title
                      </label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feature Description
                    </label>
                    <textarea
                      value={feature.description}
                      onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/services"
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Service'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

