import React from 'react';

function InfoCard({ title, value, subtitle }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow w-54">
      <h3 className="text-gray-600 text-2xl font-bold">{title}</h3>
      <p className="text-blue-800 text-3xl font-bold">{value}</p>
      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
    </div>
  );
}

export default InfoCard;
