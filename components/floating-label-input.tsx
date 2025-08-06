'use client'

import { Input, type InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { TypeIcon as type, type LucideIcon } from 'lucide-react'
import React, { useState } from 'react'

interface FloatingLabelInputProps extends InputProps {
  label: string
  icon?: LucideIcon
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, id, icon: Icon, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasValue = props.value || props.defaultValue

    const labelVariants = {
      inactive: {
        y: '50%',
        x: Icon ? '2.5rem' : '1rem',
        scale: 1,
        opacity: 0.7,
      },
      active: {
        y: '-100%',
        x: '0.75rem',
        scale: 0.85,
        opacity: 1,
        backgroundColor: 'hsl(var(--background))',
        paddingLeft: '0.25rem',
        paddingRight: '0.25rem',
      },
    }

    return (
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/50">
            <Icon size={20} />
          </div>
        )}
        <Input
          ref={ref}
          id={id}
          className={cn('h-14 pt-4 text-base', Icon ? 'pl-12' : '', className)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <motion.label
          htmlFor={id}
          className="absolute left-0 top-0 pointer-events-none origin-top-left text-charcoal font-medium"
          variants={labelVariants}
          initial="inactive"
          animate={isFocused || hasValue ? 'active' : 'inactive'}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {label}
        </motion.label>
      </div>
    )
  }
)

FloatingLabelInput.displayName = 'FloatingLabelInput'

export default FloatingLabelInput
