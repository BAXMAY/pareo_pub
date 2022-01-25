"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const luxon_1 = require("luxon");
const isoStringToString = (isoString) => {
    const dt = luxon_1.DateTime.fromISO(isoString);
    if (!dt.isValid) {
        return 'NaN';
    }
    return dt.toFormat('HH:mm');
};
const isLate = (isoString) => {
    const submitTime = luxon_1.DateTime.fromISO(isoString);
    const deadline = luxon_1.DateTime.fromFormat('18:00', 'HH:mm');
    return submitTime > deadline;
};
Route_1.default.get('/', (ctx) => {
    ctx.response.redirect().status(301).toPath('/home');
});
Route_1.default.get('/leaders', async () => {
    const leaders = await Database_1.default.query().from('leaders').select('*');
    console.log(leaders);
    return leaders;
});
Route_1.default.get('/home', async ({ view }) => {
    const unsubmitLeaders = await Database_1.default.query()
        .from('leaders')
        .where('isSubmit', false)
        .orderBy('name', 'asc');
    const submitLeaders = await Database_1.default.query()
        .from('leaders')
        .where('isSubmit', true)
        .orderBy('submitTime', 'asc');
    const unsubmitLineNameList = await Database_1.default.query().from('leaders').select('line_name');
    let reminderText = '@' +
        unsubmitLineNameList.map((record) => record.line_name).join(' @') +
        ' อย่าลืมกรอกสต.นะค้าา';
    const html = await view.render('home', {
        unsubmitUsers: unsubmitLeaders,
        submitUsers: submitLeaders,
        reminderText: reminderText,
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
Route_1.default.get('/admin', async ({ view }) => {
    const leaders = await Database_1.default.query().from('leaders').select('*').orderBy('name', 'asc');
    const feeLeaderArr = [];
    leaders.forEach((leader) => {
        leader.isLate = isLate(leader.submitTime);
        leader.submitTime = isoStringToString(leader.submitTime);
        if (leader.isLate || leader.submitTime === 'NaN')
            feeLeaderArr.push(leader.line_name);
    });
    const feeMsg = '@' +
        feeLeaderArr.join(' @') +
        ' \n\nค่าปรับคนละ 20 บาท\n\nโอนเข้าบัญชีส่วน\nไทยพาณิชย์\n412-065328-2';
    const html = await view.render('admin', {
        leaders: leaders,
        feeMsg: feeMsg,
    });
    return html;
}).middleware('auth');
Route_1.default.post('/createLeader', async ({ request, response }) => {
    const name = request.input('name');
    const care = request.input('care');
    const line = request.input('line');
    try {
        await Database_1.default.table('leaders').insert({ name: name, care: care, line_name: line });
    }
    catch {
        return response.badRequest('Cannot create user');
    }
    return response.redirect().status(301).toPath('/admin');
}).middleware('auth');
Route_1.default.post('/deleteLeader/:id', async ({ request, response }) => {
    await Database_1.default.from('leaders').where('id', request.param('id')).delete();
    return response.redirect().status(301).toPath('/admin');
}).middleware('auth');
Route_1.default.post('/updateLeader/:id', async ({ request, response }) => {
    const name = request.input('name');
    const care = request.input('care');
    const line = request.input('line');
    const img = request.input('profileImg');
    await Database_1.default.from('leaders')
        .where('id', request.param('id'))
        .update({ name: name, care: care, line_name: line, profileImg: img });
    return response.redirect().status(301).toPath('/admin');
}).middleware('auth');
Route_1.default.get('/user/:id', async ({ request, view }) => {
    const leader = await Database_1.default.query().from('leaders').where('id', request.param('id')).first();
    const html = await view.render('edit', { leader: leader });
    return html;
}).middleware('auth');
//# sourceMappingURL=routes.js.map