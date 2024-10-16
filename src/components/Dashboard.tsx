import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios';
import { Input } from './ui/input';

interface Job{
    _id: string;
    jobTitle: string;
    jobDescription: string;
    experienceLevel: string;
    endDate: Date;
    candidates: string[];
}

const Dashboard: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('token');
            if(!token){
                setError('No token found');
                return;
            }

            const response = await axios.get('http://localhost:4000/api/jobs',{
                headers:{
                    'x-auth-token': token
                }
            });
            console.log(response.data);
            setJobs(response.data);
        }catch(err){
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.msg || 'Failed to fetch jobs');
              } else {
                setError('An unexpected error occurred');
              }
        }
        }

        fetchJobs();
    }, []);

    const handleSearch = (event : React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = jobs.filter(job => 
            job.jobTitle.toLowerCase().includes(term) ||
            job.jobDescription.toLowerCase().includes(term) ||
            job.experienceLevel.toLowerCase().includes(term)
        );
        setFilteredJobs(filtered);
    }

    return (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Link
              to="/create-job"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <PlusCircle className="mr-2" size={20} />
              Create Job Posting
            </Link>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-white"
            //   icon={<Search className="mr-2 h-4 w-4" />}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(searchTerm ? filteredJobs : jobs).map((job) => (
              <Card key={job._id}>
                <CardHeader>
                  <CardTitle>{job.jobTitle}</CardTitle>
                  <CardDescription>Experience: {job.experienceLevel}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{job.jobDescription.substring(0, 100)}...</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">End Date: {new Date(job.endDate).toLocaleDateString()}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
          {(searchTerm ? filteredJobs : jobs).length === 0 && (
            <p className="text-center text-gray-600 mt-8">No job postings found.</p>
          )}
        </div>
      );
};

export default Dashboard;