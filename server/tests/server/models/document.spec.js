// /* global describe:true */
// /* global db:true */
// /* global expect:true */
// /* global request:true */
// import generatedData from '../../faker-data';

// describe('Documents Model', () => {
//   const User = db.users;
//   beforeEach((done) => {
//     db.sequelize.sync({ force: true }).done(() => {
//       db.roles.create({ title: 'regular', id: 2 }).then(() => {
//         User.destroy({ where: {} })
//           .then(() => {
//             User.create(generatedData.valid_user).then(() => {
//               db.access.create({
//                 title: 'public'
//               }).then(() => {
//                 db.documents.create({
//                   title: 'Little Red Riding Hood',
//                   content: `
//                   Once upon a time, there was a little girl who lived in a
//                   village near the forest.  Whenever she went out, the little
//                   girl wore a red riding cloak, so everyone in the
//                   village called her Little Red Riding Hood.
//                   `,
//                   accessId: 1,
//                   ownerId: 21
//                 }).then(() => {
//                   done();
//                 });
//               });
//             });
//           });
//       });
//     });
//   });
//   afterEach((done) => {
//     db.roles.destroy({ where: {} })
//       .then(() => {
//         db.access.destroy({ where: {} }).then(() => {
//           done();
//         });
//       });
//   });

//   describe('Create Document', () => {
//     it('should create a new document', (done) => {
//       db.documents.create({
//         title: 'Gone With The Wind',
//         content: 'scarlett is not by any chance a beautiful woman',
//         accessId: 1,
//         ownerId: 21
//       }).then((response) => {
//         expect(response.title).to.eql('Gone With The Wind');
//         done();
//       });
//     });
//   });
//   describe('Update Document', () => {
//     it('should update a created document', (done) => {
//       db.documents.findById(1)
//         .then((document) => {
//           const updatedAt = document.updatedAt;
//           document.update({
//             title: 'Little Red Riding',
//             content: `
//               One morning, Little Red Riding Hood asked her mother if she
//               could go to visit her grandmother as it had been awhile since
//               they'd seen each other.
//             `
//           }).then((updatedDocument) => {
//             expect(updatedDocument.title).to.eql('Little Red Riding');
//             expect(updatedDocument.content).to.eql(`
//               One morning, Little Red Riding Hood asked her mother if she
//               could go to visit her grandmother as it had been awhile since
//               they'd seen each other.
//             `);
//             expect(updatedDocument.updatedAt).to.not.eql(updatedAt);
//             done();
//           });
//         });
//     });
//   });

//   describe('Retrieve Document', () => {
//     it('should delete a created document', (done) => {
//       db.documents.findById(1)
//         .then((document) => {
//           expect(document.title).to.eql('Little Red Riding Hood');
//           done();
//         });
//     });
//   });

//   describe('Delete Document', () => {
//     it('should delete a created document', (done) => {
//       db.documents.destroy({ where: { id: 1 } })
//         .then(() => {
//           db.documents.findById(1)
//             .then((document) => {
//               expect(document).to.be.a('null');
//               done();
//             });
//         });
//     });
//   });
// });
