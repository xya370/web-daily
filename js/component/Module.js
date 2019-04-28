define(['require'],function(require) {
	function Module(option) {
		try {
			require([option.type],function(mod){
				new mod(option);
			});
		} catch (exception) {
			return;
		}
	}
	return Module;
});