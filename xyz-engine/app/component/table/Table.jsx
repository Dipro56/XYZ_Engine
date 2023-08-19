// components/Table.js
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useRouter } from 'next/navigation';


const Table = (props) => {
  let tableData = props.data;

  let Router = useRouter()

  const clearTable = () => {
    localStorage.removeItem('tableData');
    Router.push('/')
  };

  const generatePdf = (tableData) => {
    const doc = new jsPDF();

    doc.text('Table Data as PDF', 10, 10);

    const exportData = tableData.map((item) => [
      item.projectName,
      item.client,
      item.contractor,
      item.maxX,
      item.minX,
      item.maxY,
      item.minY,
      item.maxZ,
      item.minZ,
      item.description,
    ]);

    doc.autoTable({
      head: [
        [
          'Project',
          'Client',
          'Contractor',
          'Max X',
          'Min X',
          'Max Y',
          'Min Y',
          'Max Z',
          'Min Z',
          'Description',
        ],
      ],
      body: exportData,
    });

    doc.save('table_data.pdf');
  };

  return (
    <div className="w-full overflow-x-auto p-9">
      <div className="flex justify-end my-3">
        <button
          onClick={clearTable}
          class="bg-red-500 hover:bg-red-700 text-white font-normal py-2 px-4 rounded mr-3"
        >
          Clear all data
        </button>
        <button
          onClick={() => {
            generatePdf(tableData)
          }}
          class="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded"
        >
          Download PDF
        </button>
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
