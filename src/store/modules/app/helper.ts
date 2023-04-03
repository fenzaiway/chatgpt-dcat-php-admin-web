import { ss } from '@/utils/storage'

const LOCAL_NAME = 'appSetting'

export type Theme = 'light' | 'dark' | 'auto'

export type Language = 'zh-CN' | 'en-US'

export interface AppState {
  siderCollapsed: boolean
  theme: Theme
  language: Language
}

export function defaultSetting(): AppState {
  return { siderCollapsed: false, theme: 'light', language: 'zh-CN' }
}

export function getLocalSetting(): AppState {
  const localSetting: AppState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function getUrlParam(name:any) {
	if (typeof name !== 'string') {
		return null;
	}
	const $search = window.location.search;
	const $hash = window.location.hash;
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let r = null;
	if ($search !== '') {
		r = $search.substr(1).match(reg);
	}
	if ($hash !== '' && r === null) {
		if ($hash.indexOf('?') > 0) {
			r = $hash.split("?")[1].match(reg);
		}
		if ($hash.indexOf('?') < 0 && $hash.indexOf('&') > 0) {
			r = $hash.substr($hash.indexOf('&')).match(reg);;
		}
	}
	return r !== null ? unescape(r[2]) : null;
}

export function setLocalSetting(setting: AppState): void {
	let uid = getUrlParam('uid')
	if (uid !=null && uid != "") {
		ss.set("request_uid", uid)
	}
  ss.set(LOCAL_NAME, setting)
}
