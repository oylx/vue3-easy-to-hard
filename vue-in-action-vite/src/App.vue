<template>
  <!-- ts˝ -->
  <!-- <Compts></Compts> -->
  <!-- 相对地址 -->
  <!-- <img src="./assets/logo.png" alt=""> -->
  <!-- 绝对路径 -->
  <!-- <img src="/src/assets/logo.png" alt=""> -->
  <!-- 消息提示框 -->
  <!-- <message v-if="showMsg" @close="showMsg = false">
    <template v-slot:title> 恭喜 </template>
    <template v-slot:default> 新增课程成功！ </template>
  </message>

  <course-add v-model:course="course" @add="addCourse"></course-add>

  <course-list :courses="courses"></course-list> -->

  <!-- 计算属性：课程总数 -->
  <!-- <p>课程总数：{{ courseCount }}</p> -->
  <!-- 路由出口 -->
  <p @click="$store.commit('inc')">{{ count }}</p>
  <p>{{ doubleCount }}</p>
  <p>{{ nCount(3)}}</p>
  <nav>
    <NavLink to="https://www.kaikeba.com/">kaikeba</NavLink>
    <NavLink to="/login">login</NavLink>
  </nav>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <transition name="fade">
        <component :is="Component"></component>
      </transition>
    </keep-alive>
  </router-view>
</template>

<script>
import { reactive, onMounted, ref, toRefs, computed, watch } from 'vue';
import NavLink from '/comps/NavLink.vue';
import { mapState } from 'vuex';

export default {
  components: { NavLink },
  data() {
    return {
      localCount: 0,
    }
  },
  // computed: {
  //   ...mapState(['count']),
  // },
  computed: mapState({
    // 箭头函数方式比较简洁
    count: state => state.count,
    // 传递字符串等效于上面用法
    countAlias: 'count',
    // 需要通过this访问组件内部状态时必须使用普通函数方式
    countPlusLocalState(state) {
      return state.count + this.localCount;
    },
    doubleCount() {
      return this.$store.getters.doubleCount;
    }
  }),
  methods: {
    // nCount适合用method映射
    nCount(n) {
      return this.$store.getters.nCount(n);
    },
  },
  setup() {
    const state = reactive({
      courses: JSON.parse(localStorage.getItem('courses')) || [],
      course: '',
      courseCount: computed(() => state.courses.length + '门'),
    });

    const showMsg = ref(false);

    function addCourse() {
      state.courses.push(state.course);
      state.course = '';

      showMsg.value = true;
    }

    onMounted(() => {
      setTimeout(() => {
        state.courses = ['web全栈架构师', 'web高级工程师'];
      }, 1000);

      watch(
        () => state.courses,
        () => localStorage.setItem('courses', JSON.stringify(state.courses)),
        { deep: true, }
      );
    });

    fetch('/api/users').then(resp => resp.json()).then(data => {
      console.log(data);
    });

    console.log(import.meta.env.VITE_TOKEN);

    return { ...toRefs(state), showMsg, addCourse, };
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
