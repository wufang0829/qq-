import wepy from 'wepy'
//过滤器
function numberFilter(param){
	let n=param
	return (param/10000).toFixed(1)+'万'
}
//获取推荐数据
function getRecommend(callback){
	wepy.request({
		url:'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
		data:{
			g_tk: 5381,
	      	uin: 0,
	      	format: 'json',
	      	inCharset: 'utf-8',
	     	outCharset: 'utf-8',
	     	notice: 0,
	      	platform: 'h5',
	      	needNewCode: 1,
	     	 _: Date.now()
		},
		method:'GET',
		success:function(res){
			//console.log(res)
			
			if(res.statusCode==200){
				callback(res.data.data)
			}
		}
	})
}

/*
** 排行榜相关api
*/
//获取排行榜数据
function getTopList(callback){
	wepy.request({
		method:'GET',
		url:'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
		data:{
			 format: 'json',
		      g_tk: 5381,
		      uin: 0,
		      inCharset: 'utf-8',
		      outCharset: 'utf-8',
		      notice: 0,
		      platform: 'h5',
		      needNewCode: 1,
		      _: Date.now()
		},
		header:{'content-type':'application/json'},
		success:function(res){
			if(res.statusCode==200){
				let topList=res.data.data.topList
				for(var i=0;i<topList.length;i++){
					topList[i].listenCount=numberFilter(topList[i].listenCount)
				}
				callback(topList)

			}
		}
	})
}
//获取排行榜详细信息
function getToplisDetails(id,callback){
	wepy.request({
		method:'GET',
		url:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
		data:{
			g_tk: 5381,
		    uin: 0,
		    format: 'json',
		    inCharset: 'utf-8',
		    outCharset: 'utf-8',
		    notice: 0,
		    platform: 'h5',
		    needNewCode: 1,
		    tpl: 3,
		    page: 'detail',
		    type: 'top',
		    topid:id,
		    _:Date.now()
		},
		header:{'Content-Type':'application/json'},
		success:function(res){
			//console.log(res)
			if(res.statusCode===200){
				callback(res.data)
			}
		}
	})
}
/*
** 搜索相关api
*/
//获取热门搜索数据
function getHotSearch(callback){
	wepy.request({
		method:'GET',
		url:'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
		data:{
			g_tk: 5381,
		    uin: 0,
		    format: 'json',
		    inCharset: 'utf-8',
		    outCharset: 'utf-8',
		    notice: 0,
		    platform: 'h5',
		    needNewCode: 1,
		    _: Date.now()
		},
		header:{'content-Type':'application/json'},
		success:function(res){
			if(res.statusCode==200){
				let data=res.data
				//console.log(data)
				//截取前八个热门搜索
				let hotkey=data.data.hotkey.slice(0,8)
				callback(hotkey,data.data.special_key)
			}
		}
	})
}
//获取搜索结果
function getSearchMusic(keyWord,page,callback){
	wepy.request({
		method:'GET',
		url:'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
		data:{
			g_tk: 5381,
		    uin: 0,
		    format: 'json',
		    inCharset: 'utf-8',
		    outCharset: 'utf-8',
		    notice: 0,
		    platform: 'h5',
		    needNewCode: 1,
		    w: keyWord,
	      	zhidaqu: 1,
		    catZhida: 1,
		    t: 0,
		    flag: 1,
		    ie: 'utf-8',
		    sem: 1,
		    aggr: 0,
		    perpage: 20,
		    n: 20,
		    p: page,
		    remoteplace: 'txt.mqq.all',
		    _: Date.now()
		},
		success:function(res){
			if(res.statusCode==200){
				callback(res.data.data)
			}
		}
	})
}
module.exports={
	getRecommend:getRecommend,
	getTopList:getTopList,
	getToplisDetails:getToplisDetails,
	getHotSearch:getHotSearch,
	getSearchMusic:getSearchMusic
}