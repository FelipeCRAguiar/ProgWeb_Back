export interface UserEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    cpf: string;
    phone?: string;
    birthday: Date;
    status: 'ATIVO' | 'INATIVO';
    profile: 'ADOTANTE' | 'VOLUNTARIO' | 'ADMIN';
    createdAt?: Date;
    updatedAt?: Date;
}