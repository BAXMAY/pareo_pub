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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/', (ctx) => {
  ctx.response.redirect().status(301).toPath('/home')
})

Route.get('/leaders', async () => {
  const leaders = await Database.query().from('leaders').select('*')
  console.log(leaders)

  return leaders
})

Route.get('/home', async ({ view }) => {
  //  Call Api to get submit and unsubmit user
  const unsubmitLeaders = await Database.query().from('leaders').where('isSubmit', false)
  const submitLeaders = await Database.query().from('leaders').where('isSubmit', true)

  const html = await view.render('home', {
    unsubmitUsers: unsubmitLeaders,
    submitUsers: submitLeaders,
  })

  return html
})
