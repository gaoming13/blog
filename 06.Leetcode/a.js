function isPlainObject( obj ) {
  var proto, Ctor;

  // Detect obvious negatives
  // Use toString instead of jQuery.type to catch host objects
  if ( !obj || toString.call( obj ) !== "[object Object]" ) {
    return false;
  }

  proto = getProto( obj );

  // Objects with no prototype (e.g., `Object.create( null )`) are plain
  if ( !proto ) {
    return true;
  }

  // Objects with prototype are plain iff they were constructed by a global Object function
  Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
  return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
}

function extend (target, options) {
	// target格式处理
	if ( typeof target !== "object" && typeof target !== "function" ) {
		target = {};
	}

  if (options == null) {
    return target;
  }

  for ( name in options ) {
    copy = options[ name ];

    if ( name === "__proto__" || target === copy ) {
      continue;
    }

    // Recurse if we're merging plain objects or arrays
    if ( isPlainObject( copy ) || ( copyIsArray = Array.isArray( copy ) ) ) {
      src = target[ name ];

      // Ensure proper type for the source value
      if ( copyIsArray && !Array.isArray( src ) ) {
        clone = [];
      } else if ( !copyIsArray && ! isPlainObject( src ) ) {
        clone = {};
      } else {
        clone = src;
      }
      copyIsArray = false;

      // Never move original objects, clone them
      target[ name ] = extend( clone, copy );

    // Don't bring in undefined values
    } else if ( copy !== undefined ) {
      target[ name ] = copy;
    }
  }

	return target;
}

let a = { p1: '123', p2: '456', p3: () => { console.log('11'); } };
Object.defineProperty(a, 'p4', {
  get: function() { return this.p2 },
  set: (val) => {},
});
let b = { p1: '456' };
let c = extend(a, b);