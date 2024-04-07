import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'

interface TableCellProps extends ComponentProps<'td'> {}

export function TableCell(props: TableCellProps) {
  return (
    <td
      {...props}
      className={
        // O twMerge une as classes passadas aqui com  as default junto com  as que são passadas como props
        twMerge('py-3 px-4 text-sm text-zinc-300', props.className)
      }
    />
  )
}
