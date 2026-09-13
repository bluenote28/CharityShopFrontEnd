import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { getAiDescription } from '../utilities/BackEndClient'
import NormalSpinner from './Spinner'

function isValidAiDescription(value) {
  if (typeof value !== 'string') {
    return false
  }
  const text = value.trim()
  return text.length > 0 && text !== 'AI description is unavailable'
}

function extractAiDescription(data) {
  if (!data) {
    return ''
  }
  if (typeof data === 'string') {
    return data
  }
  if (data.description) {
    return data.description
  }
  if (data.summary) {
    return data.summary
  }
  const content = data.choices?.[0]?.message?.content
  if (typeof content === 'string') {
    return content
  }
  return ''
}

function AiChat({ itemId, itemName, ebayId, existingDescription, enabled, ready }) {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const listingId = ebayId || itemId
    const cachedDescription = isValidAiDescription(existingDescription)
      ? existingDescription.trim()
      : ''

    if (!enabled || !listingId) {
      setDescription('')
      setError('')
      setLoading(false)
      return
    }

    if (cachedDescription) {
      setDescription(cachedDescription)
      setError('')
      setLoading(false)
      return
    }

    if (!ready) {
      setDescription('')
      setError('')
      setLoading(true)
      return
    }

    let cancelled = false

    async function fetchAiDescription() {
      setLoading(true)
      setError('')
      setDescription('')
      try {
        const data = await getAiDescription({
          ebay_id: listingId,
          item_link: `https://www.ebay.com/itm/${listingId}`,
          item_name: itemName,
        })
        if (!cancelled) {
          const text = extractAiDescription(data)
          if (text) {
            setDescription(text)
          } else {
            setError(data?.detail || 'AI description is unavailable')
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'AI description is unavailable')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchAiDescription()
    return () => {
      cancelled = true
    }
  }, [enabled, ready, ebayId, itemId, itemName, existingDescription])

  return (
    <div className="ai-chat">
      <div className="ai-chat-header">AI Assistant</div>
      <div className="ai-chat-messages" aria-live="polite">
        {loading && (
          <div className="ai-chat-status">
            <NormalSpinner />
          </div>
        )}
        {!loading && error && (
          <div className="ai-chat-bubble ai-chat-bubble-assistant ai-chat-bubble-error">
            {error}
          </div>
        )}
        {!loading && description && (
          <div className="ai-chat-bubble ai-chat-bubble-assistant">
            {description}
          </div>
        )}
        {!loading && !error && !description && (
          <p className="ai-chat-empty mb-0">No AI description yet.</p>
        )}
      </div>
      <Form className="ai-chat-composer" onSubmit={(e) => e.preventDefault()}>
        <Form.Control
          type="text"
          disabled
          placeholder="Chat is disabled"
          aria-label="AI chat message"
        />
        <Button type="submit" variant="primary" disabled>
          Send
        </Button>
      </Form>
    </div>
  )
}

export default AiChat
