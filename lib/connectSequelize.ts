import path, { join } from "path";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import * as pg from 'pg';
import { User } from "../models/Users";

const basename = path.basename(__filename);

export const connectSequelize = (database: string, username: string, password: string, host: string) => {
  const db = {} as any;

  const modelsArray = [User]




  const config: SequelizeOptions = {
    dialectModule: pg,
    dialect: 'postgres',
    host: host,
    models: modelsArray,
    port: 5432,
    hooks: {
        afterConnect: (client: any, config) => {
            console.log('db connected!')
        },
        afterDisconnect: () => {
            console.log('disconnected db')
        }
    }
  }

  try{
  const sequelize = new Sequelize(
    database,
    username,
    password,
    config
  );
  console.log('Successfully made db connection')
  return sequelize
  } catch (e) {
    console.log('FAILED to make db connection...', e)
    return null
  }
};
