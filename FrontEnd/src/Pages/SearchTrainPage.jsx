import React, { useState, useEffect, useCallback, useId } from 'react'
import { Button } from '../Components/index.js';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import useDebounce from '../customHooks/deBounceHook.jsx';
import HighlightedText from '../Components/HighlightedText.jsx';

export default function SearchTrainPage() {
    const [field, setField] = useState("");
    const [trainSuggestions, setTrainSuggestions] = useState([]);
    const [trainData, setTrainData] = useState(null)
    const [activeDays, setActiveDays] = useState([])
    const [loading, setLoading] = useState(true)

    const days = {
        "Sunday": "S",
        'Monday': 'M',
        "Tuesday": 'T',
        "Wednesday": 'W',
        "Thursday": 'T',
        "Friday": 'F',
        "Saturday": 'S'
    }

    const id = useId()

    const notify = useCallback((message, state) => {
        if (state === 'success')
            toast.success(message, {
                theme: 'colored',
                autoClose: 2000,
                toastId: id
            });
        else
            toast.error(message, {
                theme: 'colored',
                autoClose: 2000,
                toastId: id
            });
    }, []);

    const fetchTrainData = useCallback(async (value) => {
        try {
            let response;
            if (!isNaN(value)) {
                response = await fetch(`/api/v1/trains/search-train-by-no/c/${value}`, {
                    method: 'GET'
                });
            } else {
                response = await fetch(`/api/v1/trains/search-train-by-name/c/${value}`, {
                    method: 'GET'
                });
            }
            const data = await response.json();
            // console.log(data);

            if (!data?.success) {
                setTrainData(null)
                notify(data.message, 'error')
            }
            else {
                notify(data.message, 'success');
                setTrainData(data.data);
                setAllData(data.data);
            }
        } catch (error) {
            notify(error, 'error')
        } finally {
            setLoading(false)
        }
    }, [notify]);

    const debounceFetchTrainData = useDebounce(fetchTrainData, 500)

    const setAllData = useCallback((data) => {
        setActiveDays(data?.activeDays || []);
    }, []);

    useEffect(() => {
        const query = JSON.parse(localStorage.getItem('searchTrainQuery'))
        setField(query)
        debounceFetchTrainData(query)
    }, [])

    const handleField = useCallback(async (e) => {
        const value = e?.target?.value;
        setField(value);

        if (!isNaN(value)) {
            setTrainSuggestions([]);
        } else {
            debouncegetTrainSuggestion(value);
        }
    }, []);

    const getTrainSuggestions = useCallback(async (query) => {
        try {
            const response = await fetch(`/api/v1/trains/train-suggestions?query=${query}`);
            const result = await response.json();
            setTrainSuggestions(result.data);
        } catch (error) {
            console.error("Error while getting suggestions: ", error);
        }
    }, []);

    const debouncegetTrainSuggestion = useDebounce(getTrainSuggestions, 500)

    const handleSuggestionClick = useCallback((suggestion) => {
        setField(suggestion.trainName);
        setTrainSuggestions([]);
    }, []);

    const handleForm = useCallback(async (e) => {
        e.preventDefault()

        if (field.trim().length === 0) {
            notify("Train no or name is required", 'error')
            return;
        }

        debounceFetchTrainData(field);

    }, [field, fetchTrainData]);


    return (
        <div className="w-full h-screen flex flex-col items-center bg-orange-50">
            <ToastContainer style={{ width: "360px" }} />
            <form onSubmit={handleForm} className="w-10/12 relative top-5 h-32 px-10 rounded-xl flex flex-col justify-between items-center bg-white shadow-md gap-y-4">
                <h1 className="text-3xl font-medium text-orange-800 mt-4">Enter train no or name to search</h1>
                <div className="w-full flex flex-row items-center justify-center mb-5">
                    <div className="flex flex-row">
                        <input
                            id="ser"
                            value={field}
                            onChange={handleField}
                            className="w-64 px-4 py-2.5 border border-gray-300 rounded-l-lg shadow-sm"
                            type="text"
                            placeholder="Enter Train name/number"
                        />
                        {trainSuggestions?.length > 0 && (
                            <ul className="absolute w-64 max-h-48 overflow-y-auto mt-12 bg-white border border-gray-300 rounded-lg shadow-md">
                                {trainSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="pl-2 pr-4 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        <HighlightedText text={suggestion.trainName} highlight={field} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-30 px-3 py-1 text-xl rounded-r-lg bg-orange-500 border border-orange-500 text-white hover:bg-orange-600"
                    >
                        Check Status
                    </Button>
                </div>
            </form>

            {loading ? (
                <div className="w-full flex justify-center items-center mt-40">
                    <div className="w-6/12 flex justify-center items-center bg-white shadow-md rounded-md text-center py-8 text-2xl font-medium">
                        <div>Fetching Train Data...</div>
                    </div>
                </div>
            ) : ((trainData ? (
                <div className='w-full flex flex-col items-center' >
                    <div className="w-8/12 mt-14 flex flex-col items-center bg-white shadow-md rounded-lg p-6">
                        <div className="w-full flex flex-row items-center justify-around gap-x-6 gap-y-4">
                            <div className="text-3xl font-semibold text-orange-800">{trainData?.trainName} - {trainData?.trainNo}</div>
                            <div className="flex gap-2">
                                {Object.keys(days).map(day => (
                                    <span
                                        key={day}
                                        className={`p-2 rounded-lg ${activeDays.includes(day) ? 'bg-orange-500 text-white' : ' text-gray-500'}`}
                                    >
                                        {days[day]}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-center mt-6 px-5">
                            <div className="w-10/12 flex justify-between items-center bg-orange-100 px-5 py-4 rounded-lg shadow-sm">
                                <div className="flex flex-col items-center">
                                    <div className="text-gray-700 font-medium">{trainData?.route[0]?.stationName}</div>
                                    <div className="text-gray-500">{trainData?.departureTime}</div>
                                </div>
                                <div className="flex flex-row items-center gap-x-5">
                                    <span className="text-gray-400">----</span>
                                    <span className="text-gray-700">{`${trainData?.duration?.hours} Hr ${trainData?.duration?.minutes} Min`}</span>
                                    <span className="text-gray-400">----</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-gray-700 font-medium">{trainData?.route[trainData?.route.length - 1]?.stationName}</div>
                                    <div className="text-gray-500">{trainData?.arrivalTime}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-10/12 mt-10 flex flex-col items-center">
                        <h2 className="text-2xl font-bold text-orange-800">Train Route</h2>
                        <div className="w-full mt-2">
                            <div className="w-full flex items-center justify-center">
                                <div className="w-10/12 flex items-center justify-center">
                                    {trainData?.route.map((station, index) => (
                                        <div key={index} className="flex items-center w-full mb-4">
                                            <div className="min-w-28 flex flex-col items-center shadow-lg p-4 rounded-lg bg-white">
                                                <div className="text-center font-medium text-orange-800">{station.stationName}</div>
                                                <div className="text-sm text-gray-500">{station.arrivalTime}</div>
                                            </div>
                                            {index < trainData.route.length - 1 && (
                                                <div className="flex items-center justify-center w-20">
                                                    <span className="block h-0.5 bg-gray-300 flex-grow"></span>
                                                    <span className="mx-2 text-gray-500 text-lg">→</span>
                                                    <span className="block h-0.5 bg-gray-300 flex-grow"></span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-10/12 mx-auto mt-24 p-6 bg-orange-100 shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-orange-800">Comments</h2>
                        {trainData?.comments?.length > 0 ? (
                            <ul className="space-y-4">
                                {comments.map((comment, index) => (
                                    <li key={index} className="p-4 flex flex-col items-start border border-orange-300 rounded-lg bg-white">
                                        <div className="text-lg font-medium text-orange-800">
                                            {comment?.username || '-'}
                                        </div>
                                        <div className="text-gray-600">
                                            {comment.content}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-gray-600">No comments available</div>
                        )}
                    </div>
                </div>) : (
                <div className=" bg-white mt-20 shadow-md text-red-600 flex justify-center items-center p-4 rounded-lg">
                    <div className="text-xl font-semibold">Sorry, we couldn't find any train matching your search criteria.</div>
                </div>
            )
            )
            )}
        </div >
    );
}