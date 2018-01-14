new Vue({
    el:'.container',
    data () {
        return {
            addressList:[],
            limitNum:3,
            curIndex:0,
            shoppingMethod:1
        }
    },
    mounted:function(){
        this.$nextTick(function () {
            // Code that will run only after the
            // entire view has been rendered
            this.addressView();
          })
    },
    computed:{  //实时计算
        //过滤器
        filterAddress:function(){
            return this.addressList.slice(0,this.limitNum)
        }
    },
    methods:{
        addressView:function(){
            axios.get('data/address.json').then(res=>{
                console.log(res);
                console.log(res.data.result);
                this.addressList=res.data.result;
                // this.totalMoney=res.data.result.totalMoney;
                console.log(this.addressList)
            })
        },
        setDefault:function(addressId){
            this.addressList.forEach(function(address,index){
                if(address.addressId==addressId){
                    address.isDefault=true;
                }else{
                    address.isDefault=false;
                }
            })
        },
        delAddress:function(index){
            this.curIndex=index;
            this.addressList.splice(this.curIndex,1);
        }
    }
})