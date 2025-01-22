import React from 'react'

import * as AvatarPrimitive from '@radix-ui/react-avatar'

import cn from '@/utils/cn'
import color from '@/utils/color'

import Icon from './icon'
import Typography from './typography'

export interface AppAvatarProps {
  name?: string | null
  imgSrc?: string | null
  isAnonymous?: boolean
  className?: string
  size?: 'xxl' | 'xl' | 'lg' | 'base' | 'sm' | 'xs'
}

const mapSizeToPx = (size: AppAvatarProps['size']) => {
  switch (size) {
    case 'xl':
      return '24'
    case 'lg':
      return '20'
    case 'base':
      return '16'
    case 'sm':
      return '12'
    case 'xs':
      return '8'
    case 'xxl':
    default:
      return '32'
  }
}

const mapSizeToClassName = (size: AppAvatarProps['size']) => {
  switch (size) {
    case 'xl':
      return 'h-12 w-12'
    case 'lg':
      return 'h-10 w-10'
    case 'base':
      return 'h-8 w-8'
    case 'sm':
      return 'h-6 w-6'
    case 'xs':
      return 'h-4 w-4'
    case 'xxl':
    default:
      return 'h-16 w-16'
  }
}

const AppAvatar: React.FC<AppAvatarProps> = ({ className, name, isAnonymous, imgSrc, size = 'lg' }) => {
  const initial = React.useMemo(() => {
    if (!name) return null

    const initials = name
      .split(' ')
      .filter((n) => n)
      .map((n) => n.charAt(0))
      .join('')
    return initials
  }, [name])

  const colorForWord = React.useMemo(() => {
    return name ? color.fromText(name) : undefined
  }, [name])

  const calculatedIsAnonymous = React.useMemo(() => {
    return isAnonymous ?? (!name && !imgSrc)
  }, [isAnonymous, name, imgSrc])

  return (
    <AvatarPrimitive.Root
      className={cn('relative flex shrink-0 overflow-hidden rounded-full', mapSizeToClassName(size), className)}
    >
      {calculatedIsAnonymous ? (
        <span className="flex w-full items-center justify-center">
          <Icon name="user" size={mapSizeToPx(size)} />
        </span>
      ) : (
        <>
          {!!name && (
            <Typography className="font-medium">
              <AvatarPrimitive.Fallback
                delayMs={0}
                className={cn('flex w-full items-center justify-center text-white', {
                  'text-white': !colorForWord?.isLight,
                  'text-neutral-900': colorForWord?.isLight,
                })}
                style={
                  colorForWord?.color
                    ? {
                        background: colorForWord.color,
                      }
                    : undefined
                }
              >
                <span>
                  {(['xs', 'sm', 'base'] as AppAvatarProps['size'][]).includes(size) ? initial?.charAt(0) : initial}
                </span>
              </AvatarPrimitive.Fallback>
            </Typography>
          )}
          {imgSrc ? (
            <AvatarPrimitive.Image src={imgSrc} className={cn('aspect-square h-full w-full object-cover')} />
          ) : null}
        </>
      )}
    </AvatarPrimitive.Root>
  )
}

export default AppAvatar
