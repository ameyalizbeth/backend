
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./Abstract";

@Entity("employee")
export class Employee extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false, unique:true})
    public name: string;
    @Column({ nullable: false, unique:true})
    public employeeid: string;

    @Column({ nullable: false })
    public address: string;
    @Column({ nullable: false })
    public email: string;
    @Column({ nullable: true })
    public password: string;
    @Column({ nullable: false })
    public joiningDate: string;
    
    @Column({ nullable: true })
    public role: string;
    @Column({ nullable: true })
    public status: string;
    @Column({ nullable: true })
    public experience: string;
}