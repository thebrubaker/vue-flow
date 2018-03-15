import Step from '../step';

describe('SeriesStep', () => {
  it('should have a constructor', () => {
    const options = {
      name: 'test',
      init() {
        return 'init';
      },
      beforeNext() {
        return 'beforeNext';
      },
      afterNext() {
        return 'afterNext';
      },
      beforeBack() {
        return 'beforeBack';
      },
      afterBack() {
        return 'afterBack';
      },
    };
    const series = {};
    const step = new Step(series, options);
    expect(step.$options.name).to.equal(options.name);
    expect(step.$options.series).to.equal(series);
    expect(step.$options.init()).to.equal(options.init());
    expect(step.$options.beforeNext()).to.equal(options.beforeNext());
    expect(step.$options.afterNext()).to.equal(options.afterNext());
    expect(step.$options.beforeBack()).to.equal(options.beforeBack());
    expect(step.$options.afterBack()).to.equal(options.afterBack());
  });
  it('should bind options to itself', () => {
    const options = {
      name: 'test',
      init() {
        return this;
      },
      beforeNext() {
        return this;
      },
      afterNext() {
        return this;
      },
      beforeBack() {
        return this;
      },
      afterBack() {
        return this;
      },
    };
    const series = {};
    const step = new Step(series, options);
    expect(step.$options.init()).to.equal(step);
    expect(step.$options.beforeNext()).to.equal(step);
    expect(step.$options.afterNext()).to.equal(step);
    expect(step.$options.beforeBack()).to.equal(step);
    expect(step.$options.afterBack()).to.equal(step);
  });
  it('should set computed functions with appropriate binding', () => {
    const options = {
      computed: {
        foo() {
          return this;
        },
      },
    };
    const series = {};
    const step = new Step(series, options);
    expect(step.foo).to.equal(step);
  });
  it('should set computed desciptors with appropriate binding', () => {
    const spy = sinon.spy();
    const options = {
      computed: {
        foo: {
          get() {
            return this;
          },
          set() {
            spy();
          },
        },
      },
    };
    const series = {};
    const step = new Step(series, options);
    expect(step.foo).to.equal(step);
    step.foo = true;
    expect(spy).to.be.called;
  });
});
