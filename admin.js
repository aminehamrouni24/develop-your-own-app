const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const User = require('./models/User')
const Profile = require('./models/Profile')
const Post = require('./models/Post')


  
const contentNavigation = {
    name: 'GameOfCodes',
    icon: 'Success',
  }
AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  rootPath: '/admin',
//   resources: [
//     {
//       resource: User, Profile,
//       options: {
//         // We'll add this later
//       },

//     }
//   ],
resources: [
    { resource: User, options: { navigation: contentNavigation },
    properties: {
        name: { isVisible: { list: true, filter: true, show: true, edit: false } },
        email: { isVisible: { list: true, filter: true, show: true, edit: false } },
        password: { isVisible: { list: false, filter: false, show: false, edit: false } },
        avatar: { isVisible: { list: false, filter: false, show: true, edit: false } },
       }
      } ,
    { resource: Profile, options: { navigation: contentNavigation } },
    { resource: Post, options: { navigation: contentNavigation } },
  ],
  branding: {
    companyName: 'GameOfCodes c.o.',
  },
  preventAssignment  :true
})

module.exports = adminRouter = AdminBroExpress.buildRouter(adminBro) 
