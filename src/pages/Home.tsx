import Events from '../components/Events'

export default function Home() {
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('contact form submitted', e)
  }

  return (
    <div className='w-full'>
      {/* Events Section */}
      <Events />

      <form name='contact' netlify onSubmit={handleContactSubmit}>
        <p>
          <label>
            Name <input type='text' name='name' />
          </label>
        </p>
        <p>
          <label>
            Email <input type='email' name='email' />
          </label>
        </p>
        <p>
          <button type='submit'>Send</button>
        </p>
      </form>
    </div>
  )
}
