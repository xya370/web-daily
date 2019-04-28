define(['jquery'],function($){
    var setKey=function(key){
       var keys={
            'ZB102':'title','ZB104':'title',
            'ZB101':'title','ZB105':'title',
            'ZB995':'title','ZB997':'title','ZB998':'title',
            'ZB996':'title','ZB994':'title','ZB993':'title',
            'ZB992':'title','ZB991':'title','ZB989':'title',
            'ZB988':'title','ZB987':'title','ZB986':'title',
            'ZB985':'title','ZB984':'title','ZB983':'title',
            'ZB982':'title','ZB981':'title','ZB980':'title',
            'ZB978':'title','ZB979':'title','ZB977':'title',
            'ZB970':'title','ZB969':'title','ZB968':'title',
            'ZB975':'title','ZB974':'title','ZB973':'title',
            'ZB972':'title','ZB969':'title','ZB968':'title',
            'ZB967':'title','ZB966':'title','ZB990':"title"
        }
        if(typeof(keys[key])=='undefined'){
            keys[key] = key
        }
        return keys[key]
    }
    var newData=function(data){
        var i=0,newDa={},inData=newDa['data']={}
        for(var item in data){
            var nkey =setKey(item)
            if(nkey!=='title'){
                inData[nkey]=data[item]
            }else{
                newDa[nkey]=data[item]
            }
            i++
        }
        return newDa
    }
	return {
        newData:newData
	} 
})