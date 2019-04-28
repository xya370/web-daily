require.config({
	paths:{
		'jquery': '../lib/jquery-1.10.2.min',
        'datetimePicker':'../lib/jquery.datetimepicker',
        "bootstrap": "../lib/bootstrap",
        "fileInput":"../lib/fileinput.min",
        'fileInputZH':'../lib/fileinput_locale_zh',
    	'Module': '../component/Module',
    	'commonData':'../commonData',
    	'customerBusiness':'../businessController/customerBusiness',
    	'ec':'../lib/echarts/dist/echarts', 
        'bmap':'../lib/bmap.min',
    	'pie':'../component/pie',
    	'bar':'../component/bar',
    	'line':'../component/line',
        'radar':'../component/radar',
        'layDate':'../lib/layDate-v5.0.9/laydate/laydate',
        'pace':'../lib/pace.min',
        'ecgl':'../lib/echarts.gl',
        'ecStat':'../lib/ecStat',
       
        'timePicker':'../component/timePicker',
        'dateRange':'../component/dateRange',
        'inputs':'../component/inputs',
        'form':'../component/form',
        'userCard':'../component/userCard',
        'mark':'../component/mark',
        'pagintor':'../component/pagintor',
         'promotionBar':'../component/promotionBar',

        'cityRadar':'../component/cityRadar',
        'cityStack':'../component/cityStack',
        'cityLine':'../component/cityLine',
        'cityPie':'../component/cityPie',
        'overlayPie':'../component/overlayPie',
        'emptyPie':'../component/emptyPie',
        'cityGallay':'../component/cityGallay',
        'zheMap':'../component/zheMap',
        'echarts3D':'../component/earts3D',
        'circe':'../component/circe',
        'custom':'../../js/otherJS/echarts-custom',
        'DatePicker':'../../js/otherJS/date',
        'quadrant':'../component/quadrant'
	},
     shim: {
        'jquery': {
            exports: "$"
        },
        "bootstrap": {
            deps: ['jquery']
        },
        'fileInput':{
            deps:['jquery','bootstrap']
        },
        'fileInputZH':{
            deps:['jquery','fileInput']
        }
    }
});
require(['jquery','Module','commonData','customerBusiness'], function($,Module,commonData,customerBusiness) {
});