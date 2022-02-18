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
import Database, { ChainableContract, RawQuery } from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'
import { loadSpreadSheet, getSheetByName, manipulateSpreadsheet } from './spreadSheetManip'

const isoStringToString = (isoString: string) => {
  const dt = DateTime.fromISO(isoString).setZone('Asia/Bangkok')

  if (!dt.isValid) {
    return 'NaN'
  }

  return dt.toFormat('HH:mm')
}

const isLate = (isoString: string) => {
  const submitTime = DateTime.fromISO(isoString).setZone('Asia/Bangkok')
  const deadline = DateTime.fromFormat('18:00', 'HH:mm', {
    setZone: true,
    zone: 'Asia/Bangkok'
  })
  return submitTime > deadline
}

Route.get('/', (ctx) => {
  ctx.response.redirect().status(301).toPath('/home')
})

Route.get('/leaders', async () => {
  const leaders = await Database.query().from('leaders').select('*')
  console.log(leaders)

  return leaders
})

Route.get('/home/:orderBy?', async ({ params, view }) => {
  // await auth.use('web').authenticate()
  //  Call Api to get submit and unsubmit user
  let orderField: string | ChainableContract | RawQuery

  switch (params.orderBy) {
    case 'name':
      orderField = 'name'
      break
    case 'care':
      orderField = 'care'
      break
    case 'order_preference':
      orderField = 'order_preference'
      break
    default:
      orderField = 'order_preference'
      break
  }

  const unsubmitLeaders = await Database.query()
    .from('leaders')
    .where('isSubmit', false)
    .orderBy(orderField, 'asc')
  const submitLeaders = await Database.query()
    .from('leaders')
    .where('isSubmit', true)
    .orderBy('submitTime', 'asc')

  const unsubmitLineNameList = await Database.query().from('leaders').select('line_name')
  let reminderText =
    '@' +
    unsubmitLineNameList.map((record) => record.line_name).join(' @') +
    ' อย่าลืมกรอกสต.นะค้าา'

  const html = await view.render('home', {
    unsubmitUsers: unsubmitLeaders,
    submitUsers: submitLeaders,
    reminderText: reminderText,
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

Route.get('/register', 'AuthController.register').middleware('auth')
Route.post('/register', 'AuthController.store').middleware('auth')
Route.get('/login', 'AuthController.login')
Route.post('/login', 'AuthController.authenticate')
Route.post('/logout', 'AuthController.logout')

Route.get('/admin/:orderBy?', async ({ params, view }) => {
  let orderField: string | ChainableContract | RawQuery

  switch (params.orderBy) {
    case 'name':
      orderField = 'name'
      break
    case 'care':
      orderField = 'care'
      break
    case 'order_preference':
      orderField = 'order_preference'
      break
    default:
      orderField = 'order_preference'
      break
  }

  const leaders = await Database.query().from('leaders').select('*').orderBy(orderField, 'asc')

  const feeLeaderArr: string[] = []

  leaders.forEach((leader) => {
    leader.isLate = isLate(leader.submitTime)
    leader.submitTime = isoStringToString(leader.submitTime)
    if (leader.isLate || leader.submitTime === 'NaN') feeLeaderArr.push(leader.line_name)
  })

  const feeMsg =
    '@' +
    feeLeaderArr.join(' @') +
    ' \n\nค่าปรับคนละ 20 บาท\n\nโอนเข้าบัญชีส่วน\nไทยพาณิชย์\n412-065328-2'

  const html = await view.render('admin', {
    leaders: leaders,
    feeMsg: feeMsg,
  })

  return html
}).middleware('auth')

Route.post('/createLeader', async ({ request, response }) => {
  const name = request.input('name')
  const care = request.input('care')
  const line = request.input('line')

  try {
    await Database.table('leaders').insert({ name: name, care: care, line_name: line })
  } catch {
    return response.badRequest('Cannot create user')
  }

  return response.redirect().status(301).toPath('/admin')
}).middleware('auth')

Route.post('/deleteLeader/:id', async ({ request, response }) => {
  await Database.from('leaders').where('id', request.param('id')).delete()

  return response.redirect().status(301).toPath('/admin')
}).middleware('auth')

Route.post('/updateLeader/:id', async ({ request, response }) => {
  const name = request.input('name')
  const care = request.input('care')
  const line = request.input('line')
  const img = request.input('profileImg')
  const order = request.input('order')

  await Database.from('leaders')
    .where('id', request.param('id'))
    .update({ name: name, care: care, line_name: line, profileImg: img, order_preference: order })

  return response.redirect().status(301).toPath('/admin')
}).middleware('auth')

Route.get('/user/:id', async ({ request, view }) => {
  const leader = await Database.query().from('leaders').where('id', request.param('id')).first()

  const html = await view.render('edit', { leader: leader })

  return html
}).middleware('auth')

Route.get('/structure/:id/:sheetName/:nickname?', async ({ request, view }) => {
  const sheetName = decodeURI(request.param('sheetName'))
  const nickname = decodeURI(request.param('nickname'))
  const id = decodeURI(request.param('id'))
  
  const dataDict = await loadSpreadSheet()
    .then((_) => getSheetByName(sheetName, nickname))
    .catch((err) => console.log(err))

  delete dataDict.sunday

  const html = await view.render('spreadsheet', { dataDict: dataDict })
  
  return html
})

Route.post('/structure/:id', async ({ request, response }) => {
  const id = request.param('id')

  //  Get all request input
  const formData = request.body()

  //  Construct dataDict
  const dataDict = {
    sheetName: formData.sheetName,
    isLD: formData.isLD,
    cellDict: {}
  }

  delete formData.sheetName
  delete formData.isLD
  delete formData._csrf

  dataDict.cellDict = formData

  //  Manip sheet
  const result = await loadSpreadSheet().then( _ => manipulateSpreadsheet(dataDict)).catch(err => console.log(err))

  if ( result === undefined ) {
    return 'Something went wrong. Please contact Admin.'
  }

  let time = DateTime.now()
  await Database.from('leaders').where('id', id).update({ isSubmit: true, submitTime: time })

  return response.redirect().status(301).toPath('/home')
})