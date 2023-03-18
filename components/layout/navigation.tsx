export const Navigation = () => {
  return (
    <header className="h-20 bg-violet-600">
      <div className="flex items-center justify-between h-full max-w-3xl mx-auto px-10 color text-white">
        <h1>Mumble</h1>
        <nav>
          <ul className="flex gap-6">
            <li>Profil</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navigation
