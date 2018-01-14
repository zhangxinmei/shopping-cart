var vm =new Vue({
    el:'#app',
    data () {
        return {
            productList:[],
            totalPrice:0,
            checkAllFlag:false,
            isActive:true,
            isShow:false,
            curProduct:''
        }
       
    },
    filters:{
        formatMoney:function(value,type){
            return "￥"+value.toFixed(2)+type;
        }
    },
    mounted:function(){
        this.cartView()
    },
    methods:{
        cartView:function(){
            //var _this=this;          
            axios.get('data/cartData.json').then(res=>{
                console.log(res);
                //console.log(res.data.result.list);
                this.productList=res.data.result.list;
                // this.totalMoney=res.data.result.totalMoney;
                //console.log(this.totalMoney)
            })
        },
        changeMoney:function(product,way){
            if(way>0){ //执行的是+操作
                product.productQuantity++;
            }else{ //执行的是-操作
                product.productQuantity--;
                if(product.productQuantity<0){
                    product.productQuantity=0;
                   
                }
            }
            this.clctotalPrice();
        },
        selectedProduct:function(item){
            if(!item.checked){
                this.$set(item,"checked",true);//在item里面注册一个checked属性，值为true,全局注册
                // this.$set(item,"checked",true);//局部注册              
            }else{
                item.checked=!item.checked;
            }
            this.clctotalPrice();
        },
        checkAll:function(flag){ //全选
            this.checkAllFlag = flag;
            this.productList.forEach((item,index)=>{
                if(!item.checked){
                    //如果没雨checked属性就加一个，也就是当用户直接点全选时
                    this.$set(item,"checked",this.checkAllFlag);
                             
                }else{
                    item.checked=this.checkAllFlag;
                }
            });
          
            this.clctotalPrice();
        },
        clctotalPrice:function(){
            this.totalPrice=0;//每次先把总金额先清零
            this.productList.forEach((item,index)=>{
                if(item.checked){
                  this.totalPrice += item.productPrice*item.productQuantity
                             
                }
            });
        },
        delConfirm:function(index){
            this.isShow=true;
            this.curProduct=index;
        },
        delProduct:function(){     
            this.productList.splice( this.curProduct,1);
            this.isShow=false;
            this.clctotalPrice();//重新计算总金额
        }

    }
})