const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('../db/models');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());


//允许跨域访问方法1,此种方法允许任何路径访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//利用cors解决跨域方法2
app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:8080'],
    credentials: true
}));


//查询列表
app.get('/list', async (req, res) => {
    let list = await models.Todo.findAll();
    //console.log(user);
    res.json({
        list
    })
});

//通过id删除图书,这都是get方法，不常用，get方法是最简单的，所有跨域方法都支持get，实际当数据传入多的时候，常用post,
// 删除也可以用delete方法，在增加图书的的地方，用post方法(more general)
app.get('/delete/:id',async (req, res) => {
    const id= req.params.id;
    await models.Todo.destroy({
        where:{
            id:id
        }
    });
    console.log("删除成功");
    let list =  models.Todo.findAll();
    //console.log(user);
    res.json({
        list
    })
});

//通过id找到一本书的信息
app.get('/book/:id',async (req, res) => {
    const id=req.params.id;
    let list= await models.Todo.findOne({
        where:{
            id:id
        }
    });

    console.log("成功找到");
    res.json({
        list
    })
});

//通过这种方式传参数，如果参数比较多不方便，参数多采用post
/*app.get('/create',async(req,res)=>{
    let {name}=req.query;//解析get请求
    let user= await models.User.create({
        name
    });
    //console.log(user);
    res.json({
        message:'创建成功',
        user
    })
});*/

//通过post向数据库插入数据
app.post('/create', async (req, res, next) => {
    try {
        let {isbn, name, author, print, publish_time, intro, remark} = req.body;//解析post请求，需要中间件body-parser
        let todo= await models.Todo.create({
            isbn, name, author, print, publish_time, intro, remark
        });
        res.json({
            todo,
            message: "完成插入任务"
        })
    } catch (error) {
        next(error);
    }
});

//修改表中的一个对象,通过post方法,
app.post('/update', async (req, res, next) => {
    try {

        let {isbn, name, author, print, publish_time, intro, remark,id} = req.body;//解析post请求，需要中间件body-parser
        let todo= await models.Todo.findOne({
           where:{
               id
           }
        });
        if(todo){
            todo= await todo.update({
                isbn, name, author, print, publish_time, intro, remark
            })
        }
        res.json({
            todo,
            message: "完成修改任务"
        })
    } catch (error) {
        next(error);
    }
});

//更新也可以采用put方法,根据id更新数据库
app.put('/update/:id',async (req, res) => {
    const id = req.params.id;
    let list = await models.Todo.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
        );
    res.json({
        list
    })

});




//修改列表中的某一个对象的一个属性，这里以表中的remark为例子
//对象依靠id定位
app.post('/update_remark',async (req, res, next) =>{
    let {id,remark}=req.body;
    let todo=await models.Todo.findOne({
        where:{
            id
        }
    });
    if(todo&&(remark!=todo.remark)){
        todo=await todo.update({
            remark
        })
    }
    res.json({
        todo
    })


});




//异常处理
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({
            message: err.message
        })
    }
});
app.listen(3000, () => {
    console.log('server 启动成功')
});
