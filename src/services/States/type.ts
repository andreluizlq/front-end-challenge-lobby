export interface states {
  id: number;
  nome: string;
  sigla: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}
