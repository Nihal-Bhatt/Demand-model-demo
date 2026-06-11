declare module 'react-simple-maps' {
  import type { ReactNode, SVGProps } from 'react'

  export interface GeographyProps {
    geography: unknown
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: {
      default?: Record<string, unknown>
      hover?: Record<string, unknown>
      pressed?: Record<string, unknown>
    }
    onClick?: () => void
    onMouseEnter?: () => void
    onMouseLeave?: () => void
  }

  export interface GeographiesProps {
    geography: string | object
    children: (data: { geographies: Array<{ rsmKey: string; properties: Record<string, string> }> }) => ReactNode
  }

  export interface MarkerProps {
    coordinates: [number, number]
    children?: ReactNode
    onClick?: () => void
    onMouseEnter?: () => void
    onMouseLeave?: () => void
  }

  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: { scale?: number; center?: [number, number] }
    width?: number
    height?: number
    className?: string
    children?: ReactNode
  }

  export interface ZoomableGroupProps {
    center?: [number, number]
    zoom?: number
    minZoom?: number
    maxZoom?: number
    children?: ReactNode
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element
  export function Geographies(props: GeographiesProps): JSX.Element
  export function Geography(props: GeographyProps): JSX.Element
  export function Marker(props: MarkerProps): JSX.Element
  export function ZoomableGroup(props: ZoomableGroupProps): JSX.Element
}
