import Series from '../series';

describe('Series', () => {
  it('should have a constructor', () => {
    const store = {
      registerModule: sinon.spy(),
    };
    const options = {
      name: 'bar',
      steps: [],
    };
    const series = new Series(store, 'foo', options);
    expect(series.rootNamespace).to.equal('foo');
    expect(series.name).to.equal(options.name);
    expect(series.steps).to.be.an.array;
    expect(store.registerModule).to.be.called;
  });
  it('should compute stepIndex to the vuex store', () => {
    const store = {
      registerModule() {},
      getters: {
        'series/bar/stepIndex': 0,
      },
    };
    const options = {
      name: 'bar',
      steps: [],
    };
    const series = new Series(store, 'series', options);
    expect(series.store).to.equal(store);
    expect(series.stepIndex).to.equal(0);
  });
  it('should return the current step', () => {
    const store = {
      registerModule() {},
      getters: {
        'series/bar/stepIndex': 0,
      },
    };
    const options = {
      name: 'bar',
      steps: [
        {
          name: 'TestStep',
        },
      ],
    };
    const series = new Series(store, 'series', options);
    expect(series.getCurrentStep().$options.name).to.equal('TestStep');
  });
  it('should init the current step', () => {
    const store = {
      registerModule() {},
      commit: sinon.spy(),
      getters: {
        'series/bar/stepIndex': 0,
      },
    };
    const initSpy = sinon.spy();
    const series = new Series(store, 'series', {
      name: 'bar',
      steps: [
        {
          init: initSpy,
        },
      ],
    });
    series.init();
    expect(initSpy).to.be.called;
  });
  it('should go to the next step', () => {
    const store = {
      registerModule() {},
      getters: {
        'series/bar/stepIndex': 0,
      },
      commit(type, value) {
        this.getters['series/bar/stepIndex'] = value;
      },
    };

    const step1 = {
      name: 'step1',
      beforeNext: sinon.spy(),
      beforeBack: sinon.spy(),
      afterNext: sinon.spy(),
    };
    const step2 = {
      name: 'step2',
      init: sinon.spy(),
    };

    const series = new Series(store, 'series', {
      name: 'bar',
      steps: [step1, step2],
    });
    expect(series.getCurrentStep().$options.name).to.equal('step1');
    series.nextStep();
    expect(step1.beforeNext).to.be.called;
    const next = step1.beforeNext.args[0][0];
    next();
    expect(series.getCurrentStep().$options.name).to.equal('step2');
    expect(step2.init).to.be.called;
    expect(step1.afterNext).to.be.called;
  });
  it('should go back one step', () => {
    const store = {
      registerModule() {},
      getters: {
        'series/bar/stepIndex': 1,
      },
      commit(type, value) {
        this.getters['series/bar/stepIndex'] = value;
      },
    };

    const step1 = {
      name: 'step1',
      init: sinon.spy(),
    };
    const step2 = {
      name: 'step2',
      init: sinon.spy(),
      beforeBack: sinon.spy(),
      afterBack: sinon.spy(),
    };

    const series = new Series(store, 'series', {
      name: 'bar',
      steps: [step1, step2],
    });
    expect(series.getCurrentStep().$options.name).to.equal('step2');
    series.back();
    expect(step2.beforeBack).to.be.called;
    const next = step2.beforeBack.args[0][0];
    next();
    expect(series.getCurrentStep().$options.name).to.equal('step1');
    expect(step1.init).to.be.called;
    expect(step2.afterBack).to.be.called;
  });
});
