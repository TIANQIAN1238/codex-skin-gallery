import type { ComponentProps } from 'react'
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'
import { useLocale } from '../lib/i18n'

export function LocalizedLink({ to, ...props }: ComponentProps<typeof RouterLink>) {
  const { localePath } = useLocale()
  return <RouterLink to={typeof to === 'string' ? localePath(to) : to} {...props} />
}

export function LocalizedNavLink({ to, ...props }: ComponentProps<typeof RouterNavLink>) {
  const { localePath } = useLocale()
  return <RouterNavLink to={typeof to === 'string' ? localePath(to) : to} {...props} />
}
