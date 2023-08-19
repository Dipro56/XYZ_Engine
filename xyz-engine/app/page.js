'use client';
import InformationCard from './component/input-card/InformationCard';
import FileUploadCard from './component/input-card/FileUploadCard';
import { useMyContext } from './context/Context';

export default function Home() {
  const { myState } = useMyContext();

  return (
    <main className="min-h-screen flex-col flex items-center pt-16">
      {myState ? <InformationCard /> : <FileUploadCard />}
    </main>
  );
}
