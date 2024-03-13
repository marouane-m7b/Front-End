import Tickets from './components/Tickets'

function ModerateurHome() {
  return (
    <>
        <h1 className="p-relative">Dashboard</h1>
        <div className="wrapper-full d-grid gap-20">
            <Tickets />
        </div>
    </>
)
}

export default ModerateurHome