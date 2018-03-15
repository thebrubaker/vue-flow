import Step from './step';

export default class Series {
  /**
   * The constructor for the series class.
   * @param {Store} store The vuex data store.
   * @param {String} rootNamespace The root namespace for series.
   * @param {Object} options The options for the series.
   */
  constructor(store, rootNamespace, options = {}) {
    this.store = store;
    this.rootNamespace = rootNamespace;
    this.setName(options.name);
    this.setSteps(options.steps);
    this.beforeNext = (options.beforeNext || (cb => cb())).bind(this);
    this.beforeBack = (options.beforeBack || (cb => cb())).bind(this);
    this.registerModule();
  }

  /**
   * Returns the index of the current step.
   */
  get stepIndex() {
    const name = `${this.rootNamespace}/${this.name}/stepIndex`;
    return this.store.getters[name];
  }

  /**
   * Sets the index of the step and executes the `init()` method
   * on that step.
   */
  set stepIndex(index) {
    if (index + 1 > this.steps.length) {
      console.error('End of series reached.', this);
      return;
    }

    if (index < 0) {
      console.error('Beginning of series reached.', this);
      return;
    }

    const name = `${this.rootNamespace}/${this.name}/stepIndex`;
    this.store.commit(name, index);
    this.getCurrentStep().$options.init();
  }

  /**
   * Register a vuex store module.
   */
  registerModule() {
    this.store.registerModule([this.rootNamespace, this.name], {
      namespaced: true,
      state: {
        stepIndex: 0,
      },
      getters: {
        stepIndex(state) {
          return state.stepIndex;
        },
      },
      mutations: {
        stepIndex(state, index) {
          state.stepIndex = index;
        },
      },
    });
  }

  /**
   * The name to register in the store.
   * @param {String} name The name of the series.
   */
  setName(name) {
    if (!name) {
      throw Error('A name is required to create a new Series.');
    }
    this.name = name;
  }

  /**
   * Set the steps on the series.
   * @param {Array} steps The steps in the series.
   */
  setSteps(steps) {
    if (!steps) {
      throw Error('An array of steps are required to create a new Series.');
    }
    this.steps = steps.map(config => new Step(this, config));
  }

  /**
   * Return the current step object.
   */
  getCurrentStep() {
    return this.steps[this.stepIndex];
  }

  /**
   * Move the series to the current step index.
   */
  init(name) {
    const step = name ? this.getStepByName(name) : this.getCurrentStep();
    const index = this.steps.indexOf(step);
    const shouldSkip = step.$options.skip();

    if (shouldSkip && index === this.steps.length - 1) {
      throw Error(
        'Series is trying to skip the last step. The method `skip` should not be defined on your final step.',
      );
    }

    this.stepIndex = shouldSkip ? index + 1 : index;
  }

  /**
   * Returns a step by the given name, or throws an Error.
   * @param {String} name The name of the step.
   */
  getStepByName(name) {
    const filtered = this.steps.filter(step => step.$options.name === name);

    if (!filtered.length) {
      throw Error(
        `Trying to get step [${name}] that doesn't exist. Did you register it?`,
      );
    }

    return filtered[0];
  }

  /**
   * Move the series to the next step.
   */
  nextStep() {
    const step = this.getCurrentStep();
    this.beforeNext(() => {
      step.$options.beforeNext(() => {
        this.stepIndex += 1;
        step.$options.afterNext();
      });
    });
  }

  /**
   * Move the series back one step and execute appropriate lifecycle
   * methods.
   */
  back() {
    const step = this.getCurrentStep();
    this.beforeBack(() => {
      step.$options.beforeBack(() => {
        this.stepIndex -= 1;
        step.$options.afterBack();
      });
    });
  }
}
