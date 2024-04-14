import React, { useState } from 'react';
import ModelConfigNotFilled from './ModelConfigNotFilled';

interface ModelUploadFormProps {
  handleUpdateModelConfig: (config: any) => void;
}

const ModelUploadForm: React.FC<ModelUploadFormProps> = ({ handleUpdateModelConfig }) => {
  const [showModal, setShowModal] = useState(false); // Change initial state as needed
  const [formData, setFormData] = useState({
    
    name: '',
    description: '',
    category: '',
    use_case_category: '',
    charge_per_api_call: ''
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'category' | 'use_case_category') => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [type]: value
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your form submission logic here
  };

  const handleClose = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    {showModal && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>

          {/* Modal dialog */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            {/* Your modal content here */}
            <div className="bg-white rounded-lg p-8">
              {/* Include ModelConfigNotFilled component */}
              <ModelConfigNotFilled />
            </div>
          </div>
        </div>
      </div>
    )}
    <div className="bg-white rounded-lg p-24 max-w-3xl max-h-[80vh] overflow-auto border border-gray-200">
      <div className="flex justify-end mb-4">
        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Model Details</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Provide information about your model.</p>

              <div className="mt-6">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter model name"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 mb-4">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2 space-y-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={2}
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter model description"
                    required
                  />
                </div>
              </div>

              <fieldset>
                <legend className="block text-sm font-medium leading-6 text-gray-900 mb-2">Category</legend>
                <div className="space-y-2 mb-4">
                  {['LLM', 'Computer Vision', 'NLP', "Regression", "Other"].map(category => (
                    <div key={category} className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input
                          id={category}
                          name="category"
                          type="radio"
                          value={category}
                          checked={formData.category === category}
                          onChange={e => handleCategoryChange(e, 'category')}
                          className="h-4 w-4 rounded border-gray-300 text-inter-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="ml-5 text-sm leading-6">
                        <label htmlFor={category} className="font-medium text-gray-900">
                          {category}
                        </label>{' '}
                        <span id={`${category}`} className="text-gray-500">
                          <span className="sr-only">{category} </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <fieldset>
              <legend className="block text-sm font-medium leading-6 text-gray-900">Use Case Category</legend>
                <div className="space-y-2 mt-2">
                  {['General LLM', 'Text Summarization', 'Object Detection', 'Other'].map(useCaseCategory => (
                    <div key={useCaseCategory} className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input
                          id={useCaseCategory}
                          name="useCaseCategory"
                          type="radio"
                          value={useCaseCategory}
                          checked={formData.use_case_category === useCaseCategory}
                          onChange={e => handleCategoryChange(e, 'use_case_category')}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="ml-5 text-sm leading-6">
                        <label htmlFor={useCaseCategory} className="font-medium text-gray-900">
                          {useCaseCategory}
                        </label>{' '}
                        <span id={`${useCaseCategory}`} className="text-gray-500">
                          <span className="sr-only">{useCaseCategory} </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6">
                <label htmlFor="charge_per_api_call" className="block text-sm font-medium leading-6 text-gray-900">
                  Charge per API Call
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="charge_per_api_call"
                    id="charge_per_api_call"
                    value={formData.charge_per_api_call}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="The usual: 0.01"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => handleUpdateModelConfig(formData)}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModelUploadForm;