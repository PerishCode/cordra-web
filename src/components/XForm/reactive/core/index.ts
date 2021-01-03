import {
  globalCallback,
  rawToReaction,
  reactionToRaw,
  __factory__,
  __iterate__,
  __reactive__,
} from './global'
import { FactoryFunction, Raw, ReactiveFunction } from './types'
import handlers, { combine, slientAssign, triggerGlobal } from './handlers'
import { isObject } from './utils'

/** package the raw data as a Proxy */
export function reactive(raw: Raw): any {
  if (!isObject(raw) || reactionToRaw.has(raw)) return raw
  if (rawToReaction.has(raw)) return rawToReaction.get(raw)

  const reaction = new Proxy(raw, handlers.get(raw.constructor) as any)

  rawToReaction.set(raw, reaction)
  reactionToRaw.set(reaction, raw)

  return reaction
}

export function wrapAsReactive(f: Function): ReactiveFunction {
  f[__reactive__] = true
  return f as ReactiveFunction
}

export function wrapAsFactory(f: Function): FactoryFunction {
  f[__factory__] = true
  return f as FactoryFunction
}

export function observeGlobal(f: Function) {
  globalCallback.add(f)
}

export function unobserveGlobal(f: Function) {
  globalCallback.delete(f)
}

/** combine two reaction without modify the source one */
export { combine, slientAssign, triggerGlobal }
