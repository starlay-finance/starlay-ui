import { useEffect } from 'react'
import { toLaunchpad } from 'src/utils/routes'

const LaunchpadIndexPage = () => {
  useEffect(() => {
    window.location.replace(toLaunchpad('lay', 'EVM')!)
  }, [])
  return <></>
}
export default LaunchpadIndexPage
