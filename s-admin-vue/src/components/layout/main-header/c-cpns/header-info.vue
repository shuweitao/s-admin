<template>
  <div class="header-info">
    <!-- 1.操作小图标 -->
    <div class="operation">
      <!--      <span>
              <el-icon><Message /></el-icon>
            </span>-->
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound/></el-icon>
      </span>
      <span>
        <el-icon><Search/></el-icon>
      </span>
    </div>

    <!-- 2.个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
<!--          <el-avatar
            :size="30"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          />-->
          <div class="avatar">{{ loginStore.userInfo.username.split('')[0] }}</div>
          <span class="name">{{ loginStore.userInfo.username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon>
                <CircleClose/>
              </el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon>
                <InfoFilled/>
              </el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon>
                <Unlock/>
              </el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { localCache, sessionCache } from "@/utils/cache";
import useLoginstore from "@/store/login/login";
import useTagsViewStore from "@/store/layout/tags-view";

const router = useRouter();
const tagsViewStore = useTagsViewStore();

function handleExitClick() {
  localCache.clear();
  sessionCache.clear();
  tagsViewStore.clearCacheView()
  tagsViewStore.clearVisitedView()
  tagsViewStore.clearFixedVisitedView()
  router.push("/login");
}

const loginStore = useLoginstore();
</script>

<style lang="scss" scoped>
.header-info {
  display: flex;
  align-items: center;
}


.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: var(--el-color-primary);
  color: var(--el-color-white);
  font-size: 24px;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
