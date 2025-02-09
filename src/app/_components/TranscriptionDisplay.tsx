import { Button } from '@/components/ui/button';

interface TranscriptionDisplayProps {
  transcription: string | null;
}

export default function TranscriptionDisplay({
  transcription,
}: TranscriptionDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Transcrição</h2>
      <div className="bg-gray-100 p-4 rounded-lg h-40 overflow-y-auto">
        <p className="text-gray-700">
          {transcription
            ? transcription
            : 'A transcrição do áudio aparecerá aqui...'}
        </p>
      </div>
      <div className="flex justify-end items-start w-[100%]">
        <Button className="mt-4  w-1/3">Salvar</Button>
      </div>
    </div>
  );
}
