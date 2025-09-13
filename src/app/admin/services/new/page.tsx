// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function NewService() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [imageUploading, setImageUploading] = useState(false);
//   const [formData, setFormData] = useState({
//     icon: '',
//     title: '',
//     slug: '',
//     image: '',
//     description: '',
//     detail: '',
//     features: [{ title: '', description: '' }],
//   });

//   useEffect(() => {
//     if (status === 'loading') return;
    
//     if (!session) {
//       router.push('/signin');
//       return;
//     }
    
//     if (session.user?.role !== 'admin') {
//       router.push('/');
//       return;
//     }
//   }, [session, status, router]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFeatureChange = (index: number, field: string, value: string) => {
//     const newFeatures = [...formData.features];
//     newFeatures[index] = { ...newFeatures[index], [field]: value };
//     setFormData(prev => ({
//       ...prev,
//       features: newFeatures,
//     }));
//   };

//   const addFeature = () => {
//     setFormData(prev => ({
//       ...prev,
//       features: [...prev.features, { title: '', description: '' }],
//     }));
//   };

//   const removeFeature = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index),
//     }));
//   };
 
//   const removeImage = () => {
//     setFormData(prev => ({
//       ...prev,
//       image: '',
//     }));
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       alert('Please select a valid image file');
//       return;
//     }

//     // Validate file size (5MB limit)
//     if (file.size > 5 * 1024 * 1024) {
//       alert('Image size should be less than 5MB');
//       return;
//     }

//     setImageUploading(true);

//     const uploadFormData = new FormData();
//     uploadFormData.append('file', file);

//     try {
//       const response = await fetch('/api/admin/upload', {
//         method: 'POST',
//         body: uploadFormData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Upload successful:', data);
//         setFormData(prev => ({
//           ...prev,
//           image: data.url,
//         }));
//       } else {
//         const errorData = await response.json();
//         console.error('Upload failed:', errorData);
//         alert(`Failed to upload image: ${errorData.error || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       alert('Failed to upload image. Please try again.');
//     } finally {
//       setImageUploading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate required fields
//     if (!formData.image) {
//       alert('Please upload an image for the service');
//       return;
//     }
    
//     if (imageUploading) {
//       alert('Please wait for the image upload to complete');
//       return;
//     }
    
//     setLoading(true);

//     try {
//       const response = await fetch('/api/admin/services', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         router.push('/admin/services');
//       } else {
//         const errorData = await response.json();
//         alert(`Failed to create service: ${errorData.error || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error creating service:', error);
//       alert('Failed to create service. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   if (!session || session.user?.role !== 'admin') {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Create New Service</h1>
//             <p className="text-gray-600">Add a new service to your website</p>
//           </div>
//           <Link href="/admin/services" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
//             Back to Services
//           </Link>
//         </div>

//         <div className="bg-white shadow rounded-lg">
//           <form onSubmit={handleSubmit} className="p-6 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Icon (Iconify class)
//                 </label>
//                 <input
//                   type="text"
//                   name="icon"
//                   value={formData.icon}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., solar:notebook-bookmark-linear"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Slug
//                 </label>
//                 <input
//                   type="text"
//                   name="slug"
//                   value={formData.slug}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., edtech-apps"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Image
//                 </label>
//                 <div className="space-y-2">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     disabled={imageUploading}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                   />
//                   <p className="text-xs text-gray-500">
//                     Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
//                   </p>
                  
//                   {imageUploading && (
//                     <div className="flex items-center space-x-2 text-blue-600">
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
//                       <span className="text-sm">Uploading to Cloudinary...</span>
//                     </div>
//                   )}
                  
//                   {formData.image && !imageUploading && (
//                     <div className="mt-2">
//                       <div className="relative inline-block">
//                         <img 
//                           src={formData.image} 
//                           alt="Preview" 
//                           className="w-32 h-32 object-cover rounded border"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeImage}
//                           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
//                         >
//                           ×
//                         </button>
//                       </div>
//                       <p className="text-xs text-green-600 mt-1">
//                         ✓ Image uploaded successfully to Cloudinary
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Detail
//               </label>
//               <textarea
//                 name="detail"
//                 value={formData.detail}
//                 onChange={handleInputChange}
//                 rows={5}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Features
//                 </label>
//                 <button
//                   type="button"
//                   onClick={addFeature}
//                   className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
//                 >
//                   Add Feature
//                 </button>
//               </div>
              
//               {formData.features.map((feature, index) => (
//                 <div key={index} className="border rounded-lg p-4 mb-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Feature Title
//                       </label>
//                       <input
//                         type="text"
//                         value={feature.title}
//                         onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                       />
//                     </div>
//                     <div className="flex items-end">
//                       <button
//                         type="button"
//                         onClick={() => removeFeature(index)}
//                         className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                   <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Feature Description
//                     </label>
//                     <textarea
//                       value={feature.description}
//                       onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
//                       rows={2}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-end space-x-4">
//               <Link
//                 href="/admin/services"
//                 className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
//               >
//                 Cancel
//               </Link>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {loading ? 'Creating...' : 'Create Service'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NewService() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setSelectedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData(prev => ({
      ...prev,
      image: '',
    }));
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: uploadFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!selectedFile) {
      alert('Please select an image for the service');
      return;
    }
    
    setLoading(true);

    try {
      // First upload the image
      const imageUrl = await uploadImageToCloudinary(selectedFile);
      
      // Prepare form data with image URL
      const serviceData = {
        ...formData,
        image: imageUrl,
      };

      // Submit the service data
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        router.push('/admin/services');
      } else {
        const errorData = await response.json();
        alert(`Failed to create service: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating service:', error);
      if (error instanceof Error) {
        alert(`Failed to create service: ${error.message}`);
      } else {
        alert('Failed to create service. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
            <h1 className="text-3xl font-bold text-gray-900">Create New Service</h1>
            <p className="text-gray-600">Add a new service to your website</p>
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
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500">
                    Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
                  </p>
                  
                  {previewUrl && (
                    <div className="mt-2">
                      <div className="relative inline-block">
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        ✓ Image selected (will be uploaded when form is submitted)
                      </p>
                    </div>
                  )}
                </div>
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
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating Service...</span>
                  </div>
                ) : (
                  'Create Service'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}