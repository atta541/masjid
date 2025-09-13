'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
}

export default function AdminServices() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

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
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/admin/services');
        console.log("hiyyin")
        if (response.ok) {
          const data = await response.json();

          setServices(data.services);


        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === 'admin') {
      fetchServices();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setServices(services.filter(service => service._id !== id));
      } else {
        alert('Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
            <p className="text-gray-600">Manage your services</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/admin" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Back to Dashboard
            </Link>
            <Link href="/admin/services/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add New Service
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No services found. Create your first service!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service._id} className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{service.icon}</span>
                      <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/services/${service._id}/edit`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
