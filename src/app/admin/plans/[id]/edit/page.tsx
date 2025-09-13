// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Plan {
//   _id: string;
//   projectName: string;
//   description: string;
//   totalAmount: number;
//   image: string;
//   category: string;
//   targetAmount?: number;
//   isActive: boolean;
// }

// export default function EditPlan() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [plan, setPlan] = useState<Plan | null>(null);
//   const [imageUploading, setImageUploading] = useState(false);
//   const [wordCount, setWordCount] = useState(0);
//   const [formData, setFormData] = useState({
//     projectName: '',
//     description: '',
//     totalAmount: 0,
//     image: '',
//     category: '',
//     targetAmount: 0,
//     isActive: true,
//   });

//   // Calculate initial word count
// const initialDescription = data.plan.description || '';
// const words = initialDescription.trim() === '' ? [] : initialDescription.trim().split(/\s+/).filter(word => word.length > 0);
// setWordCount(words.length);

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


// useEffect(() => {
//   const fetchPlan = async () => {
//     const planId = window.location.pathname.split('/')[3];
//     try {
//       const response = await fetch(`/api/admin/plans/${planId}`);
//       if (response.ok) {
//         const data = await response.json();
//         setPlan(data.plan);
        
//         // Calculate initial word count
//         const initialDescription = data.plan.description || '';
//         const words = initialDescription.trim().split(/\s+/).filter(word => word.length > 0);
//         setWordCount(words.length);
        
//         setFormData({
//           projectName: data.plan.projectName || '',
//           description: initialDescription,
//           totalAmount: data.plan.totalAmount || 0,
//           image: data.plan.image || '',
//           category: data.plan.category || '',
//           targetAmount: data.plan.targetAmount || 0,
//           isActive: data.plan.isActive !== undefined ? data.plan.isActive : true,
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching plan:', error);
//     }
//   };

//   if (session?.user?.role === 'admin') {
//     fetchPlan();
//   }
// }, [session]);


// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//   const { name, value, type } = e.target;
  
//   // Word count validation for description
//   if (name === 'description') {
//     const words = value.trim() === '' ? [] : value.trim().split(/\s+/).filter(word => word.length > 0);
//     if (words.length > 55) {
//       return; // Don't update if exceeds 55 words
//     }
//     setWordCount(words.length);
//   }
  
//   setFormData(prev => ({
//     ...prev,
//     [name]: type === 'number' ? Number(value) : value,
//   }));
// };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: checked,
//     }));
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       alert('Please select a valid image file');
//       return;
//     }

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
//         setFormData(prev => ({
//           ...prev,
//           image: data.url,
//         }));
//       } else {
//         const errorData = await response.json();
//         alert(`Failed to upload image: ${errorData.error || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       alert('Failed to upload image. Please try again.');
//     } finally {
//       setImageUploading(false);
//     }
//   };

//   const removeImage = () => {
//     setFormData(prev => ({
//       ...prev,
//       image: '',
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.image) {
//       alert('Please upload an image for the project');
//       return;
//     }
    
//     if (imageUploading) {
//       alert('Please wait for the image upload to complete');
//       return;
//     }
    
//     setLoading(true);

//     try {
//       const planId = window.location.pathname.split('/')[3];
//       const response = await fetch(`/api/admin/plans/${planId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         router.push('/admin/plans');
//       } else {
//         const errorData = await response.json();
//         alert(`Failed to update project: ${errorData.error || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error updating project:', error);
//       alert('Failed to update project. Please try again.');
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

//   if (!plan) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg">Loading plan...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
//             <p className="text-gray-600">Update project information</p>
//           </div>
//           <Link href="/admin/plans" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
//             Back to Projects
//           </Link>
//         </div>

//         <div className="bg-white shadow rounded-lg">
//           <form onSubmit={handleSubmit} className="p-6 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Project Name
//                 </label>
//                 <input
//                   type="text"
//                   name="projectName"
//                   value={formData.projectName}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., School Building Construction"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category
//                 </label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   <option value="Education">Education</option>
//                   <option value="Healthcare">Healthcare</option>
//                   <option value="Infrastructure">Infrastructure</option>
//                   <option value="Emergency Relief">Emergency Relief</option>
//                   <option value="Community Development">Community Development</option>
//                   <option value="Environmental">Environmental</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Total Amount Required
//                 </label>
//                 <input
//                   type="number"
//                   name="totalAmount"
//                   value={formData.totalAmount}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   min="0"
//                   step="0.01"
//                   placeholder="0.00"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Target Amount (Optional)
//                 </label>
//                 <input
//                   type="number"
//                   name="targetAmount"
//                   value={formData.targetAmount}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   min="0"
//                   step="0.01"
//                   placeholder="0.00"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Project Image
//               </label>
//               <div className="space-y-2">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   disabled={imageUploading}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                 />
//                 <p className="text-xs text-gray-500">
//                   Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
//                 </p>
                
//                 {imageUploading && (
//                   <div className="flex items-center space-x-2 text-blue-600">
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
//                     <span className="text-sm">Uploading to Cloudinary...</span>
//                   </div>
//                 )}
                
//                 {formData.image && !imageUploading && (
//                   <div className="mt-2">
//                     <div className="relative inline-block">
//                       <img 
//                         src={formData.image} 
//                         alt="Preview" 
//                         className="w-32 h-32 object-cover rounded border"
//                       />
//                       <button
//                         type="button"
//                         onClick={removeImage}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
//                       >
//                         ×
//                       </button>
//                     </div>
//                     <p className="text-xs text-green-600 mt-1">
//                       ✓ Image uploaded successfully to Cloudinary
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Project Description
//     <span className={`ml-2 text-xs ${wordCount > 50 ? 'text-red-600' : 'text-gray-500'}`}>
//       ({wordCount}/55 words)
//     </span>
//   </label>
//   <textarea
//     name="description"
//     value={formData.description}
//     onChange={handleInputChange}
//     rows={5}
//     className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//       wordCount > 50 ? 'border-red-300' : 'border-gray-300'
//     }`}
//     placeholder="Describe the project details, goals, and impact... (Maximum 55 words)"
//     required
//   />
//   {wordCount >= 55 && (
//     <p className="text-xs text-red-600 mt-1">
//       Maximum word limit reached (55 words)
//     </p>
//   )}
// </div>

//             <div>
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="isActive"
//                   checked={formData.isActive}
//                   onChange={handleCheckboxChange}
//                   className="mr-2"
//                 />
//                 <span className="text-sm font-medium text-gray-700">Project is active and visible to public</span>
//               </label>
//             </div>

//             <div className="flex justify-end space-x-4">
//               <Link
//                 href="/admin/plans"
//                 className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
//               >
//                 Cancel
//               </Link>
//               <button
//                 type="submit"
//                 disabled={loading || imageUploading}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {loading ? 'Updating...' : 'Update Project'}
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

export default function EditPlan() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    totalAmount: '',
    image: '',
    category: '',
    targetAmount: '',
    isActive: true,
  });

  const MAX_WORDS = 55;

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
    const fetchPlan = async () => {
      const planId = window.location.pathname.split('/')[3];
      try {
        const response = await fetch(`/api/admin/plans/${planId}`);
        if (response.ok) {
          const data = await response.json();
          setPlan(data.plan);
          
          // Calculate initial word count
          const initialDescription = data.plan.description || '';
          const words = initialDescription.trim() === '' ? [] : initialDescription.trim().split(/\s+/).filter((word: string) => word.length > 0);
          setWordCount(words.length);
          
          setFormData({
            projectName: data.plan.projectName || '',
            description: initialDescription,
            totalAmount: data.plan.totalAmount || 0,
            image: data.plan.image || '',
            category: data.plan.category || '',
            targetAmount: data.plan.targetAmount || 0,
            isActive: data.plan.isActive !== undefined ? data.plan.isActive : true,
          });
        }
      } catch (error) {
        console.error('Error fetching plan:', error);
      }
    };

    if (session?.user?.role === 'admin') {
      fetchPlan();
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Word count validation for description
    if (name === 'description') {
      const words = value.trim() === '' ? [] : value.trim().split(/\s+/).filter((word: string) => word.length > 0);
      if (words.length > MAX_WORDS) {
        return; // Don't update if exceeds maximum words
      }
      setWordCount(words.length);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setImageUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          image: data.url,
        }));
      } else {
        const errorData = await response.json();
        alert(`Failed to upload image: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image) {
      alert('Please upload an image for the project');
      return;
    }
    
    if (imageUploading) {
      alert('Please wait for the image upload to complete');
      return;
    }
    
    setLoading(true);

    try {
      const planId = window.location.pathname.split('/')[3];
      const response = await fetch(`/api/admin/plans/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/plans');
      } else {
        const errorData = await response.json();
        alert(`Failed to update project: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getWordCountColor = () => {
    if (wordCount >= MAX_WORDS) return 'text-red-600';
    if (wordCount > MAX_WORDS - 10) return 'text-amber-600';
    return 'text-gray-500';
  };

  const getWordCountBorderColor = () => {
    if (wordCount >= MAX_WORDS) return 'border-red-300 focus:border-red-500 focus:ring-red-500';
    if (wordCount > MAX_WORDS - 10) return 'border-amber-300 focus:border-amber-500 focus:ring-amber-500';
    return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="text-lg text-gray-600">Loading project details...</div>
        </div>
      </div>
    );
  }

  const wordsLeft = MAX_WORDS - wordCount;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
            <p className="text-gray-600 mt-1">Update project information and details</p>
          </div>
          <Link 
            href="/admin/plans" 
            className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="e.g., School Building Construction"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Emergency Relief">Emergency Relief</option>
                  <option value="Community Development">Community Development</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Amount Required
                </label>
                <input
                  type="number"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Amount (Optional)
                </label>
                <input
                  type="number"
                  name="targetAmount"
                  value={formData.targetAmount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Image
              </label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                />
                <p className="text-xs text-gray-500">
                  Supported formats: JPG, PNG, GIF, WebP. Maximum size: 5MB
                </p>
                
                {imageUploading && (
                  <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 p-3 rounded-md">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm font-medium">Uploading to Cloudinary...</span>
                  </div>
                )}
                
                {formData.image && !imageUploading && (
                  <div className="mt-3">
                    <div className="relative inline-block">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors duration-200 shadow-sm"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-xs text-green-600 mt-2 font-medium">
                      ✓ Image uploaded successfully
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Project Description
                </label>
                <div className="flex items-center space-x-3 text-xs">
                  <span className={`font-medium ${getWordCountColor()}`}>
                    {wordCount}/{MAX_WORDS} words
                  </span>
                  <span className={`${getWordCountColor()}`}>
                    ({wordsLeft} left)
                  </span>
                </div>
              </div>
              
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 ${getWordCountBorderColor()}`}
                placeholder={`Describe the project details, goals, and impact... (Maximum ${MAX_WORDS} words allowed)`}
                required
              />
              
              <div className="mt-2 flex items-center justify-between">
                {wordCount >= MAX_WORDS && (
                  <p className="text-xs text-red-600 font-medium">
                    ⚠️ Maximum word limit reached
                  </p>
                )}
                {wordCount > MAX_WORDS - 10 && wordCount < MAX_WORDS && (
                  <p className="text-xs text-amber-600 font-medium">
                    ⚠️ Approaching word limit
                  </p>
                )}
                {wordCount <= MAX_WORDS - 10 && (
                  <p className="text-xs text-gray-500">
                    Keep it concise and impactful
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleCheckboxChange}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">Project is active and visible to public</span>
                  <p className="text-xs text-gray-500 mt-1">
                    Inactive projects will be hidden from the public view
                  </p>
                </div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/admin/plans"
                className="inline-flex justify-center items-center px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || imageUploading}
                className="inline-flex justify-center items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  'Update Project'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}