import React, { useState, useEffect } from 'react';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import SideBarLayout from '../../layout/SideBarLayout';
import Replicate from "replicate"
import ModelLink from './ModelLink';

interface Model {
  url: string;
  owner: string;
  name: string;
  description: string | undefined; // Update description to be optional to match the returned data
  visibility: string;
  github_url: string;
  paper_url: string | null; // Update paper_url to be nullable to match the returned data
  run_count: number;
  cover_image_url: string | undefined
}

const Marketplace: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const replicate = new Replicate({
    auth: "r8_FHHpzt0Zh8ych7wG14lEoulHwUUB7yc0aQ76g", // defaults to process.env.REPLICATE_API_TOKEN
  });


  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://arcadia-backend-m22shwtlv-teamrywaveios-projects.vercel.app/my_models?owner=camenduru');
      if (response.ok) {
        const data = await response.json();
        setModels(data);
      } else {
        console.error('Failed to fetch models:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SideBarLayout>
      <div className='mb-10'>
    <h1 className="text-2xl font-bold text-gray-900 mb-4">TimC - Find my ML Models here</h1>
    <h4 className="text-gray-900 mb-6 md:mb-8 lg:mb-10">
      Hey there! Welcome to Arcadia, my personal model registry. I'm Tim, and I've built Arcadia to help myself and other ML teams like yours monetize proprietary ML models. Here's how you can use any of my ML models:
    </h4>
    <ol className="list-decimal ml-8">
      <li className="mb-4">
        <strong>Connect with Stripe:</strong> To get started, click on the button on the far right to connect with Stripe. This will enable you to charge other ML teams for the usage of your models.
      </li>
      <li className="mb-4">
        <strong>Get a free Replicate API Key:</strong> Next, make sure to obtain a free Replicate API Key. This will allow you to easily integrate your models with Arcadia and make them accessible to other users.
      </li>
      <li className="mb-4">
        <strong>Browse and use ML models:</strong> Once you've set up Stripe and obtained your API Key, you can browse through the available ML models listed below. Simply click on a model to access it and run the prompt.
      </li>
    </ol>
  </div>

      <div>
        {isLoading && <p>Loading models...</p>}
        {!isLoading && models.length === 0 && <p>No models found.</p>}
        {!isLoading && models.length > 0 && (
          <div className="models-grid">
            {models.map((model) => (
              <div key={model.name} className="model-container">
                      {model?.cover_image_url && (
                <div className="cover-image-container">
                  <img src={model?.cover_image_url} alt="Cover Image" className="cover-image" />
                </div>
              )}
                  <ModelLink model={model}></ModelLink>
                   <li key={model.name} className="overflow-hidden rounded-xl border-gray-200 bg-gray-100">
    <div className="flex items-center gap-x-4 bg-gray-500">
      <div className="flex-1">
        <div className="flex items-center text-sm text-gray-500">
        </div>
      </div>
      <div className="flex items-center">
        <Menu as="div" className="relative">
          <Menu.Button className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 focus:outline-none">
            <span className="sr-only">Open options</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`${active ? 'bg-gray-50' : ''} block px-3 py-1 text-sm leading-6 text-gray-900`}
                  >
                    View<span className="sr-only">, {model.name}</span>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`${active ? 'bg-gray-50' : ''} block px-3 py-1 text-sm leading-6 text-gray-900`}
                  >
                    Edit<span className="sr-only">, {model.name}</span>
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
</li>
              </div>
            ))}
          </div>
        )}
      </div>
    </SideBarLayout>
  );
};

export default Marketplace;