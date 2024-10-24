"use client";

import {useState} from 'react';
import dataJson from '../app/Data/data.json';
import LeftArrowIcon from '../app/assets/LeftArrow.svg'
import RightArrowIcon from '../app/assets/RightArrow.svg'
import FootballIcon from '../app/assets/Football_Icon.svg'
import Image from 'next/image';
const data=dataJson.map((item) => ({
  ...item,
  image: item.image, // Use the image URL from the JSON
}));

const IndexPage=() => {
  const [currentPage,setCurrentPage]=useState(1);
  const [rowsPerPage,setRowsPerPage]=useState(10);
  const [selectedData,setSelectedData]=useState(data[0]); // Default first row selected
  const [selectedOperator,setSelectedOperator]=useState(''); // Selected operator
  const [selectedGameType,setSelectedGameType]=useState(''); // Selected game type
  const [selectedSlateName,setSelectedSlateName]=useState(''); // Selected slate name

  const totalItems=data.length; // Total number of items
  const totalPages=Math.ceil(totalItems/rowsPerPage); // Calculate total pages

  const handleNextPage=() => {
    if(currentPage<totalPages) {
      setCurrentPage(currentPage+1);
    }
  };

  const handlePrevPage=() => {
    if(currentPage>1) {
      setCurrentPage(currentPage-1);
    }
  };

  const handleRowsPerPageChange=(event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  const handlePageChange=(event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(event.target.value));
  };

  const handleRowClick=(item: {
    image: string;
    id: number;
    name: string;
    team: string;
    position: string;
    salary: number;
    points: number;
  }) => {
    // Select the clicked row
    setSelectedData(item);
  };

  // Get the data for the current page
  const currentData=data.slice(
    (currentPage-1)*rowsPerPage,
    currentPage*rowsPerPage
  );

  // Calculate the current range for pagination display
  const startIndex=(currentPage-1)*rowsPerPage+1; // Start index
  const endIndex=Math.min(currentPage*rowsPerPage,totalItems); // End index

  return (
    <div className="min-h-screen bg-[#191919] flex flex-col">
      {/* Header */}
      <header className="bg-[#050505] text-[#FFFFFF] flex items-center p-4">
        <Image
          src={FootballIcon} // Placeholder for user icon
          alt="User Icon"
          className=" mr-3 h-[40px] w-[48px]"
        />
        <h1 className="font-inter text-[20px] font-normal leading-7">Fantasy Football</h1>
      </header>

      {/* Main Content - Flex Container for Dropdowns, Table, and Selected Data */}
      <div className=" mx-[15vw] my-[40px] bg-[#2f2f2f] rounded-[8px]">
        <div className="flex space-x-4 mx-[20px] my-[28px] ">
          <div className="flex-1">
            <select
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e.target.value)}
              className="w-full px-1 py-1 bg-[#1d1d1d] text-[#FFFFFF] rounded-[8px]"
            >
              <option value="">Select Operator</option>
              <option value="operator1">Operator 1</option>
              <option value="operator2">Operator 2</option>
              <option value="operator3">Operator 3</option>
            </select>
          </div>

          <div className="flex-1">
            <select
              value={selectedGameType}
              onChange={(e) => setSelectedGameType(e.target.value)}
              className="w-full px-1 py-1 bg-[#1d1d1d] text-[#FFFFFF] rounded-[8px]"
            >
              <option value="">Select Game Type</option>
              <option value="gameType1">Game Type 1</option>
              <option value="gameType2">Game Type 2</option>
              <option value="gameType3">Game Type 3</option>
            </select>
          </div>

          <div className="flex-1">
            <select
              value={selectedSlateName}
              onChange={(e) => setSelectedSlateName(e.target.value)}
              className="w-full px-1 py-1 bg-[#1d1d1d] text-[#FFFFFF] rounded-[8px]"
            >
              <option value="">Select Slate Name</option>
              <option value="slate1">Slate 1</option>
              <option value="slate2">Slate 2</option>
              <option value="slate3">Slate 3</option>
            </select>
          </div>
        </div>
      </div>
      <main className="flex flex-1 pl-4 pr-4 pb-4">
        <div className="flex flex-col flex-1 mr-4">
          {/* Table Container with Scroll */}
          <div className="bg-[#262626] shadow-md rounded-lg flex-1 overflow-hidden">
            <div
              className="max-h-[48vh] h-auto overflow-y-auto"
              style={{
                scrollbarWidth: 'none'
              }}
            >
              <table className="min-w-full table-auto">
                <thead className='sticky top-0 z-10'>
                  <tr className="bg-[#1d1d1d] text-[#FFFFFF] text-left">
                    <th className="p-3 font-normal">Name</th>
                    <th className="p-3 font-normal">Team</th>
                    <th className="p-3 font-normal">Position</th>
                    <th className="p-3 font-normal">Salary</th>
                    <th className="p-3 font-normal">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item: any) => (
                    <tr
                      key={item.id}
                      className={`cursor-pointer text-left text-[#FFFFFF] ${selectedData?.id===item.id? 'bg-[#807b0f]':'bg-[#2f2f2f]'
                        }`}
                      onClick={() => handleRowClick(item)}
                    >
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.team}</td>
                      <td className="p-3">{item.position}</td>
                      <td className="p-3">{item.salary}</td>
                      <td className="p-3">{item.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination and Rows per Page */}
            <div className="flex justify-between items-center p-4 bg-[#262626]">
              {/* Rows per Page Dropdown */}
              <div className="flex items-center space-x-2">
                <span className='text-[#FFFFFF]'>Page</span>
                <select
                  value={currentPage}
                  onChange={handlePageChange}
                  className="px-1 py-1 bg-[#1d1d1d] text-[#FFFFFF] rounded"
                >
                  {Array.from({length: totalPages},(_,i) => (
                    <option key={i+1} value={i+1}>
                      {i+1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className='text-[#FFFFFF]'>Rows per page</span>
                <select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  className="px-1 py-1 bg-[#1d1d1d] text-[#FFFFFF] rounded"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Display Current Range */}
              <div className='text-[#FFFFFF]'>
                {`${startIndex}-${endIndex} of ${totalItems}`}
              </div>

              {/* Page Dropdown */}
              <div className="flex items-center space-x-2">

                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  className={`px-3 py-2 text-[#FFFFFF] rounded ${currentPage===1? 'opacity-50 cursor-not-allowed':''
                    }`}
                  disabled={currentPage===1}
                >
                  <Image src={LeftArrowIcon} className='h-3 w-4' alt='Arrow' />
                </button>
                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  className={`px-3 py-2 text-[#FFFFFF] rounded ${currentPage===totalPages? 'opacity-50 cursor-not-allowed':''
                    }`}
                  disabled={currentPage===totalPages}
                >
                  <Image src={RightArrowIcon} className='h-3 w-4' alt='Arrow' />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Data on the Right */}
        <aside className="w-1/4 rounded-[8px] flex flex-col">
          <div className='h-[50%] bg-[#1d1d1d] rounded-t-[8px]'>
            <img src={selectedData.image} alt={'User Icon'} className='h-full w-full object-cover rounded-t -[8px]' />

          </div>
          <div className='h-[50%] bg-[#2f2f2f] flex flex-col items-center justify-around rounded-[8px]'>
            <p className='font-inter text-32px font-normal text-center text-[#FFFFFF]'>{selectedData.name}</p>
            <p className='font-inter text-[72px] font-normal text-center text-[#FFFFFF]'>{selectedData.points}</p>
            <p className='font-inter text-[16px] font-normal text-center text-[#FFFFFF]'>Points</p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default IndexPage;
