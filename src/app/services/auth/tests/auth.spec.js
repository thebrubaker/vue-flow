import Auth from '../index';

describe('Auth', () => {
  it('should have correct props', () => {
    const config = {
      driver: 'fake',
    };
    const auth = new Auth(config);
    expect(auth.config.driver).to.equal(config.driver);
    expect(auth.drivers).to.be.a.object;
    expect(auth.events).to.be.a.object;
  });
  it('should proxy getting parameter values to the driver', () => {
    const spy = sinon.spy();
    const fakeDriver = {
      testMethod: spy,
    };
    const config = {
      driver: 'fakeDriver',
    };
    const auth = new Auth(config, { fakeDriver });
    expect(auth.loadDrivers).to.equal(Auth.prototype.loadDrivers);
    expect(auth.loadDriver).to.equal(Auth.prototype.loadDriver);
    expect(auth.driver).to.equal(Auth.prototype.driver);
    expect(auth.apiLogin).to.equal(Auth.prototype.apiLogin);
    expect(auth.logout).to.equal(Auth.prototype.logout);
    expect(auth.on).to.equal(Auth.prototype.on);
    expect(auth.emit).to.equal(Auth.prototype.emit);
    auth.testMethod();
    expect(spy).to.be.called;
  });
  describe('drivers', () => {
    it('should load a single driver', () => {
      const spy = sinon.spy();
      const fakeDriver = {
        testMethod: spy,
      };
      const config = {
        driver: 'fakeDriver',
      };
      const auth = new Auth(config);
      auth.loadDriver('fakeDriver', fakeDriver);
      expect(auth.drivers.fakeDriver).to.equal(fakeDriver);
    });
    it('should load multiple drivers', () => {
      const fakeDriver1 = {};
      const fakeDriver2 = {};
      const auth = new Auth({});
      auth.loadDrivers({ fakeDriver1, fakeDriver2 });
      expect(auth.drivers.fakeDriver1).to.equal(fakeDriver1);
      expect(auth.drivers.fakeDriver2).to.equal(fakeDriver2);
    });
    it('should return the configured driver', () => {
      const fakeDriver = {};
      const config = {
        driver: 'fakeDriver',
      };
      const auth = new Auth(config, { fakeDriver });
      expect(auth.driver()).to.equal(fakeDriver);
    });
  });
  describe('events', () => {
    it('should register events', () => {
      const auth = new Auth({});
      const callback = () => 'bar';
      auth.on('foo', callback);
      expect(auth.events.foo).to.be.an.array;
      expect(auth.events.foo[0]).to.equal(callback);
      auth.on('foo', callback);
      expect(auth.events.foo[1]).to.equal(callback);
    });
    it('should emit events', () => {
      const auth = new Auth({});
      const spy = sinon.spy();
      const payload = { foo: 'bar' };
      auth.on('foo', spy);
      auth.emit('foo', payload);
      expect(spy).to.be.calledWith(payload);
    });
  });
  describe('login / logout', () => {
    it('should call driver method and emit event on success', () => {
      const apiLoginStub = sinon.stub();
      const logoutSpy = sinon.spy();
      const userData = {};
      apiLoginStub.resolves(userData);
      const fakeDriver = {
        apiLogin: apiLoginStub,
        logout: logoutSpy,
      };
      const config = {
        driver: 'fakeDriver',
      };
      const auth = new Auth(config, { fakeDriver });
      sinon.spy(auth, 'emit');
      auth.apiLogin('email', 'password').then(() => {
        expect(apiLoginStub).to.be.calledWith('email', 'password');
        expect(auth.emit).to.be.calledWith('apiLoginSuccess', userData);
        auth.logout();
        expect(logoutSpy).to.be.called;
        expect(auth.emit).to.be.calledWith('logout');
      });
    });
  });
});
