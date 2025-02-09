import { Upload } from 'lucide-react';

export default function FileUpload() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upload de Exames</h2>
      <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center">
        <label htmlFor=""></label>
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-1 text-sm text-gray-600">
          Arraste e solte arquivos aqui ou clique para selecionar
        </p>
        <input type="file" className="hidden" multiple accept=".pdf,image/*" />
      </div>
    </div>
  );
}
