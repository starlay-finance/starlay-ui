import { NextRouter } from 'next/router'
import { SEOProps } from 'src/components/parts/SEO'
import { NextPageWithLayout } from 'src/pages/_app'

export type Page<T = {}> = NextPageWithLayout<T & { router: NextRouter }>

export type PageStaticProps<T = {}> = T & {
  seoProps?: SEOProps
}
export type FromQuery<T> = T | string | string[] | undefined

export type SorryReason = 'mobile-not-supported'
