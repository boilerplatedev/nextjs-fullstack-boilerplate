import React, { Suspense } from 'react'

type IconName = 'spinner' | 'user'

export const manageIconMap = async (name: IconName) => {
  switch (name) {
    case 'spinner':
      return (await import('lucide-react')).Loader
    case 'user':
      return (await import('react-icons/fa')).FaUser
  }
}

export type IconProps = React.SVGAttributes<SVGElement> & {
  name: IconName
  className?: string
  size?: string | number // in em or px
  style?: React.CSSProperties
}

const createIconComponent = (name: IconName) =>
  React.lazy(async () => {
    const LoadedIcon = await manageIconMap(name)
    return {
      default: (props: Omit<IconProps, 'name'>) => {
        // lucide-react based icons
        if (typeof LoadedIcon === 'object') {
          return React.createElement(LoadedIcon, {
            className: props.className ?? '',
            style: {
              ...(props.size
                ? {
                    width: `${props.size}px`,
                    height: `${props.size}px`,
                  }
                : {}),
              ...(props.style ?? {}),
            },
            ...props,
          })
        }

        // react-icons
        return <LoadedIcon size={props.size ?? undefined} className={props.className} style={props.style} {...props} />
      },
    }
  })

const Icon: React.FC<IconProps> = (props) => {
  const LazyIcon = React.useMemo(() => createIconComponent(props.name), [props.name])

  return (
    <Suspense fallback={null}>
      <LazyIcon {...props} />
    </Suspense>
  )
}

export default Icon
