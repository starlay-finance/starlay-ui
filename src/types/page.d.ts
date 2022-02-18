import { NextPage } from 'next'
import { NextRouter } from 'next/router'
import { SEOProps } from 'src/components/parts/SEO'

export type Page<T = {}> = NextPage<T & { router: NextRouter }>

export type PageStaticProps<T = {}> = T & {
  loading?: boolean
  seoProps?: SEOProps
}
export type FromQuery<T> = T | string | string[] | undefined

export type SorryReason = 'mobile-not-supported'
