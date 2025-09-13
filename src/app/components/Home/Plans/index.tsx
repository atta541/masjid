"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Logo from "@/app/components/Layout/Header/Logo";

interface Project {
  _id: string;
  projectName: string;
  description: string;
  totalAmount: number;
  image: string;
  category: string;
  targetAmount?: number;
  isActive: boolean;
}

const Plan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/admin/plans')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setProjects(data.plans || [])
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const activeProjects = projects.filter(project => project.isActive);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <section className="relative bg-contain bg-no-repeat bg-[url('/images/plan/price-plan-background-icons.svg')] bg-center dark:bg-darkmode py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg text-black/50 dark:text-white/50">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-contain bg-no-repeat bg-center dark:bg-darkmode py-20 bg-[#FFFFF5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-lg text-black/50 dark:text-white/50 mb-4">
            Our Projects
          </p>
          <h3 className="md:text-6xl sm:text-40 text-3xl font-semibold text-dark dark:text-white">
            Making a Difference
            <br /> Through Our Projectskpinpion
          </h3>
          <p className="text-lg text-black/70 dark:text-white/70 mt-6 max-w-3xl mx-auto">
            Join us in supporting meaningful causes that create positive impact in our communities.
          </p>
        </div>

        {activeProjects.length === 0 ? (
          <div className="text-center py-12">
            <Icon icon="ph:folder-open" width="64" height="64" className="mx-auto text-gray-400 mb-4" />
            <p className="text-lg text-gray-500">No active projects at the moment.</p>
            <p className="text-sm text-gray-400 mt-2">Check back soon for new initiatives!</p>
          </div>
        ) : (
          <div className="space-y-20">
            {activeProjects.map((project, index) => (
              <div key={project._id} className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div className="flex-1">
                  <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={project.image} 
                      alt={project.projectName}
                      className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-primary px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="max-w-lg">
                    <h3 className="text-3xl font-bold text-dark dark:text-white mb-4">
                      {project.projectName}
                    </h3>
                    <p className="text-lg text-black/70 dark:text-white/70 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Amount Required</span>
                        <span className="text-2xl font-bold text-primary">
                          ${project.totalAmount.toLocaleString()}
                        </span>
                      </div>
                      {project.targetAmount && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Target Amount</span>
                          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            ${project.targetAmount.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => openModal(project)}
                      className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-300 flex items-center gap-2"
                    >
                      <Icon icon="ph:heart" width="20" height="20" />
                      Support This Project
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Donation Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
          <div className="bg-white dark:bg-darkmode p-6 rounded-lg h-auto max-h-[800px] overflow-y-auto relative w-full max-w-md">
            <div className="flex items-center mb-6">
              <div className="text-center mx-auto inline-block max-w-40">
                <Logo />
              </div>
              <button
                onClick={closeModal}
                className="w-5 h-5 absolute right-0 top-0 mr-4 mt-4 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                aria-label="Close Modal"
              >
                <Icon icon="ph:x-circle" width="24" height="24" />
              </button>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-dark dark:text-white mb-2">
                Support {selectedProject.projectName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Every contribution makes a difference
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Donation Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-dark dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    min="1"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-dark dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-dark dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="mb-6">
                <textarea
                  placeholder="Message (Optional)"
                  rows={3}
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-dark dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Project:</span>
                  <span className="font-medium text-dark dark:text-white">{selectedProject.projectName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total Required:</span>
                  <span className="font-bold text-primary">${selectedProject.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                onClick={closeModal}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-300"
              >
                <Icon icon="ph:heart-fill" width="20" height="20" className="inline mr-2" />
                Make Donation
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Plan;
