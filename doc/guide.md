# 渔船作业方式识别系统前端部署相关说明

## 前端服务器地址
172.16.55.118:8088/fbomi

## 映射地址
36.26.4.82:9202/fbomi

## 项目文件位置
```shell script
cd ~/program/FBOMI-VUE
```

## 部署脚本具体解释

1. 在本地按照需求修改好代码，通过git提交到github
2. 通过vpn连接上服务器（118），进入项目文件的位置
    ```shell script
    cd ~/program/FBOMI-VUE
    ```
3. 通过**git pull**拉取最新的后端代码
4. 运行部署脚本
    ```shell script
    sh start.sh
   ```
   
   

   
