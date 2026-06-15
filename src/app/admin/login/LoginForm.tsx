'use client'

import { useActionState, useEffect, useRef } from 'react'
import { loginAction } from './actions'

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state?.error) {
      inputRef.current?.focus()
    }
  }, [state])

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="font-mono text-[#00ff66]/70 text-xs tracking-wider block"
        >
          &gt; Enter Admin Password:
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            id="password"
            name="password"
            type="password"
            autoFocus
            autoComplete="current-password"
            className="w-full bg-[#0a0a0a] border border-[#00ff66]/30 text-[#00ff66] font-mono text-sm px-3 py-2.5 focus:outline-none focus:border-[#00ff66] focus:shadow-[0_0_8px_rgba(0,255,102,0.2)] placeholder:text-[#00ff66]/20"
            placeholder="••••••••"
            disabled={pending}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[#00ff66]/30 text-xs">
            {pending ? '█' : '_'}
          </span>
        </div>
      </div>

      {state?.error && (
        <div className="font-mono text-[#ff0040] text-xs tracking-wider animate-blink">
          ! ACCESS DENIED — {state.error.toUpperCase()}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full font-mono font-bold uppercase tracking-wider text-xs px-5 py-3 border-2 border-[#00ff66] text-[#00ff66] bg-transparent hover:bg-[#00ff66]/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {pending ? 'AUTHENTICATING...' : '[ ENTER ]'}
      </button>
    </form>
  )
}
