export const state = () => ({
  skeltonLoading: true,
});

export const mutations = {
  changeSkletonLoading(state, payload) {
    state.skeltonLoading = payload.skeltonLoading;
  },
};
