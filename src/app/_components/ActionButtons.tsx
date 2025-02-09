import { Button } from '@/components/ui/button';

export default function ActionButtons() {
  return (
    <div className="mt-8 flex justify-end space-x-4">
      <Button variant="outline">Editar Dados Sugeridos</Button>
      <Button>Confirmar e Salvar</Button>
    </div>
  );
}
