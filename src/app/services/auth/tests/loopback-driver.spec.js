import Driver from '../drivers/loopback';

function getItem(name) {
  return JSON.parse(window.localStorage.getItem(name));
}

describe('LoopbackDriver', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should construct and retrieve cached data', () => {
    const http = sinon.stub();
    const config = {};
    const driver = new Driver(config, http);
    expect(driver.config).to.equal(config);
    expect(driver.http).to.equal(http);
    expect(driver.data.accessToken).to.be.null;
    expect(driver.data.userId).to.be.null;
    expect(driver.data.expiresAt).to.be.null;
  });
  it('should reject when trying to handle hosted login', () => {
    const http = sinon.stub();
    const config = {};
    const driver = new Driver(config, http);
    expect(driver.hostedLogin()).to.be.rejected;
    expect(driver.handleCallback()).to.be.rejected;
  });
  it('should login through a loopback API', () => {
    const response = {
      data: {
        accessToken: 'accessToken',
        userId: 'userId',
        expiresAt: 'expiresAt',
      },
    };
    const http = {
      post: sinon.stub().resolves(response),
    };
    const config = {
      authUrl: 'foo',
    };
    const driver = new Driver(config, http);
    sinon.stub(driver, 'setAuth');
    driver.apiLogin('email', 'password').then(response => {
      const stubArgs = http.post.getCall(0).args;
      expect(stubArgs[0]).to.equal(config.authUrl);
      expect(stubArgs[1].username).to.equal('email');
      expect(stubArgs[1].password).to.equal('password');
      expect(driver.setAuth).to.be.called;
      expect(driver.setAuth.getCall(0).args[0]).to.equal(response.data);
      expect(response.accessToken).to.be.equal('accessToken');
      expect(response.userId).to.be.equal('userId');
      expect(response.expiresAt).to.be.equal('expiresAt');
    });
  });
  it('should set and cache auth data', () => {
    const http = {};
    const config = {};
    const driver = new Driver(config, http);
    const time = new Date().getTime();
    driver.setAuth({
      id: 'accessToken',
      userId: 'userId',
      ttl: 1209600,
    });
    expect(driver.data.accessToken).to.equal('accessToken');
    expect(driver.data.userId).to.equal('userId');
    expect(driver.data.expiresAt >= time).to.be.true;
    expect(getItem('auth.loopback.accessToken')).to.equal('accessToken');
    expect(getItem('auth.loopback.userId')).to.equal('userId');
    expect(getItem('auth.loopback.expiresAt') >= time).to.be.true;
  });
  it('should set and cache auth data', () => {
    const http = {};
    const config = {};
    const driver = new Driver(config, http);
    driver.setAuth({
      id: 'accessToken',
      userId: 'userId',
      ttl: 1209600,
    });
    driver.logout();
    expect(driver.data.accessToken).to.equal(null);
    expect(driver.data.userId).to.equal(null);
    expect(driver.data.expiresAt).to.equal(null);
    expect(getItem('auth.loopback.accessToken')).to.be.null;
    expect(getItem('auth.loopback.userId')).to.be.null;
    expect(getItem('auth.loopback.expiresAt')).to.be.null;
  });
  it('should determine authentication status', () => {
    const http = {};
    const config = {};
    const driver = new Driver(config, http);
    driver.setAuth({
      id: 'accessToken',
      userId: 'userId',
      ttl: new Date().getTime() + 1000,
    });
    expect(driver.isAuthenticated()).to.be.true;
    driver.logout();
    expect(driver.isAuthenticated()).to.be.false;
  });
  it('should return the api token', () => {
    const http = {};
    const config = {};
    const driver = new Driver(config, http);
    driver.setAuth({
      id: 'accessToken',
      userId: 'userId',
      ttl: 1209600,
    });
    expect(driver.getApiToken()).to.equal('accessToken');
  });
});
