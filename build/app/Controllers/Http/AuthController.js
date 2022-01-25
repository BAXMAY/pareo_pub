"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/users"));
const Users = new users_1.default();
class AuthController {
    async register({ view }) {
        return view.render('user/create');
    }
    async login({ view }) {
        return view.render('login');
    }
    async logout({ auth, response }) {
        await auth.use('web').logout();
        return response.redirect('/home');
    }
    async store({ request, response }) {
        const data = request.only(['email', 'password']);
        Users.email = data.email;
        Users.password = data.password;
        await Users.save();
        return response.redirect('/login');
    }
    async authenticate({ auth, request, response }) {
        const email = request.input('email');
        const password = request.input('password');
        const rememberMe = request.input('rememberMe');
        try {
            await auth.use('web').attempt(email, password, rememberMe);
            response.redirect('/hello');
        }
        catch {
            return response.badRequest('Invalid credentials');
        }
        return response.redirect('/home');
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map