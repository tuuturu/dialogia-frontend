import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Discuss from '@/views/Discuss'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/discuss',
		name: 'Discuss',
		component: Discuss
	}
]

const router = new VueRouter({
	routes
})

export default router
