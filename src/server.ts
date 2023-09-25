import app from "./app"
import AppDataSource from "./database"

(async () => {

  await AppDataSource.initialize()
  .then(() => {
      console.log("db running...")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  })
  
  app.listen(8080, () => {
      console.log("server running...")
  })    
})()