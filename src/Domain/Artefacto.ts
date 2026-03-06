export interface Artefacto {
    id_artefacto: number;
    tipo: string;
    peso: number;
    categoria: string;
    estado: string;
    id_empresa: number | undefined;
}
