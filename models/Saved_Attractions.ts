
import { BOOLEAN, DATE, INTEGER, JSON, STRING, UUID, UUIDV4 } from 'sequelize';
import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, AllowNull, Default, ForeignKey } from 'sequelize-typescript';
import { User } from './Users';


@Table({
    modelName: 'saved_attraction',
    tableName: 'saved_attractions'
})
export class Saved_Attraction extends Model {
    
    @ForeignKey(()=> User )
    @PrimaryKey
    @Column(STRING)
    user_id: number 
    
    @Column(STRING(255))
    name: string

    @Column(STRING(255))
    address: string

    @Column(INTEGER)
    rating: number

    @Column(STRING(255))
    image_url?: string

    @Column(STRING(255))
    description: string

    @Column(STRING(50))
    latitude: string

    @Column(STRING)
    longitude: string

    @Column(STRING(255))
    attractions_type: string

    @Column(INTEGER)
    review_count: number

    @CreatedAt
    @Column(DATE)
    created_at?: Date

    @UpdatedAt
    @Column(DATE)
    updated_at?: Date


}


