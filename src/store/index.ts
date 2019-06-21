import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import * as CONST from './constants/index';
import { parseStoage, vueX2stoage, getCompById } from '@/common/utils';
import { WidgetComp, Page } from '@/interface';

Vue.use(Vuex);

interface state {
	componentList: WidgetComp[];
	activeComp: WidgetComp;
	activeCompId: string;
	pageData: Page[],
	activePageIndex: number;
}
/**
 * @param {WidgetComp[]} List
 * @param {string} id
 * @returns {WidgetComp} 页面刷新后手动关联ActiveComp与componentList 
 */
function getActiveComp(List: WidgetComp[], id: string): WidgetComp {
	let temp;
	try {
		temp = parseStoage('pageData')[parseStoage('activePageIndex')].componentList
	} catch {
		temp = []
	}
	List = List || temp
	let ret = List.find(comp => comp.id == id);
	if (ret === void 0) return ({} as WidgetComp);
	return ret;
}

const state: state = {
	componentList: parseStoage('componentList') || [],
	activeComp: getActiveComp(parseStoage('componentList'), parseStoage('activeCompId')) || {},
	activeCompId: parseStoage('activeCompId') || 0,
	pageData: parseStoage('pageData') || [
		{
			name: "主页",
			path: "/",
			componentList: []
		},
		{
			name: "test",
			path: "/test",
			componentList: []
		}
	],
	activePageIndex: parseStoage('activePageIndex') || 0
}

const mutations = {
	[CONST.PUSH_COMP](state: state, payload: WidgetComp) {
		if (state.activeComp.id && state.activeComp.parentId) {
			// 子组件激活时向父组件children中push
			const parent = getCompById(state.componentList, state.activeComp.parentId);
			if (parent && Reflect.has(parent, 'children')) {
				(parent as any).children.push(payload)
			} 
		} else if (state.activeComp.id && state.activeComp.children) {
			// 当激活组件为父组件时向children中push
			state.activeComp.children.push(payload);
		} else {
			state.componentList.push(payload);
		}
		vueX2stoage('componentList', state.componentList);
	},
	[CONST.DEL_COMP](state: state, id: string) {
		const currentPage = state.pageData[state.activePageIndex];
		const comp = getCompById(currentPage.componentList, id);
		// 深层组件删除
		if ((comp as WidgetComp).parentId) {
			const { parentId } = comp as WidgetComp,
				parent = getCompById(currentPage.componentList, (parentId as string)),
				list = (parent as WidgetComp).children,
				index = list.findIndex(comp => comp.id === id);
			list.splice(index, 1);
		} else {
			const index = currentPage.componentList.findIndex(comp => comp.id === id);
			currentPage.componentList.splice(index, 1);
		}
		vueX2stoage('pageData', state.pageData);
		// 清空激活组件
		vueX2stoage('activeComp', {});
		vueX2stoage('activeCompId', '');
	},
	[CONST.SET_ACTIVECOMP](state: state, comp: WidgetComp) {
		state.activeComp = Object.assign({}, comp);
		if (state.activeComp.id) {
			state.activeCompId = (comp.id as string);
		} else {
			state.activeCompId = ''
		}
		vueX2stoage('activeComp', comp);
		vueX2stoage('activeCompId', (comp.id as string));
	},
	/**
	 * @param {state} state
	 * @param {WidgetComp[]} [List]
	 * 缓存数据到本地 防止刷新数据丢失
	 */
	[CONST.STORAGE_COMPONENTLIST](state: state, List?: WidgetComp[]) {
		if (List) {
			state.componentList = List;
		};
		state.componentList.forEach((comp: WidgetComp) => {
			if (comp.parentId) {
				Reflect.deleteProperty(comp, 'parentId')
			}
		})
		vueX2stoage('componentList', state.componentList);
	},

	// 页面切换
	[CONST.SET_ACTIVEPAGEINDEX](state: state, index: number) {
		state.activePageIndex = index;
		// 切换页面时初始化激活组件, 否则在激活组件为容器时会导致错误添加
		state.activeComp = {} as WidgetComp;
		vueX2stoage('activePageIndex', {});
		vueX2stoage('activePageIndex', '' + index);
	},

	[CONST.ADD_PAGE](state: state, page: Page) {
		console.log(page);
		state.pageData.push(page);
		vueX2stoage('pageData', state.pageData);
	},

	[CONST.STORAGE_PAGE_DATA](state: state, List: WidgetComp[]) {
		const currentPage = state.pageData[state.activePageIndex];
		if (List) {
			currentPage.componentList = List;
		};
		currentPage.componentList.forEach((comp: WidgetComp) => {
			if (comp.parentId) {
				Reflect.deleteProperty(comp, 'parentId')
			}
		});
		vueX2stoage('pageData', state.pageData);
	},

	[CONST.DEL_PAGE](state: state, index: number) {
		if (index === state.activePageIndex) {
			state.activePageIndex = index - 1;
		}
		state.pageData.splice(index, 1);
		vueX2stoage('activePageIndex', ''+state.activePageIndex);
		vueX2stoage('pageData', state.pageData);
	},

	[CONST.PUSH_PAGE_COMP](state: state, comp: WidgetComp) {
		const componentList = state.pageData[state.activePageIndex].componentList;
		if (state.activeComp.id && state.activeComp.parentId) {
			const parent = getCompById(componentList, state.activeComp.parentId);
			if (parent && Reflect.has(parent, 'children')) {
				(<any>parent).children.push(comp)
			} else {
				console.warn('parent匹配失败『'+ JSON.stringify(parent)  +'』');
			}
		} else if (state.activeComp.id && state.activeComp.children) {
			state.activeComp.children.push(comp)
		} else {
			componentList.push(comp);
		}
		vueX2stoage('currentPage', state.pageData[state.activePageIndex]);
	}
}

const actions = {
}

const getters = {
	currentPage: (state: state) => state.pageData[state.activePageIndex]
}

const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	// plugins: debug ? [ createLogger() ] : []
});

