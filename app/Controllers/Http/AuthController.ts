// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/users'
const Users = new User()

export default class AuthController {
  // public async register({ request, auth, response }) {
  //   let user = await Users.create(request.all())

  //   let token = auth.generate(user)

  //   Object.assign(user, token)

  //   return response.json(user)
  // }

  public async register({ view }) {
    return view.render('user/create')
  }

  public async login({ view }) {
    return view.render('login')
  }

  public async store({ auth, session, request, response }) {
    const data = request.only(['email', 'password'])

    Users.email = data.email
    Users.password = data.password

    await Users.save()

    return response.redirect('/login')
  }

  public async authenticate({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')
    const rememberMe = request.input('rememberMe')

    try {
      await auth.use('web').attempt(email, password, rememberMe)
      response.redirect('/hello')
    } catch {
      return response.badRequest('Invalid credentials')
    }

    return response.redirect('/home')
  }
}
