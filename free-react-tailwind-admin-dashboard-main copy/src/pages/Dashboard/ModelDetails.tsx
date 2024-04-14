import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideBarLayout from '../../layout/SideBarLayout';
import BenchmarkButton from '../../components/Benchmark';
import SuccessfulCopyAlert from '../../components/SuccessfulCopy';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

const ModelDetails: React.FC = () => {
  const {modelName } = useParams<{modelName: string }>();
  const [model, setModel] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalApiCalls, setTotalApiCalls] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`models/${modelName || ''}`);
    setCopied(true);

    // Hide the success message after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    //fetchProfilePic();

    
    const fetchModelDetails = async () => {
      setIsLoading(true);
      try {
        const modelResponse = await fetch(`https://arcadia-backend-m22shwtlv-teamrywaveios-projects.vercel.app/get_model_by_name/${modelName}`);
        if (modelResponse.ok) {
          const modelData = await modelResponse.json();
          setModel(modelData as Model);
        } else {
          console.error('Failed to fetch model details:', modelResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching model details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModelDetails();
  }, [modelName]);

  if (isLoading) {
    return <p>Loading model details...</p>;
  }

  if (!model) {
    return <p>Model not found.</p>;
  }

  return (
    <SideBarLayout>
      {copied && <SuccessfulCopyAlert />}
      <BenchmarkButton totalCallsMade={model?.run_count || 100} />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-5">
        {model?.cover_image_url && (
    <div className="cover-image-container">
      <img src={model?.cover_image_url} alt="Cover Image" className="cover-image" />
    </div>
  )}
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center mb-8 mt-6">
                <img src="/1.png" alt="Profile" className="h-8 w-8 mr-2 rounded-full" />
              
                <h1 className="text-3xl font-bold text-gray-900">{modelName}</h1>
                <button
                  type="button"
                  className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={copyToClipboard}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                  </svg>
                </button>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 mr-2"
                >
                  {model?.description || 'N/A'}
                </button>
                <button
                  type="button"
                  className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 mr-2"
                >
                  {model?.run_count || 'N/A'}
                </button>
                <button
                  type="button"
                  className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  0.01$ / API Call
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">{model?.description}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
  <SyntaxHighlighter language="python" style={nord} className="rounded-lg mt-4">
    {`import replicate  
  
# Step 1: Initiate the clienet
replicate.client.Client(api_token="<INSERT_API_KEY_HERE>")

# Step 2: Pick the model
model_name = "${modelName}"
input_data = {
  "guidance_data": "example_data/motions/motion-06",
  "ref_image_path": "https://replicate.delivery/pbxt/KdEPlRvrT0Bw4dppxVyLhVxLL9doJGpjKIxMdtOSVIKIUJj1/932c5fad-b1ec-4e13-964f-20936db20954.png"
}

# Step 3: Run the prediction
prediction = replicate.run(model_name, input_data)
print(prediction)`}
  </SyntaxHighlighter>
</div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Model Card</h2>
            <p className="text-gray-700 mt-4">{model?.description || 'N/A'}</p>
            <p className="text-gray-700 mt-4">{model?.github_url || 'N/A'}</p>
            <p className="text-gray-700 mt-4">{model?.url || 'N/A'}</p>

          </div>
        </div>
      </div>
    </SideBarLayout>
  );
}

export default ModelDetails;