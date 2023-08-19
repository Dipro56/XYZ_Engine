'use client';

import React, { useEffect, useState } from 'react';
import Table from '../component/table/Table.jsx';

const TablePage = () => {
  const [tableData, setTableData] = useState();

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('tableData'));
    console.log('table data befor: ', data);
    setTableData(data);
  }, []);

  return (
    <main className="min-h-screen flex-col flex items-center pt-16">
      {tableData?.length ? (
        <Table data={tableData} />
      ) : (
        <h1>No data to show</h1>
      )}
    </main>
  );
};

export default TablePage;
