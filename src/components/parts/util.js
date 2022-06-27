export function processAPIData(data) {
  let res = {};
  Object.keys(data).forEach((key) => { res[data[key].id] = data[key]; });
  return res;
}
export function truncateString(string, maxLength = 50) {
  if (!string) return false;
  const showDots = string.length > maxLength;
  return `${string.substring(0, maxLength)}${showDots ? '...' : ''}`;
}
export function camelToHyphen(str) {
  return str.replace(/([A-Z])/g, function (match) {
    return " " + match;
  });
}
export function queryStr(str, value) {
  let arr = str.split(' ');
  return {
    present: arr.indexOf(value) > -1,
    others: arr.indexOf(value) < 0 && arr.length >= 1 ||
      arr.indexOf(value) > -1 && arr.length > 1
  };
}
export function removeArrayValue(array, value) {
  var index = array.indexOf(value);
  if (index !== -1) {
    return array.splice(index, 1);
  } else {
    return array;
  }
}
export function cloneDeep(entity, cache = new WeakMap) {
  const referenceTypes = ['Array', 'Object', 'Map', 'Set', 'WeakMap', 'WeakSet'];
  const entityType = Object.prototype.toString.call(entity);
  if (!new RegExp(referenceTypes.join('|')).test(entityType))
    return entity;
  if (cache.has(entity)) {
    return cache.get(entity);
  }
  const c = new entity.constructor;

  if (entity instanceof Map || entity instanceof WeakMap) {
    entity.forEach((value, key) => c.set(cloneDeep(key), cloneDeep(value)));
  }
  if (entity instanceof Set || entity instanceof WeakSet) {
    entity.forEach((value) => c.add(cloneDeep(value)));
  }
  cache.set(entity, c);
  return Object.assign(c, ...Object.keys(entity).map((prop) => ({ [prop]: cloneDeep(entity[prop], cache) })));
}

export function isArray(item) {
  return !!item && typeof item === 'object' && item.constructor === Array;
}
export function isObject(item) {
  return !!item && typeof item === 'object' && item.constructor === Object;
}
export function isString(item) {
  return typeof item === 'string' || item instanceof String;
}
export function isNull(item) {
  return item === null;
}
export function isPresent(item) {
  return item !== null || item !== "";
}
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
export function sortObjects(objects, key, order) {
  if (!objects) {
    return [];
  } else if (isObject(objects) && Object.keys(objects).length === 0) {
    return [];
  } else if (isArray(objects) && objects.length === 0) {
    return [];
  }

  let sortedKeys = Object.keys(objects).sort((a, b) => {
    if (objects[a][key] > objects[b][key]) return 1;
    if (objects[a][key] < objects[b][key]) return -1;
    return 0;
  });
  // console.log(sortedKeys);
  let sortedObjects = {};
  if (order === 'DESC') sortedKeys.reverse();

  for (let k in sortedKeys) {
    sortedObjects[sortedKeys[k]] = objects[sortedKeys[k]];
  }
  // console.log(sortedObjects);
  return sortedObjects;
  // return sortedKeys.map(ky => {
  //     return objects[ky];
  // })
}

export function guid() {
  (function () {

    if ("performance" in window == false) {
      window.performance = {};
    }

    Date.now = (Date.now || function () {  // thanks IE8
      return new Date().getTime();
    });

    if ("now" in window.performance == false) {

      var nowOffset = Date.now();

      if (performance.timing && performance.timing.navigationStart) {
        nowOffset = performance.timing.navigationStart
      }

      window.performance.now = function now() {
        return Date.now() - nowOffset;
      }
    }

  })();

  const gUUID = () => { // Public Domain/MIT
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  return gUUID();
}
export function hasClass(el, className) {
  if (!el) return false;
  if (el.classList)
    return el.classList.contains(className);
  return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
export function insertAfter(newNode, refNode) {
  refNode.parentNode.insertBefore(newNode, refNode);
}
export function removeClass(el, className) {
  if (!el) return false;
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
}
export function toggle(el, className) {
  if (!el) return false;
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className && el.className.split(' ') || [];
    var existingIndex = -1;
    for (var i = classes.length; i--;) {
      if (classes[i] === className)
        existingIndex = i;
    }
    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1);
    } else {
      classes.push(className);
    }
    el.className = classes.join(' ');
  }
}
export function addClass(el, className) {
  if (!el) return false;
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className))
    el.className += " " + className;
}

export function closest(node, selector) {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) { }
        return i > -1;
      };
  }

  for (; node && node !== document; node = node.parentNode) {
    if (node.matches(selector)) {
      return node;
    }
  }
  return null;
}
export function fadeIn(el) {
  var opacity = 0;

  el.style.opacity = 0;
  el.style.filter = '';

  var last = +new Date();
  var tick = function () {
    opacity += (new Date() - last) / 400;
    el.style.opacity = opacity;
    el.style.filter = 'alpha(opacity=' + (100 * opacity) | 0 + ')';

    last = +new Date();

    if (opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

export function fadeOut(el) {
  if (!el) return false;
  var opacity = 1;

  el.style.opacity = 1;
  el.style.filter = '';

  var last = +new Date();
  var tick = function () {
    opacity -= (new Date() - last) / 400;
    el.style.opacity = opacity;
    el.style.filter = 'alpha(opacity=' + (100 * opacity) | 0 + ')';

    last = +new Date();

    if (opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

const EMPTY = {};

export function assign(obj, props) {
  // eslint-disable-next-line guard-for-in
  for (let i in props) {
    obj[i] = props[i];
  }
  return obj;
}
export function clearInputHint(control) {
  let xhint = !!control.xhint && control.xhint;
  control.hint = xhint || control.hint;
  delete control.xhint;
  let smallclass = control.attributes.smallclass;
  control.attributes.smallclass = smallclass && smallclass.replace(/hinterror/gi, '');
  return control;
}
export function configureGroupClone(group, index) {
  let grpVals = Object.values(group);
  let grpKeys = Object.keys(group);
  let groups = {}
  grpVals.forEach((grp, key) => {
    grp.name = grp.name.replace(/#\d+/, '') + '#' + index;
    grp.attributes.value = undefined;
    grp = clearInputHint(grp);
    groups[grp.name] = grp;
  })
  return groups;
}
export function exec(url, route, opts) {
  let reg = /(?:\?([^#]*))?(#.*)?$/,
    c = url.match(reg),
    matches = {},
    ret;
  if (c && c[1]) {
    let p = c[1].split('&');
    for (let i = 0; i < p.length; i++) {
      let r = p[i].split('=');
      matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
    }
  }
  url = segmentize(url.replace(reg, ''));
  route = segmentize(route || '');
  let max = Math.max(url.length, route.length);
  for (let i = 0; i < max; i++) {
    if (route[i] && route[i].charAt(0) === ':') {
      let param = route[i].replace(/(^:|[+*?]+$)/g, ''),
        flags = (route[i].match(/[+*?]+$/) || EMPTY)[0] || '',
        plus = ~flags.indexOf('+'),
        star = ~flags.indexOf('*'),
        val = url[i] || '';
      if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
        ret = false;
        break;
      }
      matches[param] = decodeURIComponent(val);
      if (plus || star) {
        matches[param] = url.slice(i).map(decodeURIComponent).join('/');
        break;
      }
    }
    else if (route[i] !== url[i]) {
      ret = false;
      break;
    }
  }
  if (opts.default !== true && ret === false) return false;
  return matches;
}

export function pathRankSort(a, b) {
  return (
    (a.rank < b.rank) ? 1 :
      (a.rank > b.rank) ? -1 :
        (a.index - b.index)
  );
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
export function prepareVNodeForRanking(vnode, index) {
  vnode.index = index;
  vnode.rank = rankChild(vnode);
  return vnode.props;
}

export function segmentize(url) {
  return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

export function rankSegment(segment) {
  return segment.charAt(0) == ':' ? (1 + '*+?'.indexOf(segment.charAt(segment.length - 1))) || 4 : 5;
}

export function rank(path) {
  return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
  return vnode.props.default ? 0 : rank(vnode.props.path);
}

export function addMemory(store) {
  if (typeof window !== 'undefined' && window.STATE) store.setState(window.STATE);
  store.subscribe(state => {
    if (typeof window !== 'undefined') {
      window.STATE = state;
    }
    // console.log(STATE);
  });
}

export function getFromMemory(item) {
  if (typeof window !== 'undefined' && window.STATE) {
    return window.STATE[item];
  }
}

export function combineActions(...allActions) {
  return store => allActions.reduce((combined, actions) => {
    actions = actions(store);
    for (let i in actions) {
      if (combined[i]) throw new Error('Have a repeat action name: ' + i)
      let action = actions[i];
      combined[i] = action;
    }
    return combined;
  }, {});
}

function delve(obj, key, def, p, undef) {
  key = key.split ? key.split('.') : key;
  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }
  return obj === undef ? def : obj;
}
export function setKeyedItem(obj = {}, value, index, name, parent) {
  //let isUpdate = false;
  // if(!value) return;
  // console.log(/(0|[1-9]+[0-9]*)/.test(index), index);
  if (!!parent) {
    obj[parent] = obj[parent] || {};
    obj[parent][index] = obj[parent][index] || {};

    if (/(0|[1-9]+[0-9]*)/.test(index)) {
      // console.log(value, index, name, parent);
      !value ? delete obj[parent][index][name] :
        obj[parent][index][name] = value;
    } else {
      //isUpdate = obj[parent][name] != value;
      !value ? delete obj[parent][name] :
        obj[parent][name] = value;
    }

  } else if (!parent) {
    if (/(0|[1-9]+[0-9]*)/.test(index)) {
      obj[index] = obj[index] || {};
      //isUpdate = obj[index][name] != value;
      !value ? delete obj[index][name] :
        obj[index][name] = value;
    } else {
      // console.log('no parent',value,index,name,parent);        
      //isUpdate = obj[name] != value;
      !value ? delete obj[name] :
        obj[name] = value;
    }
  }
  //if(isUpdate)
  //return { isUpdate, obj };
  // console.log(value, index, name, parent);
  return obj;
}
export function getKeyedItem(obj = {}, key, index) {
  let keyedObject;
  if (!index) {
    keyedObject = obj[key];
  } else {
    keyedObject = obj[key] && obj[key][index];
  }
  return keyedObject;
}
export default function linkState(component, key, eventPath) {
  let path = key.split('.'),
    cache = component.__lsc || (component.__lsc = {});

  return cache[key + eventPath] || (cache[key + eventPath] = function (e) {
    let t = e && e.target || this,
      state = {},
      obj = state,
      v = typeof eventPath === 'string' ? delve(e, eventPath) : t.nodeName ? (t.type.match(/^che|rad/) ? t.checked : t.value) : e,
      i = 0;
    for (; i < path.length - 1; i++) {
      obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
    }
    obj[path[i]] = v;
    component.setState(state);
  });
}