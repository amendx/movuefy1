export default {
  state: {
    loading: false,
    error: null,
    sideNav: false
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setSideNav(state) {
      state.sideNav;
    }
  },
  actions: {
    clearError({ commit }) {
      commit("clearError");
    },
    setSideNav({ commit, getters }) {
      commit("setSideNav", !getters.sideNav);
    }
  },
  getters: {
    sideNav(state) {
      return state.sideNav;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    }
  }
};
