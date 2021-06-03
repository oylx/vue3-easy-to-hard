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
  <p @click="inc">{{ count }}</p>
  <p @click="incBy(2)">{{ doubleCount }}</p>
  <p @click="incBy1({ num: 3 })">{{ nCount(3)}}</p>
  <button @click="handleClick">click</button>
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
import { mapState, mapGetters, mapMutations } from 'vuex';
import { store } from './store'

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
  computed: {
    // 对象方式
    ...mapState({
      // 箭头函数方式比较简洁
      count: state => state.count,
      // 传递字符串等效于上面用法
      countAlias: 'count',
      // 需要通过this访问组件内部状态时必须使用普通函数方式
      countPlusLocalState(state) {
        return state.count + this.localCount;
      },
    }),
    // 数组方式
    ...mapGetters(['doubleCount'])
  },
  methods: {
    // nCount适合用method映射
    nCount(n) {
      return this.$store.getters.nCount(n);
    },
    ...mapMutations(['inc', 'incBy', 'incBy1']),
    handleClick() {
      store.dispatch('inc')
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
