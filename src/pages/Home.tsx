import Events from '../components/Events'
import Menus from '../components/Menus'

export default function Home() {
  return (
    <div className='w-full'>
      {/* Events Section */}
      <Events />

      {/* Menus Section */}
      <Menus />

      <form name='contact' method='POST' data-netlify='true'>
        <input type='hidden' name='form-name' value='contact' />
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

      <form name='private-event' method='POST' data-netlify='true'>
        <input type='hidden' name='form-name' value='private-event' />
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
