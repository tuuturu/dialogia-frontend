import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const axios = Axios.create({ baseURL: process.env.VUE_APP_BACKEND_URL })

export default new Vuex.Store({
	state: {
		popularSubjects: []
	},
	mutations: {
		popularSubjects(state, subjects) {
			state.popularSubjects = subjects
		}
	},
	actions: {
		async searchForSubject(context, { query }) {
			const { data } = axios.request({
				url: '/subjects',
				method: 'get',
				params: {
					query,
					limit: 5
				}
			})

			return data.subjects
		},
		async refreshPopularSubjects({ commit }) {
			const { data } = await axios.request({
				url: '/subjects',
				method: 'get',
				params: { limit: 10 }
			})

			commit('popularSubjects', data.subjects)
		}
	},
	modules: {}
})
