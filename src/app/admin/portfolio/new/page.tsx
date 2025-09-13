'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NewPortfolio() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    technologies: [''],
    link: '',
    github: '',
    featured: false,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleTechnologyChange = (index: number, value: string) => {
    const newTechnologies = [...formData.technologies];
    newTechnologies[index] = value;
    setFormData(prev => ({
      ...prev,
      technologies: newTechnologies,
    }));
  };

  const addTechnology = () => {
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, ''],
    }));
  };

  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For now, we'll use a placeholder image URL since Cloudinary is not configured
    // In a real app, you would upload to Cloudinary here
    const placeholderUrl = `https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=${encodeURIComponent(formData.title || 'Project')}`;
    setFormData(prev => ({
      ...prev,
      image: placeholderUrl,
    }));

    // TODO: Implement actual Cloudinary upload when credentials are provided
    alert('Image upload placeholder - please provide Cloudinary credentials to enable actual uploads');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Filter out empty technologies
    const filteredTechnologies = formData.technologies.filter(tech => tech.trim() !== '');

    try {
      const response = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          technologies: filteredTechnologies,
        }),
      });

      if (response.ok) {
        router.push('/admin/portfolio');
      } else {
        alert('Failed to create portfolio item');
      }
    } catch (error) {
      console.error('Error creating portfolio item:', error);
      alert('Failed to create portfolio item');
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Portfolio Project</h1>
            <p className="text-gray-600">Add a new project to your portfolio</p>
          </div>
          <Link href="/admin/portfolio" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
            Back to Portfolio
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., E-commerce Website"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Web Development, Mobile App"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your project, what it does, and key features"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Image
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Technologies Used
                </label>
                <button
                  type="button"
                  onClick={addTechnology}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  Add Technology
                </button>
              </div>
              
              {formData.technologies.map((tech, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechnologyChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Feature this project</span>
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/portfolio"
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

