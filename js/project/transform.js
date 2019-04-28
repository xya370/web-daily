require.config({
	paths:{
		'jquery': '../lib/jquery-1.10.2.min',
    	'Module': '../component/Module',
    	'commonData':'../commonData',
    	'transBusiness':'../businessController/transBusiness'
	}
});
require(['jquery','Module','commonData','transBusiness'], function($,Module,commonDat,transBusiness) {
});