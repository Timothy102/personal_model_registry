import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

interface Model {
    model_id: string;
    name: string;
    description: string;
    long_description: string | null;
    use_case_category: string | null;
    output_path: string;
    category: string | null;
    charge_per_api_call: number;
    creator_id: number;
}

interface Props {
    models: Model[];
  }  

const ModelGrid: React.FC<Props> = ({ models }) => {
    return (
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        {models.map((model: Model) => (
          <li key={model.model_id} className="overflow-hidden rounded-xl border border-gray-200">
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <div className="text-sm font-medium leading-6 text-gray-900">{model.name}</div>
              <div className="text-sm text-gray-500">{model.category}</div>
              <Menu as="div" className="relative ml-auto">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
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
          </li>
        ))}
      </ul>
    )
  }

export default ModelGrid;
