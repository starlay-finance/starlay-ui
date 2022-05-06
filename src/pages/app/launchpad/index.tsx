import { useEffect } from 'react'
import { toLaunchPad } from 'src/utils/routes'

const LaunchPadIndexPage = () => {
  useEffect(() => {
    window.location.replace(toLaunchPad('lay'))
  }, [])
  return <></>
}
export default LaunchPadIndexPage
