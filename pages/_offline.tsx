import { Header, HeaderType } from '@smartive-education/thierry-simon-mumble'

const OfflinePage = () => {
  return (
    <div>
      <Header type={HeaderType.h1} style={HeaderType.h1}>
        Offline
      </Header>
      <p>Sorry, you are offline.</p>
    </div>
  )
}
export default OfflinePage
