'use client';
import Header from './_components/Header';
import RecordTypeSelector from './_components/RecordTypeSelector';
import FileUpload from './_components/FileUpload';
import AudioRecorder from './_components/AudioRecorder';
import TranscriptionDisplay from './_components/TranscriptionDisplay';
import RecordEditor from './_components/RecordEditor';
import ActionButtons from './_components/ActionButtons';
import { useState } from 'react';

export default function Home() {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [medicalRecord, setMedicalRecord] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <RecordTypeSelector />
            <FileUpload />
            <AudioRecorder
              setTranscription={setTranscription}
              setMedicalRecord={setMedicalRecord}
            />
          </div>
          <div className="space-y-6">
            <TranscriptionDisplay transcription={transcription} />
            <RecordEditor medicalRecord={medicalRecord} />
          </div>
        </div>
        <ActionButtons />
      </main>
    </div>
  );
}
