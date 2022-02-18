import { GetStaticProps } from 'next'
import { Sorry } from 'src/components/screens/Sorry'
import { Page, PageStaticProps } from 'src/types/page'

export const getStaticProps: GetStaticProps<PageStaticProps> = () => ({
  props: { seoProps: { noindex: true } },
})

const SorryPage: Page = ({ router: { query } }) => (
  <Sorry reason={query.reason} />
)

export default SorryPage
