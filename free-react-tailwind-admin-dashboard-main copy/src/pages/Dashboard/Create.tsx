import React from 'react';
import SideBarLayout from '../../layout/SideBarLayout';

const BuildYourOwnModelRegistry: React.FC = () => {
  return (
    <SideBarLayout>
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Your Own Model Registry</h1>
        <p className="text-gray-900 mb-5">
          If you're interested in creating your own model registry like Arcadia, follow these 3 simple steps:
        </p>
        <ol className="list-decimal ml-8 mb-6">
          <li className="mb-4">
            <strong>Create Replicate API Key:</strong> Start by obtaining a Replicate API Key. This will allow you to integrate with Replicate and manage your ML models effectively.
          </li>
          <li className="mb-4">
            <strong>Clone the repository:</strong> Clone the personal_model_registry repository from <a href="https://github.com/Timothy102/personal_model_registry" className="text-blue-500" target="_blank" rel="noopener noreferrer">GitHub</a>.
          </li>
          <li className="mb-4">
            <strong>Follow the README.md:</strong> Once you've cloned the repository, follow the instructions in the README.md file to implement and customize your own model registry.
          </li>
        </ol>
        <p className="text-gray-900 mb-6 md:mb-8 lg:mb-10">
          P.S. - I'm interested to hear how you think about this problem. I'd love for you to join the waitlist + discussion group ↓
        </p>
        <p className="text-gray-900 mb-6 md:mb-8 lg:mb-10">
          P.P.S. - I've written an extensive
          <a href="https://medium.com/@timc102/build-a-personal-ml-model-registry-with-replicate-in-5-mins-4210c5c778c1" className="text-blue-500 ml-2" target="_blank" rel="noopener noreferrer">Medium </a>
           article to help you with implementation.
        </p>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScHoQ1CcTfCZhrYfoCl0_dD3C8cAxxvR6vkBbClOjnztrP-sQ/viewform?embedded=true"
          width="640"
          height="1436"
          className="max-w-full"
        ></iframe>
      </div>
    </SideBarLayout>
  );
};

export default BuildYourOwnModelRegistry;