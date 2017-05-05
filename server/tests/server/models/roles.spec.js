// /* global describe:true */
// /* global db:true */
// /* global expect:true */
// /* global request:true */

// describe('Roles Model', () => {
//   beforeEach((done) => {
//     db.sequelize.sync({ force: true }).done(() => {
//       db.roles.create({ title: 'admin' }).then(() => {
//         done();
//       });
//     });
//   });

//   describe('Create Role', () => {
//     it('should create a new role', (done) => {
//       db.roles.create({ title: 'regular' })
//         .then((role) => {
//           expect(role.title).to.eql('regular');
//           done();
//         });
//     });
//   });

//   describe('Read Roles', () => {
//     it('should fetch a single role', (done) => {
//       db.roles.findById(1)
//         .then((role) => {
//           expect(role.title).to.eql('admin');
//           done();
//         });
//     });
//   });

//   describe('Update Role', () => {
//     it('should update a created role', (done) => {
//       db.roles.findById(1)
//         .then((role) => {
//           role.update({ title: 'regular' })
//             .then((updatedRole) => {
//               expect(updatedRole.title).to.eql('regular');
//               done();
//             });
//         });
//     });
//   });

//   describe('Delete Role', () => {
//     it('should delete a created role', (done) => {
//       db.roles.destroy({ where: { id: 1 } })
//         .then(() => {
//           db.roles.findById(1)
//             .then((role) => {
//               expect(role).to.be.a('null');
//               done();
//             });
//         });
//     });
//   });
// });
