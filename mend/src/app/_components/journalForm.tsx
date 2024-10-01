"use client"
import { useState } from 'react';
import { api } from "~/trpc/react";

const JournalForm = () => {
    const [entry, setEntry] = useState({
        feelings: '',
        happened: '',
        wished: '',
    });
    const [response, setResponse] = useState('');

    const mutation = api.gemini.getAdvice.useMutation({
        onSuccess: (data) => {
            setResponse(data.advice); // Assuming the API returns an `advice` property
        },
        onError: (error) => {
            console.error("Error fetching advice:", error);
            setResponse("Sorry, something went wrong.");
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(entry);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>How are you feeling today?
                    <input
                        type="text"
                        value={entry.feelings}
                        onChange={(e) => setEntry({ ...entry, feelings: e.target.value })}
                        className="bg-gray-500 border border-gray-300 rounded-md p-2" // Change to your desired background color
                    />
                </label>
                <label>
                    What Happened?
                    <textarea
                        value={entry.happened}
                        onChange={(e) => setEntry({ ...entry, happened: e.target.value })}
                        className="bg-gray-500 border border-gray-300 rounded-md p-2" // Change to your desired background color
                    />
                </label>
                <label>
                    What do you wish had happened?
                    <textarea
                        value={entry.wished}
                        onChange={(e) => setEntry({ ...entry, wished: e.target.value })}
                        className="bg-gray-500 border border-gray-300 rounded-md p-2" // Change to your desired background color
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {response && <p>AI Advice: {response}</p>}
        </div>
    );
};

export default JournalForm;