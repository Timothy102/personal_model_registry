import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBarLayout from '../../layout/SideBarLayout';

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import ClipboardCopyIcon from '../../components/ClipboardIcon';


interface Model {
  model_id: number;
  name: string;
  description: string;
  output_path: string;
  category: string;
  long_description: string;
  use_case_category: string;
  charge_per_api_call: number;
  featured_image_url: string;
  user_id: number;
  creator_id: number;
}

const ModelPage: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(false);
 

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/models/get_models_by_user_id?user_id=1');
      if (response.ok) {
        const data = await response.json();
        setModels(data as Model[]);
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
        <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Models</h1>
        <h4 className="text-gray-900 mb-4">Manage your uploaded machine learning models here.</h4>

          {models.length > 0 && (
            <div className="models-grid">
              {models.map((model) => (
                <div key={model.model_id} className="model-container">
                  {model.creator_id && (
                    <ModelLink key={model.model_id} model={model} />
                  )}
                </div>
              ))}
            </div>
          )}
          {isLoading && <p>Loading models...</p>}
          {!isLoading && models.length === 0 && <p>No models found.</p>}
        </div>
    </SideBarLayout>
  );
};

const ModelLink: React.FC<{ model: Model }> = ({ model }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean | null>(null);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${username}/${model?.name || ''}`);
    setCopied(true);

    // Hide the success message after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const getUsername = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/models/get_username_or_email?user_id=${userId}`);
      if (response.ok) {
        const userData = await response.json();
        return userData.username;
      } else {
        console.error('Failed to fetch username:', response.statusText);
        return ''; // Return an empty string if there's an error
      }
    } catch (error) {
      console.error('Error fetching username:', error);
      return ''; // Return an empty string if there's an error
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const fetchedUsername = await getUsername(model.creator_id);
        setUsername(fetchedUsername);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [model.creator_id]);

  if (!username) return null;

  return (
    <li key={model.model_id} className="overflow-hidden rounded-xl border-gray-200 bg-gray-100">
  <Link to={`/models/${username}/${model.name}`} className='mb-4'>
    <div className="flex items-center gap-x-4 bg-gray-500">
      <div className="flex-1">
        <div className="flex items-center text-sm text-gray-500">
          <h1 className="text-2xl font-bold text-gray-900">{username}/{model.name}</h1>
          <button
            type="button"
            className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={copyToClipboard}
          >
            <ClipboardCopyIcon/>
          </button>
        </div>
        <div className="flex">
          <button
            type="button"
            className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 mr-2"
          >
            {model.category || 'N/A'}
          </button>
          <button
            type="button"
            className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 mr-2"
          >
            {model.use_case_category || 'N/A'}
          </button>
          <button
            type="button"
            className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          >
            {model.charge_per_api_call}$ / API Call
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={copyToClipboard}
          className="p-2.5 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
        </button>
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
  </Link>
</li>
  );
}

export default ModelPage;