var moment=require('moment')
var date={
    format(time){
        if(time<10){
            time='0'+time
            return time
           }else{
               return time
           }
    },
    dateFormat(time){
        var date=new Date(time)
        var year=date.getFullYear()
                   var month=date.getMonth()+1
                   month=this.format(month)
                   var day=date.getDate()
                   day=this.format(day)
                   var hour=date.getHours()
                   hour=this.format(hour)
                   var second=date.getSeconds()
                   second=this.format(second)
                   var min=date.getMinutes()
                   min=this.format(min)
                   var time=`${year}年-${month}月-${day}日 ${hour}时:${min}分:${second}秒`
                   return time
       },
    dateFormat1(date){

       
        var year=date.getFullYear()
                   var month=date.getMonth()+1
                   month=this.format(month)
                   var day=date.getDate()
                   day=this.format(day)
                   var hour=date.getHours()
                   hour=this.format(hour)
                   var second=date.getSeconds()
                   second=this.format(second)
                   var min=date.getMinutes()
                   min=this.format(min)
                   var time=`${year}年-${month}月-${day}日 `
                   return time
       },
    //    yearFormat(date){
    //        var date=new Date(date)
    //     //    var year=date.getFullYear()
    //     //               var month=date.getMonth()
    //     //               var day=date.getDate()
    //                   var hour=date.getHours()
    //                   var second=date.getSeconds()
    //                   var min=date.getMinutes()
                     
    //                   var time=`${hour}时:${min}分:${second}秒 `
    //                   return moment(time).format()
    //    },
       
    //    timeFormat1(num,time){
        
    //        var date=new Date(time)
    //        var year=date.getFullYear()
    //        var month=date.getMonth()+num+1
    //        if(month>12){
    //            month=1
    //            year+=1
    //        }
    //        month=this.format(month)
    //        var day=date.getDate()
    //        day=this.format(day)
    //                 //   var hour=date.getHours()
    //                 //   var second=date.getSeconds()
    //                 //   var min=date.getMinutes()
                    
    //        var time=`${year}年-${month}月-${day}日 `
    //        return time
    //    },
       
       timeFormat2(num,time){
        var tt=moment(time).add(num,'months')
        var tt1=new Date(tt).getTime()
           return tt1
       },
       timeFormat(time){
           var date=new Date(time)
           var year=date.getFullYear()
           var month=date.getMonth()+1
           month=this.format(month)
           var day=date.getDate()
           day=this.format(day)
                    //   var hour=date.getHours()
                    //   var second=date.getSeconds()
                    //   var min=date.getMinutes()
                     
           var time=`${year}年-${month}月-${day}日 `
           return time
       }
}



module.exports=date