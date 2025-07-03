import Header from "@/presentation/layout/header"
import Footer from "@/presentation/layout/footer"

function MapsPage() {
  return (
    <div id="maps-page" className="min-h-screen bg-black">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Valorant Maps</h1>
          <p className="text-gray-400 text-lg">Learn every map layout and strategic positions</p>
        </div>

        <div className="text-center py-20">
          <h2 className="text-2xl text-gray-400 mb-4">Coming Soon</h2>
          <p className="text-gray-500">Interactive map guides and callouts</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MapsPage
