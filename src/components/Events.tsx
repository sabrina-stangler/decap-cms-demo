import { useState, useEffect } from 'react'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

interface ProcessedEvent {
  title: string
  displayDate: string
  date: Date
  dateObj?: {
    month: string
    day: number
    year: number
    dayOfWeek: string
    isRecurring: boolean
    frequency?: string
  }
  flyer?: string
  body: string
  isPast: boolean
  isRecurring: boolean
  id: string
}

export default function Events() {
  const [oneTimeEvents, setOneTimeEvents] = useState<ProcessedEvent[]>([])
  const [recurringEvents, setRecurringEvents] = useState<ProcessedEvent[]>([])
  const [pastEvents, setPastEvents] = useState<ProcessedEvent[]>([])
  const [showPastEvents, setShowPastEvents] = useState(false)
  const [loading, setLoading] = useState(true)

  const parseMarkdown = (
    content: string,
    path: string,
    isRecurring: boolean,
  ): ProcessedEvent => {
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)

    const body = bodyMatch ? bodyMatch[1].trim() : ''
    const frontmatterText = frontmatterMatch ? frontmatterMatch[1] : ''

    const data: Record<string, string> = {}
    frontmatterText.split('\n').forEach((line) => {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        const value = valueParts
          .join(':')
          .trim()
          .replace(/^['"]|['"]$/g, '')
        data[key.trim()] = value
      }
    })

    const dateStr = data.date || new Date().toISOString()
    const date = new Date(dateStr)
    const now = new Date()
    const isPast = date < now

    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
    const month = date.toLocaleDateString('en-US', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()

    let displayDate: string
    if (isRecurring) {
      displayDate = `${dayOfWeek}s${data.recurringFrequency ? ` (${data.recurringFrequency})` : ''}`
    } else {
      displayDate = `${month} ${day}, ${year}`
    }

    return {
      title: data.title || 'Untitled Event',
      displayDate,
      date,
      dateObj: {
        month,
        day,
        year,
        dayOfWeek,
        isRecurring,
        frequency: data.recurringFrequency,
      },
      flyer: data.flyer,
      body,
      isPast,
      isRecurring,
      id: path,
    }
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch one-time events
        const onetimeModules = import.meta.glob<string>(
          '/_events/onetime/*.md',
          {
            query: '?raw',
            import: 'default',
          },
        )

        // Fetch recurring events
        const recurringModules = import.meta.glob<string>(
          '/_events/recurring/*.md',
          {
            query: '?raw',
            import: 'default',
          },
        )

        const processedOneTime: ProcessedEvent[] = []
        const processedRecurring: ProcessedEvent[] = []
        const processedPast: ProcessedEvent[] = []

        // Process one-time events
        for (const [path, module] of Object.entries(onetimeModules)) {
          try {
            const content = await module()
            const event = parseMarkdown(content, path, false)
            if (event.isPast) {
              processedPast.push(event)
            } else {
              processedOneTime.push(event)
            }
          } catch (err) {
            console.error(`Error loading one-time event ${path}:`, err)
          }
        }

        // Process recurring events
        for (const [path, module] of Object.entries(recurringModules)) {
          try {
            const content = await module()
            const event = parseMarkdown(content, path, true)
            if (event.isPast) {
              processedPast.push(event)
            } else {
              processedRecurring.push(event)
            }
          } catch (err) {
            console.error(`Error loading recurring event ${path}:`, err)
          }
        }

        // Sort events by date
        processedOneTime.sort((a, b) => a.date.getTime() - b.date.getTime())
        processedRecurring.sort((a, b) => a.date.getTime() - b.date.getTime())
        processedPast.sort((a, b) => b.date.getTime() - a.date.getTime())

        setOneTimeEvents(processedOneTime)
        setRecurringEvents(processedRecurring)
        setPastEvents(processedPast)
        setLoading(false)
      } catch (error) {
        console.error('Failed to load events:', error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <section className='py-12 px-4'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
          Events
        </h2>
        <p className='text-gray-600 dark:text-gray-300'>Loading events...</p>
      </section>
    )
  }

  const hasEvents =
    oneTimeEvents.length > 0 ||
    recurringEvents.length > 0 ||
    pastEvents.length > 0

  return (
    <section className='py-12 px-4 bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
          Events
        </h2>

        {!hasEvents ? (
          <p className='text-gray-600 dark:text-gray-300'>
            No events scheduled yet.
          </p>
        ) : (
          <div className='space-y-8'>
            {/* Recurring Events */}
            {recurringEvents.length > 0 && (
              <div>
                <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4'>
                  Recurring Events
                </h3>
                <div className='space-y-4'>
                  {recurringEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {/* One-Time Events */}
            {oneTimeEvents.length > 0 && (
              <div>
                <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4'>
                  Upcoming Events
                </h3>
                <div className='space-y-4'>
                  {oneTimeEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <div>
                <button
                  onClick={() => setShowPastEvents(!showPastEvents)}
                  className='flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
                >
                  Past Events
                  {showPastEvents ? (
                    <MdExpandLess size={24} />
                  ) : (
                    <MdExpandMore size={24} />
                  )}
                </button>

                {showPastEvents && (
                  <div className='mt-4 space-y-4'>
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} isPast />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function EventCard({
  event,
  isPast = false,
}: {
  event: ProcessedEvent
  isPast?: boolean
}) {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-md transition-opacity ${
        isPast ? 'opacity-75' : ''
      }`}
    >
      <div className='bg-linear-to-r from-blue-500 to-purple-600 p-6 text-white'>
        <h4 className='text-2xl font-bold mb-2'>{event.title}</h4>
        <p className='text-lg font-semibold'>
          📅 {event.displayDate}
          {isPast && <span className='ml-2 text-sm'>(Past Event)</span>}
        </p>
      </div>

      {event.flyer && (
        <img
          src={event.flyer}
          alt={event.title}
          className='w-full h-48 object-cover'
        />
      )}

      {event.body && (
        <div className='p-6 bg-white dark:bg-gray-800'>
          <p className='text-gray-700 dark:text-gray-300 whitespace-pre-wrap'>
            {event.body}
          </p>
        </div>
      )}
    </div>
  )
}
