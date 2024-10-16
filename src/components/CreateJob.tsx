import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FormData = {
  jobTitle: string;
  jobDescription: string;
  experienceLevel: string;
  endDate: string;
  candidates: string[];
};

export default function CreateJob() {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>();
  const [candidates, setCandidates] = useState<string[]>([]);
  const [newCandidate, setNewCandidate] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    console.log({ ...data, candidates });
    try{
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/login');
            return;
        }
        console.log(token);
        const response = await axios.post('http://localhost:4000/api/jobs',{...data,candidates},{
            headers:{
                'x-auth-token': token
            }
        });
        console.log(response.data);
        if(response.status === 201){
            navigate('/dashboard');
        }
    }catch(err){
        if (axios.isAxiosError(err) && err.response) {
            setErr(err.response.data.msg || 'Failed to create job posting');
          } else {
            setErr('An unexpected error occurred');
          }
    }
    
  };
  const addCandidate = () => {
    if (newCandidate && !candidates.includes(newCandidate)) {
      setCandidates([...candidates, newCandidate]);
      setNewCandidate('');
    }
  };

  const removeCandidate = (email: string) => {
    setCandidates(candidates.filter(c => c !== email));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Create New Job Posting</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="jobTitle">Job Title</label>
          <input
            id="jobTitle"
            type="text"
            {...register('jobTitle', { required: 'Job title is required' })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter Job Title"
          />
          {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            {...register('jobDescription', { required: 'Job description is required' })}
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
            placeholder="Enter Job Description"
          ></textarea>
          {errors.jobDescription && <p className="text-red-500 text-sm mt-1">{errors.jobDescription.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="experienceLevel">Experience Level</label>
          <select
            id="experienceLevel"
            {...register('experienceLevel', { required: 'Experience level is required' })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Experience Level</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
          </select>
          {errors.experienceLevel && <p className="text-red-500 text-sm mt-1">{errors.experienceLevel.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Add Candidate</label>
          <div className="flex">
            <input
              type="email"
              value={newCandidate}
              onChange={(e) => setNewCandidate(e.target.value)}
              className="flex-grow px-3 py-2 border rounded-l-md"
              placeholder="Candidate Email"
            />
            <button
              type="button"
              onClick={addCandidate}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {candidates.map((email, index) => (
              <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                <span className="mr-2">{email}</span>
                <button type="button" onClick={() => removeCandidate(email)} className="text-gray-600 hover:text-red-600">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="endDate">End Date</label>
          <Controller
            name="endDate"
            control={control}
            rules={{ required: 'End date is required' }}
            render={({ field }) => (
              <input
                type="date"
                id="endDate"
                {...field}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full px-3 py-2 border rounded-md"
              />
            )}
          />
          {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}