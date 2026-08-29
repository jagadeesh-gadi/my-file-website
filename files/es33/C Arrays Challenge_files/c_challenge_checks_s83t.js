(function(){
  window.CHALLENGE_EXTRA_CHECK = function(ctx){
    if (!ctx || typeof ctx.code !== 'string') return null;

    var code = ctx.code;
    if (!code || code.trim() === '') return null;

    var opens = (code.match(/\{/g) || []).length;
    var closes = (code.match(/\}/g) || []).length;
    if (opens !== closes){
      return {
        severity: 'warn',
        message: 'Braces { } look unbalanced. Make sure each opening brace has a matching closing brace.'
      };
    }

    return null;
  };
})();
