interface BlogPostProps {
  title: string
  date: string
  thumbnail?: string
  rating?: number
  body: string
}

interface PreviewProps {
  entry: {
    getIn: (path: string[]) => { toJS: () => BlogPostProps }
  }
}

export default function BlogPostPreview(props: PreviewProps) {
  const data = props.entry?.getIn(['data'])?.toJS() as BlogPostProps

  return (
    <article className="max-w-2xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{data?.title || 'Untitled'}</h1>
        {data?.date && (
          <p className="text-gray-600">
            {new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </header>
      {data?.thumbnail && (
        <img
          src={data.thumbnail}
          alt={data?.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}
      {data?.rating && (
        <div className="mb-6 flex items-center gap-2">
          <span className="font-semibold">Rating:</span>
          <span className="text-lg">{'⭐'.repeat(data.rating)}</span>
        </div>
      )}
      <div className="prose dark:prose-invert max-w-none">
        <p>{data?.body || 'No content'}</p>
      </div>
    </article>
  )
}
