import { BOOLEAN, DATE, INTEGER, STRING } from 'sequelize';
import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({
    modelName: 'user',
    tableName: 'users'
})
export class User extends Model {
    @PrimaryKey
    @Column(INTEGER)
    user_id: number;
    

    @Column(STRING(50))
    email: string;

    @Column(STRING(255))
    password: string;

    @Column(BOOLEAN)
    is_premuim: boolean

    @Column(STRING(255))
    profile_image: string

    @Column(DATE)
    createdAt?: Date

    @Column(DATE)
    updatedAt?: Date

}