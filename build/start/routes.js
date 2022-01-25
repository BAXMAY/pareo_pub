"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const luxon_1 = require("luxon");
Route_1.default.get('/', (ctx) => {
    ctx.response.redirect().status(301).toPath('/home');
});
Route_1.default.get('/leaders', async () => {
    const leaders = await Database_1.default.query().from('leaders').select('*');
    console.log(leaders);
    return leaders;
});
Route_1.default.get('/home', async ({ view }) => {
    const unsubmitLeaders = await Database_1.default.query().from('leaders').where('isSubmit', false);
    const submitLeaders = await Database_1.default.query().from('leaders').where('isSubmit', true);
    const html = await view.render('home', {
        unsubmitUsers: unsubmitLeaders,
        submitUsers: submitLeaders,
    });
    return html;
});
Route_1.default.post('/home', async ({ request, response }) => {
    const id = request.input('id');
    const submit = request.input('submit');
    let time = luxon_1.DateTime.now();
    if (submit) {
        await Database_1.default.from('leaders').where('id', id).update({ isSubmit: submit, submitTime: time });
    }
    else {
        await Database_1.default.from('leaders').where('id', id).update({ isSubmit: submit, submitTime: null });
    }
    return response.redirect().status(301).toPath('/home');
});
Route_1.default.post('/clear', async ({ auth, response }) => {
    await auth.use('web').authenticate();
    console.log(auth.use('web').user);
    await Database_1.default.from('leaders').update({ isSubmit: false, submitTime: null });
    return response.redirect().status(301).toPath('/home');
});
Route_1.default.get('/register', 'AuthController.register').middleware('auth');
Route_1.default.post('/register', 'AuthController.store').middleware('auth');
Route_1.default.get('/login', 'AuthController.login');
Route_1.default.post('/login', 'AuthController.authenticate');
Route_1.default.post('/logout', 'AuthController.logout');
//# sourceMappingURL=routes.js.map