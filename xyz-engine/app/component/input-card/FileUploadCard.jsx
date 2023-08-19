'use client';

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useMyContext } from '@/app/context/Context';
import { useRouter } from 'next/navigation';

const FileUploadCard = () => {

  let router = useRouter()
  const [csvData, setCsvData] = useState([]);
  const [selectedFile, setSelectedFile] = useState();

  const [projectName, setProjectName] = useState();
  const [client, setClient] = useState();
  const [contractor, setContractor] = useState();
  const [description, setDescription] = useState();
  const [maxX, setMaxX] = useState();
  const [minX, setMinX] = useState();
  const [maxY, setMaxY] = useState();
  const [minY, setMinY] = useState();
  const [maxZ, setMaxZ] = useState();
  const [minZ, setMinZ] = useState();

  const { setMyState, setChartData } = useMyContext();

  const handleFileChange = (event) => {
    console.log('event.target.files[0]: ', event.target.files[0]);
    let file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);
      },
      header: true, // Set this to true if your CSV file has a header row
    });
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('initialInformation'));

    setProjectName(data?.projectName);
    setClient(data?.client);
    setContractor(data?.contractor);
    setDescription(data?.description);

  }, []);

  useEffect(() => {
    setChartData(csvData);

    const properties = ['X', 'Y', 'Z'];

    const result = properties.reduce((acc, property) => {
      acc[property] = {
        max: -Infinity,
        min: Infinity,
      };
      return acc;
    }, {});

    csvData.forEach((object) => {
      properties.forEach((property) => {
        const value = object[property];
        const { max, min } = result[property];

        if (value > max) {
          result[property].max = value;
        }

        if (value < min) {
          result[property].min = value;
        }
      });
    });

    if (result?.X.max !== -Infinity) {
      setMaxX(result?.X.max);
    }
    if (result?.X.min !== Infinity) {
      setMinX(result?.X.min);
    }
    if (result?.Y.max !== -Infinity) {
      setMaxY(result?.Y.max);
    }

    if (result?.Y.min !== Infinity) {
      setMinY(result?.Y.min);
    }

    if (result?.Z.max !== -Infinity) {
      setMaxZ(result?.Z.max);
    }

    if (result?.Z.min !== Infinity) {
      setMinZ(result?.Z.min);
    }
  }, [selectedFile, csvData]);

  const formSubmitHandler = () => {
    event.preventDefault();

    if (
      projectName &&
      client &&
      contractor &&
      description &&
      maxX &&
      minX &&
      maxY &&
      minY &&
      maxZ &&
      minZ
    ) {
      let data = {
        projectName,
        client,
        contractor,
        description,
        maxX,
        minX,
        maxY,
        minY,
        maxZ,
        minZ,
      };

      localStorage.removeItem('initialInformation');

      let tableData = JSON.parse(localStorage.getItem('tableData'));

      if (tableData) {
        tableData = [...tableData, data];
        localStorage.setItem('tableData', JSON.stringify(tableData));
      } else {
        let newTableData = [data];
        localStorage.setItem('tableData', JSON.stringify(newTableData));
      }
      setMyState(true);
      router.push('/table-page')
    } else {
      alert('Fill all field');
    }
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
      <form className="space-y-6" action="#">
        <h5 className="text-xl font-medium text-gray-900 ">
          Submit Information
        </h5>
        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Project Name
          </label>
          <input
            value={projectName}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Project name"
            required
            disabled
          />
        </div>

        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Client
          </label>
          <input
            value={client}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Client"
            required
            disabled
          />
        </div>

        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Contractor
          </label>
          <input
            value={contractor}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Contractor"
            required
            disabled
          />
        </div>

        <div>
          <label
            for="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            value={description}
            required
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Write description..."
            disabled
          ></textarea>
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            for="file_input"
          >
            Upload file
          </label>
          <input
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
            id="file_input"
            type="file"
          />
        </div>

        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Max input X
          </label>
          <input
            onChange={(event) => {
              console.log(event.target.value);
              setMaxX(event.target.value);
            }}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Max input X"
            required
            value={maxX}
          />
        </div>

        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Min input X
          </label>
          <input
            onChange={(event) => {
              setMinX(event.target.value);
            }}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Min input X"
            required
            value={minX}
          />
        </div>

        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Max input Y
          </label>
          <input
            onChange={(event) => {
              setMaxY(event.target.value);
            }}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Max input Y"
            value={maxY}
            required
          />
        </div>

        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Min input Y
          </label>
          <input
            onChange={(event) => {
              setMinY(event.target.value);
            }}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Min input Y"
            value={minY}
            required
          />
        </div>

        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Max input Z
          </label>
          <input
            onChange={(event) => {
              setMaxZ(event.target.value);
            }}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Max input Z"
            value={maxZ}
            required
          />
        </div>

        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Min input Z
          </label>
          <input
            onChange={(event) => {
              setMinZ(event.target.value);
            }}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Min input Z"
            value={minZ}
            required
          />
        </div>

        <button
          onClick={formSubmitHandler}
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FileUploadCard;
