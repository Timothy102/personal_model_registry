import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';


interface ModelLoadingAlertProps {
    onClose: () => void;
  }

const ModelLoadingAlert: React.FC<ModelLoadingAlertProps> = ({ onClose }) => {
  return (
    <div className="rounded-md bg-green-50 p-4 mb-10">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">Model Uploaded</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>This may take approximately 1 minute. A container is being spun out for your model. Sit tight.</p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                View status
              </button>
              <button
                type="button"
                onClick={onClose} // Call onClose function when Dismiss button is clicked
                className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelLoadingAlert;
