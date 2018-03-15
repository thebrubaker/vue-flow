import Container from '../';
import sinon from 'sinon';

/**
 * The Container manages how services are loaded and accessed. Example services would be
 * firebase, axios, auth0 or any other large package that the app uses. With
 * webpack code splitting, some services may be loaded asynchronously, and it would be
 * tedious if the developer had to manage how a service is loaded when building out a feature.
 * So instead we use a container to manage registering how a service is loaded, and how to access
 * that service.
 */
describe('Container', () => {
  it('should register a synchronous service', () => {
    /**
     * Foo is a new service we want to register. It returns
     * the very important string "bar". Synchronous services
     * can be passed in as an argument on creating the container.
     */
    const app = new Container({
      foo: () => 'bar',
    });

    // We access the service by simply getting it as a prop off of app.
    const result = app.foo();

    expect(result).toEqual('bar');
  });

  /**
   * Now we want to register an asynchronous service, which means it may not be
   * pulled from the network until it is asked for.
   */
  it('should register an asynchronous service', () => {
    // An example service we want to get async
    const service = () => 'bar';

    // Async services can't be passed in on instantiation of the container like
    // we did before.
    const app = new Container();

    // Instead they are registered manually the following way:
    app.registerAsyncService('foo', () => {
      return Promise.resolve(service);
    });

    // We created a function the returned a promise to resolve the service.
    // Our example resolves right away, but it might otherwise resolve
    // over a network call. Imagine a webpack code-splitting import:
    // const Service = () => import('src/services/firebase')

    // So is our service resolved?
    const isResolved = app.isResolved('foo');

    // Not yet. It isn't available until we first use it.
    expect(isResolved).toBeFalsy;

    // In fact it throws an error if you try and access it before it's resolved
    expect(() => app.foo).toThrow();

    // Instead, we access services that may be async this way.
    app('foo').then(foo => {
      // Now it's resolved
      expect(app.isResolved('foo')).toBeTruthy;

      const result = foo();

      expect(result).toEqual('bar');
    });

    // So the lesson is: if a service isn't core, and may be loaded async, always access it like a promise.
  });

  it('should register callbacks for services that resolve', done => {
    const app = new Container();
    const spy = sinon.spy();

    app.registerAsyncService('foo', () => {
      return Promise.resolve(() => 'bar');
    });

    /**
     * Let's say we want to connect this service with other services once it has
     * been resolved. We can do this by registering a callback.
     */
    app.whenResolved('foo', foo => {
      spy();
    });

    // Our spy will be called once `foo` is resolved.
    expect(spy.called).toBeFalsy;

    app('foo').then(foo => {
      expect(spy.called).toBeTruthy;
      expect(foo()).toEqual('bar');
      expect(app.foo()).toEqual('bar');
      done();
    });
  });
});

// Note: loaded services through VueRouter middleware.
