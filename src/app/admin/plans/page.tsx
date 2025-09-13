'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Plan {
  _id: string;
  projectName: string;
  description: string;
  totalAmount: number;
  image: string;
  category: string;
  targetAmount?: number;
  isActive: boolean;
}

export default function AdminPlans() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
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
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/admin/plans');
        if (response.ok) {
          const data = await response.json();
          setPlans(data.plans);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === 'admin') {
      fetchPlans();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this plan?')) return;

    try {
      const response = await fetch(`/api/admin/plans/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPlans(plans.filter(plan => plan._id !== id));
      } else {
        alert('Failed to delete plan');
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert('Failed to delete plan');
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

  const activePlans = plans.filter(plan => plan.isActive);
  const inactivePlans = plans.filter(plan => !plan.isActive);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
            <p className="text-gray-600">Manage your trust/organization projects</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/admin" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Back to Dashboard
            </Link>
            <Link href="/admin/plans/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add New Project
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          {/* Active Projects */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Projects</h2>
              {activePlans.length === 0 ? (
                <p className="text-gray-500">No active projects found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activePlans.map((plan) => (
                    <div key={plan._id} className="border rounded-lg p-4">
                      <div className="mb-4">
                        {plan.image && (
                          <img 
                            src={plan.image} 
                            alt={plan.projectName}
                            className="w-full h-48 object-cover rounded-lg mb-3"
                          />
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{plan.projectName}</h3>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {plan.category}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600 mb-2">
                          ${plan.totalAmount.toLocaleString()}
                        </p>
                        {plan.targetAmount && (
                          <p className="text-sm text-gray-500">
                            Target: ${plan.targetAmount.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{plan.description}</p>
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/plans/${plan._id}/edit`}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(plan._id)}
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

          {/* Inactive Projects */}
          {inactivePlans.length > 0 && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Inactive Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inactivePlans.map((plan) => (
                    <div key={plan._id} className="border rounded-lg p-4 opacity-75">
                      <div className="mb-4">
                        {plan.image && (
                          <img 
                            src={plan.image} 
                            alt={plan.projectName}
                            className="w-full h-48 object-cover rounded-lg mb-3"
                          />
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{plan.projectName}</h3>
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {plan.category}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-600 mb-2">
                          ${plan.totalAmount.toLocaleString()}
                        </p>
                        {plan.targetAmount && (
                          <p className="text-sm text-gray-500">
                            Target: ${plan.targetAmount.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{plan.description}</p>
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/plans/${plan._id}/edit`}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(plan._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

