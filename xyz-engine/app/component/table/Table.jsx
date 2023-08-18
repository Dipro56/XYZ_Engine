// components/Table.js
import React from 'react';
import { PDFExport } from '@react-pdf/renderer';

const Table = (props) => {
  let tableData = props.data;

  let pdfExportComponent;

  const handleDownloadPDF = () => {
    pdfExportComponent.save();
  };
  return (
    <div className="w-full overflow-x-auto p-9">
      <div className='flex items-center '>
         <button className='bg-blue-500 p-3 border-rounded' onClick={handleDownloadPDF}>Download PDF</button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contractor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Max X
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Min X
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Max Y
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Min Y
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Max Z
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Min Z
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData?.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.projectName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.client}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.contractor}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.maxX}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.minX}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.maxY}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.minY}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.maxZ}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.minZ}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
