/** Keep the primary document visible in server HTML and when JavaScript fails. */
export function RouteTransition({children}:{children:React.ReactNode}) {
  return <main id="main">{children}</main>;
}
