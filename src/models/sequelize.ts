require('dotenv').config();
import { Sequelize } from "sequelize";

const { DB_EXTERNAL_URL } = process.env;

const sequelize = new Sequelize(DB_EXTERNAL_URL ?? "");

export default sequelize;