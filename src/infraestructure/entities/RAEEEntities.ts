import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Check } from "typeorm";

@Entity('empresa')
@Check(`"estado" IN ('Activa', 'Pendiente', 'Deshabilitada')`)
export class EmpresaEntity {
    @PrimaryGeneratedColumn()
    id_empresa!: number;

    @Column({ type: "varchar", length: 100 })
    nombre!: string;

    @Column({ type: "varchar", length: 20, unique: true })
    nit!: string;

    @Column({ type: "varchar", length: 45, unique: true })
    correo!: string;

    @Column({ type: "varchar", length: 45, nullable: true })
    telefono?: string;

    @Column({ type: "varchar", length: 45, nullable: true })
    ciudad?: string;

    @Column({ type: "varchar", length: 45, default: 'Activa' })
    estado!: 'Activa' | 'Pendiente' | 'Deshabilitada';
}

@Entity('usuarios')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id_usuario!: number;

    @Column({ type: "varchar", length: 100 })
    nombre!: string;

    @Column({ type: "varchar", length: 100, unique: true })
    correo!: string;

    @Column({ type: "varchar", length: 100 })
    contrasena!: string;

    @Column({ type: "int", nullable: true })
    id_empresa?: number | undefined;
    
    @Column({ type: "varchar", length: 45, default: 'Activo' })
    estado!: 'Activo' | 'Deshabilitado';
}

@Entity('artefactos')
export class ArtefactoEntity {
    @PrimaryGeneratedColumn()
    id_artefacto!: number;

    @Column({ type: "varchar", length: 45 })
    tipo!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    peso!: number;

    @Column({ type: "varchar", length: 45 })
    categoria!: string;

    @Column({ type: "varchar", length: 250 })
    estado!: string;

    @Column({ type: "int" })
    id_empresa!: number;
}

@Entity('recepciones')
export class RecepcionEntity {
    @PrimaryGeneratedColumn()
    id_recepcion!: number;

    @Column({ type: "int" })
    id_artefacto!: number;

    @CreateDateColumn({ type: "timestamp" })
    fecha!: Date;

    @Column({ type: "int" })
    id_usuario!: number;

    @Column({ type: "varchar", length: 45, nullable: true })
    estado?: string;
}

@Entity('certificados')
export class CertificadoEntity {
    @PrimaryGeneratedColumn()
    id_certificados!: number;

    @Column({ type: "int" })
    id_empresa!: number;

    @Column({ type: "int" })
    id_recepcion!: number;

    @Column({ type: "int", unique: true })
    cod_certificado!: number;

    @CreateDateColumn({ type: "timestamp" })
    fecha_emision!: Date;
}
