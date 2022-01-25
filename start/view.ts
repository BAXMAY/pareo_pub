// import View from '@ioc:Adonis/Core/View'

// View.global('unsubmitted', function unsubmit(elem, auth) {
//   if(!auth.isLogg)
//   console.log(elem.id)
//   if (confirm(`${elem.name}?`) === true) {
//     var xhr = new XMLHttpRequest()
//     var url = '/home'
//     xhr.open('POST', url, true)
//     xhr.setRequestHeader('Content-Type', 'application/json')
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4 && xhr.status === 200) {
//         location.reload()
//       }
//     }
//     var data = JSON.stringify({ id: elem.id, submit: false })
//     xhr.send(data)
//   }
// })
