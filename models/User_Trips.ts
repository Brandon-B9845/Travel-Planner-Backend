import { BOOLEAN, DATE, INTEGER, JSON, STRING, UUID, UUIDV4 } from 'sequelize';
import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, AllowNull, Default, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import { User } from './Users';

// CREATE TABLE "public"."user_trips" (
//     "name" varchar(255) NOT NULL,
//     "image_url" varchar(255),
//     "attractions" json,
//     "created_at" timestamp,
//     "user_id" int4 NOT NULL,
//     CONSTRAINT "user_trips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id")
// );
@Table({
    modelName: 'user_trips',
    tableName: 'user_trips'
})
export class User_trips extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(INTEGER)
    id: number
    
    @ForeignKey(()=> User )
    @PrimaryKey
    @Column(STRING)
    userId: number 
    
    @Column(STRING(255))
    name: string

    @Column(STRING(255))
    image_url?: string

    @Column(JSON)
    attractions: JSON

    @Column(DATE)
    created_at: Date
    

}