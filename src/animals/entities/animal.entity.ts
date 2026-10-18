export interface AnimalEntity {
    id: number;
    name: string;
    sex: 'MACHO' | 'FEMEA';
    birthday: Date;
    description?: string;
    status: 'DISPONIVEL' | 'EM_PROCESSO' | 'ADOTADO' | 'INATIVO';
    raceId: number;
    createdAt?: Date;
    updatedAt?: Date;
}