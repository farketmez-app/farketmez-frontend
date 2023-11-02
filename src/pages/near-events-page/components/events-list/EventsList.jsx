import React from 'react'
import './events-list.css'

import PlainEventPreview from '../plain-event-preview//PlainEventPreview'

function EventsList({events}) {
    
  return (
    <div className="events-list">
        {events.map(event => (
            <PlainEventPreview key={event.title} event={event} />
        ))}
    </div>
  )
}

export default EventsList