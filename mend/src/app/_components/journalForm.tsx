"use client"
import { useState } from 'react';
import { api } from "~/trpc/react";

const JournalForm = () => {
    const [entry, setEntry] = useState({
        feelings: '',
    });
    const [response, setResponse] = useState('');

    const getAdvice = api.gemini.getAdvice.useMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const aiResponse = await getAdvice.mutateAsync({
                feelings: entry.feelings,
            });
            setResponse(aiResponse.text)
        } catch (error) {
            console.error("Error fetching AI advice:", error);
            setResponse("Sorry, something went wrong.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className='flex justify-center p-2'>
                        <label>Tell me about your day:</label>
                    </div>
                    <div className='flex justify-center'>
                        <input
                            value={entry.feelings}
                            onChange={(e) => setEntry({ ...entry, feelings: e.target.value })}
                            className="text-xs font-light bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white border border-gray-300 rounded-md p-3 w-64 h-12"
                        />
                    </div>
                {/* </label> */}
                <div className='flex justify-center p-3' >
                    <button className="bg-#15162c text-white hover:bg-indigo-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit">Submit</button>
                </div>
            </div>
        </form >
        <p className='flex justify-center mt-4'>Advice:</p>
        <div className="flex justify-center">
            
        <div className="max-w-md w-full bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white p-4 rounded-lg shadow-md text-center mx-auto">
            
          {response && (
            <p className="text-sm font-light">
              <strong></strong> {response}
            </p>
          )}
        </div>
      </div>
    </div>
    );
};

export default JournalForm;