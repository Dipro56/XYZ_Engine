'use client';
import InformationCard from './component/input-card/InformationCard';
import FileUploadCard from './component/input-card/FileUploadCard';
import { useContext, useEffect, useState } from 'react';
import { MyContext, useMyContext } from './context/Context';

export default function Home() {
  const [initialFormSubmitted, setInitialFormSubmitted] = useState(false);

  const { myState, setMyState } = useMyContext();

  useEffect(() => {
    let initialInfo = localStorage.getItem('initialInformation');
    if (initialInfo) {
      setInitialFormSubmitted(true);
    }
  }, []);
  return (
    <main className="min-h-screen flex-col flex items-center pt-16">
      {myState ? <InformationCard /> : <FileUploadCard />}
    </main>
  );
}
