'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Testimonial {
  _id: string;
  review: string;
  name: string;
  post: string;
  image: string;
}

export default function AdminTestimonials() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
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
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/admin/testimonials');
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data.testimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === 'admin') {
      fetchTestimonials();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTestimonials(testimonials.filter(testimonial => testimonial._id !== id));
      } else {
        alert('Failed to delete testimonial');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial');
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
            <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
            <p className="text-gray-600">Manage customer testimonials</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/admin" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Back to Dashboard
            </Link>
            <Link href="/admin/testimonials/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add New Testimonial
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {testimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No testimonials found. Create your first testimonial!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial._id} className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.post}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{testimonial.review}</p>
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/testimonials/${testimonial._id}/edit`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(testimonial._id)}
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

