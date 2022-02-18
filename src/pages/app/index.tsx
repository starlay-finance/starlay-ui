import { GetStaticProps } from 'next'
import { Dashboard } from 'src/components/screens/Dashboard'
import { PageStaticProps } from 'src/types/page'

export const getStaticProps: GetStaticProps<PageStaticProps> = () => ({
  props: { loading: true },
})

const AppPage = () => <Dashboard />

export default AppPage
