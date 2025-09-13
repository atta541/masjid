'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Portfolio {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
}

export default function AdminPortfolio() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
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
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/admin/portfolio');
        if (response.ok) {
          const data = await response.json();
          setPortfolio(data.portfolio);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === 'admin') {
      fetchPortfolio();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPortfolio(portfolio.filter(item => item._id !== id));
      } else {
        alert('Failed to delete portfolio item');
      }
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      alert('Failed to delete portfolio item');
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !currentFeatured }),
      });

      if (response.ok) {
        setPortfolio(portfolio.map(item => 
          item._id === id ? { ...item, featured: !currentFeatured } : item
        ));
      } else {
        alert('Failed to update portfolio item');
      }
    } catch (error) {
      console.error('Error updating portfolio item:', error);
      alert('Failed to update portfolio item');
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
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
            <p className="text-gray-600">Manage your portfolio projects</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/admin" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Back to Dashboard
            </Link>
            <Link href="/admin/portfolio/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add New Project
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {portfolio.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No portfolio items found. Create your first project!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map((item) => (
                  <div key={item._id} className="border rounded-lg p-4">
                    <div className="mb-3">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-48 object-cover rounded mb-3"
                        />
                      )}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        {item.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{item.description}</p>
                      
                      {item.technologies.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {item.technologies.map((tech, index) => (
                              <span 
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2 mb-3">
                        {item.link && (
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline"
                          >
                            Live Demo
                          </a>
                        )}
                        {item.github && (
                          <a 
                            href={item.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 text-sm hover:underline"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/portfolio/${item._id}/edit`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => toggleFeatured(item._id, item.featured)}
                        className={`px-3 py-1 rounded text-sm ${
                          item.featured 
                            ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                            : 'bg-gray-600 text-white hover:bg-gray-700'
                        }`}
                      >
                        {item.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
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

