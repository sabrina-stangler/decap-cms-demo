interface EventProps {
  title: string
  date: string
  flyer?: string
  body: string
}

interface PreviewProps {
  entry: {
    getIn: (path: string[]) => { toJS: () => EventProps }
  }
}

export default function EventPreview(props: PreviewProps) {
  const data = props.entry?.getIn(['data'])?.toJS() as EventProps

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-8">
        <h1 className="text-4xl font-bold mb-4">{data?.title || 'Untitled Event'}</h1>
        {data?.date && (
          <p className="text-lg">
            📅 {new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>

      {data?.flyer && (
        <img
          src={data.flyer}
          alt={data?.title}
          className="w-full h-80 object-cover rounded-lg mb-8"
        />
      )}

      <div className="prose dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
        <p>{data?.body || 'No event details'}</p>
      </div>
    </div>
  )
}
