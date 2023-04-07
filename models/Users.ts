import { BOOLEAN, NUMBER, STRING } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    modelName: 'user',
    tableName: 'users'
})
export class User extends Model {
    @Column(NUMBER)
    user_id: number;

    @Column(STRING(50))
    email: string;

    @Column(STRING(50))
    password: string;

    @Column(BOOLEAN)
    is_premuim: boolean

    @Column(STRING(255))
    profile_image: string

}

