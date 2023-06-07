import { App } from 'vue'
import { registerElementIcon } from './register-element-icon'

export function globalRegister(app: App) {
  registerElementIcon(app)
}
