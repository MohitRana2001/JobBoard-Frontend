import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link
          to="/create-job"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
        >
          <PlusCircle className="mr-2" size={20} />
          Create Interview
        </Link>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Job Postings</h2>
        <p className="text-gray-600">You haven't created any job postings yet. Click "Create Interview" to get started!</p>
      </div>
    </div>
  );
};

export default Dashboard;