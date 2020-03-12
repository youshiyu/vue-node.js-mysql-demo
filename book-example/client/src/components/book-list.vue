<template>
  <div>
    <h2>欢迎来到游诗雨的测试书屋</h2>
    <header>图书列表</header>
    <div class="container">
      <div class="operate-btn">
        <el-button @click="addBook">新增图书</el-button>
      </div>
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="name"
                         label="图书名称"
                         min-width="180px">
        </el-table-column>
        <el-table-column prop="isbn"
                         label="ISBN编号"
                         min-width="180px">
        </el-table-column>
        <el-table-column prop="author"
                         label="作者"
                         min-width="180px">
        </el-table-column>
        <el-table-column prop="print"
                         label="出版社"
                         min-width="180px">
        </el-table-column>
        <el-table-column prop="publish_time"
                         label="出版日期"
                         min-width="180px">
        </el-table-column>
        <el-table-column label="操作"
                         min-width="200px">
          <template slot-scope="scope"><!--elementUI table组件获取表格当前行的索引-->
            <el-button size="mini"
                       @click="handleDetail(scope.$index, scope.row)">查看
            </el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除
                       <!--scope.$index每一行的索引， scope.row每一行的数据-->
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <book-detail :bookId="bookId"
                 :visible="bookDetailVisible"
                 @closedDialog="closedDetailDialog">
    </book-detail>
    <book-add :visible="bookAddVisible"
              @closedDialog="closeAddDialog"
              @addNewBook="addNewBook">
    </book-add>

  </div>
</template>


<script>
  import BookDetail from './book-detail';
  import BookAdd from './book-add';
  export default {
    components: {
      BookDetail,
      BookAdd
    },
    mounted() {
      this.getBookList() //挂在列表
    },
    data() {
      return {
        tableData: [],
        bookId: null,
        bookDetailVisible: false, //默认查看细节属性不可见
        bookAddVisible: false  //默认添加图书属性不可见
      }
    },
    methods: {
      addNewBook(val) {
        this.bookId = val;
        this.bookDetailVisible = false;
      },
      addBook() {
        this.bookAddVisible = true //显示增加图书的那个界面
      },
      refreshBookList() {
        this.getBookList()
      },
      closeAddDialog () {//在book-add中使用的
        this.bookAddVisible = false;
        this.refreshBookList()
      },

      closedDetailDialog() { //book-detail中
        this.bookDetailVisible = false;
        this.refreshBookList()
      },

      handleDetail(index, row) {//这个函数具体就是控制添加detail属性de
        this.bookId = row.id;
        this.bookDetailVisible = true
      },
      handleDelete(index, row) {
        console.log(index);//这个是索引,从0开始的
        console.log(row.id);//打印的是id
        this.$http.get(`/delete/${row.id}`);   //通过id删除,本来都是前端通过promise来解决异步问题，但是，发现可以直接在后端使用async ,await解决异步
        this.refreshBookList();//上一个是异步函数，等待完成之后，直接刷新页面
          // .then(res => {
          //   console.log(res.data.list[index].name+"删除成功");
          //
          // })
          // .catch(err => {
          //   console.log('删除这本图书失败err=>', err);
          // })
      },

      getBookList() {
        this.$http
          .get('/list')
          .then(res => {
            console.log(res.data.list);
            this.tableData = res.data.list;
          })
          .catch(err => {
            console.log('图书列表导入失败err->', err)
          })
      }
    }
  }
</script>




<style scoped>
  h2{
    font-size: 36px;
    height: 80px;
    padding-top: 30px;
    padding-left: 25px;
    margin-bottom: 10px;
    text-align: center;

  }

  header{
    font-size: 36px;
    height: 60px;
    padding-top: 30px;
    padding-left: 25px;
    box-shadow: 0 15px 10px -15px #ccc;
    margin-bottom: 10px;
    text-align: center;

  }

  .container {
    text-align: center;
    box-shadow: 0px -15px 10px -15px #ccc;
    padding: 30px;
  }



  .operate-btn {
    text-align: right;
    margin-bottom: 10px;
  }



</style>
