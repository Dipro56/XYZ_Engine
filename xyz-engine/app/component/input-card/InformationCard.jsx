'use client'

import { useMyContext } from '@/app/context/Context';
import React, { useState } from 'react';


const InformationCard = () => {
  const [projectName, setProjectName] = useState();
  const [client, setClient] = useState();
  const [contractor, setContractor] = useState();
  const [description, setDescription] = useState();
    const { myState, setMyState } = useMyContext();

  const formSubmitHandler = () => {
    event.preventDefault()
    if (projectName && client && contractor && description) {
      let data = {
        projectName,
        client,
        contractor,
        description
      }
      setMyState(false)
      localStorage.setItem('initialInformation', JSON.stringify(data))
    }
    else {
      alert('Fill all field')
    }
  }

  return (
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
      <form class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 ">Submit Information</h5>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            Project Name
          </label>
          <input
            onChange={(event) => {
              setProjectName(event.target.value);
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Project name"
            required
          />
        </div>

        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            Client
          </label>
          <input
            onChange={(event) => {
              setClient(event.target.value);
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Client"
            required
          />
        </div>

        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            Contractor
          </label>
          <input
            onChange={(event) => {
              setContractor(event.target.value);
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Contractor"
            required
          />
        </div>

        <div>
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            required
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Write description..."
          ></textarea>
        </div>

        <button
          onClick={formSubmitHandler}
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InformationCard;
