import { Icon, IconType } from '@smartive-education/thierry-simon-mumble'

export const LoadingSpinner = () => {
  return (
    <div className="animate-spin text-violet-600 mt-4">
      <Icon type={IconType.mumble} size={56} />
    </div>
  )
}
