export const LoadingUserShimmer = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-2 animate-pulse">
        <div className="h-7 w-1/3 bg-violet-300"></div>
        <div className="h-5 w-1/2 bg-violet-300"></div>
      </div>
    </div>
  )
}
