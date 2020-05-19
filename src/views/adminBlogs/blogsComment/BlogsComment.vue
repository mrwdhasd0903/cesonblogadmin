<template>
  <div class="ui container">
    <div class="ui bottom attached segment">
      <!--留言区域列表-->
      <div id="comment-container" class="ui teal segment">
        <div>
          <div class="ui threaded comments" style="max-width: 100%;">
            <h3 class="ui dividing header">评论</h3>
            <div class="comment" v-for="(item,index) in commentList" :key="'commentList'+index">
              <a class="avatar">
                <img :src="item.adminComment?data.avatar:item.avatar" />
              </a>
              <div class="content">
                <a class="author">
                  <span v-text="item.nickname"></span>
                  <div
                    class="ui mini basic teal left pointing label m-padded-mini"
                    v-if="item.adminComment"
                  >博主</div>
                </a>
                <div class="metadata">
                  <span class="date" v-text="ChangeDateFormat(item.createTime)"></span>
                </div>
                <div class="text" v-text="item.content"></div>
                <div class="actions">
                  <a
                    class="reply"
                    :data-commentid="item.id"
                    :data-commentnickname="item.nickname"
                    @click="reply(item.id,item.nickname)"
                  >回复</a>
                  <a @click="delReply(item.id)">删除</a>
                </div>
              </div>
              <div class="comments" v-if="item.replyComments.length>0">
                <div
                  class="comment"
                  v-for="(replyItem,index) in  uniqueArray(item.replyComments,'id')"
                  :key="'replyComments'+index"
                >
                  <a class="avatar">
                    <img :src="replyItem.adminComment?data.avatar:replyItem.avatar" />
                  </a>
                  <div class="content">
                    <a class="author">
                      <span v-text="replyItem.nickname"></span>
                      <div
                        class="ui mini basic teal left pointing label m-padded-mini"
                        v-if="replyItem.adminComment"
                      >博主</div>&nbsp;
                      <span v-text="'@'+ replyItem.parentComment.nickname" class="m-teal">@ 小白</span>
                    </a>
                    <div class="metadata">
                      <span class="date" v-text="ChangeDateFormat(replyItem.createTime)"></span>
                    </div>
                    <div class="text" v-text="replyItem.content"></div>
                    <div class="actions">
                      <a
                        class="reply"
                        :data-commentid="replyItem.id"
                        :data-commentnickname="replyItem.nickname"
                        @click="reply(replyItem.id,replyItem.nickname)"
                      >回复</a>
                      <a @click="delReply(replyItem.id)">删除</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="comment-form" class="ui form">
        <div class="field">
          <textarea name="content" v-model="data.content" placeholder="请输入评论信息..."></textarea>
        </div>
        <div class="fields">
          <div class="field m-mobile-wide m-margin-bottom-small">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="nickname" placeholder="昵称" v-model="data.nickname" />
            </div>
          </div>
          <div class="field m-mobile-wide m-margin-bottom-small">
            <div class="ui left icon input">
              <i class="mail icon"></i>
              <input type="text" name="email" placeholder="邮箱不会作为内容展示" v-model="data.email" />
            </div>
          </div>
          <div class="field m-margin-bottom-small m-mobile-wide">
            <button @click="delInput" class="ui teal basic button">
              <i class="eraser icon"></i>清空
            </button>
            <button @click="commentPost" type="button" class="ui teal button m-mobile-wide">
              <i class="edit icon"></i>发布
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChangeDateFormat from "utils/ChangeDateFormat";
import { getCookie } from "utils/cookie";
export default {
  name: "BlogsComment",
  components: {},
  data() {
    return {
      commentList: [],
      data: {
        "parentComment.id": -1,
        "blog.id": 0,
        nickname: "",
        email: "",
        content: "",
        avatar: ""
      }
    };
  },
  deactivated() {
    //清空
    this.commentList = [];
  },
  activated() {
    if (this.$route.query.bid) {
      this.setUser();
      this.data["blog.id"] = this.$route.query.bid;
      this.getCommentList(this.$route.query.bid);
    }
    //评论表单验证
    $(".ui.form").form({
      fields: {
        title: {
          identifier: "content",
          rules: [
            {
              type: "empty",
              prompt: "请输入评论内容"
            }
          ]
        },
        content: {
          identifier: "nickname",
          rules: [
            {
              type: "empty",
              prompt: "请输入你的大名"
            }
          ]
        },
        type: {
          identifier: "email",
          rules: [
            {
              type: "email",
              prompt: "请填写正确的邮箱地址"
            }
          ]
        }
      }
    });
  },
  computed: {},
  methods: {
    //发布
    commentPost() {
      var boo = $(".ui.form").form("validate form");
      if (boo) {
        $.post({
          url: "comment",
          data: this.data,
          success: res => {
            if (res === 0) {
              this.getCommentList(this.$route.query.bid);
              this.delInput();
            }
          }
        });
      } else {
        console.log("校验失败");
      }
    },
    //清空
    delInput() {
      $("[name='content']")
        .attr("placeholder", "请输入评论信息...")
        .focus();
      this.data["parentComment.id"] = -1;
      this.data.content = "";
    },
    //回复点击
    reply(id, nickname) {
      console.log(id, nickname);
      $("[name='content']")
        .attr("placeholder", "@" + nickname)
        .focus();
      this.data["parentComment.id"] = id;
      $(window).scrollTo($("#comment-form"), 500);
      console.log(this.data);
    },
    //日期序列化
    ChangeDateFormat(date) {
      return ChangeDateFormat(date);
    },
    //获取回复列表
    getCommentList(id) {
      $.get({
        url: "comments",
        data: { id: id },
        success: res => {
          this.commentList = res;
        }
      });
    },
    //json数组去重
    uniqueArray(array, key) {
      var result = [array[0]];
      for (var i = 1; i < array.length; i++) {
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
          if (item[key] == result[j][key]) {
            repeat = true;
            break;
          }
        }
        if (!repeat) {
          result.push(item);
        }
      }
      return result;
    },
    //删除回复
    delReply(id) {
      $.get({
        url: "dcomment",
        data: { id: id },
        success: res => {
          if (res === 0) {
            this.getCommentList(this.$route.query.bid);
          }
          console.log(res);
        }
      });
    },
    //赋值user
    setUser() {
      let user = JSON.parse(getCookie("user"));
      this.data.email = user.email;
      this.data.avatar = user.avatar;
      this.data.nickname = user.nickname;
    }
  }
};
</script>

<style scoped>
</style>