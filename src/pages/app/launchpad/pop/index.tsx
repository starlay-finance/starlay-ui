import dayjs from 'dayjs'
import fs from 'fs'
import { GetStaticProps } from 'next'
import { LaunchPadPop } from 'src/components/screens/LaunchPadPop'
import { LaunchPadData } from 'src/components/screens/LaundPad'
import { Page } from 'src/types/page'

type LaunchPadPopPageStaticProps = {
  data: Omit<LaunchPadData, 'sale'> & {
    sale: Omit<LaunchPadData['sale'], 'start' | 'end'> & {
      start: string
      end: string
    }
  }
}

const sortSaleEndAsc = (a: LaunchPadData, b: LaunchPadData) =>
  a.sale.end.isAfter(b.sale.end) ? 1 : -1

export const getStaticProps: GetStaticProps<LaunchPadPopPageStaticProps> =
  async () => {
    try {
      const data: LaunchPadData[] = await Promise.all(
        fs
          .readdirSync('./public/data/launchpad')
          .map(async (file) => import(`public/data/launchpad/${file}`)),
      )
      const nearest = data
        .filter((e) => dayjs().isBefore(e.sale.end))
        .sort(sortSaleEndAsc)[0]
      if (!nearest) return { notFound: true, revalidate: 3600 }
      const props = { data: nearest }
      return {
        props: JSON.parse(JSON.stringify(props)),
        revalidate: 3600,
      }
    } catch (e) {
      return { notFound: true }
    }
  }

const LaunchPadPopPage: Page<LaunchPadPopPageStaticProps> = ({ data }) => (
  <LaunchPadPop
    data={{
      ...data,
      sale: {
        ...data.sale,
        start: dayjs(data.sale.start),
        end: dayjs(data.sale.end),
      },
    }}
  />
)

export default LaunchPadPopPage
