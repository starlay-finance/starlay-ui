declare module 'react-reel' {
  export type ReactReelProps = {
    text: string
    duration?: number
    delay?: number
  }
  const ReactReel: (props: ReactReelProps) => JSX.Element
  export default ReactReel
}
