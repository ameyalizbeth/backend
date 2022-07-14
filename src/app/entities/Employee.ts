
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./Abstract";
import { Department } from "./Department";
import { EmployeeAddress } from "./EmployeeAddress";
@Entity("employee")
export class Employee extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false, unique:true})
    public name: string;

    @Column({ nullable: false })
    public age: number;
    @Column({ nullable: false })
    public password: string;

    @ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department;

    @Column({ nullable: false })
    public departmentId: string;
    
    @Column({ nullable: true })
    public role: string;
    @OneToOne(() => EmployeeAddress, { cascade: true })
    @JoinColumn()
    public employeeaddress: EmployeeAddress;

    @Column({ nullable: false })
    public employeeaddressId: string;
}