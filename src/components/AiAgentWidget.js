import { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Markdown from 'markdown-to-jsx'
import { getAiChatReply } from '../utilities/BackEndClient'

const markdownOptions = {
  disableParsingRawHTML: true,
  forceBlock: true,
  forceWrapper: true,
  wrapper: 'div',
  wrapperProps: { className: 'ai-chat-markdown' },
  overrides: {
    a: {
      props: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    },
  },
}

const STORAGE_KEY = 'charityshop:ai-agent'
const WELCOME_MESSAGE = {
  role: 'assistant',
  content: 'Hi, I can help you shop charity listings, pick a category, or explain how the site works. What are you looking for?',
}

function unwrapMarkdownFence(text) {
  const trimmed = text.trim()
  const fenced = trimmed.match(/^```(?:markdown|md)?\s*\r?\n([\s\S]*?)\r?\n```$/)
  return fenced ? fenced[1].trim() : trimmed
}

function extractReply(data) {
  if (!data) {
    return ''
  }
  if (typeof data === 'string') {
    return data
  }
  if (data.message) {
    return data.message
  }
  if (data.description) {
    return data.description
  }
  const content = data.choices?.[0]?.message?.content
  return typeof content === 'string' ? content : ''
}

function readStoredState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { open: false, messages: [WELCOME_MESSAGE] }
    }
    const parsed = JSON.parse(raw)
    const messages = Array.isArray(parsed.messages) && parsed.messages.length
      ? parsed.messages
      : [WELCOME_MESSAGE]
    return { open: Boolean(parsed.open), messages }
  } catch {
    return { open: false, messages: [WELCOME_MESSAGE] }
  }
}

function AiAgentWidget() {
  const [open, setOpen] = useState(() => readStoredState().open)
  const [messages, setMessages] = useState(() => readStoredState().messages)
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ open, messages }))
    } catch {
      // Ignore quota / private-mode failures.
    }
  }, [open, messages])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, loading, open])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  async function handleSubmit(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text || loading) {
      return
    }

    const nextMessages = [...messages, { role: 'user', content: text }]
    setDraft('')
    setError('')
    setMessages(nextMessages)
    setLoading(true)

    try {
      const data = await getAiChatReply({
        messages: nextMessages,
      })
      const reply = extractReply(data)
      if (reply) {
        setMessages([...nextMessages, { role: 'assistant', content: reply }])
      } else {
        setError(data?.detail || 'AI chat is unavailable')
      }
    } catch (err) {
      setError(err.message || 'AI chat is unavailable')
    } finally {
      setLoading(false)
    }
  }

  function handleClear() {
    setMessages([WELCOME_MESSAGE])
    setError('')
    setDraft('')
  }

  return (
    <div className="ai-agent-widget">
      {open && (
        <div
          className="ai-agent-backdrop"
          onClick={() => setOpen(false)}
        >
          <section
            className="ai-agent-panel"
            id="ai-agent-panel"
            aria-label="Shop assistant chat"
            onClick={(event) => event.stopPropagation()}
          >
          <div className="ai-agent-header">
            <span>Shop assistant</span>
            <div className="ai-agent-header-actions">
              <button type="button" className="ai-agent-header-button" onClick={handleClear}>
                New chat
              </button>
              <button
                type="button"
                className="ai-agent-header-button"
                onClick={() => setOpen(false)}
                aria-label="Close shop assistant"
              >
                Close
              </button>
            </div>
          </div>
          <div className="ai-agent-messages" ref={messagesRef} aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`ai-chat-bubble ${
                  message.role === 'user'
                    ? 'ai-agent-bubble-user'
                    : 'ai-chat-bubble-assistant ai-chat-bubble-markdown'
                }`}
              >
                {message.role === 'assistant' ? (
                  <Markdown options={markdownOptions}>
                    {unwrapMarkdownFence(message.content)}
                  </Markdown>
                ) : (
                  message.content
                )}
              </div>
            ))}
            {loading && (
              <div className="ai-chat-bubble ai-chat-bubble-assistant ai-chat-status-message">
                Thinking<span className="ai-chat-ellipsis" aria-hidden="true" />
              </div>
            )}
            {!loading && error && (
              <div className="ai-chat-bubble ai-chat-bubble-assistant ai-chat-bubble-error">
                {error}
              </div>
            )}
          </div>
          <Form className="ai-chat-composer" onSubmit={handleSubmit}>
            <Form.Control
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about items, charities, or the site"
              aria-label="Shop assistant message"
              disabled={loading}
              maxLength={2000}
            />
            <Button type="submit" variant="primary" disabled={loading || !draft.trim()}>
              Send
            </Button>
          </Form>
          </section>
        </div>
      )}
      <button
        type="button"
        className="ai-agent-toggle"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="ai-agent-panel"
        aria-label={open ? 'Close shop assistant' : 'Open shop assistant'}
      >
        {open ? (
          <span aria-hidden="true">&times;</span>
        ) : (
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
            <path
              fill="currentColor"
              d="M4 4h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 4v2h12V8H6zm0 4v2h8v-2H6z"
            />
          </svg>
        )}
      </button>
    </div>
  )
}

export default AiAgentWidget
