interface SvgrComponent extends React.FC<React.SVGProps<SVGElement>> {}

declare module '*.svg' {
  const svg: SvgrComponent
  export default svg
}
