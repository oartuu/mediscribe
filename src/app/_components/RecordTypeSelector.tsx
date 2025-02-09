import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RecordTypeSelector() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Tipo de Prontuário</h2>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione o tipo de prontuário" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="anamnese">Anamnese</SelectItem>
          <SelectItem value="evolucao">Evolução</SelectItem>
          <SelectItem value="outros">Outros</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

