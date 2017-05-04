/* global request:true */
describe('Routes: index', () => {
  describe('GET /', () => {
    describe('status 200', () => {
      it('serves an html page', (done) => {
        request.get('/')
          .expect(200)
          .end(err => done(err));
      });
    });
  });
});
