import SeriesFactory from '../';
import Step from '../step';
import Series from '../series';

describe('SeriesFactory', () => {
  it('should have a constructor', () => {
    const store = {
      registerModule: sinon.spy(),
    };
    const factory = new SeriesFactory(store, {
      namespace: 'foo',
    });
    expect(factory.namespace).to.equal('foo');
    expect(factory.store).to.equal(store);
    expect(store.registerModule).to.be.called;
  });
  it('should alias props onto step', () => {
    const store = {
      registerModule() {},
    };
    sinon.spy(SeriesFactory.prototype, 'aliasProps');
    const factory = new SeriesFactory(store, {
      aliases: {
        $foo: () => 'bar',
      },
    });
    expect(factory.aliasProps).to.be.called;
    expect(Step.prototype.$foo).to.equal('bar');
  });
  it('should register a new series', () => {
    const store = {
      registerModule() {},
    };
    const factory = new SeriesFactory(store, {});
    factory.register('foo', {
      name: 'foo',
      steps: [],
    });
    expect(factory.getSeries('foo')).to.be.an.instanceOf(Series);
  });
  it('should be a proxy function that returns getSeries', () => {
    const store = {
      registerModule() {},
    };
    const factory = new SeriesFactory(store, {});
    factory.register('foo', {
      name: 'foo',
      steps: [],
    });
    expect(factory('foo')).to.be.an.instanceOf(Series);
  });
});
