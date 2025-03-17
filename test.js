function JLObjectFlat(obj = ''){
  const res = {};
  const res = {};
  function flat(item, prekey = '') {
    Object.entried(item).forEach(([key, value]) => {
      let newKey = key;
      if (Array.isArray(item)) {
        newKey = preKey ? `${preKey}[${key}]` : key;
      } else {
        newKey = preKey ? `${preKey}.${key}` : key;
      }
      if (value && typeof value === 'object') {
        flat(value, newKey);
      } else {
        res[newKey] = value;
      }
    })
  }

  function flat(item , preKey = ''){
    Object.entries(item).forEach(([key,value]) => {
      let newKey = key;
      if (Array.isArray(item)){
        newKey = preKey ? `${preKey}[${key}]` : key;
      }else{
        newKey = preKey ? `${preKey}.${key}` : key;
      }
      if (value && typeof value === 'object'){
        flat(value , newKey)
      }else{
        res[newKey] = value;
      }
    })
  }

  flat(obj);
  return res;
}
