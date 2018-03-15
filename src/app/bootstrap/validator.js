import Validator from 'validatorjs';

const validator = {
  make: (data, rules, custom) => new Validator(data, rules, custom)
};

export default validator;
