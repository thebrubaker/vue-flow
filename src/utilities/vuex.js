export function bootstrap(module) {
  if (module.state === undefined) {
    module.state = {};
  }

  if (module.getters === undefined) {
    module.getters = {};
  }

  if (module.mutations === undefined) {
    module.mutations = {};
  }

  Object.keys(module.state).forEach(key => {
    if (module.getters[key] === undefined) {
      module.getters[key] = state => state[key];
    }
    if (module.mutations[key] === undefined) {
      module.mutations[key] = (state, value) => {
        state[key] = value;
      };
    }
  });

  if (module.mutations.map === undefined) {
    module.mutations.map = function map(state, data = {}) {
      if (data === null) return;
      Object.keys(state).forEach(key => {
        if (data[key] !== undefined) {
          state[key] = data[key];
        }
      });
    };
  }

  return module;
}

export const mapComputedFactory = namespace => {
  return function(computed) {
    return mapComputed(namespace, computed);
  };
};

export const mapComputed = normalizeNamespace(function(namespace, computed) {
  var res = {};
  normalizeMap(computed).forEach(function(ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = {
      get: function mappedGetter() {
        if (
          namespace &&
          !getModuleByNamespace(this.$store, 'mapGetters', namespace)
        ) {
          return;
        }
        if (!(val in this.$store.getters)) {
          console.error('[vuex] unknown getter: ' + val);
          return;
        }
        return this.$store.getters[val];
      },
      set: function mappedMutation() {
        var args = [];
        var len = arguments.length;
        while (len--) args[len] = arguments[len];

        if (
          namespace &&
          !getModuleByNamespace(this.$store, 'mapMutations', namespace)
        ) {
          return;
        }
        return this.$store.commit.apply(this.$store, [val].concat(args));
      },
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});

function normalizeNamespace(fn) {
  return function(namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map);
  };
}

/* eslint-disable */
function normalizeMap(map) {
  return Array.isArray(map)
    ? map.map(function(key) {
        return { key: key, val: key };
      })
    : Object.keys(map).map(function(key) {
        return { key: key, val: map[key] };
      });
}

/* eslint-enable */
function getModuleByNamespace(store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(
      '[vuex] module namespace not found in ' + helper + '(): ' + namespace,
    );
  }
  return module;
}
