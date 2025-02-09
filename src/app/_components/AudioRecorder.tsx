'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Mic, SendHorizonal, StopCircle, Upload } from 'lucide-react';
import { useState, useRef } from 'react';

interface FileUploadProps {
  setTranscription: (transcription: string | null) => void;
  setMedicalRecord: (medicalRecord: string | null) => void;
}

export default function FileUpload({
  setTranscription,
  setMedicalRecord,
}: FileUploadProps) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setAudioSrc(objectURL);
      setAudioBlob(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.current.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        setAudioSrc(audioUrl);
        setAudioBlob(blob);
        console.log('Áudio gravado:', audioUrl);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Erro ao acessar o microfone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToApi = async () => {
    if (!audioBlob) {
      console.error('Nenhum áudio para enviar.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');

      console.log('Enviando áudio:', audioBlob);

      const response = await axios.post(
        'https://mediscribe-core.onrender.com/api/v1/generate_medical_record',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Resposta da API:', response.data);
      setTranscription(response.data.result.transcription);
      setMedicalRecord(response.data.result.medical_record);
      console.log('Transcrição:', response.data.result.transcription);
      console.log('Prontuário:', response.data.result.medical_record);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao enviar áudio:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col items-start">
        <h2 className="text-xl font-semibold mb-2">
          Upload e Gravação de Áudio
        </h2>
        <p className="text-gray-700">
          Fale sobre o caso do paciente e deixe a MedScribe preencher o
          prontuário por você!
        </p>
      </div>

      <div className="flex justify-start items-center mt-4 gap-2 ">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          className={` flex items-center space-x-2 ${
            isRecording ? 'bg-red-500' : 'bg-foreground'
          }`}
        >
          {isRecording ? (
            <StopCircle className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
          <span>{isRecording ? 'Parar Gravação' : 'Iniciar Gravação'}</span>
        </Button>

        <div className=" flex justify-start items-center">
          <label htmlFor="fileInput" className="cursor-pointer">
            <div className="flex justify-center items-center gap-2 border rounded-lg  p-[5px] px-2 hover:bg-blue-400">
              <Upload className="mx-auto h-5 text-black" />
              <p className="mt-1 text-sm text-black">
                Clique para enviar um arquivo
              </p>
            </div>
          </label>
          <input
            type="file"
            id="fileInput"
            accept="audio/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
      {audioSrc && (
        <>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Áudio Selecionado/Gravado:</h3>
            <audio controls src={audioSrc} className="w-full mt-2"></audio>
          </div>
          <div className="w-full flex justify-end items-start mt-4">
            <Button
              className="flex justify-center items-center gap-2"
              onClick={sendAudioToApi}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2 w-full">
                  <svg
                    className="mr-3 size-5 animate-spin ..."
                    viewBox="0 0 24 24"
                  ></svg>
                  <p>Carregando…</p>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <p>Enviar Gravação</p>
                  <SendHorizonal className="w-5 h-5" />
                </div>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
