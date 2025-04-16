import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { ListIcon, GridIcon } from "../../icons";
import { therapist } from "../../icons";

interface Therapist {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  image: string;
  availability: string;
  languages: string[];
  bio: string;
}

const sampleTherapists: Therapist[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Clinical Psychology",
    experience: "10 years",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    availability: "Available",
    languages: ["English", "Spanish"],
    bio: "Specialized in anxiety and depression treatment with a focus on cognitive behavioral therapy."
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Marriage & Family Therapy",
    experience: "8 years",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    availability: "Available",
    languages: ["English", "Mandarin"],
    bio: "Expert in relationship counseling and family dynamics with a holistic approach."
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Trauma Therapy",
    experience: "12 years",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    availability: "Available",
    languages: ["English", "Spanish", "French"],
    bio: "Specialized in trauma recovery and PTSD treatment using evidence-based methods."
  }
];

export default function MatchMe() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  return (
    <>
      <PageMeta
        title="Match Me | Dashboard"
        description="View your matched therapists"
      />
      <PageBreadcrumb pageTitle="Match Me" />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Your Matched Therapists
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`rounded-lg p-2 ${
              viewMode === 'list'
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
            }`}
          >
            <ListIcon className="size-5" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-lg p-2 ${
              viewMode === 'grid'
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
            }`}
          >
            <GridIcon className="size-5" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleTherapists.map((therapist) => (
            <div
              key={therapist.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start gap-4">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="size-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {therapist.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {therapist.specialization}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {therapist.rating}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`size-4 ${
                            i < Math.floor(therapist.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {therapist.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {therapist.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {therapist.availability}
                  </span>
                  <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sampleTherapists.map((therapist) => (
            <div
              key={therapist.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start gap-4">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="size-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {therapist.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {therapist.specialization} • {therapist.experience} experience
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {therapist.rating}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`size-4 ${
                              i < Math.floor(therapist.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {therapist.bio}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {therapist.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {therapist.availability}
                    </span>
                    <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
} 