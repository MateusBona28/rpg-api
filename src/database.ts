import { DataSource } from "typeorm"
import "dotenv/config"
import { User } from "./entities/User.entity"
import { Character } from "./entities/Character.entity"

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    logging: false,
    synchronize: true,
    entities: [User, Character]
    }
)

export default AppDataSource