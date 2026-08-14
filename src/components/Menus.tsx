import { useState, useEffect } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url'

interface MenuData {
  name: string
  url: string
  thumbnail?: string
  id: string
}

export default function Menus() {
  const [menus, setMenus] = useState<MenuData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        // Set up PDF.js worker with local file
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

        const menuModules = import.meta.glob<string>('/_menus/*.md', {
          query: '?raw',
          import: 'default',
        })

        const processedMenus: MenuData[] = []

        for (const [path, module] of Object.entries(menuModules)) {
          try {
            const content = await module()

            // Parse frontmatter to get title and menuFile
            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
            if (!frontmatterMatch) continue

            const frontmatterText = frontmatterMatch[1]
            const data: Record<string, string> = {}

            frontmatterText.split('\n').forEach((line) => {
              const [key, ...valueParts] = line.split(':')
              if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '')
                data[key.trim()] = value
              }
            })

            if (!data.title || !data.menuFile) continue

            const pdfUrl = data.menuFile
            console.log(`Loading menu: ${data.title}, PDF URL: ${pdfUrl}`)
            const thumbnail = await generatePdfThumbnail(pdfUrl)

            processedMenus.push({
              name: data.title,
              url: pdfUrl,
              thumbnail,
              id: path,
            })
          } catch (error) {
            console.error(`Failed to load menu from ${path}:`, error)
          }
        }

        // Sort by filename
        processedMenus.sort((a, b) => a.name.localeCompare(b.name))

        setMenus(processedMenus)
        setLoading(false)
      } catch (error) {
        console.error('Failed to load menus:', error)
        setLoading(false)
      }
    }

    fetchMenus()
  }, [])

  const generatePdfThumbnail = async (pdfUrl: string): Promise<string | undefined> => {
    try {
      console.log(`Generating thumbnail for: ${pdfUrl}`)
      const pdf = await pdfjsLib.getDocument({ url: pdfUrl }).promise
      const page = await pdf.getPage(1)

      const scale = 1.5
      const viewport = page.getViewport({ scale })

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) return undefined

      canvas.width = viewport.width
      canvas.height = viewport.height

      await page.render({
        canvasContext: context,
        viewport: viewport,
        canvas: canvas,
      }).promise

      const dataUrl = canvas.toDataURL('image/png')
      console.log(`Thumbnail generated successfully for: ${pdfUrl}`)
      return dataUrl
    } catch (error) {
      console.error(`Failed to generate thumbnail for ${pdfUrl}:`, error)
      return undefined
    }
  }

  if (loading) {
    return (
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Menus</h2>
        <p className="text-gray-600 dark:text-gray-300">Loading menus...</p>
      </section>
    )
  }

  if (menus.length === 0) {
    return null
  }

  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Menus</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <MenuCard key={menu.id} menu={menu} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MenuCard({ menu }: { menu: MenuData }) {
  return (
    <a
      href={menu.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group cursor-pointer block"
    >
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
        {/* Thumbnail Preview */}
        <div className="relative w-full bg-gray-200 dark:bg-gray-600 overflow-hidden" style={{ aspectRatio: '8.5/11' }}>
          {menu.thumbnail ? (
            <img
              src={menu.thumbnail}
              alt={menu.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-red-500 to-red-700">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-white mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="text-white text-xs font-semibold">PDF</p>
              </div>
            </div>
          )}
        </div>

        {/* Menu Info */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
            {menu.name}
          </h3>
          <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium text-sm group-hover:bg-red-700">
            View PDF
          </button>
        </div>
      </div>
    </a>
  )
}
