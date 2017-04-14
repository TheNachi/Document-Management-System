// const home = require('./home');
// const user = require('./user');
// const document = require('./document');
// const search = require('./search');

// module.exports = (app) => {
//   app.use(home());
//   app.use(user());
//   app.use(document());
//   app.use(search());
// };

import userRouter from './user';
// import rolesRouter from './role';
// import documentRouter from './Document';

export { userRouter };
