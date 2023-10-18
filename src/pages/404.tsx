import router from 'next/router'
import { APP, TOP } from 'src/utils/routes'

const Custom404 = () => {
  if (typeof window === 'undefined') return <></>
  if (router.asPath.includes(APP)) {
    router.replace(APP)
  } else {
    router.replace(TOP)
  }
  return <></>
}

export default Custom404
