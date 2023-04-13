
import { BOOLEAN, DATE, INTEGER, JSON, STRING, UUID, UUIDV4 } from 'sequelize';
import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, AllowNull, Default, ForeignKey } from 'sequelize-typescript';
import { User } from './Users';

// CREATE TABLE "public"."saved_attractions" (
//     "name" varchar(255) NOT NULL,
//     "address" varchar(255),
//     "phone_number" varchar(20),
//     "rating" numeric(4,2),
//     "image_url" varchar(255),
//     "description" varchar(255),
//     "latitude" varchar(30),
//     "longitude" varchar(30),
//     "attraction_type" varchar(255),
//     "review_count" int4,
//     "user_id" int4
@Table({
    modelName: 'saved_attractions',
    tableName: 'saved_attractions'
})
export class Saved_Attractions extends Model {
    
    
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

    @ForeignKey(()=> User )
    @PrimaryKey
    @Column(STRING)
    email: string 

}


