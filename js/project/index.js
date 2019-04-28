require.config({
	paths:{
		'jquery': '../lib/jquery-1.10.2.min',
    	'Module': '../component/Module',
    	'commonData':'../commonData',
    	'indexBusiness':'../businessController/indexBusiness',
    	'navLeft':'../component/navLeft'
	}
});
require(['jquery','Module','commonData','indexBusiness'], function($,Module,commonData,indexBusiness) {
});