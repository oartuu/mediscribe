import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Pencil } from 'lucide-react';
import showdown from 'showdown';

interface MedicalRecordProps {
  medicalRecord: string | null;
}

export default function RecordEditor({ medicalRecord }: MedicalRecordProps) {
  const converter = new showdown.Converter();
  const [editableContent, setEditableContent] = useState<string>(
    medicalRecord ? converter.makeHtml(medicalRecord) : ''
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: editableContent || 'O conteúdo do prontuário aparecerá aqui...',
    onUpdate: ({ editor }) => {
      setEditableContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && medicalRecord) {
      editor.commands.setContent(converter.makeHtml(medicalRecord));
    }
  }, [medicalRecord, editor]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-semibold mb-4">Edição do Prontuário</h2>
        <Pencil className="h-5 w-5" />
      </div>
      <EditorContent
        editor={editor}
        className="border rounded-lg p-2 outline-none focus-visible:outline-none focus-visible:border-none "
      />
      <p className="text-sm text-gray-500 mt-2">
        Edite o prontuário acima conforme necessário.
      </p>
    </div>
  );
}
