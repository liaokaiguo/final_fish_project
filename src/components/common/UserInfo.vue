<template>
	<!--个人信息中心-->
	<div class="userInfo">
		<el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                <img class="user_logo" src="../../assets/img/海天.jpg">
            </span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
				<el-dropdown-item command="loginOut">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	export default {
		name: "UserInfo",
		data (){
			return{
				userName: '中电36所', //默认登录用户名
			}
		},
      created() {
          this.getUserName();
      },
      methods: {
          getUserName() {
              let username = sessionStorage.getItem('ms_username');
              return this.userName = (username != null) ? username : this.userName;
          },
			/*用户中心/退出*/
          handleCommand(command) {
              if (command == 'loginOut') {
                  sessionStorage.removeItem('ms_username')
                  this.$router.push('/');
              } else if (command == 'userCenter') {
                  this.$message({
                      message: '尊敬的 ' + this.userName + ' ，您好！',
                      type: 'info',
                      duration: '3000',
                  });
              }
          },
      }
	}
</script>

<style scoped>
	.userInfo{
		position:absolute;
		right:2.8vw;
		width:5vh;
		margin-top: 3vh;
		height: 5vh;
		/*background-color: #a2cdff;*/
	}
	.el-dropdown-link {
		display: inline-block;
		width:5vh;
		height:5vh;
		cursor: pointer;
		color: #fbffa4;
	}
	.user_logo{
		position: absolute;
		left:0vw;
		width: 4.6vh;
		height: 4.6vh;
		top:0.6vh;
		border-radius: 10%;
	}
</style>
