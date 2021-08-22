export function deepClone(obj){
    if(obj === null) return null 
    if(typeof obj !== 'object') return obj;
    if(obj.constructor===Date) return new Date(obj); 
    var newObj = new obj.constructor ();  //保持继承链
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
            var val = obj[key];
            newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
        }
    }  
    return newObj;  
    }

export function problem_change(obj1,obj2){
    obj1.problem_type=obj2.problem_type
    obj1.name=obj2.name
    obj1.instruction=obj2.instruction
    obj1.selection_list=obj2.selection_list
    obj1.radio=obj2.radio
    obj1.checkList=obj2.checkList
    obj1.answer=obj2.answer
    obj1.rating=obj2.rating
    obj1.must_write_select=obj2.must_write_select
}

export function problem_exchange(obj1,obj2){
    let item={}
    problem_change(item,obj2)
    problem_change(obj2,obj1)
    problem_change(obj1,item)

}