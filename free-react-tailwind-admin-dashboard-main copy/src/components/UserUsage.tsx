import { BellIcon } from '@heroicons/react/20/solid';

interface UserUsageButtonProps {
  totalUsers: number | null; // Accepts null if the value is not yet available
}

const UserUsageButton: React.FC<UserUsageButtonProps> = ({ totalUsers }) => {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        <BellIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
        Users
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        {totalUsers !== null ? totalUsers.toLocaleString() : 'Loading...'}
      </button>
    </span>
  );
};

export default UserUsageButton;