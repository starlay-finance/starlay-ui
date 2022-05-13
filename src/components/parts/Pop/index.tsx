import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { LaunchPadPopContent } from './LaunchPadPop'
import { PopContainer } from './PopContainer'

const popData = {
  id: 'lay',
  projectName: 'Starlay Finance',
  token: {
    name: 'LAY Token',
    symbol: 'LAY',
  },
  sale: {
    start: dayjs('2022-05-13T12:00:00.000Z'),
    end: dayjs('2022-05-15T12:00:00.000Z'),
  },
}

export const LaunchPadPop = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => {
    setIsOpen(false)
  }
  useEffect(() => {
    setIsOpen(dayjs().isBefore(popData.sale.end))
  }, [])
  return (
    <PopContainer isOpen={isOpen} close={close}>
      <LaunchPadPopContent data={popData} />
    </PopContainer>
  )
}
