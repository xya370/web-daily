'usr strict';
(function(root, factory){
  if(typeof define =='function' && define.amd){
      define(['jquery'],factory);
  }else if(typeof exports =='object'){
      module.exports = factory($);
  }else{
      root.validate = factory($||window.jQuery)
  }
}(this, function($){
  function validate(){
    var phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
    var idCardReg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
    var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    var telReg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
  }
  validate.prototype = {
    
  }
  validate.prototype.constructor = validate;
  return validate;
}))