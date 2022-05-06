import dayjs from 'dayjs'
import { GetStaticPaths, GetStaticProps } from 'next'
import { LaunchPad, LaunchPadData } from 'src/components/screens/LaundPad'
import { Page, PageStaticProps } from 'src/types/page'

type LaunchPadPageStaticProps = {
  data: Omit<LaunchPadData, 'sale'> & {
    sale: Omit<LaunchPadData['sale'], 'start' | 'end'> & {
      start: string
      end: string
    }
  }
}

type LaunchPadPageContext = {
  token: string
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps<
  LaunchPadPageStaticProps,
  LaunchPadPageContext
> = async ({ params: { token } = {} }) => {
  if (typeof token !== 'string') return { notFound: true }
  try {
    const data: LaunchPadPageStaticProps['data'] = await import(
      `public/data/launchpad/${token}.json`
    )
    const props: PageStaticProps<LaunchPadPageStaticProps> = {
      data,
      seoProps: {
        siteTitle: `${data.token.symbol} Token Public Sale`,
        description: data.information.details,
        image: data.ogImage,
      },
    }
    return {
      props: JSON.parse(JSON.stringify(props)),
    }
  } catch (e) {
    return { notFound: true }
  }
}

const LaunchPadPage: Page<LaunchPadPageStaticProps> = ({ data }) => (
  <LaunchPad
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

export default LaunchPadPage
