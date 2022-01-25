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
import { DateTime } from 'luxon'

Route.get('/', (ctx) => {
  ctx.response.redirect().status(301).toPath('/home')
})

Route.get('/leaders', async () => {
  const leaders = await Database.query().from('leaders').select('*')
  console.log(leaders)

  return leaders
})

Route.get('/home', async ({ view }) => {
  // await auth.use('web').authenticate()
  //  Call Api to get submit and unsubmit user
  const unsubmitLeaders = await Database.query().from('leaders').where('isSubmit', false)
  const submitLeaders = await Database.query().from('leaders').where('isSubmit', true)

  const html = await view.render('home', {
    unsubmitUsers: unsubmitLeaders,
    submitUsers: submitLeaders,
  })

  return html
})

Route.post('/home', async ({ request, response }) => {
  const id = request.input('id')
  const submit = request.input('submit')
  let time = DateTime.now()

  if (submit) {
    await Database.from('leaders').where('id', id).update({ isSubmit: submit, submitTime: time })
  } else {
    await Database.from('leaders').where('id', id).update({ isSubmit: submit, submitTime: null })
  }

  return response.redirect().status(301).toPath('/home')
})

Route.post('/clear', async ({ auth, response }) => {
  await auth.use('web').authenticate()
  console.log(auth.use('web').user!)
  await Database.from('leaders').update({ isSubmit: false, submitTime: null })

  return response.redirect().status(301).toPath('/home')
})

// Route.post('/login', async ({ auth, request, response }) => {
//   const email = request.input('email')
//   const password = request.input('password')
//   const rememberMe = request.input('rememberMe')

//   try {
//     await auth.use('web').attempt(email, password, rememberMe)
//     response.redirect('/hello')
//   } catch {
//     return response.badRequest('Invalid credentials')
//   }
// })

Route.get('/register', 'AuthController.register').middleware('auth')
Route.post('/register', 'AuthController.store').middleware('auth')
Route.get('/login', 'AuthController.login')
Route.post('/login', 'AuthController.authenticate')
Route.post('/logout', 'AuthController.logout')
