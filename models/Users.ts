import { BOOLEAN, DATE, INTEGER, STRING, UUID, UUIDV4 } from 'sequelize';
import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, AllowNull, Default } from 'sequelize-typescript';

@Table({
    modelName: 'user',
    tableName: 'users'
})
export class User extends Model {

    @Default(UUIDV4)
    @PrimaryKey
    @Column(UUID)
    id: number;
    
    @Column(STRING(50))
    email: string;

    @Column(STRING(255))
    password: string;

    @AllowNull(true)
    @Column(BOOLEAN)
    is_premium?: boolean

    @AllowNull(true)
    @Column(STRING(255))
    profile_image?: string

    @CreatedAt
    @Column(DATE)
    created_at?: Date

    @UpdatedAt
    @Column(DATE)
    updated_at?: Date

}