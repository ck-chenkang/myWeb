# 怎么理解JS Promise

原文：[怎么理解promise](https://blog.csdn.net/qq_37860963/article/details/81539118?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163852369316780271530293%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=163852369316780271530293&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-2-81539118.pc_search_result_cache&utm_term=js+promise&spm=1018.2226.3001.4187)

### 一、何为Promise

在MDN web docs 里面是这么解释 **Promise**的：

```
Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象
```

 看完这段话我的内心一阵无语，我就只能怪我自己的理解能力好像没有达到水准一样，并不完全懂这段话在说什么，这让我一度怀疑我这智商是不是不够用了，

怎么就没理解这段话说的是什么意思。很好，由于我们的大脑是一个无穷大的海绵，它可以无限的吸收知识，然后通过我们的意念控制我们的大脑去理解并消化了

这些知识，然后得到下面的结果。

只要我们的英语水平是初中生的水平，就可以知道 promise 这个英语单词的意思是 “承诺”。是的Promise就是“承诺” 的意思。

简单的说 Promise 就是： 小花马上就要过她生日了，然后她的好闺蜜小丽承诺说在她生日的时候会送给她一件漂亮的衣服给她。

好了小花获得了小丽给她的承诺。但是，天知道这承诺会不会实现的，未知的因素很多，不能绝对的认为这 小丽给小花的Promise就一定能够实现。

所以Promise 有了三种可能的状态：

1.pending（待定的）：小花不知道小丽能补能给她漂亮衣服，她只能等待她生日的时候的到来

2.fulfilled（已解决/以实现）：到了生日那天小丽真的给小花一件漂亮的衣服，小丽实现了她的承诺

3.rejected（已拒绝/没有实现）：小丽忘了小花的生日，所以没有送漂亮衣服给小花

然后我们来了解一下Promise的特点：

1.promise是一个异步操作， 上面不是给了promise的三种状态吗，只有异步操作的结果才可以决定当前promise的状态，因为promise 的意思为“承诺”，是比较

严肃正经的，所以任何操作都不能改变当前promise的状态。

2.第1点已经提到任何操作均不能改变当前promise的状态，所以promise的状态不能从‘未来’回到‘现在’，‘未来’也不能回到‘现在’，即不能从 fulfilled 或rejected 回

到 pending ，fulfilled 和rejected之间不能相互转换。只有两种情况的转换：

1）从pending转换成fulfilled

2）从pending转换成rejected

可以这样理解：小丽给小花的承诺在小花生日之前是小花是不知道小丽能不能送他衣服，这时候是现在时的 pending ，然后未来到了小花生日那天，只有两种可

能：要么小丽确实送给小花衣服了，也就是实现了承诺，小丽给小花的Promise 的状态就从 pending变成了fulfilled ；要么小丽把小花的生日给忘了，没有给小花

送衣服，没有实现到承诺，小丽给小花的Promise状态就从pending变成了rejected。这状态不能从fulfilled或rejected变成pending的，毕竟时间不能倒回去啊，

而fulfilled和rejected之间也不能转换，因为已经发生的状态是既定的了，承诺实现了就是实现了，没实现就是没实现，不能从实现又变成没实现的。

我们来看看阮一峰大大是怎么总结的：

```
（1）对象的状态不受外界影响，promise对象代表一个异步操作，有三种状态，pending（进行中）、fulfilled（已成功）、rejected（已失败）。只有异步操作的结果，可

以决定当前是哪一种状态，任何其他操作都无法改变这个状态，这也是promise这个名字的由来“承若”；

（2）一旦状态改变就不会再变，任何时候都可以得到这个结果，promise对象的状态改变，只有两种可能：从pending变为fulfilled，从pending变为rejected。这时就称

为resolved（已定型）。如果改变已经发生了，你再对promise对象添加回调函数，也会立即得到这个结果，这与事件（event）完全不同，事件的特点是：如果你错过了它，再

去监听是得不到结果的。
```

 二、Promise的语法

```
语法的话当然是MDN web docs 里写的才比较官方：

new Promise( function(resolve, reject) {...} /* executor */  );
```

我们继续用上面的例子来解释这**Promise**对象里面的 **resolve** 和 **reject** 是什么。

首先我们得把上面那个例子用代码来实现：

```
var isLiForget = false; //给一个布尔值判断小丽有没有忘记小花的生日
var getCloth = new Promise(function(resolve,reject){
    if(!isLiForget){ //没忘记
        var cloth = {
            color:'red',
            price:'$120'
        };
        resolve(cloth); // 得到衣服
    }else{
        var err = new Error("forgot the promise"); //忘记了
        reject(err);
    }
});
 
//之后就是调用Promise了
var testFn = function(){
    getCloth.then(function(fulfilled){
        console.log(fulfilled);
    }).catch(function(rejected){
        console.log(rejected.message);
    });
}
testFn();
```

1.给一个布尔值 isLiForget 来判断小丽是否忘记承诺

2.创建一个承诺Promise对象名为 getCloth ，var getCloth = new Promise(function(resolve，reject){ // }); 这里的resolve ，和reject参数是函数，当承诺实现了

的时候，就会调用resolve函数，然后对应的promise的状态就变成fulfilled；当承诺没有实现的时候，就会调用reject函数，其状态变成了rejected。 是否还记得

创建promise的语法：

```
new Promise( function(resolve, reject) {...} /* executor */  );
```

这里的executor 是一个函数。就是new Promise 括号括着的函数叫做executor，resolve和reject函数是作为executor 的参数被传进去的，当然这两个参数是可选

填的。resolve或reject函数如果被调用了就会把函数里的结果作为参数传递出去；resolve是把函数里的结果传递出去，而reject就说明是承诺没实现，这相当于是

出错误了，所以它会把报错的信息作为参数传递出去。

3.当我们把 promise 一切部署好后，我们就得用到这个 promise 了。我们定义一个 testFn 函数来调用 promise 。当小花她知道小丽给她送衣服的承诺后，她心

中就会安排这： “我得到衣服后我要买一双新鞋子搭配这衣服”，或者如果小丽没有送衣服给小花，小花就会生气，所以如果有了promise，我们就会用到 .then()

和.catch() 函数来实现我们有了这个promise后所采取的措施。

.then()有两个参数：onFulfilled 和 onRejected ，这两个参数看英文也知道是什么意思，这两个参数也是函数，onFulfilled当然是Promise 实现的时候调用，

onRejected就是Promise被拒绝的时候调用的。我们来看看MDN怎么说：

```
onFulfilled

当Promise变成接受状态（fulfillment）时，该参数作为回调函数被调用（参考： Function）。该函数有一个参数，即接受的最终结果（the fulfillment  value）。

如果传入的 onFulfilled 参数类型不是函数，则会在内部被替换为(x) => x ，即原样返回 promise 最终结果的函数

onRejected

当Promise变成拒绝状态（rejection ）时，该参数作为回调函数被调用（参考： Function）。该函数有一个参数,，即拒绝的原因（the rejection reason）。
```

***\*.then()\**** 有两种写法任君选择

```
p.then(onFulfilled, onRejected);
 
p.then(function(value) {
   // fulfillment
  }, function(reason) {
  // rejection
});
```

而.catch() 是当promise没有实现的时候，状态为rejected时被使用。这就好像ajax里面当ajax请求成功就会调用success函数，请求失败则调用error函数。同样

的.catch()也有两种写法，只是.catch()只有一个参数而已。

.then() 里面的函数有一个fulfilled的参数，这个参数的值就是promise实现后调用resolve()所返回的值，在这里就是 cloth ；同理.catch() 里面的一个rejected参数

的值就是promise没有实现而调用reject()所返回的错误信息值在这个例子就是 err 。

当 isLiForget = false; 时:

![img](Imag/20180810103155132)

当***\*isLiForget = true;\**** 时：

![img](Imag/20180810103304467)

 三、Promise最主要的特色——链式调用

为什么使用Promise可以链式调用呢？ 事实上，Promise的.then()方法其返回值是一个新的promise对象，相同类型的对象是可以链式调用的。

我们继续那小花的例子来说。如果小花得到了衣服她就有了第二个想法，即可以理解为另外一个承诺Promise：“我要买双新鞋子搭配我的衣服”。我们来实现一下：

```
//声明一个买鞋的函数，里面返回promise
var buyShoes = function(cloth){
    var shoes = {
        color:"white",
        brand:"nike"
    }
    var msg = {
        message:"I bougth a pair of "+shoes.color+" "+shoes.brand+"shoes to match my "+cloth.color+" cloth.",
	shoes:shoes,
	cloth:cloth
	}
    return Promise.resolve(msg);
}
var testFn = function(){
    getCloth
      .then(buyShoes)
      .then(function(fulfilled){
        console.log(fulfilled);
    }).catch(function(rejected){
        console.log(rejected.message);
    });
}
testFn();
```

显然这里的***\*.then()\****方法值写了**onFulfilled**的参数，省略了**onRejected**参数***\*。getCloth.then().then()\**** 就是一个链式调用。运行的结果：

![img](Imag/20180810114113343)

这是 isLiForget = false 时的结果， 这个值为true 那输出仍然是之前那个。

 四、Promise与异步

Promise是异步的。js异步操作是通过js的事件循环机制EventLoop实现的。这里引用以下文章所写的内容，这篇文章很详细的写了异步是什么  https://blog.csdn.net/li123128/article/details/80650256

```
当JS解析执行时，会被引擎分为两类任务，同步任务（synchronous） 和 异步任务（asynchronous）。

对于同步任务来说，会被推到执行栈按顺序去执行这些任务。
对于异步任务来说，当其可以被执行时，会被放到一个 任务队列（task queue） 里等待JS引擎去执行。

当执行栈中的所有同步任务完成后，JS引擎才会去任务队列里查看是否有任务存在，并将任务放到执行栈中去执行，执行完了又会去任务队列里查看是否有已经可以执行的任务。这种循环检查的机制，就叫做事件循环(Event Loop)。

对于任务队列，其实是有更细的分类。其被分为 微任务（microtask）队列 & 宏任务（macrotask）队列
```

```
宏任务: setTimeout、setInterval等，会被放在宏任务（macrotask）队列。

微任务: Promise的then、Mutation Observer等，会被放在微任务（microtask）队列。

Event Loop的执行顺序是：

1. 首先执行执行栈里的任务。
2. 执行栈清空后，检查微任务（microtask）队列，将可执行的微任务全部执行。
3. 取宏任务（macrotask）队列中的第一项执行。
4. 回到第二步。 
注意： 微任务队列每次全执行，宏任务队列每次只取一项执行。
```

总结起来js引擎对程序的执行顺序是：1。先执行同步任务的程序 2。 在执行异步任务里的微任务 3。所有微任务都执行完了后就执行异步的宏任务，但这里是一个一个宏任务去执行，不是一下子执行完。

```javascript
var testFn = function(){
    console.log("promise before"); //同步任务
    //异步宏任务
    setTimeout(function(){
        console.log("异步宏任务");
    },300);
    //异步微任务
    getCloth.then(function(fulfilled){
        console.log(fulfilled);
    }).catch(function(rejected){
        console.log(rejected.message);
    });
    console.log("promise after");//同步任务
}
testFn();
```

![img](Imag/20180810142819228)

上图结果证明了上述所说的js的执行顺序 。