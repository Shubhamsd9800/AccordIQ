import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getContractDetails } from "./contractActions";

const ContractDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { contracts, loading, error } = useSelector((state) => state.contracts);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        dispatch(getContractDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        const found = contracts.find((c) => c.id === parseInt(id));
        setContract(found);
    }, [contracts, id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!contract) return <p>Contract not found</p>;

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-6 bg-white shadow-xl rounded-lg border border-gray-200 w-full max-w-3xl">
                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-lg font-semibold text-gray-800 mb-2">
                        {contract.name}
                    </h1>
                    <div className="flex flex-wrap gap-4 overflow-x-auto whitespace-nowrap">
                        {["Review", "Sent for Signature", "Internal Signature", "Executed"].map((status, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded-full text-sm ${
                                    contract.status === status
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                    <h2 className="text-base font-medium text-gray-700 mb-2">
                        {contract.name} - Version xx
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                        Last Updated on {contract.lastUploaded}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600">
                            Edit Document
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300">
                            Preview
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300">
                            Download
                        </button>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="flex justify-between items-center">
                    <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-full text-sm hover:bg-gray-100">
                        Cancel
                    </button>
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600">
                        Send for Signature
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContractDetails;
