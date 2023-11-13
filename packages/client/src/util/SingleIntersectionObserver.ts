export class SingleIntersectionObserver {
  static observer: IntersectionObserver | null

  static domMap: WeakMap<Element, (enter: IntersectionObserverEntry) => void> = new WeakMap()

  static collectDom(el: Element, fn: (enter: IntersectionObserverEntry) => void) {
    SingleIntersectionObserver.domMap.set(el, fn)
  }

  static create(options: IntersectionObserverInit) {
    if (!SingleIntersectionObserver.observer) {
      SingleIntersectionObserver.observer = new IntersectionObserver((entries) => {
        const enter = entries.find(v => SingleIntersectionObserver.domMap.has(v.target))
        if (enter) {
          const fn = SingleIntersectionObserver.domMap.get(enter.target)
          if (fn)
            fn(enter)
        }
      }, options)
    }
    return SingleIntersectionObserver.observer
  }

  static delObserve(el: Element) {
    SingleIntersectionObserver.domMap.delete(el)
    SingleIntersectionObserver.observer?.unobserve(el)
  }

  static destroy() {
    SingleIntersectionObserver.observer?.disconnect()
    SingleIntersectionObserver.observer = null
  }
}
