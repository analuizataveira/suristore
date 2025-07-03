import Link from "next/link"

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold text-gradient">VALORANT STORE</span>
            </div>
            <p className="text-gray-400 max-w-md">
              The ultimate destination for premium Valorant skins. Enhance your gameplay with the most exclusive and
              stylish weapon skins.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/skins" className="text-gray-400 hover:text-red-400 transition-colors">
                  Skins
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-gray-400 hover:text-red-400 transition-colors">
                  Agents
                </Link>
              </li>
              <li>
                <Link href="/maps" className="text-gray-400 hover:text-red-400 transition-colors">
                  Maps
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-red-400 transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 Valorant Store. All rights reserved. Not affiliated with Riot Games.</p>
        </div>
      </div>
    </footer>
  )
}
