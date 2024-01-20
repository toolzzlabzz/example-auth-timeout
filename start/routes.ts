/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'
// import './routes/Institution'
import './routes/auth'
// import './routes/bot'
// import './routes/genAI'
// import './routes/knowledge'
// import './routes/unity'
// import './routes/chat'
// import './routes/widget'

Route.get('/', async (context) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? context.response.ok(report) : context.response.badRequest(report)
})
