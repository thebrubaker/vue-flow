export function aliasProps(object, props) {
  Object.defineProperties(
    object,
    Object.keys(props).reduce((carry, name) => {
      if (typeof props[name] !== 'function') {
        throw Error(
          'Invalid alias. Props values must be an anonymous function.'
        );
      }
      // asking for vm.$http returns app.http
      return {
        ...carry,
        [name]: {
          get: props[name]
        }
      };
    }, {})
  );
}
