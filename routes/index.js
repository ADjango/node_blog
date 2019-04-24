var express = require('express');
var router = express.Router();

var db = require('../config/db');

/* GET home page. */
router.get('/', function(req, res) {
    db.query('select * from blog', function(err, rows){
        if(err){
            res.render('index', { title: '首页', datas:[] });
        }else {
            res.render('index', { title: '首页', datas:rows });
        }
    })
  
});

router.get('/add', function(req, res) {
  res.render('add', { title: 'Express' });
});
router.post("/add",function(req,res,next){
    var title = req.body.title;
    var content = req.body.content;
    db.query("insert into blog(title,content) values('"+title+"','"+ content +"')",function(err,rows){
        if(err){
            res.send("新增失败"+err);
        }else {
            res.redirect("/");
        }
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    var sql = "select * from blog where id = " + id;
    console.log(sql);
    db.query(sql, function(err, rows){
        if(err){
            res.send('jump to page failed');
        }else {
            res.render('detail', { title: '详情页', datas:rows });
        }
    })
});

router.get('/toUpdate/:id', function(req, res) {
    var id = req.params.id;
    var sql = "select * from blog where id = " + id;
    console.log(sql);
    db.query(sql, function(err, rows){
        if(err){
            res.send('jump to page failed');
        }else {
            res.render('update', { title: '详情页', datas:rows });
        }
    })
});

router.post("/update/:id",function(req,res,next){
    var id = req.params.id;
    var title = req.body.title;
    var content = req.body.content;
    var sql = "update blog set title = '"+ title +"',content = '"+ content +"' where id = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("修改失败 " + err);
        }else {
            res.redirect("/");
        }
    });
});

/**
 * 查询
 */
router.post("/search",function(req,res,next){
    var title = req.body.s_title;
    var sql = "select * from blog";
    if(title){
        sql += " where title = '"+ title +"'";
    }
    //if(age){
    //    sql += " and age = '" + age + "'";
    //}

    sql.replace("and","where");
    db.query(sql,function(err,rows){
        if(err){
            res.send("查询失败: "+err);
        }else{
            res.render("search",{title:"搜索列表",datas:rows});
        }
    });
})

/**
 * 删除文章
 */
router.get("/del/:id",function(req,res){
    var id = req.params.id;
    db.query("delete from blog where id = " + id,function(err,rows){
        if(err){
            res.send("删除失败"+err);
        }else {
            res.redirect("/");
        }
    });
});

module.exports = router;
