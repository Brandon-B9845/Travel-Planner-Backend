import { BOOLEAN, DATE, INTEGER, STRING, UUID, UUIDV4 } from 'sequelize';
import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, AllowNull, Default } from 'sequelize-typescript';

@Table({
    modelName: 'user',
    tableName: 'users'
})
export class User extends Model {
    
    @PrimaryKey
    @Column(UUID)
    id: string
    
    @Column(STRING(50))
    email: string;

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