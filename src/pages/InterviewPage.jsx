import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { 
  Send, 
  StopCircle, 
  Bot, 
  User, 
  Clock, 
  Briefcase,
  Building2,
  AlertCircle,
  ArrowLeft,
  Mic,
  MicOff
} from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function InterviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [interview, setInterview] = useState(null);
  const [startTime] = useState(new Date());
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    fetchInterview();
    fetchMessages();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(Math.floor((new Date() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchInterview = async () => {
    try {
      const response = await axios.get(`${API_URL}/interviews/${id}`);
      setInterview(response.data.interview);
    } catch (error) {
      console.error('Error fetching interview:', error);
      setError('Failed to load interview details');
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/messages/${id}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userMessage = input.trim();
    setInput('');
    setSending(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/messages/${id}`, {
        message: userMessage,
      });

      setMessages(prev => [
        ...prev,
        response.data.userMessage,
        response.data.aiMessage
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
      setInput(userMessage);
    } finally {
      setSending(false);
    }
  };

  const endInterview = async () => {
    if (!window.confirm('Are you sure you want to end this interview?')) return;

    try {
      await axios.post(`${API_URL}/interviews/${id}/end`);
      navigate(`/feedback/${id}`);
    } catch (error) {
      console.error('Error ending interview:', error);
      setError('Failed to end interview. Please try again.');
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3" style={{ color: '#667eea' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="text-muted">Preparing your interview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 position-relative overflow-hidden chat-page">
      {/* Background */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: -1 }}>
        <div className="gradient-bg-subtle"></div>
      </div>

      <Container fluid className="h-100 py-3">
        <Row className="h-100">
          <Col lg={10} xl={8} className="mx-auto h-100 d-flex flex-column">
            {/* Header */}
            <div className="chat-header glassmorphism-subtle p-3 mb-3 rounded-3">
              <Row className="align-items-center">
                <Col>
                  <Link to="/" className="text-decoration-none">
                    <Button variant="link" className="p-0 text-decoration-none">
                      <ArrowLeft size={20} className="me-2" />
                    </Button>
                  </Link>
                </Col>
                <Col className="text-center">
                  <h5 className="mb-0 fw-bold">AI Interview Session</h5>
                  {interview && (
                    <div className="d-flex align-items-center justify-content-center gap-3 mt-1">
                      <small className="text-muted d-flex align-items-center">
                        <Briefcase size={14} className="me-1" />
                        {interview.position}
                      </small>
                      {interview.company && (
                        <small className="text-muted d-flex align-items-center">
                          <Building2 size={14} className="me-1" />
                          {interview.company}
                        </small>
                      )}
                    </div>
                  )}
                </Col>
                <Col className="text-end">
                  <div className="d-flex align-items-center justify-content-end gap-3">
                    <div className="duration-badge">
                      <Clock size={16} className="me-1" />
                      {formatDuration(duration)}
                    </div>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={endInterview}
                      className="end-button"
                    >
                      <StopCircle size={16} className="me-1" />
                      End
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>

            {error && (
              <Alert 
                variant="danger" 
                dismissible 
                onClose={() => setError('')}
                className="glass-alert mb-3"
              >
                <AlertCircle size={18} className="me-2" />
                {error}
              </Alert>
            )}

            {/* Chat Container */}
            <Card className="flex-grow-1 chat-container glassmorphism-subtle">
              <Card.Body className="d-flex flex-column p-0">
                {/* Messages Area */}
                <div className="flex-grow-1 messages-area">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`message-wrapper ${message.role === 'USER' ? 'user' : 'ai'} 
                        ${index === 0 ? 'first' : ''}`}
                    >
                      <div className="message-content">
                        <div className="avatar-wrapper">
                          <div className="avatar">
                            {message.role === 'USER' ? <User size={20} /> : <Bot size={20} />}
                          </div>
                        </div>
                        <div className="message-bubble">
                          <div className="message-header">
                            {message.role === 'USER' ? 'You' : 'AI Interviewer'}
                          </div>
                          <div className="message-text">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {sending && (
                    <div className="message-wrapper ai">
                      <div className="message-content">
                        <div className="avatar-wrapper">
                          <div className="avatar">
                            <Bot size={20} />
                          </div>
                        </div>
                        <div className="message-bubble">
                          <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="input-area">
                  <Form onSubmit={sendMessage}>
                    <div className="input-wrapper">
                      <Button 
                        variant="link" 
                        className="mic-button"
                        disabled
                        title="Voice input coming soon"
                      >
                        <MicOff size={20} />
                      </Button>
                      <Form.Control
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your answer here..."
                        disabled={sending}
                        className="message-input"
                      />
                      <Button 
                        type="submit" 
                        disabled={sending || !input.trim()}
                        className="send-button"
                      >
                        {sending ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <Send size={20} />
                        )}
                      </Button>
                    </div>
                  </Form>
                  <small className="text-muted text-center d-block mt-2">
                    Press Enter to send your message
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .chat-page {
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .gradient-bg-subtle {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          opacity: 0.3;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .glassmorphism-subtle {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
        }

        .chat-header {
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .duration-badge {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 500;
          display: flex;
          align-items: center;
        }

        .end-button {
          background: #dc3545;
          border: none;
          border-radius: 50px;
          padding: 0.25rem 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .end-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }

        .chat-container {
          border-radius: 16px;
          overflow: hidden;
          height: calc(100vh - 180px);
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          background: linear-gradient(to bottom, transparent, rgba(249, 250, 251, 0.5));
        }

        .messages-area::-webkit-scrollbar {
          width: 6px;
        }

        .messages-area::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages-area::-webkit-scrollbar-thumb {
          background: rgba(102, 126, 234, 0.2);
          border-radius: 3px;
        }

        .message-wrapper {
          margin-bottom: 1.5rem;
          animation: messageSlide 0.3s ease-out;
        }

        .message-wrapper.first {
          margin-top: 0;
        }

        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-content {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .message-wrapper.user .message-content {
          flex-direction: row-reverse;
        }

        .avatar-wrapper {
          flex-shrink: 0;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .message-wrapper.user .avatar {
          background: linear-gradient(135deg, #56ccf2 0%, #2f80ed 100%);
        }

        .message-bubble {
          max-width: 70%;
          padding: 1rem;
          border-radius: 16px;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .message-wrapper.user .message-bubble {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
         color: white;
       }

       .message-header {
         font-size: 0.75rem;
         font-weight: 600;
         margin-bottom: 0.25rem;
         opacity: 0.8;
       }

       .message-wrapper.user .message-header {
         color: rgba(255, 255, 255, 0.9);
       }

       .message-text {
         font-size: 0.95rem;
         line-height: 1.5;
         white-space: pre-wrap;
         word-break: break-word;
       }

       .typing-indicator {
         display: flex;
         align-items: center;
         gap: 4px;
         padding: 0.5rem 0;
       }

       .typing-indicator span {
         width: 8px;
         height: 8px;
         border-radius: 50%;
         background: #667eea;
         animation: typing 1.4s infinite;
       }

       .typing-indicator span:nth-child(2) {
         animation-delay: 0.2s;
       }

       .typing-indicator span:nth-child(3) {
         animation-delay: 0.4s;
       }

       @keyframes typing {
         0%, 60%, 100% {
           opacity: 0.3;
           transform: translateY(0);
         }
         30% {
           opacity: 1;
           transform: translateY(-10px);
         }
       }

       .input-area {
         padding: 1.5rem;
         background: rgba(255, 255, 255, 0.95);
         border-top: 1px solid rgba(0, 0, 0, 0.05);
       }

       .input-wrapper {
         display: flex;
         align-items: center;
         gap: 0.5rem;
         background: rgba(249, 250, 251, 0.8);
         border: 1px solid rgba(102, 126, 234, 0.2);
         border-radius: 50px;
         padding: 0.25rem;
         transition: all 0.3s ease;
       }

       .input-wrapper:focus-within {
         border-color: #667eea;
         box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
         background: white;
       }

       .mic-button {
         color: #6c757d;
         padding: 0.5rem;
         border-radius: 50%;
         transition: all 0.3s ease;
       }

       .mic-button:hover:not(:disabled) {
         background: rgba(102, 126, 234, 0.1);
         color: #667eea;
       }

       .mic-button:disabled {
         opacity: 0.5;
         cursor: not-allowed;
       }

       .message-input {
         border: none;
         background: transparent;
         padding: 0.5rem 1rem;
         font-size: 0.95rem;
         flex: 1;
       }

       .message-input:focus {
         outline: none;
         box-shadow: none;
       }

       .send-button {
         background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
         border: none;
         border-radius: 50%;
         width: 40px;
         height: 40px;
         display: flex;
         align-items: center;
         justify-content: center;
         color: white;
         transition: all 0.3s ease;
       }

       .send-button:hover:not(:disabled) {
         transform: scale(1.1);
         box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
       }

       .send-button:disabled {
         opacity: 0.6;
         transform: none;
       }

       .glass-alert {
         backdrop-filter: blur(10px);
         background: rgba(220, 53, 69, 0.1);
         border: 1px solid rgba(220, 53, 69, 0.2);
         border-radius: 12px;
       }

       @media (max-width: 768px) {
         .chat-container {
           height: calc(100vh - 140px);
         }
         
         .message-bubble {
           max-width: 85%;
         }

         .duration-badge {
           font-size: 0.75rem;
           padding: 0.2rem 0.5rem;
         }

         .end-button {
           font-size: 0.875rem;
           padding: 0.2rem 0.75rem;
         }
       }
     `}</style>
   </div>
 );
}

export default InterviewPage;