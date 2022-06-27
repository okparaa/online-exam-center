export default (newProps: any, prevProps: any) => {
   const newKeys = Object.keys(newProps)
   const prevKeys = Object.keys(prevProps)
//  console.log('we got here', prevProps);
 
 if (newKeys.length !== prevKeys.length) return false
//  console.log('we are here', newProps);
 
   for (let i = 0; i < newKeys.length; i++) {
     if (
       !Object.prototype.hasOwnProperty.call(prevProps, newKeys[i]) ||
       (newProps[newKeys[i]] !== prevProps[newKeys[i]])
     ) return false
   }
   return true
 }