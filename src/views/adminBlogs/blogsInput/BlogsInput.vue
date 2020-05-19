<template>
  <div class="m-container m-padded-tb-big">
    <div class="ui container">
      <form id="blog-form" method="post" class="ui form">
        <div class="required field">
          <div class="ui left labeled input">
            <div class="ui selection compact teal basic dropdown label">
              <i class="dropdown icon"></i>
              <div class="text">{{data.flag || 'FLAG'}}</div>
              <div class="menu">
                <div class="item" @click="setFlag('原创')">原创</div>
                <div class="item" @click="setFlag('转载')">转载</div>
                <div class="item" @click="setFlag('翻译')">翻译</div>
              </div>
            </div>
            <input type="text" placeholder="标题" name="title" v-model="data.title" />
          </div>
        </div>

        <div class="required field">
          <div id="md-content" style="z-index: 1 !important;">
            <mavon-editor
              @imgAdd="$imgAdd"
              ref="md"
              style="z-index: 1 !important;"
              v-model="data.content"
            ></mavon-editor>
          </div>
        </div>
        <div class="two fields">
          <div class="required field">
            <div class="ui left labeled action input">
              <label class="ui compact teal basic label">分类</label>
              <div class="ui fluid selection dropdown">
                <i class="dropdown icon"></i>
                <div class="default text">{{getBlog.type.name || '分类'}}</div>
                <div class="menu">
                  <div
                    v-for="(item,index) in typeList"
                    :key="'type'+index"
                    class="item"
                    @click="setType(item.id)"
                  >{{item.name}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="ui left labeled action input">
              <label class="ui compact teal basic label">标签</label>
              <div class="ui fluid selection multiple search dropdown">
                <input type="hidden" id="tagIds" :value="data.tagIds" />
                <i class="dropdown icon"></i>
                <div class="default text">标签</div>
                <div class="menu">
                  <div
                    v-for="(item,index) in tagList"
                    :key="'tag'+index"
                    class="item"
                    :data-value="item.id"
                  >{{item.name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="required field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">首图</label>
            <input type="text" name="firstPicture" v-model="data.firstPicture" placeholder="首图引用地址" />
          </div>
        </div>

        <div class="required field">
          <textarea
            name="description"
            v-model="data.description"
            placeholder="博客描述..."
            maxlength="200"
          ></textarea>
        </div>

        <div class="inline fields">
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" :checked="data.recommend" class="hidden" />
              <label @click="dataSet('recommend')" for="recommend">推荐</label>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" :checked="data.shareStatement" class="hidden" />
              <label @click="dataSet('shareStatement')" for="shareStatement">转载声明</label>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" :checked="data.appreciation" class="hidden" />
              <label @click="dataSet('appreciation')" for="appreciation">赞赏</label>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" :checked="data.commentabled" class="hidden" />
              <label @click="dataSet('commentabled')" for="commentabled">评论</label>
            </div>
          </div>
        </div>

        <div class="ui error message"></div>

        <div class="ui right aligned container">
          <button type="button" class="ui button" onclick="window.history.go(-1)">返回</button>
          <button type="button" @click="clean" class="ui red button">清空</button>
          <button type="button" id="save-btn" class="ui secondary button">保存</button>
          <button type="button" id="publish-btn" class="ui teal button">发布</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogsInput",
  components: {},
  data() {
    return {
      data: {
        content: "", //内容
        id: "", //修改时的id
        flag: "", //原创/转载/翻译
        title: "", //博客标题
        published: "", //是否发布 false/true
        "type.id": "", //类型id
        tagIds: "", //标签组合 1,2,3,4
        firstPicture: "", //封面地址
        description: "", //描述
        recommend: false, //是否推荐
        shareStatement: false, //是否展示转载声明
        appreciation: false, //是否开启赞赏
        commentabled: false //是否允许评论
      },
      typeList: [],
      tagList: [],
      getBlog: {
        type: {}
      }
    };
  },
  deactivated() {},
  activated() {
    //获取分类列表
    $.get({
      url: "types",
      data: { size: 10000 },
      success: res => {
        this.typeList = res.content;
      }
    });
    //获取标签列表
    $.get({
      url: "tags",
      data: { size: 10000 },
      success: res => {
        this.tagList = res.content;
      }
    });
    //如果query id不存在则清空上次的id
    if (this.$route.query.bid) {
      this.getBlogById(this.$route.query.bid);
    } else {
      this.data.id = null;
    }
  },
  computed: {},
  mounted() {
    $(".ui.dropdown").dropdown({
      on: "hover"
    });
    $("#tagIds").change(() => {
      this.data.tagIds = $("#tagIds").val();
      console.log(this.data.tagIds);
    });
    //保存
    $("#save-btn").click(() => {
      this.data.published = false;
      this.postBlog();
    });
    //发布
    $("#publish-btn").click(() => {
      this.data.published = true;
      this.postBlog();
    });
  },
  methods: {
    //上传图片
    $imgAdd(pos, $file) {
      var formData = new FormData();
	  var uploadURL = "http://localhost:8888";
      formData.append("file", $file); // 固定格式
      $.ajax({
        url: uploadURL+"/upload/api",
        type: "POST",
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
        success: data => {
          var url = uploadURL + data;
          console.log(url);
          this.$refs.md.$img2Url(pos, url);
        },
        fail: function(data) {
          console.log(data);
        }
      });
    },
    //上传
    postBlog() {
      $.post({
        url: "blogs",
        data: this.data,
        success: res => {
          if (res === 0) {
            this.$router.push("/blogs/list");
          } else {
            console.log(res, "blogsInput");
          }
        }
      });
    },
    //获取要修改的blog
    getBlogById(id) {
      $.get({
        url: "blog",
        data: { id: id },
        success: res => {
          this.getBlog.type = res.type;
          this.data.content = res.content;
          this.data.id = res.id;
          this.data.flag = res.flag;
          this.data.title = res.title;
          this.data.published = res.published;
          this.data["type.id"] = res.type.id;
          this.data.tagIds = res.tagIds;
          this.data.firstPicture = res.firstPicture;
          this.data.description = res.description;
          this.data.appreciation = res.appreciation;
          this.data.recommend = res.recommend;
          this.data.shareStatement = res.shareStatement;
          this.data.commentabled = res.commentabled;
        }
      });
    },
    //清空
    clean() {
      this.data.content = ""; //内容
      this.data.id = ""; //修改时的id
      this.data.flag = ""; //原创/转载/翻译
      this.data.title = ""; //博客标题
      this.data.published = ""; //是否发布 false/true
      this.data["type.id"] = ""; //类型id
      this.data.tagIds = ""; //标签组合 1,2,3,4
      this.data.firstPicture = ""; //封面地址
      this.data.description = "";
    },
    //设置布尔值
    dataSet(key) {
      this.data[key] = !this.data[key];
    },
    //setFlag
    setFlag(flag) {
      this.data.flag = flag;
      console.log(this.data.flag);
    },
    //setType
    setType(id) {
      this.data["type.id"] = id;
      console.log(this.data["type.id"]);
    }
  }
};
</script>

<style>
.ui.form textarea:not([rows]) {
  height: inherit;
  max-height: inherit;
}
.v-note-wrapper .v-note-panel > div {
  max-height: 1000px;
}
.v-note-wrapper .v-note-panel {
  overflow: auto;
}
</style>