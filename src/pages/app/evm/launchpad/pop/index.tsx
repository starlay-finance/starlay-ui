import dayjs from 'dayjs'
import fs from 'fs'
import { GetStaticProps } from 'next'
import { ProjectData } from 'src/components/screens/Launchpad'
import { LaunchpadPop } from 'src/components/screens/LaunchpadPop'
import { Page } from 'src/types/page'

type LaunchpadPopPageStaticProps = {
  data: Omit<ProjectData, 'sale'> & {
    sale: Omit<ProjectData['sale'], 'start' | 'end'> & {
      start: string
      end: string
    }
  }
}

const sortSaleEndAsc = (a: ProjectData, b: ProjectData) =>
  a.sale.end.isAfter(b.sale.end) ? 1 : -1

export const getStaticProps: GetStaticProps<LaunchpadPopPageStaticProps> =
  async () => {
    try {
      const data: ProjectData[] = await Promise.all(
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

const LaunchpadPopPage: Page<LaunchpadPopPageStaticProps> = ({ data }) => (
  <LaunchpadPop
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

export default LaunchpadPopPage
