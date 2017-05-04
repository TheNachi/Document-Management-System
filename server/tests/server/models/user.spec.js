/* global describe:true */
/* global db:true */
/* global expect:true */
/* global request:true */
import generatedData from '../../faker-data';

describe('User Model', () => {
  const User = db.users;
  beforeEach((done) => {
    db.roles.create({ title: 'regular', id: 2 }).then(() => {
      User.destroy({ where: {} })
        .then(() => {
          User.create(generatedData.valid_user).then(() => {
            done();
          });
        });
    });
  });
  afterEach((done) => {
    db.roles.destroy({ where: {} });
    done();
  });

  describe('User creation', () => {
    it('should create a new user', (done) => {
      User.create(generatedData.create_valid_user).then((response) => {
        expect(response.firstname)
          .to.eql(generatedData.create_valid_user.firstname);
        expect(response.lastname)
          .to.eql(generatedData.create_valid_user.lastname);
        expect(response.username)
          .to.eql(generatedData.create_valid_user.username);
        expect(response.email)
          .to.eql(generatedData.create_valid_user.email);
        expect(response.password)
          .to.not.eql(generatedData.create_valid_user.password);
        done();
      });
    });
  });
  describe('User validation', () => {
    it('should require a firstname field', (done) => {
      User.create(generatedData.no_firstname_user).catch((error) => {
        expect(error.message)
          .to.eql('notNull Violation: firstname cannot be null');
        done();
      });
    });
    it('should reject firstnames less than 2 characters', (done) => {
      User.create(generatedData.short_firstname_user).catch((error) => {
        expect(error.message)
          .to
          .eql('Validation error: firstname cannot be less than 2 or greater than 16 characters');
        done();
      });
    });
    it('should reject firstnames greater than 16 characters', (done) => {
      User.create(generatedData.long_firstname_user).catch((error) => {
        expect(error.message)
          .to
          .eql('Validation error: firstname cannot be less than 2 or greater than 16 characters');
        done();
      });
    });
    it('should reject firstnames with numbers or characters', (done) => {
      User.create(generatedData.symbol_firstname_user).catch((error) => {
        expect(error.message)
          .to
          .eql('Validation error: firstname can only contain letters and/or - and \'');
        done();
      });
    });
    it('should accept firstnames with "\'"', (done) => {
      User.create(generatedData.quote_firstname_user).then((response) => {
        expect(response).to.be.an('object');
        expect(response.firstname).to.contain('\'');
        done();
      });
    });
    it('should accept firstnames with "-"', (done) => {
      User.create(generatedData.hyphen_firstname_user).then((response) => {
        expect(response).to.be.an('object');
        expect(response.firstname).to.contain('-');
        done();
      });
    });
    it('should require letters in firstname', (done) => {
      User.create(generatedData.noletter_firstname_user).catch((error) => {
        expect(error.message).to.eql('Validation error: firstname must contain letters');
        done();
      });
    });
    it('should require a lastname field', (done) => {
      User.create(generatedData.no_lastname_user).catch((error) => {
        expect(error.message)
          .to.eql('notNull Violation: lastname cannot be null');
        done();
      });
    });
    it('should reject lastnames less than 2 characters', (done) => {
      User.create(generatedData.short_lastname_user).catch((error) => {
        expect(error.message)
          .to
          .eql('Validation error: lastname cannot be less than 2 or greater than 16 characters');
        done();
      });
    });
    it('should reject lastnames greater than 16 characters', (done) => {
      User.create(generatedData.short_lastname_user).catch((error) => {
        expect(error.message)
          .to
          .eql('Validation error: lastname cannot be less than 2 or greater than 16 characters');
        done();
      });
    });
    it('should reject lastnames with numbers or characters', (done) => {
      User.create(generatedData.symbol_lastname_user).catch((error) => {
        expect(error.message)
          .to
          .eql('Validation error: lastname can only contain letters and/or - and \'');
        done();
      });
    });
    it('should require letters in lastname', (done) => {
      User.create(generatedData.noletter_lastname_user).catch((error) => {
        expect(error.message).to.eql('Validation error: lastname must contain letters');
        done();
      });
    });
    it('should require a username field', (done) => {
      User.create(generatedData.no_username_user).catch((error) => {
        expect(error.message)
          .to.eql('notNull Violation: username cannot be null');
        done();
      });
    });
    it('should reject usernames less than 4 characters', (done) => {
      User.create(generatedData.short_username_user).catch((error) => {
        expect(error.message)
          .to
          .eql('Validation error: username cannot be less than 4 or greater than 16 characters');
        done();
      });
    });
    it('should reject usernames greater than 8 characters', (done) => {
      User.create(generatedData.long_username_user).catch((error) => {
        expect(error.message)
          .to
          .eql('Validation error: username cannot be less than 4 or greater than 16 characters');
        done();
      });
    });
    it('should reject usernames with spaces and characters except "." and "_"', (done) => {
      User.create(generatedData.symbol_username_user).catch((error) => {
        expect(error.message)
          .to
          .eql('Validation error: username must contains only letters, numbers, "." and "_"');
        done();
      });
    });
    it('should require letters in username', (done) => {
      User.create(generatedData.noletter_username_user).catch((error) => {
        expect(error.message).to.eql('Validation error: username must contain letters');
        done();
      });
    });
    it('should require a email field', (done) => {
      User.create(generatedData.no_email_user).catch((error) => {
        expect(error.message)
          .to.eql('notNull Violation: email cannot be null');
        done();
      });
    });
    it('should require a valid email', (done) => {
      User.create(generatedData.invalid_email_user).catch((error) => {
        expect(error.message)
          .to.eql('Validation error: Email is not valid');
        done();
      });
    });
    it('should require a password field', (done) => {
      User.create(generatedData.no_password_user).catch((error) => {
        expect(error.message)
          .to.eql('notNull Violation: password cannot be null');
        done();
      });
    });
    it('should reject passwords less than 8 characters', (done) => {
      User.create(generatedData.invalid_password_user).catch((error) => {
        expect(error.message)
          .to.eql('Validation error: password cannot be less than 8 characters');
        done();
      });
    });
  });
  describe('Unique user', () => {
    it('should reject a user if username already exists', (done) => {
      User.create(generatedData.same_username).catch((error) => {
        expect(error.message).to.eql('This username is already in use');
        done();
      });
    });
    it('should reject a user if email already exists', (done) => {
      User.create(generatedData.same_email).catch((error) => {
        expect(error.message).to.eql('This email is already in use');
        done();
      });
    });
  });
  describe('Hash User password', () => {
    it('should hash user\'s password', (done) => {
      User.findById(generatedData.valid_user.id).then((response) => {
        expect(generatedData.valid_user.password).to.not.equal(response.password);
        done();
      });
    });
    it('should compare password with hashed and return true if correct', (done) => {
      User.findById(generatedData.valid_user.id).then((response) => {
        const isUserPassword = response.isPassword(
          response.password, generatedData.valid_user.password
        );
        const notUserPassword = response.isPassword(
          response.password, 'random1password'
        );
        expect(isUserPassword).to.equal(true);
        expect(notUserPassword).to.not.equal(true);
        done();
      });
    });
  });
  describe('Retrieve User', () => {
    it('should get a created user by Id', (done) => {
      User.findById(generatedData.valid_user.id)
        .then((response) => {
          expect(response.firstname).to.eql(generatedData.valid_user.firstname);
          expect(response.lastname).to.eql(generatedData.valid_user.lastname);
          expect(response.email).to.eql(generatedData.valid_user.email);
          expect(response.username).to.eql(generatedData.valid_user.username);
          expect(response.password).to.not.eql(generatedData.valid_user.password);
          done();
        });
    });
    it('should return null for nonexistent user', (done) => {
      User.findById(52)
        .then((response) => {
          expect(response).to.be.a('null');
          done();
        });
    });
  });
  describe('Update User', () => {
    it('should update created user', (done) => {
      User.findById(generatedData.valid_user.id)
       .then((user) => {
         user.update({ firstname: 'Miranda', password: 'la-la-land' })
          .then((updatedUser) => {
            expect(updatedUser.firstname).to.not.eql(generatedData.valid_user.firstname);
            expect(updatedUser.firstname).to.eql('Miranda');
            expect(updatedUser.password).to.not.eql('la-la-land');
            expect(
              updatedUser.isPassword(
                updatedUser.password, generatedData.valid_user.password
              )).to.not.eql(true);
            expect(
              updatedUser.isPassword(
                updatedUser.password, 'la-la-land'
              )).to.eql(true);
            done();
          });
       });
    });
  });
  describe('Delete User', () => {
    it('should delete a created user', (done) => {
      User.destroy({ where: { id: generatedData.valid_user.id } })
        .then(() => {
          User.findById(generatedData.valid_user.id)
            .then((res) => {
              expect(res).to.be.a('null');
              done();
            });
        });
    });
  });
});
