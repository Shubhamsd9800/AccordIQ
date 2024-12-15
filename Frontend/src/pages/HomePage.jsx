import React from 'react';
import Menu from '../components/Menu';
import InfoCard from '../components/InfoCard';
import Task from '../components/Task';
import CalenderExpire from '../components/CalenderExpire';
import ContractTable from '../components/ContractTable';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-whiteBg flex flex-col lg:flex-row">
      <div className="w-full lg:w-auto">
        <Menu />
      </div>
      <div className="w-full lg:ml-2">
        <Navbar />
        <div className="w-full p-2 flex flex-col lg:flex-row flex-wrap gap-4">
          <div className="space-y-4 w-full lg:w-auto flex flex-col sm:flex-row sm:space-y-0 sm:space-x-4 lg:flex-col lg:space-x-0 lg:space-y-4 ml-2 md:ml-16">
            <InfoCard title="Contract Value" value="$2.58B" subtitle="No. of contracts - 2.1K" />
            <InfoCard title="Total Contracts" value="2,034" />
            <InfoCard title="Under Review" value="50" />
          </div>
          <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[25%]">
            <Task />
          </div>
          <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[54%]">
            <CalenderExpire />
          </div>
        </div>
        <div className="w-full px-8">
          <ContractTable />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
