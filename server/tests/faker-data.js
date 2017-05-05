import faker from 'faker';
import bcrypt from 'bcrypt';

const fakeData = {
  valid_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: 'usernam_e1',
    email: 'same@email.com',
    password: faker.internet.password()
  },
  create_valid_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: 'usernamE1',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  no_firstname_user: {
    lastname: faker.name.lastName(),
    username: 'fake_us3',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  symbol_firstname_user: {
    firstname: '12Ali',
    lastname: faker.name.lastName(),
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  firstname_more_quote: {
    firstname: 'O\'\'Hara',
    lastname: faker.name.lastName(),
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  firstname_more_hyphen: {
    firstname: 'Mary--Jo',
    lastname: faker.name.lastName(),
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  hyphen_firstname_user: {
    firstname: 'Mary-Jo',
    lastname: faker.name.lastName(),
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  quote_firstname_user: {
    firstname: 'O\'keefe',
    lastname: faker.name.lastName(),
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  noletter_firstname_user: {
    firstname: '-\'',
    lastname: faker.name.lastName(),
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  no_lastname_user: {
    firstname: faker.name.firstName(),
    username: 'fake_us4',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  symbol_lastname_user: {
    firstname: faker.name.firstName(),
    lastname: '4^Dreat',
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  noletter_lastname_user: {
    firstname: faker.name.firstName(),
    lastname: '-\'',
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  no_username_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  symbol_username_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: `#$${faker.internet.userName()}`,
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  noletter_username_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: '____.___233',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  same_username: {
    id: 23,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: 'usernam_e1',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  no_email_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: 'usernam_',
    password: faker.internet.password()
  },
  same_email: {
    id: 13,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: 'usernam_1',
    email: 'same@email.com',
    password: faker.internet.password()
  },
  no_password_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: 'usernam_',
    email: faker.internet.email()
  },
  invalid_email_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: 'usernam_',
    email: faker.name.lastName(),
    password: faker.internet.password()
  },
  invalid_password_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: 'usernam_',
    email: faker.internet.email(),
    password: 'faker'
  },
  long_firstname_user: {
    firstname: faker.name.firstName().repeat(6),
    lastname: faker.name.lastName(),
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  short_firstname_user: {
    firstname: 'B',
    lastname: faker.name.lastName(),
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  long_lastname_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName().repeat(6),
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  short_lastname_user: {
    firstname: faker.name.firstName(),
    lastname: 'L',
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  lastname_more_quote: {
    firstname: faker.name.firstName(),
    lastname: 'O\'\'Connor',
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  lastname_more_hyphen: {
    firstname: faker.name.firstName(),
    lastname: 'Mary--Jo',
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  long_username_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: 'username_053677n7mm8m5b_1',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  short_username_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: 'use',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  bulkCreateUser: [{
    lastname: 'Riddle',
    username: 'tommyrid',
    email: 'lordvold@gmail.com',
    password: bcrypt.hashSync('I hate the potters', bcrypt.genSaltSync()),
    firstname: 'Thomas'
  }, {
    lastname: 'Potters',
    username: 'HARRYp',
    email: 'harryp@gmail.com',
    password: bcrypt.hashSync('I love lord vold', bcrypt.genSaltSync()),
    firstname: 'Harry',
    roleId: 1
  }, {
    lastname: 'Fain',
    username: 'dark_friend',
    email: 'pfain@gmail.com',
    password: bcrypt.hashSync('darkoneRULES!', bcrypt.genSaltSync()),
    firstname: 'Padan'
  }, {
    lastname: 'Amao',
    username: 'inuamao',
    email: 'inumidun@sky.com',
    password: bcrypt.hashSync('password!', bcrypt.genSaltSync()),
    roleId: 1,
    firstname: 'Inumidun'
  }, {
    lastname: 'User',
    username: 'reguse',
    email: 'reg@user.com',
    password: bcrypt.hashSync('password!', bcrypt.genSaltSync()),
    firstname: 'Regular',
    id: 4002,
    roleId: 3
  }, {
    lastname: faker.name.lastName(),
    username: 'second_reg',
    email: 'second@user.com',
    password: bcrypt.hashSync('password!', bcrypt.genSaltSync()),
    firstname: faker.name.firstName(),
    id: 5002,
    roleId: 3
  }],
  adminRole: {
    title: 'Admin'
  },
  regularRole: {
    title: 'Regular'
  },
  newRole: {
    title: 'normal'
  },
  allAccess: [
    { title: 'public', id: 1 },
    { title: 'private', id: 2 },
    { title: 'role', id: 3 }
  ],
  createFolders(ownerId) {
    return [
      { title: faker.name.title(), ownerId },
      { title: faker.name.title(), ownerId },
      { title: faker.name.title(), ownerId },
      { title: faker.name.title(), ownerId }
    ];
  },
  createDocument(ownerId, folderId = null) {
    return [
      {
        title: `${faker.lorem.words()} = title`,
        content: faker.lorem.paragraph(),
        ownerId,
        folderId
      },
      {
        title: `${faker.lorem.words()} = title`,
        content: faker.lorem.paragraph(),
        accessId: 2,
        ownerId,
        folderId
      },
      {
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        accessId: 3,
        ownerId,
        folderId
      },
      {
        title: `${faker.lorem.words()}`,
        content: faker.lorem.paragraph(),
        accessId: 1,
        ownerId,
        folderId
      },
      {
        title: `${faker.lorem.words()}`,
        content: faker.lorem.paragraph(),
        accessId: 1,
        ownerId,
        folderId
      },
      {
        title: `${faker.lorem.words()}`,
        content: faker.lorem.paragraph(),
        accessId: 1,
        ownerId,
        folderId
      },
      {
        title: `${faker.lorem.words()}`,
        content: faker.lorem.paragraph(),
        accessId: 1,
        ownerId,
        folderId
      }
    ];
  },
  publicDocument: {
    title: `${faker.lorem.words()} = title`,
    content: faker.lorem.paragraph(),
    accessId: 1
  },
  privateDocument: {
    title: `${faker.lorem.words()} = title`,
    content: faker.lorem.paragraph(),
    accessId: 2
  },
  roleDocument: {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    accessId: 3
  },
  updateDoc: {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    accessId: 3
  }
};

export default fakeData;
